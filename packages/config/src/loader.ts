import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

import { validateConfig } from './validator.js'
import type { MocchiConfig } from './types.js'

const CONFIG_FILE_NAME = 'mocchi.config.ts'
const MAX_CONFIG_SEARCH_DEPTH = 5

export class ConfigLoadError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options)
    this.name = 'ConfigLoadError'
  }
}

export function findConfigFile(cwd: string): string | null {
  let currentDir = resolve(cwd)

  for (let depth = 0; depth <= MAX_CONFIG_SEARCH_DEPTH; depth += 1) {
    const candidate = join(currentDir, CONFIG_FILE_NAME)

    if (existsSync(candidate)) {
      return candidate
    }

    const parentDir = dirname(currentDir)

    if (parentDir === currentDir) {
      return null
    }

    currentDir = parentDir
  }

  return null
}

export function loadConfigFile(filePath: string): MocchiConfig {
  const resolvedPath = resolve(filePath)

  if (!existsSync(resolvedPath)) {
    throw new ConfigLoadError(
      `Config file not found at '${resolvedPath}'. Suggestion: create mocchi.config.ts or run mocchi init.`,
    )
  }

  try {
    const jiti = createJiti(fileURLToPath(import.meta.url), {
      interopDefault: true,
      moduleCache: false,
    })
    const loadedConfig = jiti(resolvedPath)
    const config = unwrapDefaultExport(loadedConfig)

    return validateConfig(config)
  } catch (error) {
    if (error instanceof ConfigLoadError) {
      throw error
    }

    throw new ConfigLoadError(
      `Failed to load config file '${resolvedPath}'. Suggestion: check the TypeScript syntax and exported config object.`,
      { cause: error },
    )
  }
}

function unwrapDefaultExport(value: unknown): unknown {
  if (isRecord(value) && 'default' in value) {
    return value.default
  }

  return value
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
