import { execFileSync } from 'node:child_process'

export type NamingOptions = {
  strategy: 'branch' | 'timestamp' | 'manual'
  prefix: string
  manualName?: string
  branchName?: string
}

export class SandboxNameError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SandboxNameError'
  }
}

const MAX_SANDBOX_NAME_LENGTH = 50
const RANDOM_SUFFIX_LENGTH = 4

export function generateSandboxName(opts: NamingOptions): string {
  validatePrefix(opts.prefix)

  const sourceName = resolveSourceName(opts)
  const sanitizedName = sanitizeNamePart(sourceName)
  const suffix = createRandomSuffix()

  return composeSandboxName(opts.prefix, sanitizedName, suffix)
}

function resolveSourceName(opts: NamingOptions): string {
  if (opts.strategy === 'branch') {
    return opts.branchName ?? getCurrentGitBranch()
  }

  if (opts.strategy === 'timestamp') {
    return formatTimestamp(new Date())
  }

  if (!opts.manualName || opts.manualName.trim().length === 0) {
    throw new SandboxNameError(
      'Missing manual sandbox name. Suggestion: provide manualName when using manual strategy.',
    )
  }

  return opts.manualName
}

function getCurrentGitBranch(): string {
  try {
    return String(
      execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }),
    ).trim()
  } catch {
    throw new SandboxNameError(
      'Could not detect current git branch. Suggestion: provide branchName explicitly.',
    )
  }
}

function sanitizeNamePart(value: string): string {
  const sanitized = value
    .trim()
    .toLowerCase()
    .replace(/[\/\s-]+/g, '_')
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')

  return sanitized || 'sandbox'
}

function formatTimestamp(date: Date): string {
  return [
    String(date.getFullYear()),
    pad2(date.getMonth() + 1),
    pad2(date.getDate()),
    '_',
    pad2(date.getHours()),
    pad2(date.getMinutes()),
    pad2(date.getSeconds()),
  ].join('')
}

function composeSandboxName(prefix: string, baseName: string, suffix: string): string {
  const reservedLength = prefix.length + RANDOM_SUFFIX_LENGTH + 2
  const maxBaseLength = MAX_SANDBOX_NAME_LENGTH - reservedLength

  if (maxBaseLength < 1) {
    throw new SandboxNameError(
      `Invalid sandbox prefix '${prefix}'. Suggestion: use a shorter prefix.`,
    )
  }

  const truncatedBase = baseName.slice(0, maxBaseLength).replace(/^_+|_+$/g, '') || 'sandbox'

  return `${prefix}_${truncatedBase}_${suffix}`
}

function validatePrefix(prefix: string): void {
  if (!/^[a-z0-9_]+$/.test(prefix)) {
    throw new SandboxNameError(
      `Invalid sandbox prefix '${prefix}'. Suggestion: use only lowercase letters, numbers and underscores.`,
    )
  }
}

function createRandomSuffix(): string {
  return String(Math.floor(Math.random() * 10000)).padStart(RANDOM_SUFFIX_LENGTH, '0')
}

function pad2(value: number): string {
  return String(value).padStart(2, '0')
}
