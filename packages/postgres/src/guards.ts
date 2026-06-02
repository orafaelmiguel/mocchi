export class SafetyGuardError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SafetyGuardError'
  }
}

const PRODUCTION_HOST_PATTERNS = ['production', 'prod', 'prd', 'live'] as const
const PRODUCTION_ENV_PATTERNS = ['production', 'prod', 'prd'] as const

export function assertSandboxPrefix(name: string, prefix: string): void {
  const expectedPrefix = `${prefix}_`

  if (!name.startsWith(expectedPrefix)) {
    throw new SafetyGuardError(
      `Refusing to drop '${name}': does not match sandbox prefix '${expectedPrefix}'`,
    )
  }
}

export function assertNotOriginalDatabase(sandboxName: string, originalName: string): void {
  if (sandboxName === originalName) {
    throw new SafetyGuardError(
      `Refusing to use original database '${originalName}' as sandbox. Suggestion: generate a separate sandbox database name.`,
    )
  }
}

export function assertNotProductionHost(host: string): void {
  const normalizedHost = host.toLowerCase()
  const matchedPattern = PRODUCTION_HOST_PATTERNS.find((pattern) =>
    normalizedHost.includes(pattern),
  )

  if (matchedPattern) {
    console.warn(
      `Warning: host '${host}' looks like a production host because it contains '${matchedPattern}'. Mocchi will not block this automatically, but destructive operations should be reviewed carefully.`,
    )
  }
}

export function assertNotProductionEnv(env: NodeJS.ProcessEnv): void {
  const nodeEnv = env['NODE_ENV']?.toLowerCase()

  if (!nodeEnv) {
    return
  }

  const matchedPattern = PRODUCTION_ENV_PATTERNS.find((pattern) => nodeEnv.includes(pattern))

  if (matchedPattern) {
    throw new SafetyGuardError(
      `Refusing to run with NODE_ENV='${env['NODE_ENV']}'. Suggestion: run Mocchi only in development or test environments.`,
    )
  }
}
