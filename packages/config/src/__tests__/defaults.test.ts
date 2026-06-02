import { describe, expect, it } from 'vitest'

import { resolveDefaults } from '../defaults.js'
import type { MocchiConfig } from '../types.js'

const baseConfig: MocchiConfig = {
  project: 'demo',
  database: {
    provider: 'postgres',
    sourceEnv: 'DATABASE_URL',
    strategy: 'sibling-database',
  },
  migrations: {
    command: 'pnpm prisma migrate deploy',
  },
}

describe('resolveDefaults', () => {
  it('resolves the default sandbox prefix', () => {
    expect(resolveDefaults(baseConfig).sandbox.prefix).toBe('sbx')
  })

  it('resolves the default sandbox cleanup strategy', () => {
    expect(resolveDefaults(baseConfig).sandbox.cleanup).toBe('on-exit')
  })

  it('respects user overrides', () => {
    const resolved = resolveDefaults({
      ...baseConfig,
      docker: {
        autoStart: false,
      },
      migrations: {
        command: 'pnpm db:migrate',
        timeout: 30000,
      },
      seed: {
        command: 'pnpm db:seed',
        optional: false,
      },
      sandbox: {
        name: 'timestamp',
        prefix: 'local',
        cleanup: 'never',
        ttl: '4h',
      },
    })

    expect(resolved.docker?.autoStart).toBe(false)
    expect(resolved.migrations.timeout).toBe(30000)
    expect(resolved.seed?.optional).toBe(false)
    expect(resolved.sandbox).toEqual({
      name: 'timestamp',
      prefix: 'local',
      cleanup: 'never',
      ttl: '4h',
    })
  })

  it('resolves runtime defaults for optional sections when present', () => {
    const resolved = resolveDefaults({
      ...baseConfig,
      docker: {
        service: 'postgres',
      },
      seed: {
        command: 'pnpm db:seed',
      },
    })

    expect(resolved.docker?.autoStart).toBe(true)
    expect(resolved.seed?.optional).toBe(true)
    expect(resolved.migrations.timeout).toBe(120000)
  })
})
