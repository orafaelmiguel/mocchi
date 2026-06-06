import { execa } from 'execa'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { waitForPostgresHealthy, type WaitPostgresOptions } from '../health.js'

vi.mock('execa', () => ({
  execa: vi.fn(),
}))

const execaMock = vi.mocked(execa)
type ExecaResult = Awaited<ReturnType<typeof execa>>

const postgresOptions: WaitPostgresOptions = {
  composeFile: 'docker-compose.yml',
  service: 'postgres',
  cwd: 'C:/workspace/app',
}

function commandResult(stdout = ''): ExecaResult {
  return { stdout } as ExecaResult
}

describe('PostgreSQL Docker health', () => {
  beforeEach(() => {
    execaMock.mockReset()
  })

  it('returns when pg_isready succeeds', async () => {
    execaMock.mockResolvedValueOnce(commandResult('accepting connections'))

    await expect(waitForPostgresHealthy(postgresOptions)).resolves.toBeUndefined()
    expect(execaMock).toHaveBeenCalledWith(
      'docker',
      ['compose', '-f', 'docker-compose.yml', 'exec', '-T', 'postgres', 'pg_isready'],
      { cwd: 'C:/workspace/app' },
    )
  })

  it('retries until pg_isready succeeds', async () => {
    execaMock
      .mockRejectedValueOnce(new Error('no response'))
      .mockResolvedValueOnce(commandResult('accepting connections'))

    await expect(
      waitForPostgresHealthy({ ...postgresOptions, intervalMs: 0 }),
    ).resolves.toBeUndefined()
    expect(execaMock).toHaveBeenCalledTimes(2)
  })

  it('throws a clear error when the timeout expires', async () => {
    execaMock.mockRejectedValueOnce(new Error('no response'))

    await expect(
      waitForPostgresHealthy({ ...postgresOptions, timeoutMs: 0, intervalMs: 0 }),
    ).rejects.toThrow(
      "Timed out waiting for PostgreSQL in Docker Compose service 'postgres' to become ready after 0ms. Ensure the service is running and pg_isready is available.",
    )
  })
})
