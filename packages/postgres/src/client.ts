import postgres from 'postgres'

import { wrapQuery, type QueryResult } from './result.js'

export type RawQueryResult = Record<string, unknown>[] & {
  count: number
  command: string
}

export type PostgresClient = {
  connect(): Promise<void>
  end(): Promise<void>
  query(sql: string): Promise<QueryResult>
  queryRaw(sql: string): Promise<RawQueryResult>
}

export type PostgresConnectionErrorReason =
  | 'connection-refused'
  | 'authentication-failed'
  | 'timeout'
  | 'unknown'

export class PostgresConnectionError extends Error {
  constructor(
    readonly reason: PostgresConnectionErrorReason,
    message: string,
    options?: { cause?: unknown },
  ) {
    super(message, options)
    this.name = 'PostgresConnectionError'
  }
}

export function createClient(url: string): PostgresClient {
  const sql = postgres(url, {
    max: 1,
    connect_timeout: 10,
  })

  async function queryRaw(queryText: string): Promise<RawQueryResult> {
    const result = await sql.unsafe<postgres.Row[]>(queryText)

    return result as RawQueryResult
  }

  return {
    async connect(): Promise<void> {
      try {
        await sql`SELECT 1`
      } catch (error) {
        throw normalizeConnectionError(error)
      }
    },

    async end(): Promise<void> {
      await sql.end()
    },

    query(queryText: string): Promise<QueryResult> {
      return wrapQuery(() => queryRaw(queryText))
    },

    queryRaw,
  }
}

function normalizeConnectionError(error: unknown): PostgresConnectionError {
  const code = getErrorCode(error)

  if (code === 'ECONNREFUSED') {
    return new PostgresConnectionError(
      'connection-refused',
      'Could not connect to PostgreSQL. Suggestion: verify that the server is running and reachable.',
      { cause: error },
    )
  }

  if (code === '28P01' || code === 'INVALID_PASSWORD') {
    return new PostgresConnectionError(
      'authentication-failed',
      'PostgreSQL authentication failed. Suggestion: verify the username and password in DATABASE_URL.',
      { cause: error },
    )
  }

  if (code === 'CONNECT_TIMEOUT' || code === 'ETIMEDOUT') {
    return new PostgresConnectionError(
      'timeout',
      'Timed out while connecting to PostgreSQL. Suggestion: verify host, port and network access.',
      { cause: error },
    )
  }

  return new PostgresConnectionError(
    'unknown',
    'PostgreSQL connection failed. Suggestion: verify DATABASE_URL and PostgreSQL availability.',
    { cause: error },
  )
}

function getErrorCode(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return undefined
  }

  const code = (error as { code: unknown }).code

  return typeof code === 'string' ? code : undefined
}
