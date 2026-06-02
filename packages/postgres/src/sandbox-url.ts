import { validateDatabaseName } from './operations.js'
import type { ParsedDatabaseUrl } from './url.js'

export function generateSandboxUrl(baseUrl: ParsedDatabaseUrl, sandboxName: string): string {
  validateDatabaseName(sandboxName)

  const sandboxUrl = new URL(baseUrl.safeString)

  sandboxUrl.username = baseUrl.user
  sandboxUrl.password = baseUrl.password
  sandboxUrl.pathname = `/${encodeURIComponent(sandboxName)}`

  return sandboxUrl.toString()
}
