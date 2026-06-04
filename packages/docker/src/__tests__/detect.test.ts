import { execa } from 'execa'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  getDockerVersion,
  isDockerComposeAvailable,
  isDockerDaemonRunning,
  isDockerInstalled,
} from '../detect.js'

vi.mock('execa', () => ({
  execa: vi.fn(),
}))

const execaMock = vi.mocked(execa)
type ExecaResult = Awaited<ReturnType<typeof execa>>

function commandResult(stdout = ''): ExecaResult {
  return { stdout } as ExecaResult
}

describe('Docker detection', () => {
  beforeEach(() => {
    execaMock.mockReset()
  })

  it('detects Docker when docker --version succeeds', async () => {
    execaMock.mockResolvedValueOnce(commandResult('Docker version 27.0.0, build abc123'))

    await expect(isDockerInstalled()).resolves.toBe(true)
    expect(execaMock).toHaveBeenCalledWith('docker', ['--version'])
  })

  it('reports Docker as missing when docker --version fails', async () => {
    execaMock.mockRejectedValueOnce(new Error('command not found'))

    await expect(isDockerInstalled()).resolves.toBe(false)
  })

  it('detects whether the Docker daemon is running', async () => {
    execaMock.mockResolvedValueOnce(commandResult())

    await expect(isDockerDaemonRunning()).resolves.toBe(true)
    expect(execaMock).toHaveBeenCalledWith('docker', ['info'])
  })

  it('reports the Docker daemon as unavailable when docker info fails', async () => {
    execaMock.mockRejectedValueOnce(new Error('daemon unavailable'))

    await expect(isDockerDaemonRunning()).resolves.toBe(false)
  })

  it('parses the Docker version from docker --version output', async () => {
    execaMock.mockResolvedValueOnce(commandResult('Docker version 27.1.2, build d012345'))

    await expect(getDockerVersion()).resolves.toBe('27.1.2')
  })

  it('returns null when Docker version cannot be read', async () => {
    execaMock.mockRejectedValueOnce(new Error('command not found'))

    await expect(getDockerVersion()).resolves.toBeNull()
  })

  it('detects Docker Compose v2', async () => {
    execaMock.mockResolvedValueOnce(commandResult('Docker Compose version v2.29.1'))

    await expect(isDockerComposeAvailable()).resolves.toBe(true)
    expect(execaMock).toHaveBeenCalledWith('docker', ['compose', 'version'])
  })

  it('falls back to docker-compose v1', async () => {
    execaMock
      .mockRejectedValueOnce(new Error('compose v2 unavailable'))
      .mockResolvedValueOnce(commandResult('docker-compose version 1.29.2'))

    await expect(isDockerComposeAvailable()).resolves.toBe(true)
    expect(execaMock).toHaveBeenNthCalledWith(1, 'docker', ['compose', 'version'])
    expect(execaMock).toHaveBeenNthCalledWith(2, 'docker-compose', ['--version'])
  })

  it('reports Docker Compose as unavailable when both commands fail', async () => {
    execaMock
      .mockRejectedValueOnce(new Error('compose v2 unavailable'))
      .mockRejectedValueOnce(new Error('compose v1 unavailable'))

    await expect(isDockerComposeAvailable()).resolves.toBe(false)
  })
})
