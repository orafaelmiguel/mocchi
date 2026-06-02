import { describe, expect, it } from 'vitest'

import { DatabaseUrlParseError, parseDatabaseUrl } from '../url.js'

describe('parseDatabaseUrl', () => {
  it('parses a simple postgres URL', () => {
    const parsed = parseDatabaseUrl('postgres://user:pass@localhost:5432/mydb')

    expect(parsed).toEqual({
      host: 'localhost',
      port: 5432,
      database: 'mydb',
      user: 'user',
      password: 'pass',
      ssl: false,
      raw: 'postgres://user:***@localhost:5432/mydb',
      safeString: 'postgres://user:***@localhost:5432/mydb',
    })
  })

  it('defaults the port to 5432 when omitted', () => {
    expect(parseDatabaseUrl('postgres://user:pass@localhost/mydb').port).toBe(5432)
  })

  it('detects ssl=true', () => {
    expect(parseDatabaseUrl('postgres://user:pass@localhost:5432/mydb?ssl=true').ssl).toBe(true)
  })

  it('detects sslmode=require', () => {
    expect(parseDatabaseUrl('postgres://user:pass@localhost:5432/mydb?sslmode=require').ssl).toBe(
      true,
    )
  })

  it('never exposes the password in log-safe strings', () => {
    const parsed = parseDatabaseUrl('postgres://user:super-secret@localhost:5432/mydb')

    expect(parsed.raw).not.toContain('super-secret')
    expect(parsed.safeString).not.toContain('super-secret')
    expect(parsed.password).toBe('super-secret')
  })

  it('throws a descriptive error for malformed URLs', () => {
    expect(() => parseDatabaseUrl('not a url')).toThrow(DatabaseUrlParseError)
    expect(() => parseDatabaseUrl('not a url')).toThrow('Invalid DATABASE_URL')
  })

  it('throws a descriptive error for unsupported protocols', () => {
    expect(() => parseDatabaseUrl('mysql://user:pass@localhost:3306/mydb')).toThrow(
      "use 'postgres://'",
    )
  })
})
