import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { PostgresClient, RawQueryResult } from '../client.js'
import { checkCanConnect, checkCanCreateDatabase } from '../permissions.js'
import type { QueryResult } from '../result.js'

const mocks = vi.hoisted(() => ({
  postgres: vi.fn(),
}))

vi.mock('postgres', () => ({
  default: mocks.postgres,
}))

describe('permission checks', () => {
  beforeEach(() => {
    mocks.postgres.mockReset()
    vi.spyOn(Date, 'now').mockReturnValue(1710000000000)
    vi.spyOn(Math, 'random').mockReturnValue(0.1234)
  })

  it('returns true when it can create and drop a temporary database', async () => {
    const client = createFakeClient()
    const databaseName = createExpectedDatabaseName()

    await expect(checkCanCreateDatabase(client)).resolves.toBe(true)

    expect(client.queries).toContain(
      `SELECT 1 FROM pg_database WHERE datname = '${databaseName}' LIMIT 1`,
    )
    expect(client.queries).toContain(`CREATE DATABASE "${databaseName}"`)
    expect(client.queries).toContain(`DROP DATABASE IF EXISTS "${databaseName}"`)
  })

  it('returns false when database creation fails', async () => {
    const client = createFakeClient({ failCreate: true })
    const databaseName = createExpectedDatabaseName()

    await expect(checkCanCreateDatabase(client)).resolves.toBe(false)
    expect(client.queries).not.toContain(`DROP DATABASE IF EXISTS "${databaseName}"`)
  })

  it('returns false when cleanup fails after database creation', async () => {
    const client = createFakeClient({ failDrop: true })

    await expect(checkCanCreateDatabase(client)).resolves.toBe(false)
  })

  it('returns true when a connection succeeds and closes the client', async () => {
    const sql = createSqlMock()

    mocks.postgres.mockReturnValue(sql)

    await expect(checkCanConnect('postgres://user:pass@localhost:5432/app')).resolves.toBe(true)
    expect(sql).toHaveBeenCalledTimes(1)
    expect(sql.end).toHaveBeenCalledTimes(1)
  })

  it('returns false when a connection fails and still closes the client', async () => {
    const sql = createSqlMock({ connectError: new Error('connection failed') })

    mocks.postgres.mockReturnValue(sql)

    await expect(checkCanConnect('postgres://user:pass@localhost:5432/app')).resolves.toBe(false)
    expect(sql.end).toHaveBeenCalledTimes(1)
  })

  it('does not throw when closing after connect fails also fails', async () => {
    const sql = createSqlMock({
      connectError: new Error('connection failed'),
      endError: new Error('end failed'),
    })

    mocks.postgres.mockReturnValue(sql)

    await expect(checkCanConnect('postgres://user:pass@localhost:5432/app')).resolves.toBe(false)
  })
})

type FakeClientOptions = {
  failCreate?: boolean
  failDrop?: boolean
}

type FakeClient = PostgresClient & {
  queries: string[]
}

function createFakeClient(options: FakeClientOptions = {}): FakeClient {
  const queries: string[] = []

  return {
    queries,
    connect: vi.fn(async () => {}),
    end: vi.fn(async () => {}),
    query: vi.fn(async (sql) => {
      queries.push(sql)

      if (sql.startsWith('SELECT 1 FROM pg_database')) {
        return success([])
      }

      if (sql.startsWith('CREATE DATABASE')) {
        if (options.failCreate) {
          return failed('permission denied')
        }

        return success([])
      }

      if (sql.startsWith('SELECT pg_terminate_backend(pid)')) {
        return success([])
      }

      if (sql.startsWith('DROP DATABASE IF EXISTS')) {
        if (options.failDrop) {
          return failed('permission denied')
        }

        return success([])
      }

      throw new Error(`Unexpected SQL: ${sql}`)
    }),
    queryRaw: vi.fn(async () => [] as unknown as RawQueryResult),
  }
}

function success(rows: Record<string, unknown>[]): QueryResult {
  return {
    success: true,
    rows,
    rowCount: rows.length,
  }
}

function failed(message: string): QueryResult {
  return {
    success: false,
    error: {
      message,
      sqlstate: '42501',
    },
  }
}

type SqlMockOptions = {
  connectError?: Error
  endError?: Error
}

function createSqlMock(options: SqlMockOptions = {}) {
  const sql = vi.fn()

  if (options.connectError) {
    sql.mockRejectedValue(options.connectError)
  } else {
    sql.mockResolvedValue([])
  }

  return Object.assign(sql, {
    unsafe: vi.fn(),
    end: options.endError
      ? vi.fn().mockRejectedValue(options.endError)
      : vi.fn().mockResolvedValue(undefined),
  })
}

function createExpectedDatabaseName(): string {
  return `sbx_permission_check_${Date.now().toString(36)}_1234`
}
