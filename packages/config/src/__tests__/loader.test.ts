import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { ConfigLoadError, findConfigFile, loadConfigFile } from '../loader.js'

const tempDirs: string[] = []

describe('config loader', () => {
  afterEach(async () => {
    await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })))
  })

  it('finds mocchi.config.ts in the current directory', async () => {
    const projectDir = await createTempDir()
    const configPath = join(projectDir, 'mocchi.config.ts')

    await writeFile(configPath, 'export default {}')

    expect(findConfigFile(projectDir)).toBe(configPath)
  })

  it('returns null when no config file exists', async () => {
    const projectDir = await createTempDir()

    expect(findConfigFile(projectDir)).toBeNull()
  })

  it('loads a valid TypeScript config file', async () => {
    const projectDir = await createTempDir()
    const configPath = join(projectDir, 'mocchi.config.ts')

    await writeFile(
      configPath,
      `
        export default {
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
      `,
    )

    expect(loadConfigFile(configPath)).toEqual({
      project: 'demo',
      database: {
        provider: 'postgres',
        sourceEnv: 'DATABASE_URL',
        strategy: 'sibling-database',
      },
      migrations: {
        command: 'pnpm db:migrate',
      },
    })
  })

  it('throws a useful error when the config file has invalid syntax', async () => {
    const projectDir = await createTempDir()
    const configPath = join(projectDir, 'mocchi.config.ts')

    await writeFile(configPath, 'export default {')

    expect(() => loadConfigFile(configPath)).toThrow(ConfigLoadError)
    expect(() => loadConfigFile(configPath)).toThrow('check the TypeScript syntax')
  })

  it('throws a useful error when the config file does not exist', async () => {
    const projectDir = await createTempDir()
    const configPath = join(projectDir, 'mocchi.config.ts')

    expect(() => loadConfigFile(configPath)).toThrow(ConfigLoadError)
    expect(() => loadConfigFile(configPath)).toThrow('Config file not found')
  })
})

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), 'mocchi-config-'))

  tempDirs.push(dir)

  return dir
}
