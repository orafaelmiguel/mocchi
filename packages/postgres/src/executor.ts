import { readFile } from 'node:fs/promises'

import type { PostgresClient } from './client.js'
import type { QueryResult } from './result.js'

export class SqlExecutionError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options)
    this.name = 'SqlExecutionError'
  }
}

export async function executeSqlString(client: PostgresClient, sql: string): Promise<QueryResult> {
  if (sql.trim().length === 0) {
    return {
      success: true,
      rows: [],
      rowCount: 0,
    }
  }

  return await client.query(sql)
}

export async function executeSqlFile(
  client: PostgresClient,
  filePath: string,
): Promise<QueryResult> {
  const sql = await readSqlFile(filePath)

  return await executeSqlString(client, sql)
}

async function readSqlFile(filePath: string): Promise<string> {
  try {
    return await readFile(filePath, 'utf8')
  } catch (error) {
    if (getNodeErrorCode(error) === 'ENOENT') {
      throw new SqlExecutionError(
        `SQL file not found at '${filePath}'. Suggestion: verify the path and try again.`,
        { cause: error },
      )
    }

    throw new SqlExecutionError(
      `Failed to read SQL file '${filePath}'. Suggestion: verify file permissions and try again.`,
      { cause: error },
    )
  }
}

function getNodeErrorCode(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return undefined
  }

  const code = (error as { code: unknown }).code

  return typeof code === 'string' ? code : undefined
}
