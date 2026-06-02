import { describe, expect, it } from 'vitest'

import { ConfigValidationError, validateConfig } from '../validator.js'

const validConfig = {
  project: 'demo',
  database: {
    provider: 'postgres',
    sourceEnv: 'DATABASE_URL',
    strategy: 'sibling-database',
  },
  migrations: {
    command: 'pnpm db:migrate',
  },
}

describe('validateConfig', () => {
  it('accepts a valid config', () => {
    expect(validateConfig(validConfig)).toEqual(validConfig)
  })

  it('rejects config without project', () => {
    expect(() =>
      validateConfig({
        ...validConfig,
        project: '',
      }),
    ).toThrow(ConfigValidationError)
  })

  it('rejects config without migrations.command', () => {
    expect(() =>
      validateConfig({
        ...validConfig,
        migrations: {
          command: '',
        },
      }),
    ).toThrow(ConfigValidationError)
  })

  it('includes the field name and suggestion in the error message', () => {
    expect(() =>
      validateConfig({
        ...validConfig,
        migrations: {
          command: '',
        },
      }),
    ).toThrow('migrations.command')

    expect(() =>
      validateConfig({
        ...validConfig,
        migrations: {
          command: '',
        },
      }),
    ).toThrow('Suggestion')
  })
})
