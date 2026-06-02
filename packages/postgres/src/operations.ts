import type { PostgresClient } from './client.js'
import type { PostgresQueryError, QueryResult } from './result.js'

export class DatabaseOperationError extends Error {
  readonly queryError?: PostgresQueryError

  constructor(message: string, options?: { cause?: unknown; queryError?: PostgresQueryError }) {
    super(message, { cause: options?.cause })
    this.name = 'DatabaseOperationError'

    if (options?.queryError) {
      this.queryError = options.queryError
    }
  }
}

export function validateDatabaseName(name: string): void {
  if (!/^[a-z0-9_]+$/.test(name)) {
    throw new DatabaseOperationError(
      `Invalid database name '${name}'. Suggestion: use only lowercase letters, numbers and underscores.`,
    )
  }

  if (name.length > 63) {
    throw new DatabaseOperationError(
      `Invalid database name '${name}'. Suggestion: keep PostgreSQL database names at 63 characters or less.`,
    )
  }
}

export async function listDatabases(client: PostgresClient): Promise<string[]> {
  await client.connect()

  const rows = await executeOperation(
    client,
    'SELECT datname FROM pg_database WHERE datistemplate = false ORDER BY datname',
    'list databases',
  )

  return rows.flatMap((row) => (typeof row['datname'] === 'string' ? [row['datname']] : []))
}

export async function databaseExists(client: PostgresClient, name: string): Promise<boolean> {
  validateDatabaseName(name)

  const rows = await executeOperation(
    client,
    `SELECT 1 FROM pg_database WHERE datname = ${quoteLiteral(name)} LIMIT 1`,
    `check whether database '${name}' exists`,
  )

  return rows.length > 0
}

export async function createDatabase(client: PostgresClient, name: string): Promise<void> {
  validateDatabaseName(name)

  if (await databaseExists(client, name)) {
    return
  }

  await executeOperation(
    client,
    `CREATE DATABASE ${quoteIdentifier(name)}`,
    `create database '${name}'`,
  )
}

export async function dropDatabase(client: PostgresClient, name: string): Promise<void> {
  validateDatabaseName(name)

  await executeOperation(
    client,
    [
      'SELECT pg_terminate_backend(pid)',
      'FROM pg_stat_activity',
      `WHERE datname = ${quoteLiteral(name)}`,
      'AND pid <> pg_backend_pid()',
    ].join(' '),
    `terminate active connections for database '${name}'`,
  )

  await executeOperation(
    client,
    `DROP DATABASE IF EXISTS ${quoteIdentifier(name)}`,
    `drop database '${name}'`,
  )
}

async function executeOperation(
  client: PostgresClient,
  sql: string,
  operation: string,
): Promise<Record<string, unknown>[]> {
  const result = await client.query(sql)

  return unwrapSuccessfulResult(result, operation)
}

function unwrapSuccessfulResult(result: QueryResult, operation: string): Record<string, unknown>[] {
  if (result.success) {
    return result.rows
  }

  throw new DatabaseOperationError(`Failed to ${operation}: ${result.error.message}`, {
    queryError: result.error,
  })
}

function quoteIdentifier(identifier: string): string {
  validateDatabaseName(identifier)

  return `"${identifier}"`
}

function quoteLiteral(value: string): string {
  return `'${value.replaceAll("'", "''")}'`
}
