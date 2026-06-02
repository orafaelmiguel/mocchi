import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  execFileSync: vi.fn(),
}))

vi.mock('node:child_process', () => ({
  execFileSync: mocks.execFileSync,
}))

describe('generateSandboxName', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1234)
    mocks.execFileSync.mockReset()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('generates names from a provided branch name', async () => {
    const { generateSandboxName } = await import('../naming.js')

    expect(
      generateSandboxName({
        strategy: 'branch',
        prefix: 'sbx',
        branchName: 'feature/login-flow',
      }),
    ).toBe('sbx_feature_login_flow_1234')
  })

  it('detects the current git branch when branchName is omitted', async () => {
    const { generateSandboxName } = await import('../naming.js')

    mocks.execFileSync.mockReturnValue('feature/git-branch\n')

    expect(
      generateSandboxName({
        strategy: 'branch',
        prefix: 'sbx',
      }),
    ).toBe('sbx_feature_git_branch_1234')
    expect(mocks.execFileSync).toHaveBeenCalledWith('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
  })

  it('generates names from timestamps', async () => {
    const { generateSandboxName } = await import('../naming.js')

    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 0, 2, 3, 4, 5))

    expect(
      generateSandboxName({
        strategy: 'timestamp',
        prefix: 'sbx',
      }),
    ).toBe('sbx_20260102_030405_1234')
  })

  it('generates names from manual input', async () => {
    const { generateSandboxName } = await import('../naming.js')

    expect(
      generateSandboxName({
        strategy: 'manual',
        prefix: 'sbx',
        manualName: 'My Manual Sandbox',
      }),
    ).toBe('sbx_my_manual_sandbox_1234')
  })

  it('truncates names to 50 characters including prefix and suffix', async () => {
    const { generateSandboxName } = await import('../naming.js')
    const name = generateSandboxName({
      strategy: 'manual',
      prefix: 'sbx',
      manualName: 'a'.repeat(100),
    })

    expect(name).toHaveLength(50)
    expect(name.startsWith('sbx_')).toBe(true)
    expect(name.endsWith('_1234')).toBe(true)
  })

  it('requires manualName for manual strategy', async () => {
    const { generateSandboxName, SandboxNameError } = await import('../naming.js')

    expect(() =>
      generateSandboxName({
        strategy: 'manual',
        prefix: 'sbx',
      }),
    ).toThrow(SandboxNameError)
  })

  it('requires a safe prefix', async () => {
    const { generateSandboxName, SandboxNameError } = await import('../naming.js')

    expect(() =>
      generateSandboxName({
        strategy: 'manual',
        prefix: 'bad-prefix',
        manualName: 'demo',
      }),
    ).toThrow(SandboxNameError)
  })
})
