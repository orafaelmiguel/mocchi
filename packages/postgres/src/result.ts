export type QueryResult =
  | { success: true; rows: Record<string, unknown>[]; rowCount: number }
  | { success: false; error: PostgresQueryError }

export type PostgresQueryError = {
  message: string
  sqlstate: string
  detail?: string
  hint?: string
  position?: string
}

export async function wrapQuery(fn: () => Promise<unknown>): Promise<QueryResult> {
  try {
    const result = await fn()
    const rows = normalizeRows(result)

    return {
      success: true,
      rows,
      rowCount: getRowCount(result, rows.length),
    }
  } catch (error) {
    return {
      success: false,
      error: mapPostgresQueryError(error),
    }
  }
}

function mapPostgresQueryError(error: unknown): PostgresQueryError {
  const record = asRecord(error)
  const sqlstate = getStringField(record, 'code') ?? 'XXXXX'

  return {
    message: getErrorMessage(error),
    sqlstate,
    ...optionalField(record, 'detail'),
    ...optionalField(record, 'hint'),
    ...optionalField(record, 'position'),
  }
}

function normalizeRows(result: unknown): Record<string, unknown>[] {
  if (!Array.isArray(result)) {
    return []
  }

  return result.map((row) => (isPlainObject(row) ? { ...row } : { value: row }))
}

function getRowCount(result: unknown, fallback: number): number {
  const record = asRecord(result)
  const count = record ? record['count'] : undefined

  return typeof count === 'number' ? count : fallback
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message
  }

  return 'Unknown PostgreSQL query error'
}

function optionalField(
  record: Record<string, unknown> | null,
  field: 'detail' | 'hint' | 'position',
): Partial<Pick<PostgresQueryError, typeof field>> {
  const value = getStringField(record, field)

  return value ? { [field]: value } : {}
}

function getStringField(record: Record<string, unknown> | null, field: string): string | undefined {
  const value = record ? record[field] : undefined

  return typeof value === 'string' && value.length > 0 ? value : undefined
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : null
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
