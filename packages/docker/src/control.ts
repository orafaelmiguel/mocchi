import { setTimeout as sleep } from 'node:timers/promises'

import { execa } from 'execa'

export type ServiceOptions = {
  composeFile: string
  service: string
  cwd: string
}

export type StartServiceOptions = ServiceOptions

export type WaitHealthyOptions = ServiceOptions & {
  timeoutMs?: number
  intervalMs?: number
}

const DEFAULT_TIMEOUT_MS = 60_000
const DEFAULT_INTERVAL_MS = 1_000

function composeArgs(opts: ServiceOptions, args: string[]): string[] {
  return ['compose', '-f', opts.composeFile, ...args]
}

async function readServiceStatus(opts: ServiceOptions): Promise<string | null> {
  try {
    const result = await execa('docker', composeArgs(opts, ['ps', opts.service]), { cwd: opts.cwd })

    return result.stdout
  } catch {
    return null
  }
}

export async function startService(opts: StartServiceOptions): Promise<void> {
  await execa('docker', composeArgs(opts, ['up', '-d', opts.service]), { cwd: opts.cwd })
}

export async function isServiceRunning(opts: ServiceOptions): Promise<boolean> {
  const status = await readServiceStatus(opts)

  if (status === null) {
    return false
  }

  return statusIndicatesRunning(status)
}

export async function waitForHealthy(opts: WaitHealthyOptions): Promise<void> {
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS
  const intervalMs = opts.intervalMs ?? DEFAULT_INTERVAL_MS
  const deadline = Date.now() + timeoutMs
  let lastStatus: string | null = null

  while (true) {
    lastStatus = await readServiceStatus(opts)

    if (lastStatus !== null && statusIndicatesHealthy(lastStatus)) {
      return
    }

    if (Date.now() >= deadline) {
      break
    }

    const remainingMs = Math.max(deadline - Date.now(), 0)
    await sleep(Math.min(intervalMs, remainingMs))
  }

  const suffix = lastStatus === null ? '' : ` Last status: ${lastStatus.trim()}`
  throw new Error(
    `Timed out waiting for Docker Compose service '${opts.service}' to become healthy after ${timeoutMs}ms.${suffix}`,
  )
}

function statusIndicatesRunning(status: string): boolean {
  const normalized = status.toLowerCase()

  if (/\b(created|dead|exited|paused|removing|restarting)\b/.test(normalized)) {
    return false
  }

  return /\b(running|up)\b/.test(normalized)
}

function statusIndicatesHealthy(status: string): boolean {
  const normalized = status.toLowerCase()

  if (/\bunhealthy\b/.test(normalized)) {
    return false
  }

  return /\bhealthy\b/.test(normalized)
}
