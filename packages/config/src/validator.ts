import type { MocchiConfig } from './types.js'

export class ConfigValidationError extends Error {
  constructor(
    readonly field: string,
    message: string,
  ) {
    super(`${field}: ${message}`)
    this.name = 'ConfigValidationError'
  }
}

export function validateConfig(config: unknown): MocchiConfig {
  if (!isRecord(config)) {
    throw validationError(
      'config',
      'Expected config to export an object. Suggestion: export default defineMocchiConfig({ ... }).',
    )
  }

  assertNonEmptyString(config.project, 'project', 'Set project to your application name.')

  if (!isRecord(config.database)) {
    throw validationError(
      'database',
      'Expected database to be an object. Suggestion: add database.provider, sourceEnv and strategy.',
    )
  }

  if (config.database.provider !== 'postgres') {
    throw validationError(
      'database.provider',
      "Expected 'postgres'. Suggestion: set database.provider to 'postgres'.",
    )
  }

  assertNonEmptyString(
    config.database.sourceEnv,
    'database.sourceEnv',
    'Set database.sourceEnv to the env var that stores the source DATABASE_URL.',
  )

  if (config.database.strategy !== 'sibling-database') {
    throw validationError(
      'database.strategy',
      "Expected 'sibling-database'. Suggestion: set database.strategy to 'sibling-database'.",
    )
  }

  if (!isRecord(config.migrations)) {
    throw validationError(
      'migrations',
      'Expected migrations to be an object. Suggestion: add migrations.command.',
    )
  }

  assertNonEmptyString(
    config.migrations.command,
    'migrations.command',
    'Set migrations.command to the command Mocchi should run against the sandbox database.',
  )

  return config as MocchiConfig
}

function assertNonEmptyString(
  value: unknown,
  field: string,
  suggestion: string,
): asserts value is string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw validationError(field, `Expected a non-empty string. Suggestion: ${suggestion}`)
  }
}

function validationError(field: string, message: string): ConfigValidationError {
  return new ConfigValidationError(field, message)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
