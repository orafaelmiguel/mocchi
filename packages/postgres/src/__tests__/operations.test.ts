import { describe, expect, it, vi } from 'vitest'

import type { PostgresClient, RawQueryResult } from '../client.js'
import {
  createDatabase,
  databaseExists,
  DatabaseOperationError,
  dropDatabase,
  listDatabases,
  validateDatabaseName,
} from '../operations.js'
import type { QueryResult } from '../result.js'

describe('database operations', () => {
  it('lists non-template databases', async () => {
    const client = createFakeClient(['app', 'postgres'])

    await expect(listDatabases(client)).resolves.toEqual(['app', 'postgres'])
    expect(client.connect).toHaveBeenCalledTimes(1)
    expect(client.queries).toContain(
      'SELECT datname FROM pg_database WHERE datistemplate = false ORDER BY datname',
    )
  })

  it('checks whether a database exists', async () => {
    const client = createFakeClient(['app'])

    await expect(databaseExists(client, 'app')).resolves.toBe(true)
    await expect(databaseExists(client, 'missing')).resolves.toBe(false)
  })

  it('creates a database only when it does not exist', async () => {
    const client = createFakeClient(['app'])

    await createDatabase(client, 'new_db')
    await createDatabase(client, 'app')

    expect(client.databases).toEqual(new Set(['app', 'new_db']))
    expect(client.queries).toContain('CREATE DATABASE "new_db"')
    expect(client.queries).not.toContain('CREATE DATABASE "app"')
  })

  it('drops a database after terminating active connections', async () => {
    const client = createFakeClient(['app'])

    await dropDatabase(client, 'app')

    expect(client.databases.has('app')).toBe(false)
    expect(client.queries).toContain(
      "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'app' AND pid <> pg_backend_pid()",
    )
    expect(client.queries).toContain('DROP DATABASE IF EXISTS "app"')
  })

  it('rejects unsafe database names', () => {
    expect(() => validateDatabaseName('app-prod')).toThrow(DatabaseOperationError)
    expect(() => validateDatabaseName('app;drop_database')).toThrow(DatabaseOperationError)
    expect(() => validateDatabaseName('a'.repeat(64))).toThrow(DatabaseOperationError)
  })

  it('wraps failed query results as operation errors', async () => {
    const client = createFakeClient([])

    client.query.mockResolvedValueOnce({
      success: false,
      error: {
        message: 'permission denied',
        sqlstate: '42501',
      },
    })

    await expect(listDatabases(client)).rejects.toMatchObject({
      name: 'DatabaseOperationError',
      queryError: {
        sqlstate: '42501',
      },
    })
  })
})

type FakeClient = PostgresClient & {
  databases: Set<string>
  queries: string[]
  query: ReturnType<typeof vi.fn<(sql: string) => Promise<QueryResult>>>
  connect: ReturnType<typeof vi.fn<() => Promise<void>>>
}

function createFakeClient(initialDatabases: string[]): FakeClient {
  const databases = new Set(initialDatabases)
  const queries: string[] = []

  const client: FakeClient = {
    databases,
    queries,
    connect: vi.fn(async () => {}),
    end: vi.fn(async () => {}),
    query: vi.fn(async (sql) => {
      queries.push(sql)

      if (sql === 'SELECT datname FROM pg_database WHERE datistemplate = false ORDER BY datname') {
        return success([...databases].sort().map((datname) => ({ datname })))
      }

      const existsMatch = sql.match(/^SELECT 1 FROM pg_database WHERE datname = '(.+)' LIMIT 1$/)

      if (existsMatch?.[1]) {
        return success(databases.has(existsMatch[1]) ? [{ '?column?': 1 }] : [])
      }

      const createMatch = sql.match(/^CREATE DATABASE "([a-z0-9_]+)"$/)

      if (createMatch?.[1]) {
        databases.add(createMatch[1])
        return success([])
      }

      if (sql.startsWith('SELECT pg_terminate_backend(pid)')) {
        return success([])
      }

      const dropMatch = sql.match(/^DROP DATABASE IF EXISTS "([a-z0-9_]+)"$/)

      if (dropMatch?.[1]) {
        databases.delete(dropMatch[1])
        return success([])
      }

      throw new Error(`Unexpected SQL: ${sql}`)
    }),
    queryRaw: vi.fn(async () => [] as unknown as RawQueryResult),
  }

  return client
}

function success(rows: Record<string, unknown>[]): QueryResult {
  return {
    success: true,
    rows,
    rowCount: rows.length,
  }
}
