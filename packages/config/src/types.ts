export type DatabaseConfig = {
  provider: 'postgres'
  sourceEnv: string
  strategy: 'sibling-database'
}

export type DockerConfig = {
  composeFile?: string
  service?: string
  autoStart?: boolean
}

export type ResolvedDockerConfig = DockerConfig & {
  autoStart: boolean
}

export type MigrationsConfig = {
  command: string
  timeout?: number
}

export type ResolvedMigrationsConfig = MigrationsConfig & {
  timeout: number
}

export type SeedConfig = {
  command?: string
  optional?: boolean
}

export type ResolvedSeedConfig = SeedConfig & {
  optional: boolean
}

export type SandboxNamingStrategy = 'branch' | 'timestamp' | 'manual'

export type SandboxCleanupStrategy = 'on-exit' | 'never' | 'always'

export type SandboxConfig = {
  name?: SandboxNamingStrategy
  prefix?: string
  cleanup?: SandboxCleanupStrategy
  ttl?: string
}

export type ResolvedSandboxConfig = Required<SandboxConfig>

export type MocchiConfig = {
  project: string
  database: DatabaseConfig
  docker?: DockerConfig
  migrations: MigrationsConfig
  seed?: SeedConfig
  sandbox?: SandboxConfig
}

export type ResolvedMocchiConfig = {
  project: string
  database: DatabaseConfig
  docker?: ResolvedDockerConfig
  migrations: ResolvedMigrationsConfig
  seed?: ResolvedSeedConfig
  sandbox: ResolvedSandboxConfig
}
