import { describe, expect, it } from 'vitest'

import { MissingEnvironmentVariableError, resolveEnvVars } from '../env.js'
import type { ResolvedMocchiConfig } from '../types.js'

const resolvedConfig: ResolvedMocchiConfig = {
  project: 'demo',
  database: {
    provider: 'postgres',
    sourceEnv: 'DATABASE_URL',
    strategy: 'sibling-database',
  },
  migrations: {
    command: 'pnpm db:migrate',
    timeout: 120000,
  },
  sandbox: {
    name: 'branch',
    prefix: 'sbx',
    cleanup: 'on-exit',
    ttl: '2h',
  },
}

describe('resolveEnvVars', () => {
  it('reads the database url from the configured source env', () => {
    expect(
      resolveEnvVars(resolvedConfig, {
        DATABASE_URL: 'postgres://user:secret@localhost:5432/app',
      }),
    ).toBe(resolvedConfig)
  })

  it('throws a descriptive error without exposing the database url', () => {
    expect(() => resolveEnvVars(resolvedConfig, {})).toThrow(MissingEnvironmentVariableError)
    expect(() => resolveEnvVars(resolvedConfig, {})).toThrow('DATABASE_URL')
    expect(() => resolveEnvVars(resolvedConfig, {})).not.toThrow('secret')
  })
})
