import { execa } from 'execa'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { isServiceRunning, startService, waitForHealthy, type ServiceOptions } from '../control.js'

vi.mock('execa', () => ({
  execa: vi.fn(),
}))

const execaMock = vi.mocked(execa)
type ExecaResult = Awaited<ReturnType<typeof execa>>

const serviceOptions: ServiceOptions = {
  composeFile: 'docker-compose.yml',
  service: 'postgres',
  cwd: 'C:/workspace/app',
}

function commandResult(stdout = ''): ExecaResult {
  return { stdout } as ExecaResult
}

describe('Docker Compose control', () => {
  beforeEach(() => {
    execaMock.mockReset()
  })

  it('starts a service with docker compose up', async () => {
    execaMock.mockResolvedValueOnce(commandResult())

    await startService(serviceOptions)

    expect(execaMock).toHaveBeenCalledWith(
      'docker',
      ['compose', '-f', 'docker-compose.yml', 'up', '-d', 'postgres'],
      { cwd: 'C:/workspace/app' },
    )
  })

  it('detects a running service from docker compose ps output', async () => {
    execaMock.mockResolvedValueOnce(commandResult('postgres-1 postgres Up 12 seconds'))

    await expect(isServiceRunning(serviceOptions)).resolves.toBe(true)
    expect(execaMock).toHaveBeenCalledWith(
      'docker',
      ['compose', '-f', 'docker-compose.yml', 'ps', 'postgres'],
      { cwd: 'C:/workspace/app' },
    )
  })

  it('reports a stopped service as not running', async () => {
    execaMock.mockResolvedValueOnce(commandResult('postgres-1 postgres Exited (0) 1 minute ago'))

    await expect(isServiceRunning(serviceOptions)).resolves.toBe(false)
  })

  it('reports command failures as not running', async () => {
    execaMock.mockRejectedValueOnce(new Error('compose unavailable'))

    await expect(isServiceRunning(serviceOptions)).resolves.toBe(false)
  })

  it('waits until the service is healthy', async () => {
    execaMock
      .mockResolvedValueOnce(commandResult('postgres-1 postgres Up 1 second (health: starting)'))
      .mockResolvedValueOnce(commandResult('postgres-1 postgres Up 2 seconds (healthy)'))

    await expect(waitForHealthy({ ...serviceOptions, intervalMs: 0 })).resolves.toBeUndefined()
    expect(execaMock).toHaveBeenCalledTimes(2)
  })

  it('does not treat unhealthy as healthy', async () => {
    execaMock.mockResolvedValueOnce(commandResult('postgres-1 postgres Up 5 seconds (unhealthy)'))

    await expect(
      waitForHealthy({ ...serviceOptions, timeoutMs: 0, intervalMs: 0 }),
    ).rejects.toThrow(/Timed out waiting for Docker Compose service 'postgres'/)
  })
})
