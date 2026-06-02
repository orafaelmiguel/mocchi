import { beforeEach, describe, expect, it, vi } from 'vitest'

import { createClient, PostgresConnectionError } from '../client.js'

const mocks = vi.hoisted(() => ({
  postgres: vi.fn(),
}))

vi.mock('postgres', () => ({
  default: mocks.postgres,
}))

describe('createClient', () => {
  beforeEach(() => {
    mocks.postgres.mockReset()
  })

  it('creates a postgres client with a single connection and 10s timeout', () => {
    const sql = createSqlMock()

    mocks.postgres.mockReturnValue(sql)

    createClient('postgres://user:pass@localhost:5432/mydb')

    expect(mocks.postgres).toHaveBeenCalledWith('postgres://user:pass@localhost:5432/mydb', {
      max: 1,
      connect_timeout: 10,
    })
  })

  it('connects by running SELECT 1', async () => {
    const sql = createSqlMock()

    mocks.postgres.mockReturnValue(sql)

    await createClient('postgres://user:pass@localhost:5432/mydb').connect()

    expect(sql).toHaveBeenCalledTimes(1)
    expect(sql.mock.calls[0]?.[0][0]).toBe('SELECT 1')
  })

  it('ends all connections', async () => {
    const sql = createSqlMock()

    mocks.postgres.mockReturnValue(sql)

    await createClient('postgres://user:pass@localhost:5432/mydb').end()

    expect(sql.end).toHaveBeenCalledTimes(1)
  })

  it('runs raw SQL through postgres unsafe', async () => {
    const sql = createSqlMock({
      unsafeResult: createRowList([{ id: 1 }]),
    })

    mocks.postgres.mockReturnValue(sql)

    const result = await createClient('postgres://user:pass@localhost:5432/mydb').queryRaw(
      'SELECT * FROM users',
    )

    expect(Array.from(result)).toEqual([{ id: 1 }])

    expect(sql.unsafe).toHaveBeenCalledWith('SELECT * FROM users')
  })

  it('maps query results to rows and rowCount', async () => {
    const sql = createSqlMock({
      unsafeResult: createRowList([{ id: 1 }], 3),
    })

    mocks.postgres.mockReturnValue(sql)

    await expect(
      createClient('postgres://user:pass@localhost:5432/mydb').query('SELECT * FROM users'),
    ).resolves.toEqual({
      success: true,
      rows: [{ id: 1 }],
      rowCount: 3,
    })
  })

  it('returns failed query results with SQLSTATE errors', async () => {
    const sql = createSqlMock({
      unsafeError: Object.assign(new Error('permission denied'), { code: '42501' }),
    })

    mocks.postgres.mockReturnValue(sql)

    await expect(
      createClient('postgres://user:pass@localhost:5432/mydb').query('SELECT * FROM users'),
    ).resolves.toEqual({
      success: false,
      error: {
        message: 'permission denied',
        sqlstate: '42501',
      },
    })
  })

  it('wraps connection refused errors with contextual messages', async () => {
    const sql = createSqlMock({
      tagError: Object.assign(new Error('connect ECONNREFUSED'), { code: 'ECONNREFUSED' }),
    })

    mocks.postgres.mockReturnValue(sql)

    await expect(
      createClient('postgres://user:pass@localhost:5432/mydb').connect(),
    ).rejects.toMatchObject({
      name: 'PostgresConnectionError',
      reason: 'connection-refused',
    })
  })

  it('wraps authentication errors with contextual messages', async () => {
    const sql = createSqlMock({
      tagError: Object.assign(new Error('password authentication failed'), { code: '28P01' }),
    })

    mocks.postgres.mockReturnValue(sql)

    await expect(
      createClient('postgres://user:pass@localhost:5432/mydb').connect(),
    ).rejects.toBeInstanceOf(PostgresConnectionError)
    await expect(
      createClient('postgres://user:pass@localhost:5432/mydb').connect(),
    ).rejects.toMatchObject({ reason: 'authentication-failed' })
  })

  it('wraps timeout errors with contextual messages', async () => {
    const sql = createSqlMock({
      tagError: Object.assign(new Error('timeout'), { code: 'CONNECT_TIMEOUT' }),
    })

    mocks.postgres.mockReturnValue(sql)

    await expect(
      createClient('postgres://user:pass@localhost:5432/mydb').connect(),
    ).rejects.toMatchObject({
      name: 'PostgresConnectionError',
      reason: 'timeout',
    })
  })
})

type SqlMockOptions = {
  tagError?: Error
  unsafeError?: Error
  unsafeResult?: unknown
}

function createSqlMock(options: SqlMockOptions = {}) {
  const sql = vi.fn()

  if (options.tagError) {
    sql.mockRejectedValue(options.tagError)
  } else {
    sql.mockResolvedValue(createRowList([{ '?column?': 1 }]))
  }

  return Object.assign(sql, {
    unsafe: options.unsafeError
      ? vi.fn().mockRejectedValue(options.unsafeError)
      : vi.fn().mockResolvedValue(options.unsafeResult ?? createRowList([])),
    end: vi.fn().mockResolvedValue(undefined),
  })
}

function createRowList(rows: Record<string, unknown>[], count = rows.length) {
  return Object.assign([...rows], {
    count,
    command: 'SELECT',
    columns: [],
    statement: {
      name: '',
      string: '',
      types: [],
      columns: [],
    },
    state: {
      status: 'I',
      pid: 1,
      secret: 1,
    },
  })
}
