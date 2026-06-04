import { existsSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

import { load } from 'js-yaml'

export type ComposePort =
  | string
  | {
      target?: number | string
      published?: number | string
      protocol?: string
      mode?: string
    }

export type ComposeEnvironment = Record<string, string | number | boolean | null> | string[]

export type ComposeService = {
  image?: string
  ports?: ComposePort[]
  environment?: ComposeEnvironment
  healthcheck?: unknown
}

export type ComposeFile = {
  services: Record<string, ComposeService>
}

const COMPOSE_FILE_NAMES = [
  'docker-compose.yml',
  'docker-compose.yaml',
  'compose.yml',
  'compose.yaml',
]

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isFile(filePath: string): boolean {
  return existsSync(filePath) && statSync(filePath).isFile()
}

export function findComposeFile(cwd: string, fileName?: string): string | null {
  if (fileName !== undefined) {
    const filePath = resolve(cwd, fileName)

    return isFile(filePath) ? filePath : null
  }

  for (const candidate of COMPOSE_FILE_NAMES) {
    const filePath = resolve(cwd, candidate)

    if (isFile(filePath)) {
      return filePath
    }
  }

  return null
}

export function parseComposeFile(filePath: string): ComposeFile {
  const content = readFileSync(filePath, 'utf8')
  const parsed = load(content)

  if (!isRecord(parsed) || !isRecord(parsed['services'])) {
    throw new Error(`Invalid Docker Compose file '${filePath}': expected a services object.`)
  }

  return {
    services: parsed['services'] as Record<string, ComposeService>,
  }
}

export function findPostgresService(compose: ComposeFile): string | null {
  for (const [serviceName, service] of Object.entries(compose.services)) {
    if (service.image?.toLowerCase().includes('postgres')) {
      return serviceName
    }
  }

  for (const [serviceName, service] of Object.entries(compose.services)) {
    if (service.ports?.some(portExposesPostgres)) {
      return serviceName
    }
  }

  return null
}

function portExposesPostgres(port: ComposePort): boolean {
  if (typeof port === 'string') {
    return port
      .replace(/\/[a-z]+$/i, '')
      .split(':')
      .some((part) => part === '5432')
  }

  return String(port.target ?? '') === '5432' || String(port.published ?? '') === '5432'
}
