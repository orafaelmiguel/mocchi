import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  assertNotOriginalDatabase,
  assertNotProductionEnv,
  assertNotProductionHost,
  assertSandboxPrefix,
  SafetyGuardError,
} from '../guards.js'

describe('safety guards', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('allows sandbox names matching the configured prefix', () => {
    expect(() => assertSandboxPrefix('sbx_feature_1234', 'sbx')).not.toThrow()
  })

  it('rejects sandbox names that do not match the configured prefix', () => {
    expect(() => assertSandboxPrefix('app_database', 'sbx')).toThrow(SafetyGuardError)
    expect(() => assertSandboxPrefix('app_database', 'sbx')).toThrow(
      "Refusing to drop 'app_database': does not match sandbox prefix 'sbx_'",
    )
  })

  it('allows sandbox names that differ from the original database name', () => {
    expect(() => assertNotOriginalDatabase('sbx_app_1234', 'app')).not.toThrow()
  })

  it('rejects sandbox names equal to the original database name', () => {
    expect(() => assertNotOriginalDatabase('app', 'app')).toThrow(SafetyGuardError)
    expect(() => assertNotOriginalDatabase('app', 'app')).toThrow(
      "Refusing to use original database 'app' as sandbox",
    )
  })

  it('warns but does not block suspicious production hosts', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(() => assertNotProductionHost('prod-db.internal')).not.toThrow()
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("host 'prod-db.internal' looks like a production host"),
    )
  })

  it('does not warn for ordinary local hosts', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    assertNotProductionHost('localhost')

    expect(warn).not.toHaveBeenCalled()
  })

  it('blocks production-like NODE_ENV values', () => {
    expect(() => assertNotProductionEnv({ NODE_ENV: 'production' })).toThrow(SafetyGuardError)
    expect(() => assertNotProductionEnv({ NODE_ENV: 'prod' })).toThrow(SafetyGuardError)
    expect(() => assertNotProductionEnv({ NODE_ENV: 'prd' })).toThrow(SafetyGuardError)
  })

  it('allows non-production NODE_ENV values', () => {
    expect(() => assertNotProductionEnv({ NODE_ENV: 'test' })).not.toThrow()
    expect(() => assertNotProductionEnv({ NODE_ENV: 'development' })).not.toThrow()
    expect(() => assertNotProductionEnv({})).not.toThrow()
  })
})
