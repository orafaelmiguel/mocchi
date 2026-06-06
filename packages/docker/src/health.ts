import { setTimeout as sleep } from 'node:timers/promises'

import { execa } from 'execa'

import type { ServiceOptions } from './control.js'

export type WaitPostgresOptions = ServiceOptions & {
  timeoutMs?: number
  intervalMs?: number
}

const DEFAULT_TIMEOUT_MS = 60_000
const DEFAULT_INTERVAL_MS = 1_000

async function isPostgresReady(opts: WaitPostgresOptions): Promise<boolean> {
  try {
    await execa(
      'docker',
      ['compose', '-f', opts.composeFile, 'exec', '-T', opts.service, 'pg_isready'],
      { cwd: opts.cwd },
    )

    return true
  } catch {
    return false
  }
}

export async function waitForPostgresHealthy(opts: WaitPostgresOptions): Promise<void> {
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS
  const intervalMs = opts.intervalMs ?? DEFAULT_INTERVAL_MS
  const deadline = Date.now() + timeoutMs

  while (true) {
    if (await isPostgresReady(opts)) {
      return
    }

    if (Date.now() >= deadline) {
      break
    }

    const remainingMs = Math.max(deadline - Date.now(), 0)
    await sleep(Math.min(intervalMs, remainingMs))
  }

  throw new Error(
    `Timed out waiting for PostgreSQL in Docker Compose service '${opts.service}' to become ready after ${timeoutMs}ms. Ensure the service is running and pg_isready is available.`,
  )
}
