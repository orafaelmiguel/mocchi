import { describe, expect, it } from 'vitest'

import { generateSandboxUrl } from '../sandbox-url.js'
import { parseDatabaseUrl } from '../url.js'

describe('generateSandboxUrl', () => {
  it('replaces only the database name in a simple URL', () => {
    const baseUrl = parseDatabaseUrl('postgres://user:pass@localhost:5432/mydb')

    expect(generateSandboxUrl(baseUrl, 'sbx_main_1234')).toBe(
      'postgres://user:pass@localhost:5432/sbx_main_1234',
    )
  })

  it('preserves protocol, host, port, credentials and query params', () => {
    const baseUrl = parseDatabaseUrl(
      'postgresql://user:pass@db.local:5433/mydb?sslmode=require&application_name=mocchi',
    )

    expect(generateSandboxUrl(baseUrl, 'sbx_feature_1234')).toBe(
      'postgresql://user:pass@db.local:5433/sbx_feature_1234?sslmode=require&application_name=mocchi',
    )
  })

  it('preserves omitted ports as omitted', () => {
    const baseUrl = parseDatabaseUrl('postgres://user:pass@localhost/mydb?ssl=true')

    expect(generateSandboxUrl(baseUrl, 'sbx_main_1234')).toBe(
      'postgres://user:pass@localhost/sbx_main_1234?ssl=true',
    )
  })

  it('rejects invalid sandbox database names', () => {
    const baseUrl = parseDatabaseUrl('postgres://user:pass@localhost:5432/mydb')

    expect(() => generateSandboxUrl(baseUrl, 'bad-name')).toThrow(
      "Invalid database name 'bad-name'",
    )
  })
})
