import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it, vi } from 'vitest'

import type { PostgresClient, RawQueryResult } from '../client.js'
import { executeSqlFile, executeSqlString, SqlExecutionError } from '../executor.js'
import type { QueryResult } from '../result.js'

const tempDirs: string[] = []

describe('SQL executor', () => {
  afterEach(async () => {
    await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })))
  })

  it('executes SQL strings through the client', async () => {
    const client = createFakeClient({
      success: true,
      rows: [{ id: 1 }],
      rowCount: 1,
    })

    await expect(executeSqlString(client, 'SELECT 1')).resolves.toEqual({
      success: true,
      rows: [{ id: 1 }],
      rowCount: 1,
    })
    expect(client.query).toHaveBeenCalledWith('SELECT 1')
  })

  it('executes SQL files after reading them from disk', async () => {
    const client = createFakeClient({
      success: true,
      rows: [],
      rowCount: 0,
    })
    const filePath = await createSqlFile('SELECT * FROM users;')

    await executeSqlFile(client, filePath)

    expect(client.query).toHaveBeenCalledWith('SELECT * FROM users;')
  })

  it('returns success without rows for empty SQL strings', async () => {
    const client = createFakeClient({
      success: true,
      rows: [{ id: 1 }],
      rowCount: 1,
    })

    await expect(executeSqlString(client, '   \n')).resolves.toEqual({
      success: true,
      rows: [],
      rowCount: 0,
    })
    expect(client.query).not.toHaveBeenCalled()
  })

  it('returns success without rows for empty SQL files', async () => {
    const client = createFakeClient({
      success: true,
      rows: [{ id: 1 }],
      rowCount: 1,
    })
    const filePath = await createSqlFile('')

    await expect(executeSqlFile(client, filePath)).resolves.toEqual({
      success: true,
      rows: [],
      rowCount: 0,
    })
    expect(client.query).not.toHaveBeenCalled()
  })

  it('throws a friendly error when the SQL file does not exist', async () => {
    const client = createFakeClient({
      success: true,
      rows: [],
      rowCount: 0,
    })

    await expect(executeSqlFile(client, 'missing.sql')).rejects.toThrow(SqlExecutionError)
    await expect(executeSqlFile(client, 'missing.sql')).rejects.toThrow('SQL file not found')
  })
})

function createFakeClient(queryResult: QueryResult): PostgresClient & {
  query: ReturnType<typeof vi.fn<(sql: string) => Promise<QueryResult>>>
} {
  return {
    connect: vi.fn(async () => {}),
    end: vi.fn(async () => {}),
    query: vi.fn(async () => queryResult),
    queryRaw: vi.fn(async () => [] as unknown as RawQueryResult),
  }
}

async function createSqlFile(contents: string): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), 'mocchi-sql-'))
  const filePath = join(dir, 'query.sql')

  tempDirs.push(dir)
  await writeFile(filePath, contents)

  return filePath
}
