import { execa } from 'execa'

type CommandResult = {
  stdout: string
}

async function runCommand(command: string, args: string[]): Promise<CommandResult | null> {
  try {
    const result = await execa(command, args)

    return { stdout: result.stdout }
  } catch {
    return null
  }
}

export async function isDockerInstalled(): Promise<boolean> {
  return (await runCommand('docker', ['--version'])) !== null
}

export async function isDockerDaemonRunning(): Promise<boolean> {
  return (await runCommand('docker', ['info'])) !== null
}

export async function getDockerVersion(): Promise<string | null> {
  const result = await runCommand('docker', ['--version'])

  if (result === null) {
    return null
  }

  const version = result.stdout.match(/Docker version\s+([^,\s]+)/i)?.[1]

  return version ?? (result.stdout.trim() || null)
}

export async function isDockerComposeAvailable(): Promise<boolean> {
  if ((await runCommand('docker', ['compose', 'version'])) !== null) {
    return true
  }

  return (await runCommand('docker-compose', ['--version'])) !== null
}
