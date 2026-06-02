export type ParsedDatabaseUrl = {
  host: string
  port: number
  database: string
  user: string
  password: string
  ssl: boolean
  raw: string
  readonly safeString: string
}

export class DatabaseUrlParseError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options)
    this.name = 'DatabaseUrlParseError'
  }
}

export function parseDatabaseUrl(databaseUrl: string): ParsedDatabaseUrl {
  let parsedUrl: URL

  try {
    parsedUrl = new URL(databaseUrl)
  } catch (error) {
    throw new DatabaseUrlParseError(
      'Invalid DATABASE_URL. Suggestion: use a valid postgres://user:password@host:port/database URL.',
      { cause: error },
    )
  }

  if (parsedUrl.protocol !== 'postgres:' && parsedUrl.protocol !== 'postgresql:') {
    throw new DatabaseUrlParseError(
      "Invalid DATABASE_URL protocol. Suggestion: use 'postgres://' or 'postgresql://'.",
    )
  }

  const database = decodeURIComponent(parsedUrl.pathname.replace(/^\/+/, ''))
  const user = decodeURIComponent(parsedUrl.username)
  const password = decodeURIComponent(parsedUrl.password)

  if (!parsedUrl.hostname) {
    throw new DatabaseUrlParseError(
      'Invalid DATABASE_URL host. Suggestion: include a database host.',
    )
  }

  if (!database) {
    throw new DatabaseUrlParseError(
      'Invalid DATABASE_URL database. Suggestion: include the database name in the URL path.',
    )
  }

  if (!user) {
    throw new DatabaseUrlParseError('Invalid DATABASE_URL user. Suggestion: include a username.')
  }

  const safeString = redactPassword(parsedUrl).toString()

  return {
    host: parsedUrl.hostname,
    port: parsePort(parsedUrl),
    database,
    user,
    password,
    ssl: isSslEnabled(parsedUrl),
    raw: safeString,
    get safeString() {
      return safeString
    },
  }
}

function parsePort(parsedUrl: URL): number {
  if (!parsedUrl.port) {
    return 5432
  }

  const port = Number(parsedUrl.port)

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new DatabaseUrlParseError(
      'Invalid DATABASE_URL port. Suggestion: use a TCP port between 1 and 65535.',
    )
  }

  return port
}

function isSslEnabled(parsedUrl: URL): boolean {
  return (
    parsedUrl.searchParams.get('ssl') === 'true' ||
    parsedUrl.searchParams.get('sslmode') === 'require'
  )
}

function redactPassword(parsedUrl: URL): URL {
  const safeUrl = new URL(parsedUrl)

  if (safeUrl.password) {
    safeUrl.password = '***'
  }

  return safeUrl
}
