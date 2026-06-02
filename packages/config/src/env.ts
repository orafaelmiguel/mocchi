import type { ResolvedMocchiConfig } from './types.js'

export class MissingEnvironmentVariableError extends Error {
  constructor(readonly variableName: string) {
    super(
      `Missing environment variable '${variableName}'. Suggestion: define it before running Mocchi.`,
    )
    this.name = 'MissingEnvironmentVariableError'
  }
}

export function resolveEnvVars(
  config: ResolvedMocchiConfig,
  env: NodeJS.ProcessEnv,
): ResolvedMocchiConfig {
  const sourceEnv = config.database.sourceEnv
  const databaseUrl = env[sourceEnv]

  if (typeof databaseUrl !== 'string' || databaseUrl.trim().length === 0) {
    throw new MissingEnvironmentVariableError(sourceEnv)
  }

  return config
}
