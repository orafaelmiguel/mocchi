import type { MocchiConfig, ResolvedMocchiConfig, ResolvedSandboxConfig } from './types.js'

export const DEFAULT_SANDBOX_CONFIG = {
  name: 'branch',
  prefix: 'sbx',
  cleanup: 'on-exit',
  ttl: '2h',
} as const satisfies ResolvedSandboxConfig

export const DEFAULT_MIGRATIONS_TIMEOUT = 120000

export function resolveDefaults(config: MocchiConfig): ResolvedMocchiConfig {
  const resolved: ResolvedMocchiConfig = {
    project: config.project,
    database: config.database,
    migrations: {
      ...config.migrations,
      timeout: config.migrations.timeout ?? DEFAULT_MIGRATIONS_TIMEOUT,
    },
    sandbox: {
      ...DEFAULT_SANDBOX_CONFIG,
      ...config.sandbox,
    },
  }

  if (config.docker) {
    resolved.docker = {
      ...config.docker,
      autoStart: config.docker.autoStart ?? true,
    }
  }

  if (config.seed) {
    resolved.seed = {
      ...config.seed,
      optional: config.seed.optional ?? true,
    }
  }

  return resolved
}
