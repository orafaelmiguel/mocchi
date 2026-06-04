import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { findComposeFile, findPostgresService, parseComposeFile } from '../compose.js'

const tempDirs: string[] = []

function createTempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), 'mocchi-compose-'))
  tempDirs.push(dir)

  return dir
}

describe('Docker Compose reader', () => {
  afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('finds docker-compose.yml in the current directory', () => {
    const dir = createTempDir()
    const filePath = join(dir, 'docker-compose.yml')
    writeFileSync(filePath, 'services: {}\n')

    expect(findComposeFile(dir)).toBe(filePath)
  })

  it('uses a configured compose file name when provided', () => {
    const dir = createTempDir()
    mkdirSync(join(dir, 'infra'))
    const filePath = join(dir, 'infra', 'postgres.yml')
    writeFileSync(filePath, 'services: {}\n')

    expect(findComposeFile(dir, 'infra/postgres.yml')).toBe(filePath)
  })

  it('returns null when no compose file exists', () => {
    expect(findComposeFile(createTempDir())).toBeNull()
  })

  it('parses services from a docker-compose.yml file', () => {
    const dir = createTempDir()
    const filePath = join(dir, 'docker-compose.yml')
    writeFileSync(
      filePath,
      [
        'services:',
        '  db:',
        '    image: postgres:16',
        '    ports:',
        '      - "5432:5432"',
        '    environment:',
        '      POSTGRES_PASSWORD: postgres',
        '    healthcheck:',
        '      test: ["CMD", "pg_isready"]',
      ].join('\n'),
    )

    const compose = parseComposeFile(filePath)

    expect(compose.services['db']).toMatchObject({
      image: 'postgres:16',
      ports: ['5432:5432'],
      environment: { POSTGRES_PASSWORD: 'postgres' },
    })
  })

  it('throws when the compose file does not define services', () => {
    const dir = createTempDir()
    const filePath = join(dir, 'docker-compose.yml')
    writeFileSync(filePath, 'version: "3.9"\n')

    expect(() => parseComposeFile(filePath)).toThrow(/expected a services object/)
  })

  it('finds a PostgreSQL service by image name', () => {
    expect(
      findPostgresService({
        services: {
          api: { image: 'node:22' },
          database: { image: 'postgres:16' },
        },
      }),
    ).toBe('database')
  })

  it('finds a PostgreSQL service by exposed port', () => {
    expect(
      findPostgresService({
        services: {
          cache: { image: 'redis:7', ports: ['6379:6379'] },
          database: { image: 'custom-db', ports: [{ published: 15432, target: 5432 }] },
        },
      }),
    ).toBe('database')
  })

  it('returns null when no PostgreSQL service is found', () => {
    expect(
      findPostgresService({
        services: {
          api: { image: 'node:22' },
          cache: { image: 'redis:7', ports: ['6379:6379'] },
        },
      }),
    ).toBeNull()
  })
})
