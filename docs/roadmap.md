# MOCCHI — Roadmap de Desenvolvimento Solo
> Versão: 1.0 | Status: Planning | Autor: Solo Dev

---

## Índice

1. [Fase 0 — Fundação do projeto](#fase-0)
2. [Fase 1 — Infraestrutura do monorepo](#fase-1)
3. [Fase 2 — Pacote `@mocchi/config`](#fase-2)
4. [Fase 3 — Pacote `@mocchi/postgres`](#fase-3)
5. [Fase 4 — Pacote `@mocchi/docker`](#fase-4)
6. [Fase 5 — Pacote `@mocchi/core`](#fase-5)
7. [Fase 6 — Pacote `@mocchi/cli` — Scaffold](#fase-6)
8. [Fase 7 — Comando `mocchi doctor`](#fase-7)
9. [Fase 8 — Comando `mocchi init`](#fase-8)
10. [Fase 9 — Comando `mocchi ready`](#fase-9)
11. [Fase 10 — Comando `mocchi down`](#fase-10)
12. [Fase 11 — Comando `mocchi run`](#fase-11)
13. [Fase 12 — Comando `mocchi reset`](#fase-12)
14. [Fase 13 — Comando `mocchi shell`](#fase-13)
15. [Fase 14 — v0.1 Release — Hardening e qualidade](#fase-14)
16. [Fase 15 — Comando `mocchi sql`](#fase-15)
17. [Fase 16 — Sistema de scenarios](#fase-16)
18. [Fase 17 — Comando `mocchi verify`](#fase-17)
19. [Fase 18 — v0.2 Release — Hardening e qualidade](#fase-18)
20. [Fase 19 — Comando `mocchi migrate:test`](#fase-19)
21. [Fase 20 — Comando `mocchi migrate:report`](#fase-20)
22. [Fase 21 — v0.3 Release — Hardening e qualidade](#fase-21)
23. [Fase 22 — Template database cache](#fase-22)
24. [Fase 23 — Warm mode e snapshot](#fase-23)
25. [Fase 24 — v0.4 Release — Hardening e qualidade](#fase-24)
26. [Fase 25 — Modo CI](#fase-25)
27. [Fase 26 — v0.5 Release — Hardening e qualidade](#fase-26)
28. [Fase 27 — Documentação pública](#fase-27)
29. [Fase 28 — Exemplo real: NestJS + Prisma](#fase-28)
30. [Fase 29 — Open source launch](#fase-29)

---

## Legenda de status

- `[ ]` — Não iniciado
- `[~]` — Em progresso
- `[x]` — Concluído
- `[!]` — Bloqueado ou revisão necessária

---

## Convenções do roadmap

- Cada **Fase** representa um bloco coeso de trabalho com objetivo claro.
- Cada **Tarefa** (prefixo `T`) é uma unidade de trabalho que pode ser commitada sozinha.
- Cada **Subtarefa** (prefixo `S`) é uma ação atômica dentro de uma tarefa.
- Fases dentro do mesmo release (v0.x) são sequenciais e devem ser feitas nessa ordem.
- Fases de hardening (14, 18, 21, 24, 26) são obrigatórias antes de publicar qualquer versão.

---

---

# FASE 0 — Fundação do projeto {#fase-0}

**Objetivo:** Definir tudo antes de tocar em código. Sem uma base sólida aqui, o resto do projeto vira dívida.

**Duração estimada:** 2–4 horas

---

## T0.1 — Definir estrutura de repositório

- [x] S0.1.1 — Criar repositório no GitHub com nome `mocchi`
- [x] S0.1.2 — Definir visibilidade inicial como pública (open source desde o começo)
- [x] S0.1.3 — Adicionar descrição: `Disposable PostgreSQL sandboxes for dangerous migrations, queries and integration tests.`
- [x] S0.1.4 — Adicionar topics no GitHub: `postgresql`, `cli`, `developer-tools`, `testing`, `backend`, `database`, `migrations`, `nodejs`, `typescript`
- [x] S0.1.5 — Configurar branch `main` como branch padrão
- [x] S0.1.6 — Habilitar Issues no repositório
- [x] S0.1.7 — Habilitar Discussions no repositório
- [x] S0.1.8 — Habilitar Projects (GitHub Projects) para tracking do roadmap

---

## T0.2 — Definir arquivos raiz iniciais

- [x] S0.2.1 — Criar `README.md` mínimo com nome, tagline e status `🚧 Under active development`
- [x] S0.2.2 — Criar `LICENSE` — escolher MIT (melhor para adoção open source)
- [x] S0.2.3 — Criar `.gitignore` cobrindo: `node_modules`, `dist`, `.env*`, `.mocchi*`, `*.js.map`, `coverage`
- [x] S0.2.4 — Criar `CONTRIBUTING.md` inicial (pode ser esqueleto por enquanto)
- [x] S0.2.5 — Criar `CHANGELOG.md` inicial com seção `[Unreleased]`
- [x] S0.2.6 — Criar `CODE_OF_CONDUCT.md` (copiar Contributor Covenant)
- [x] S0.2.7 — Criar pasta `docs/` vazia com `.gitkeep`

---

## T0.3 — Definir convenções de commit

- [x] S0.3.1 — Escolher Conventional Commits como padrão (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`)
- [x] S0.3.2 — Documentar convenção em `CONTRIBUTING.md`
- [x] S0.3.3 — Criar arquivo `.commitlintrc.json` com regras básicas (instalar depois na Fase 1)

---

## T0.4 — Definir strategy de versioning

- [x] S0.4.1 — Adotar SemVer: `0.x.y` durante desenvolvimento, `1.0.0` após estabilização
- [x] S0.4.2 — Definir que `0.x` implica breaking changes podem acontecer a qualquer momento
- [x] S0.4.3 — Documentar estratégia em `CHANGELOG.md`

---

## T0.5 — Criar issues iniciais no GitHub

- [x] S0.5.1 — Criar issue `[META] v0.1 — Core local` com checklist das entregas
- [x] S0.5.2 — Criar issue `[META] v0.2 — Verification harness` com checklist
- [x] S0.5.3 — Criar issue `[META] v0.3 — Migration safety` com checklist
- [x] S0.5.4 — Criar issue `[META] v0.4 — Performance` com checklist
- [x] S0.5.5 — Criar issue `[META] v0.5 — CI mode` com checklist
- [x] S0.5.6 — Criar labels no GitHub: `bug`, `enhancement`, `documentation`, `good first issue`, `help wanted`, `breaking change`, `security`

---

---

# FASE 1 — Infraestrutura do monorepo {#fase-1}

**Objetivo:** Ter um monorepo TypeScript funcional com pnpm workspaces, build, lint e teste configurados. Nenhum código de produto aqui — apenas tooling.

**Duração estimada:** 4–6 horas

**Pré-requisitos:** Node.js 22.13+ (24 recomendado), pnpm 11.5+ instalados na máquina

---

## T1.1 — Inicializar monorepo com pnpm

- [x] S1.1.1 — Rodar `pnpm init` na raiz
- [x] S1.1.2 — Editar `package.json` raiz: adicionar `"private": true`
- [x] S1.1.3 — Criar `pnpm-workspace.yaml`:
  ```yaml
  packages:
    - 'packages/*'
    - 'examples/*'
  ```
- [x] S1.1.4 — Definir `engines` no `package.json` raiz: `{ "node": ">=22.13.0", "pnpm": ">=11.5.0" }`
- [x] S1.1.5 — Criar arquivo `.nvmrc` com `24` para garantir versão correta
- [x] S1.1.6 — Criar `.node-version` com `24` (alternativa ao nvmrc)

---

## T1.2 — Criar estrutura de pastas do monorepo

- [x] S1.2.1 — Criar `packages/cli/` com `package.json` mínimo
- [x] S1.2.2 — Criar `packages/core/` com `package.json` mínimo
- [x] S1.2.3 — Criar `packages/postgres/` com `package.json` mínimo
- [x] S1.2.4 — Criar `packages/docker/` com `package.json` mínimo
- [x] S1.2.5 — Criar `packages/config/` com `package.json` mínimo
- [x] S1.2.6 — Criar `examples/` com `.gitkeep`
- [x] S1.2.7 — Criar `docs/` com `.gitkeep`

---

## T1.3 — Configurar TypeScript

- [x] S1.3.1 — Instalar TypeScript na raiz: `pnpm add -Dw typescript`
- [x] S1.3.2 — Criar `tsconfig.base.json` na raiz com configuração compartilhada:
  ```json
  {
    "compilerOptions": {
      "target": "ES2022",
      "module": "NodeNext",
      "moduleResolution": "NodeNext",
      "lib": ["ES2022"],
      "strict": true,
      "exactOptionalPropertyTypes": true,
      "noUncheckedIndexedAccess": true,
      "declaration": true,
      "declarationMap": true,
      "sourceMap": true,
      "skipLibCheck": true,
      "esModuleInterop": true
    }
  }
  ```
- [x] S1.3.3 — Criar `tsconfig.json` em cada pacote herdando de `../../tsconfig.base.json`
- [x] S1.3.4 — Configurar `outDir: "dist"` e `rootDir: "src"` em cada pacote
- [x] S1.3.5 — Adicionar `include: ["src"]` em cada `tsconfig.json` de pacote
- [x] S1.3.6 — Testar compilação em um pacote vazio com arquivo `src/index.ts` placeholder

---

## T1.4 — Configurar build com tsup

- [x] S1.4.1 — Instalar tsup em cada pacote: `pnpm add -D tsup` (rodar de dentro de cada pasta ou usar filter)
- [x] S1.4.2 — Criar `tsup.config.ts` em cada pacote:
  ```ts
  import { defineConfig } from 'tsup'
  export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
  })
  ```
- [x] S1.4.3 — Adicionar script `"build": "tsup"` no `package.json` de cada pacote
- [x] S1.4.4 — Adicionar script `"build": "pnpm -r build"` no `package.json` raiz
- [x] S1.4.5 — Testar build completo do monorepo: `pnpm build`
- [x] S1.4.6 — Verificar que `dist/` é gerado corretamente em cada pacote
- [x] S1.4.7 — Adicionar `dist/` ao `.gitignore`

---

## T1.5 — Configurar ESLint

- [x] S1.5.1 — Instalar dependências: `pnpm add -Dw eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier`
- [x] S1.5.2 — Criar `eslint.config.mjs` na raiz (flat config do ESLint 9):
  ```js
  import tsPlugin from '@typescript-eslint/eslint-plugin'
  import tsParser from '@typescript-eslint/parser'
  
  export default [
    {
      files: ['packages/*/src/**/*.ts'],
      plugins: { '@typescript-eslint': tsPlugin },
      languageOptions: { parser: tsParser },
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
      }
    }
  ]
  ```
- [x] S1.5.3 — Adicionar script `"lint": "eslint ."` na raiz
- [x] S1.5.4 — Adicionar script `"lint:fix": "eslint . --fix"` na raiz
- [x] S1.5.5 — Testar lint: `pnpm lint`
- [x] S1.5.6 — Configurar ignores no `eslint.config.mjs` para `dist/`, `node_modules/`, `coverage/`

---

## T1.6 — Configurar Prettier

- [x] S1.6.1 — Instalar: `pnpm add -Dw prettier`
- [x] S1.6.2 — Criar `.prettierrc` na raiz:
  ```json
  {
    "semi": false,
    "singleQuote": true,
    "trailingComma": "all",
    "printWidth": 100,
    "tabWidth": 2
  }
  ```
- [x] S1.6.3 — Criar `.prettierignore` cobrindo `dist/`, `node_modules/`, `*.md`
- [x] S1.6.4 — Adicionar script `"format": "prettier --write ."` na raiz
- [x] S1.6.5 — Adicionar script `"format:check": "prettier --check ."` na raiz
- [x] S1.6.6 — Testar: `pnpm format`

---

## T1.7 — Configurar Vitest

- [x] S1.7.1 — Instalar: `pnpm add -Dw vitest @vitest/coverage-v8`
- [x] S1.7.2 — Criar `vitest.config.ts` na raiz:
  ```ts
  import { defineConfig } from 'vitest/config'
  export default defineConfig({
    test: {
      globals: true,
      environment: 'node',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov'],
      },
    },
  })
  ```
- [x] S1.7.3 — Adicionar script `"test": "vitest run"` em cada pacote
- [x] S1.7.4 — Adicionar script `"test:watch": "vitest"` em cada pacote
- [x] S1.7.5 — Adicionar script `"test": "pnpm -r test"` na raiz
- [x] S1.7.6 — Criar pasta `src/__tests__/` em cada pacote com arquivo `.gitkeep`
- [x] S1.7.7 — Testar com arquivo de teste placeholder: `pnpm test`

---

## T1.8 — Configurar Git hooks com Lefthook

- [x] S1.8.1 — Instalar: `pnpm add -Dw lefthook`
- [x] S1.8.2 — Rodar `pnpm lefthook install`
- [x] S1.8.3 — Criar `lefthook.yml`:
  ```yaml
  pre-commit:
    commands:
      lint:
        run: pnpm lint
      format-check:
        run: pnpm format:check
  commit-msg:
    commands:
      commitlint:
        run: pnpm commitlint --edit {1}
  ```
- [x] S1.8.4 — Instalar commitlint: `pnpm add -Dw @commitlint/cli @commitlint/config-conventional`
- [x] S1.8.5 — Criar `commitlint.config.cjs`:
  ```js
  module.exports = { extends: ['@commitlint/config-conventional'] }
  ```
- [x] S1.8.6 — Testar hook com commit mal formatado (deve rejeitar)
- [x] S1.8.7 — Testar hook com commit bem formatado (deve aceitar)

---

## T1.9 — Configurar GitHub Actions CI

- [x] S1.9.1 — Criar pasta `.github/workflows/`
- [x] S1.9.2 — Criar `.github/workflows/ci.yml`:
  ```yaml
  name: CI
  on:
    push:
      branches: [main, develop]
    pull_request:
      branches: [main, develop]
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: pnpm/action-setup@v4
          with:
            version: 11.5.0
        - uses: actions/setup-node@v4
          with:
            node-version-file: '.node-version'
            cache: 'pnpm'
        - run: pnpm install --frozen-lockfile
        - run: pnpm build
        - run: pnpm lint
        - run: pnpm format:check
        - run: pnpm test
  ```
- [!] S1.9.3 — Fazer push e verificar que CI passa no GitHub
- [x] S1.9.4 — Adicionar badge de CI no `README.md`

---

## T1.10 — Configurar inter-dependências de pacotes

- [x] S1.10.1 — Adicionar `@mocchi/config` como dependência de `@mocchi/core` no `package.json`
- [x] S1.10.2 — Adicionar `@mocchi/postgres` como dependência de `@mocchi/core`
- [x] S1.10.3 — Adicionar `@mocchi/docker` como dependência de `@mocchi/core`
- [x] S1.10.4 — Adicionar `@mocchi/core` como dependência de `@mocchi/cli`
- [x] S1.10.5 — Rodar `pnpm install` para linkar pacotes locais via workspace
- [x] S1.10.6 — Verificar que `node_modules/@mocchi/core` aponta para `packages/core` (symlink)
- [x] S1.10.7 — Configurar `exports` no `package.json` de cada pacote:
  ```json
  {
    "exports": {
      ".": {
        "import": "./dist/index.js",
        "require": "./dist/index.cjs",
        "types": "./dist/index.d.ts"
      }
    }
  }
  ```

---

## T1.11 — Commit e tag do scaffold

- [x] S1.11.1 — Revisar todos os arquivos criados
- [x] S1.11.2 — Rodar `pnpm build && pnpm lint && pnpm test` e confirmar tudo verde
- [x] S1.11.3 — Commit: `chore: initialize monorepo with pnpm workspaces`
- [x] S1.11.4 — Tag: não fazer tag ainda (sem código de produto)

---

---

# FASE 2 — Pacote `@mocchi/config` {#fase-2}

**Objetivo:** Implementar o sistema de carregamento de configuração. Todo o projeto depende disso. Deve ser feito primeiro porque todos os outros pacotes vão importar de `@mocchi/config`.

**Duração estimada:** 3–5 horas

---

## T2.1 — Definir os tipos de configuração

- [x] S2.1.1 — Criar `packages/config/src/types.ts`
- [x] S2.1.2 — Definir tipo `DatabaseConfig`:
  ```ts
  export type DatabaseConfig = {
    provider: 'postgres'
    sourceEnv: string
    strategy: 'sibling-database'
  }
  ```
- [x] S2.1.3 — Definir tipo `DockerConfig`:
  ```ts
  export type DockerConfig = {
    composeFile?: string
    service?: string
    autoStart?: boolean
  }
  ```
- [x] S2.1.4 — Definir tipo `MigrationsConfig`:
  ```ts
  export type MigrationsConfig = {
    command: string
    timeout?: number
  }
  ```
- [x] S2.1.5 — Definir tipo `SeedConfig`:
  ```ts
  export type SeedConfig = {
    command?: string
    optional?: boolean
  }
  ```
- [x] S2.1.6 — Definir tipo `SandboxNamingStrategy`:
  ```ts
  export type SandboxNamingStrategy = 'branch' | 'timestamp' | 'manual'
  ```
- [x] S2.1.7 — Definir tipo `SandboxCleanupStrategy`:
  ```ts
  export type SandboxCleanupStrategy = 'on-exit' | 'never' | 'always'
  ```
- [x] S2.1.8 — Definir tipo `SandboxConfig`:
  ```ts
  export type SandboxConfig = {
    name?: SandboxNamingStrategy
    prefix?: string
    cleanup?: SandboxCleanupStrategy
    ttl?: string
  }
  ```
- [x] S2.1.9 — Definir tipo principal `MocchiConfig`:
  ```ts
  export type MocchiConfig = {
    project: string
    database: DatabaseConfig
    docker?: DockerConfig
    migrations: MigrationsConfig
    seed?: SeedConfig
    sandbox?: SandboxConfig
  }
  ```
- [x] S2.1.10 — Definir tipo `ResolvedMocchiConfig` com todos os campos opcionais preenchidos com defaults

---

## T2.2 — Implementar a função `defineMocchiConfig`

- [x] S2.2.1 — Criar `packages/config/src/define.ts`
- [x] S2.2.2 — Implementar função que apenas retorna o objeto (type safety helper, padrão Vite):
  ```ts
  export function defineMocchiConfig(config: MocchiConfig): MocchiConfig {
    return config
  }
  ```
- [x] S2.2.3 — Adicionar comentário JSDoc explicando o propósito

---

## T2.3 — Implementar o resolver de defaults

- [x] S2.3.1 — Criar `packages/config/src/defaults.ts`
- [x] S2.3.2 — Definir `DEFAULT_SANDBOX_CONFIG`:
  ```ts
  export const DEFAULT_SANDBOX_CONFIG = {
    name: 'branch' as const,
    prefix: 'sbx',
    cleanup: 'on-exit' as const,
    ttl: '2h',
  }
  ```
- [x] S2.3.3 — Implementar função `resolveDefaults(config: MocchiConfig): ResolvedMocchiConfig`
- [x] S2.3.4 — Mesclar `sandbox` do usuário com `DEFAULT_SANDBOX_CONFIG`
- [x] S2.3.5 — Resolver `docker.autoStart` para `true` se não definido
- [x] S2.3.6 — Resolver `seed.optional` para `true` se não definido
- [x] S2.3.7 — Resolver `migrations.timeout` para `120000` (2 min) se não definido

---

## T2.4 — Implementar o loader de configuração

- [x] S2.4.1 — Instalar dependência: `pnpm add jiti` no pacote config
- [x] S2.4.2 — Criar `packages/config/src/loader.ts`
- [x] S2.4.3 — Implementar função `findConfigFile(cwd: string): string | null`:
  - Procurar por `mocchi.config.ts` no diretório atual
  - Subir até a raiz se não encontrar (limitar a 5 níveis)
  - Retornar `null` se não encontrar
- [x] S2.4.4 — Implementar função `loadConfigFile(filePath: string): MocchiConfig`:
  - Usar `jiti` para carregar o arquivo TypeScript sem compilação
  - Lidar com `export default` e `module.exports`
  - Validar que o retorno é um objeto
- [x] S2.4.5 — Tratar erro quando arquivo não existe
- [x] S2.4.6 — Tratar erro quando arquivo tem sintaxe inválida
- [x] S2.4.7 — Tratar erro quando arquivo exporta tipo errado

---

## T2.5 — Implementar validação de configuração

- [x] S2.5.1 — Criar `packages/config/src/validator.ts`
- [x] S2.5.2 — Implementar `validateConfig(config: unknown): MocchiConfig`:
  - Verificar que `project` é string não vazia
  - Verificar que `database.provider` é `'postgres'`
  - Verificar que `database.sourceEnv` é string não vazia
  - Verificar que `database.strategy` é `'sibling-database'`
  - Verificar que `migrations.command` é string não vazia
- [x] S2.5.3 — Criar classe de erro `ConfigValidationError` com campo `field` e `message`
- [x] S2.5.4 — Lançar `ConfigValidationError` com mensagem descritiva para cada falha
- [x] S2.5.5 — Adicionar sugestão de correção em cada mensagem de erro

---

## T2.6 — Implementar resolver de variáveis de ambiente

- [x] S2.6.1 — Criar `packages/config/src/env.ts`
- [x] S2.6.2 — Implementar função `resolveEnvVars(config: ResolvedMocchiConfig, env: NodeJS.ProcessEnv): ResolvedMocchiConfig`
- [x] S2.6.3 — Ler `DATABASE_URL` do env com base em `database.sourceEnv`
- [x] S2.6.4 — Lançar erro descritivo se variável de ambiente não existir
- [x] S2.6.5 — Nunca logar o valor completo da `DATABASE_URL` (segurança — pode ter senha)

---

## T2.7 — Implementar API pública do pacote

- [x] S2.7.1 — Criar `packages/config/src/index.ts`
- [x] S2.7.2 — Exportar: `defineMocchiConfig`, `MocchiConfig`, `ResolvedMocchiConfig`, `loadConfigFile`, `findConfigFile`, `validateConfig`, `resolveDefaults`, `ConfigValidationError`
- [x] S2.7.3 — Verificar que nenhum tipo interno vaza para a API pública

---

## T2.8 — Testes do pacote config

- [x] S2.8.1 — Criar `packages/config/src/__tests__/loader.test.ts`
- [x] S2.8.2 — Testar: encontra `mocchi.config.ts` no diretório atual
- [x] S2.8.3 — Testar: retorna `null` quando arquivo não existe
- [x] S2.8.4 — Testar: lança erro com mensagem útil quando arquivo tem sintaxe inválida
- [x] S2.8.5 — Criar `packages/config/src/__tests__/validator.test.ts`
- [x] S2.8.6 — Testar: aceita config válida
- [x] S2.8.7 — Testar: rejeita config sem `project`
- [x] S2.8.8 — Testar: rejeita config sem `migrations.command`
- [x] S2.8.9 — Testar: mensagem de erro inclui nome do campo e sugestão
- [x] S2.8.10 — Criar `packages/config/src/__tests__/defaults.test.ts`
- [x] S2.8.11 — Testar: resolve prefix padrão `sbx`
- [x] S2.8.12 — Testar: resolve cleanup padrão `on-exit`
- [x] S2.8.13 — Testar: respeita override do usuário

---

## T2.9 — Build e commit do pacote config

- [x] S2.9.1 — Rodar `pnpm build` no pacote config
- [x] S2.9.2 — Rodar `pnpm test` no pacote config
- [x] S2.9.3 — Rodar `pnpm lint` na raiz
- [x] S2.9.4 — Commit: `feat(config): implement config loading and validation`

---

---

# FASE 3 — Pacote `@mocchi/postgres` {#fase-3}

**Objetivo:** Implementar todas as operações com PostgreSQL: conectar, criar banco, dropar banco, executar SQL, capturar SQLSTATE. Essa é a camada mais sensível do projeto.

**Duração estimada:** 6–8 horas

---

## T3.1 — Instalar dependências

- [x] S3.1.1 — Instalar driver: `pnpm add postgres` (driver `postgres` / `porsager/postgres` — sql template tag, sem ORM)
- [x] S3.1.2 — Instalar types de Node.js: `pnpm add -D @types/node`
- [x] S3.1.3 — Verificar que `postgres` funciona em ESM e CJS

---

## T3.2 — Implementar o parser de DATABASE_URL

- [x] S3.2.1 — Criar `packages/postgres/src/url.ts`
- [x] S3.2.2 — Definir tipo `ParsedDatabaseUrl`:
  ```ts
  export type ParsedDatabaseUrl = {
    host: string
    port: number
    database: string
    user: string
    password: string
    ssl: boolean
    raw: string // sem senha no log
  }
  ```
- [x] S3.2.3 — Implementar `parseDatabaseUrl(url: string): ParsedDatabaseUrl`
- [x] S3.2.4 — Usar `URL` global do Node.js para parsear (não regex)
- [x] S3.2.5 — Tratar `ssl=true` e `sslmode=require` nos search params
- [x] S3.2.6 — Garantir que `password` nunca apareça em logs (criar getter `safeString` sem senha)
- [x] S3.2.7 — Tratar URL malformada com erro descritivo
- [x] S3.2.8 — Testar: URL simples `postgres://user:pass@localhost:5432/mydb`
- [x] S3.2.9 — Testar: URL com SSL
- [x] S3.2.10 — Testar: URL malformada lança erro

---

## T3.3 — Implementar o cliente PostgreSQL

- [x] S3.3.1 — Criar `packages/postgres/src/client.ts`
- [x] S3.3.2 — Definir tipo `PostgresClient`:
  ```ts
  export type PostgresClient = {
    connect(): Promise<void>
    end(): Promise<void>
    query(sql: string): Promise<QueryResult>
    queryRaw(sql: string): Promise<RawQueryResult>
  }
  ```
- [x] S3.3.3 — Implementar `createClient(url: string): PostgresClient` usando `postgres` package
- [x] S3.3.4 — Configurar `max: 1` (conexão única — CLI não precisa de pool)
- [x] S3.3.5 — Configurar `connect_timeout: 10` (10 segundos)
- [x] S3.3.6 — Implementar `connect()` — testar conexão com `SELECT 1`
- [x] S3.3.7 — Implementar `end()` — fechar todas as conexões
- [x] S3.3.8 — Tratar erro de conexão recusada com mensagem contextual
- [x] S3.3.9 — Tratar erro de autenticação (senha errada)
- [x] S3.3.10 — Tratar erro de timeout

---

## T3.4 — Implementar tipo `QueryResult` e captura de SQLSTATE

- [x] S3.4.1 — Criar `packages/postgres/src/result.ts`
- [x] S3.4.2 — Definir tipo `QueryResult`:
  ```ts
  export type QueryResult = 
    | { success: true; rows: Record<string, unknown>[]; rowCount: number }
    | { success: false; error: PostgresQueryError }
  ```
- [x] S3.4.3 — Definir tipo `PostgresQueryError`:
  ```ts
  export type PostgresQueryError = {
    message: string
    sqlstate: string       // código de 5 chars: ex "42501"
    detail?: string
    hint?: string
    position?: string
  }
  ```
- [x] S3.4.4 — Implementar função `wrapQuery(fn: () => Promise<unknown>): Promise<QueryResult>`
- [x] S3.4.5 — Capturar erros do driver postgres e extrair `code` (SQLSTATE) do objeto de erro
- [x] S3.4.6 — Mapear erro do driver para `PostgresQueryError` com tipo correto
- [x] S3.4.7 — Garantir que erros desconhecidos também são capturados

---

## T3.5 — Implementar operações de banco

- [x] S3.5.1 — Criar `packages/postgres/src/operations.ts`
- [x] S3.5.2 — Implementar `listDatabases(client: PostgresClient): Promise<string[]>`:
  - Conectar no banco `postgres` (default)
  - `SELECT datname FROM pg_database WHERE datistemplate = false`
- [x] S3.5.3 — Implementar `createDatabase(client: PostgresClient, name: string): Promise<void>`:
  - Usar `CREATE DATABASE` com `IF NOT EXISTS` style (na prática: verificar antes)
  - Nunca sanitizar com string interpolation direta — usar validação de nome de banco
- [x] S3.5.4 — Implementar `databaseExists(client: PostgresClient, name: string): Promise<boolean>`
- [x] S3.5.5 — Implementar `dropDatabase(client: PostgresClient, name: string): Promise<void>`:
  - Terminar conexões ativas antes de dropar (pg_terminate_backend)
  - `DROP DATABASE IF EXISTS "name"`
- [x] S3.5.6 — Implementar validação de nome de banco:
  ```ts
  function validateDatabaseName(name: string): void {
    if (!name.match(/^[a-z0-9_]+$/)) throw new Error(...)
    if (name.length > 63) throw new Error(...)
  }
  ```
- [x] S3.5.7 — Testar: criar banco, verificar existência, dropar banco

---

## T3.6 — Implementar gerador de nome de sandbox

- [x] S3.6.1 — Criar `packages/postgres/src/naming.ts`
- [x] S3.6.2 — Implementar `generateSandboxName(opts: NamingOptions): string`:
  ```ts
  type NamingOptions = {
    strategy: 'branch' | 'timestamp' | 'manual'
    prefix: string
    manualName?: string
    branchName?: string
  }
  ```
- [x] S3.6.3 — Strategy `branch`: detectar branch git atual via `git rev-parse --abbrev-ref HEAD`
- [x] S3.6.4 — Sanitizar nome de branch: trocar `/`, `-`, espaços por `_`
- [x] S3.6.5 — Truncar para max 50 chars (considerando o prefixo + sufixo numérico)
- [x] S3.6.6 — Adicionar sufixo de 4 dígitos aleatórios para evitar colisão
- [x] S3.6.7 — Strategy `timestamp`: formato `YYYYMMDD_HHMMSS`
- [x] S3.6.8 — Strategy `manual`: usar `manualName` sanitizado com sufixo
- [x] S3.6.9 — Garantir que nome resultante começa com o `prefix`
- [x] S3.6.10 — Testar todas as strategies

---

## T3.7 — Implementar gerador de sandbox DATABASE_URL

- [x] S3.7.1 — Criar `packages/postgres/src/sandbox-url.ts`
- [x] S3.7.2 — Implementar `generateSandboxUrl(baseUrl: ParsedDatabaseUrl, sandboxName: string): string`
- [x] S3.7.3 — Substituir apenas o `database` na URL original
- [x] S3.7.4 — Preservar host, porta, usuário, senha, SSL exatamente como no original
- [x] S3.7.5 — Testar com URL simples e URL com parâmetros

---

## T3.8 — Implementar executor de SQL

- [x] S3.8.1 — Criar `packages/postgres/src/executor.ts`
- [x] S3.8.2 — Implementar `executeSqlString(client: PostgresClient, sql: string): Promise<QueryResult>`
- [x] S3.8.3 — Implementar `executeSqlFile(client: PostgresClient, filePath: string): Promise<QueryResult>`
- [x] S3.8.4 — Ler arquivo com `fs.readFile` antes de executar
- [x] S3.8.5 — Tratar arquivo não encontrado com erro amigável
- [x] S3.8.6 — Tratar arquivo vazio (retornar sucesso sem rows)

---

## T3.9 — Implementar proteções de segurança

- [x] S3.9.1 — Criar `packages/postgres/src/guards.ts`
- [x] S3.9.2 — Implementar `assertSandboxPrefix(name: string, prefix: string): void`:
  - Lança erro se `name` não começa com `prefix + '_'`
  - Mensagem: `"Refusing to drop '${name}': does not match sandbox prefix '${prefix}_'"`
- [x] S3.9.3 — Implementar `assertNotOriginalDatabase(sandboxName: string, originalName: string): void`:
  - Lança erro se os nomes são iguais
- [x] S3.9.4 — Implementar `assertNotProductionHost(host: string): void`:
  - Verificar se host contém strings suspeitas: `production`, `prod`, `prd`, `live`
  - Aviso forte (não bloqueia — pode ser falso positivo)
- [x] S3.9.5 — Implementar `assertNotProductionEnv(env: NodeJS.ProcessEnv): void`:
  - Bloquear se `NODE_ENV` contém `production`, `prod`, `prd`
- [x] S3.9.6 — Testar cada proteção individualmente

---

## T3.10 — Verificador de permissões

- [x] S3.10.1 — Criar `packages/postgres/src/permissions.ts`
- [x] S3.10.2 — Implementar `checkCanCreateDatabase(client: PostgresClient): Promise<boolean>`:
  - Tentar criar um banco temporário com nome `sbx_permission_check_*`
  - Dropar imediatamente se criou com sucesso
  - Retornar `true` se ok, `false` se sem permissão
- [x] S3.10.3 — Implementar `checkCanConnect(url: string): Promise<boolean>`
- [x] S3.10.4 — Não lançar exceção — retornar boolean (quem lança é quem chama)

---

## T3.11 — API pública do pacote postgres

- [x] S3.11.1 — Criar `packages/postgres/src/index.ts`
- [x] S3.11.2 — Exportar todos os tipos e funções públicas
- [x] S3.11.3 — Garantir que tipos internos (como detalhes do driver) não vazam

---

## T3.12 — Testes do pacote postgres

> Nota: testes desta fase podem exigir um PostgreSQL rodando localmente. Configurar com `MOCCHI_TEST_DATABASE_URL`.

- [x] S3.12.1 — Criar `packages/postgres/src/__tests__/url.test.ts` com testes de parsing
- [x] S3.12.2 — Criar `packages/postgres/src/__tests__/naming.test.ts` com testes das strategies
- [x] S3.12.3 — Criar `packages/postgres/src/__tests__/guards.test.ts` com testes das proteções
- [x] S3.12.4 — Criar `packages/postgres/src/__tests__/operations.integration.test.ts` (marcados como integration)
- [x] S3.12.5 — Configurar skip de integration tests quando `MOCCHI_TEST_DATABASE_URL` não está definida
- [x] S3.12.6 — Testar criação e drop de database no integration test

---

## T3.13 — Build e commit do pacote postgres

- [x] S3.13.1 — Rodar `pnpm build` no pacote postgres
- [x] S3.13.2 — Rodar `pnpm test` (unit tests)
- [x] S3.13.3 — Commit: `feat(postgres): implement postgres adapter with safety guards`

---

---

# FASE 4 — Pacote `@mocchi/docker` {#fase-4}

**Objetivo:** Implementar detecção e controle básico do Docker. Não é um wrapper completo — apenas o necessário para o Mocchi funcionar.

**Duração estimada:** 3–4 horas

---

## T4.1 — Instalar dependências

- [x] S4.1.1 — Instalar `execa` no pacote docker: `pnpm add execa`
- [x] S4.1.2 — Verificar que `execa` funciona com ESM (versão 8+ é ESM-first)

---

## T4.2 — Implementar detecção de Docker

- [x] S4.2.1 — Criar `packages/docker/src/detect.ts`
- [x] S4.2.2 — Implementar `isDockerInstalled(): Promise<boolean>`:
  - Rodar `docker --version`
  - Retorna `true` se exit code 0
- [x] S4.2.3 — Implementar `isDockerDaemonRunning(): Promise<boolean>`:
  - Rodar `docker info`
  - Retorna `true` se exit code 0
- [x] S4.2.4 — Implementar `getDockerVersion(): Promise<string | null>`:
  - Parsear output de `docker --version`
  - Retorna `null` se docker não instalado
- [x] S4.2.5 — Implementar `isDockerComposeAvailable(): Promise<boolean>`:
  - Tentar `docker compose version` (v2)
  - Fallback para `docker-compose --version` (v1)
  - Retorna `true` se algum funcionar

---

## T4.3 — Implementar leitor de docker-compose.yml

- [x] S4.3.1 — Criar `packages/docker/src/compose.ts`
- [x] S4.3.2 — Instalar `js-yaml` para parsear YAML: `pnpm add js-yaml` e `@types/js-yaml`
- [x] S4.3.3 — Implementar `findComposeFile(cwd: string, fileName?: string): string | null`:
  - Procurar `docker-compose.yml`, `docker-compose.yaml`, `compose.yml`, `compose.yaml`
  - Usar `fileName` da config se fornecido
- [x] S4.3.4 — Implementar `parseComposeFile(filePath: string): ComposeFile`:
  - Definir tipo `ComposeFile` com `services` como `Record<string, ComposeService>`
  - Definir tipo `ComposeService` com `image`, `ports`, `environment`, `healthcheck`
- [x] S4.3.5 — Implementar `findPostgresService(compose: ComposeFile): string | null`:
  - Procurar service que tem image contendo `postgres`
  - Ou procurar service com porta 5432 exposta
  - Retornar nome do service
- [x] S4.3.6 — Testar com arquivo docker-compose.yml de exemplo

---

## T4.4 — Implementar controle de Docker Compose

- [ ] S4.4.1 — Criar `packages/docker/src/control.ts`
- [ ] S4.4.2 — Implementar `startService(opts: StartServiceOptions): Promise<void>`:
  ```ts
  type StartServiceOptions = {
    composeFile: string
    service: string
    cwd: string
  }
  ```
  - Rodar `docker compose up -d <service>`
- [ ] S4.4.3 — Implementar `isServiceRunning(opts: ServiceOptions): Promise<boolean>`:
  - Rodar `docker compose ps <service>` e verificar status
- [ ] S4.4.4 — Implementar `waitForHealthy(opts: WaitHealthyOptions): Promise<void>`:
  ```ts
  type WaitHealthyOptions = {
    composeFile: string
    service: string
    cwd: string
    timeoutMs?: number  // default 60000
    intervalMs?: number // default 1000
  }
  ```
  - Polling de `docker compose ps` até service estar healthy ou timeout

---

## T4.5 — Implementar verificador de saúde do Postgres via Docker

- [ ] S4.5.1 — Criar `packages/docker/src/health.ts`
- [ ] S4.5.2 — Implementar `waitForPostgresHealthy(opts: WaitPostgresOptions): Promise<void>`:
  - Usar `docker compose exec <service> pg_isready` periodicamente
  - Alternativa: tentar conexão direta via TCP (se o postgres adapter estiver disponível — mas criar dependência circular, então usar net.Socket diretamente)
- [ ] S4.5.3 — Lançar erro com mensagem clara se timeout expirar

---

## T4.6 — API pública do pacote docker

- [ ] S4.6.1 — Criar `packages/docker/src/index.ts`
- [ ] S4.6.2 — Exportar todas as funções e tipos públicos

---

## T4.7 — Testes do pacote docker

- [ ] S4.7.1 — Criar `packages/docker/src/__tests__/detect.test.ts`
- [ ] S4.7.2 — Testar `isDockerInstalled` mocando execa
- [ ] S4.7.3 — Criar `packages/docker/src/__tests__/compose.test.ts`
- [ ] S4.7.4 — Criar docker-compose.yml de fixture para testes
- [ ] S4.7.5 — Testar parsing e detecção de service postgres

---

## T4.8 — Build e commit do pacote docker

- [ ] S4.8.1 — Rodar `pnpm build` no pacote docker
- [ ] S4.8.2 — Rodar `pnpm test`
- [ ] S4.8.3 — Commit: `feat(docker): implement docker detection and compose integration`

---

---

# FASE 5 — Pacote `@mocchi/core` {#fase-5}

**Objetivo:** Implementar o orchestrador central. Core conecta todos os outros pacotes e define o lifecycle de um sandbox. Aqui ficam as abstrações de alto nível que a CLI vai usar.

**Duração estimada:** 6–8 horas

---

## T5.1 — Definir tipos centrais do Core

- [ ] S5.1.1 — Criar `packages/core/src/types.ts`
- [ ] S5.1.2 — Definir tipo `SandboxState`:
  ```ts
  export type SandboxState = {
    name: string
    databaseUrl: string
    createdAt: Date
    status: 'creating' | 'ready' | 'error' | 'destroyed'
  }
  ```
- [ ] S5.1.3 — Definir tipo `SandboxContext`:
  ```ts
  export type SandboxContext = {
    config: ResolvedMocchiConfig
    sandbox: SandboxState
    baseUrl: string
  }
  ```
- [ ] S5.1.4 — Definir tipo `MocchiError` (classe base):
  ```ts
  export class MocchiError extends Error {
    readonly code: string
    readonly suggestions: string[]
    constructor(message: string, code: string, suggestions?: string[])
  }
  ```
- [ ] S5.1.5 — Criar subclasses: `ConnectionError`, `SandboxCreationError`, `MigrationError`, `ConfigError`, `GuardError`

---

## T5.2 — Implementar o Sandbox Manager

- [ ] S5.2.1 — Criar `packages/core/src/sandbox.ts`
- [ ] S5.2.2 — Implementar função `createSandbox(opts: CreateSandboxOptions): Promise<SandboxState>`:
  - Gerar nome via `generateSandboxName`
  - Validar guards (prefix, não-produção)
  - Criar database via `@mocchi/postgres`
  - Retornar `SandboxState` com status `ready`
- [ ] S5.2.3 — Implementar função `destroySandbox(sandbox: SandboxState, config: ResolvedMocchiConfig): Promise<void>`:
  - Validar guards antes de dropar
  - Dropar database via `@mocchi/postgres`
  - Atualizar status para `destroyed`
- [ ] S5.2.4 — Implementar função `sandboxExists(name: string, config: ResolvedMocchiConfig): Promise<boolean>`
- [ ] S5.2.5 — Implementar o registro de estado local (arquivo `.mocchi/state.json` no projeto):
  - Gravar estado do sandbox atual
  - Ler estado ao reiniciar
  - Limpar estado ao destruir

---

## T5.3 — Implementar o state file

- [ ] S5.3.1 — Criar `packages/core/src/state.ts`
- [ ] S5.3.2 — Definir localização: `<projectRoot>/.mocchi/state.json`
- [ ] S5.3.3 — Adicionar `.mocchi/` ao `.gitignore` da raiz do projeto do usuário (o `init` faz isso)
- [ ] S5.3.4 — Implementar `readState(projectRoot: string): Promise<SandboxState | null>`
- [ ] S5.3.5 — Implementar `writeState(projectRoot: string, state: SandboxState): Promise<void>`
- [ ] S5.3.6 — Implementar `clearState(projectRoot: string): Promise<void>`
- [ ] S5.3.7 — Lidar com arquivo corrompido (JSON inválido) — retornar `null` e logar aviso

---

## T5.4 — Implementar o executor de migrations

- [ ] S5.4.1 — Criar `packages/core/src/migrator.ts`
- [ ] S5.4.2 — Implementar `runMigrations(opts: MigrationOptions): Promise<MigrationResult>`:
  ```ts
  type MigrationOptions = {
    command: string
    databaseUrl: string
    cwd: string
    timeout?: number
  }
  type MigrationResult = {
    success: boolean
    durationMs: number
    stdout: string
    stderr: string
    exitCode: number
  }
  ```
- [ ] S5.4.3 — Usar `execa` para rodar o comando com `DATABASE_URL` no ambiente
- [ ] S5.4.4 — Capturar stdout e stderr completos
- [ ] S5.4.5 — Respeitar timeout configurado
- [ ] S5.4.6 — Retornar `MigrationResult` com informações completas mesmo em falha
- [ ] S5.4.7 — Lançar `MigrationError` com contexto quando exit code != 0

---

## T5.5 — Implementar o executor de seed

- [ ] S5.5.1 — Criar `packages/core/src/seeder.ts`
- [ ] S5.5.2 — Implementar `runSeed(opts: SeedOptions): Promise<SeedResult>`:
  - Similar ao `runMigrations`
  - Respeitar `optional: true` — se falhar e for opcional, apenas logar aviso
- [ ] S5.5.3 — Retornar `SeedResult` com `skipped: boolean` se seed não configurada

---

## T5.6 — Implementar o .env.mocchi writer

- [ ] S5.6.1 — Criar `packages/core/src/envfile.ts`
- [ ] S5.6.2 — Implementar `writeEnvMocchi(opts: EnvFileOptions): Promise<string>`:
  ```ts
  type EnvFileOptions = {
    projectRoot: string
    databaseUrl: string
    sandboxName: string
  }
  ```
- [ ] S5.6.3 — Escrever arquivo `.env.mocchi` na raiz do projeto
- [ ] S5.6.4 — Incluir header com timestamp e nome do sandbox
- [ ] S5.6.5 — Garantir que `.env.mocchi` está no `.gitignore`
- [ ] S5.6.6 — Implementar `removeEnvMocchi(projectRoot: string): Promise<void>`

---

## T5.7 — Implementar o verificador de ambiente (pré-voo)

- [ ] S5.7.1 — Criar `packages/core/src/preflight.ts`
- [ ] S5.7.2 — Definir tipo `PreflightResult`:
  ```ts
  type PreflightCheck = {
    name: string
    status: 'pass' | 'fail' | 'warn' | 'skip'
    message: string
    suggestion?: string
  }
  type PreflightResult = {
    checks: PreflightCheck[]
    ready: boolean
  }
  ```
- [ ] S5.7.3 — Implementar `runPreflight(config: ResolvedMocchiConfig): Promise<PreflightResult>`
- [ ] S5.7.4 — Incluir checks: Docker instalado, Docker rodando, Compose disponível, compose file existe, service postgres detectado, conexão com postgres funciona, pode criar database
- [ ] S5.7.5 — Cada check individual deve ser independente (não parar em caso de falha de outro)
- [ ] S5.7.6 — `ready: false` se qualquer check for `fail`

---

## T5.8 — Implementar o detector de projeto

- [ ] S5.8.1 — Criar `packages/core/src/project.ts`
- [ ] S5.8.2 — Implementar `detectProjectRoot(cwd: string): string`:
  - Subir diretórios procurando por `package.json` ou `mocchi.config.ts`
  - Retornar o diretório onde encontrou
- [ ] S5.8.3 — Implementar `detectPackageJson(cwd: string): PackageJsonInfo | null`:
  - Ler e parsear `package.json`
  - Retornar `name`, `scripts`
- [ ] S5.8.4 — Implementar `detectDotenv(cwd: string): DotenvInfo | null`:
  - Verificar existência de `.env`, `.env.local`, `.env.development`
  - Listar arquivos encontrados
- [ ] S5.8.5 — Implementar `detectComposeFile(cwd: string): string | null`:
  - Delegar para `@mocchi/docker`

---

## T5.9 — Implementar signal handlers

- [ ] S5.9.1 — Criar `packages/core/src/signals.ts`
- [ ] S5.9.2 — Implementar `registerCleanupHandlers(cleanup: () => Promise<void>): void`:
  - Registrar `SIGINT` handler (Ctrl+C)
  - Registrar `SIGTERM` handler
  - Garantir que cleanup é chamado apenas uma vez
  - Garantir que processo termina após cleanup
- [ ] S5.9.3 — Implementar timeout de 10s no cleanup (não travar indefinidamente)
- [ ] S5.9.4 — Logar mensagem durante cleanup: `Cleaning up sandbox...`

---

## T5.10 — API pública do pacote core

- [ ] S5.10.1 — Criar `packages/core/src/index.ts`
- [ ] S5.10.2 — Exportar: `createSandbox`, `destroySandbox`, `runMigrations`, `runSeed`, `runPreflight`, `writeEnvMocchi`, tipos principais, classes de erro

---

## T5.11 — Testes do pacote core

- [ ] S5.11.1 — Criar testes para `state.ts` (arquivo de estado)
- [ ] S5.11.2 — Criar testes para `migrator.ts` (mocando execa)
- [ ] S5.11.3 — Criar testes para `envfile.ts`
- [ ] S5.11.4 — Criar testes para `signals.ts`

---

## T5.12 — Build e commit do pacote core

- [ ] S5.12.1 — Rodar `pnpm build` no pacote core
- [ ] S5.12.2 — Rodar `pnpm test`
- [ ] S5.12.3 — Commit: `feat(core): implement sandbox orchestration and lifecycle`

---

---

# FASE 6 — Pacote `@mocchi/cli` — Scaffold {#fase-6}

**Objetivo:** Criar o scaffold da CLI: entry point, parser de argumentos, sistema de output e estrutura de comandos. Sem implementar comandos ainda — apenas a estrutura.

**Duração estimada:** 3–4 horas

---

## T6.1 — Instalar dependências da CLI

- [ ] S6.1.1 — Instalar `commander`: `pnpm add commander`
- [ ] S6.1.2 — Instalar `picocolors` para colorização: `pnpm add picocolors`
- [ ] S6.1.3 — Instalar `ora` para spinners: `pnpm add ora`
- [ ] S6.1.4 — Instalar `execa` para execução de processos: `pnpm add execa`
- [ ] S6.1.5 — Verificar compatibilidade ESM de todas as dependências

---

## T6.2 — Configurar entry point executável

- [ ] S6.2.1 — Criar `packages/cli/src/bin.ts` como entry point
- [ ] S6.2.2 — Adicionar shebang na primeira linha: `#!/usr/bin/env node`
- [ ] S6.2.3 — Configurar tsup para incluir `bin.ts` como entry:
  ```ts
  entry: ['src/bin.ts', 'src/index.ts']
  ```
- [ ] S6.2.4 — Adicionar `bin` no `package.json` do cli:
  ```json
  {
    "bin": {
      "mocchi": "./dist/bin.js"
    }
  }
  ```
- [ ] S6.2.5 — Configurar tsup para setar chmod +x no bin via `onSuccess`:
  ```ts
  onSuccess: 'chmod +x dist/bin.js'
  ```
- [ ] S6.2.6 — Testar: `node packages/cli/dist/bin.js --version`

---

## T6.3 — Criar o sistema de output da CLI

- [ ] S6.3.1 — Criar `packages/cli/src/output.ts`
- [ ] S6.3.2 — Implementar funções de output:
  ```ts
  export function success(msg: string): void   // ✓ verde
  export function failure(msg: string): void   // ✗ vermelho
  export function warn(msg: string): void      // ⚠ amarelo
  export function info(msg: string): void      // · cinza
  export function bold(msg: string): void      // negrito
  export function divider(): void              // linha separadora
  export function header(title: string): void  // cabeçalho de seção
  ```
- [ ] S6.3.3 — Implementar suporte a `--no-color` e `NO_COLOR` env var
- [ ] S6.3.4 — Implementar `createSpinner(text: string)` wrapper em cima de `ora`
- [ ] S6.3.5 — Implementar `printSandboxInfo(sandbox: SandboxState): void` — output padronizado
- [ ] S6.3.6 — Implementar `printError(error: MocchiError): void` — output com suggestions

---

## T6.4 — Criar o programa principal com Commander

- [ ] S6.4.1 — Criar `packages/cli/src/program.ts`
- [ ] S6.4.2 — Criar instância do Commander com nome `mocchi`
- [ ] S6.4.3 — Configurar versão (ler de `package.json`)
- [ ] S6.4.4 — Configurar descrição: `Disposable PostgreSQL sandboxes for dangerous migrations, queries and integration tests.`
- [ ] S6.4.5 — Adicionar opção global `--verbose, -v` para output detalhado
- [ ] S6.4.6 — Adicionar opção global `--no-color` para desativar cores
- [ ] S6.4.7 — Adicionar opção global `--cwd <path>` para sobrescrever diretório de trabalho
- [ ] S6.4.8 — Configurar `exitOverride()` para tratar erros do Commander
- [ ] S6.4.9 — Configurar handler de comando desconhecido com sugestão

---

## T6.5 — Criar estrutura de comandos (stubs)

- [ ] S6.5.1 — Criar `packages/cli/src/commands/` como pasta de comandos
- [ ] S6.5.2 — Criar `packages/cli/src/commands/doctor.ts` (stub)
- [ ] S6.5.3 — Criar `packages/cli/src/commands/init.ts` (stub)
- [ ] S6.5.4 — Criar `packages/cli/src/commands/ready.ts` (stub)
- [ ] S6.5.5 — Criar `packages/cli/src/commands/down.ts` (stub)
- [ ] S6.5.6 — Criar `packages/cli/src/commands/run.ts` (stub)
- [ ] S6.5.7 — Criar `packages/cli/src/commands/reset.ts` (stub)
- [ ] S6.5.8 — Criar `packages/cli/src/commands/shell.ts` (stub)
- [ ] S6.5.9 — Criar `packages/cli/src/commands/sql.ts` (stub)
- [ ] S6.5.10 — Criar `packages/cli/src/commands/verify.ts` (stub)
- [ ] S6.5.11 — Registrar todos os comandos no `program.ts`

---

## T6.6 — Criar loader de contexto da CLI

- [ ] S6.6.1 — Criar `packages/cli/src/context.ts`
- [ ] S6.6.2 — Implementar `loadCliContext(opts: CliContextOptions): Promise<CliContext>`:
  - Resolver `cwd` (da opção global ou `process.cwd()`)
  - Detectar `projectRoot`
  - Carregar `mocchi.config.ts`
  - Resolver defaults
  - Resolver env vars
  - Retornar contexto completo
- [ ] S6.6.3 — Implementar tratamento de erros de contexto com output amigável

---

## T6.7 — Implementar `mocchi --help` e `mocchi --version`

- [ ] S6.7.1 — Verificar que `--help` mostra todos os comandos
- [ ] S6.7.2 — Verificar que `--version` mostra versão do `@mocchi/cli`
- [ ] S6.7.3 — Customizar formato do help para incluir exemplos de uso
- [ ] S6.7.4 — Adicionar `--help` para cada subcomando (Commander faz isso automaticamente)

---

## T6.8 — Configurar instalação local via `pnpm link`

- [ ] S6.8.1 — Rodar `pnpm build` no pacote cli
- [ ] S6.8.2 — Rodar `pnpm link --global` no pacote cli
- [ ] S6.8.3 — Verificar que `mocchi --version` funciona no terminal
- [ ] S6.8.4 — Verificar que `mocchi --help` mostra os comandos

---

## T6.9 — Build e commit do scaffold da CLI

- [ ] S6.9.1 — Rodar `pnpm build` completo
- [ ] S6.9.2 — Commit: `feat(cli): scaffold CLI with commander and output system`

---

---

# FASE 7 — Comando `mocchi doctor` {#fase-7}

**Objetivo:** Implementar o diagnóstico completo do ambiente. É o primeiro comando real e serve como smoke test de toda a integração.

**Duração estimada:** 2–3 horas

---

## T7.1 — Implementar comando doctor no Core

- [ ] S7.1.1 — Criar `packages/core/src/commands/doctor.ts`
- [ ] S7.1.2 — Implementar `runDoctor(opts: DoctorOptions): Promise<DoctorResult>`:
  - Usar `runPreflight` já implementado no Core
  - Adicionar checks adicionais: arquivo config existe, migrations command configurado
- [ ] S7.1.3 — Organizar checks em grupos: `Docker`, `PostgreSQL`, `Mocchi`
- [ ] S7.1.4 — Implementar `DoctorResult` com summary de aprovados/reprovados

---

## T7.2 — Implementar comando doctor na CLI

- [ ] S7.2.1 — Abrir `packages/cli/src/commands/doctor.ts`
- [ ] S7.2.2 — Implementar handler do Commander:
  - Carregar contexto (sem precisar de config — doctor deve funcionar parcialmente sem config)
  - Chamar `runDoctor` do core
  - Iterar sobre checks e usar `output.success`/`output.failure`/`output.warn`
- [ ] S7.2.3 — Implementar output exato do PRD:
  ```
  Mocchi Doctor

  [PASS] Docker is installed
  [PASS] Docker daemon is running
  ...
  ```
- [ ] S7.2.4 — Implementar linha final: `Environment is ready.` ou `Environment has issues.`
- [ ] S7.2.5 — Retornar exit code 0 se tudo passou, 1 se algum falhou
- [ ] S7.2.6 — Adicionar `--verbose` para mostrar detalhes de cada check

---

## T7.3 — Testar o comando doctor manualmente

- [ ] S7.3.1 — Rodar `mocchi doctor` com Docker rodando
- [ ] S7.3.2 — Rodar `mocchi doctor` sem Docker (deve mostrar falha)
- [ ] S7.3.3 — Rodar `mocchi doctor` sem config (deve mostrar aviso de config)
- [ ] S7.3.4 — Verificar exit codes corretos

---

## T7.4 — Commit do comando doctor

- [ ] S7.4.1 — Commit: `feat(cli): implement mocchi doctor command`

---

---

# FASE 8 — Comando `mocchi init` {#fase-8}

**Objetivo:** Implementar o `mocchi init` que detecta o projeto e gera `mocchi.config.ts`.

**Duração estimada:** 3–4 horas

---

## T8.1 — Implementar detector de ORM

- [ ] S8.1.1 — Criar `packages/core/src/detect-orm.ts`
- [ ] S8.1.2 — Implementar `detectOrm(projectRoot: string): OrmInfo | null`:
  - Verificar dependências do `package.json`: `prisma`, `drizzle-orm`, `typeorm`, `sequelize`, `knex`
  - Retornar `{ name: 'prisma', migrateCommand: 'prisma migrate deploy' }` etc.
- [ ] S8.1.3 — Mapear cada ORM para seu comando de migration padrão

---

## T8.2 — Implementar gerador de mocchi.config.ts

- [ ] S8.2.1 — Criar `packages/core/src/init.ts`
- [ ] S8.2.2 — Implementar `generateConfigFile(opts: InitOptions): string`:
  - Receber: `projectName`, `ormInfo`, `composeFile`, `postgresService`, `dotenvFile`
  - Retornar string com conteúdo do arquivo TypeScript
- [ ] S8.2.3 — Gerar config com comentários explicativos em cada campo
- [ ] S8.2.4 — Usar `ormInfo.migrateCommand` se ORM detectado, senão placeholder `'<your-migration-command>'`
- [ ] S8.2.5 — Usar `composeFile` e `postgresService` detectados
- [ ] S8.2.6 — Implementar `runInit(cwd: string): Promise<InitResult>`:
  - Verificar se `mocchi.config.ts` já existe (pedir confirmação para sobrescrever)
  - Detectar tudo automaticamente
  - Gerar arquivo
  - Criar pasta `mocchi/scenarios/`
  - Criar `.gitignore` se não existir ou adicionar entradas necessárias

---

## T8.3 — Implementar comando init na CLI

- [ ] S8.3.1 — Implementar handler do Commander
- [ ] S8.3.2 — Exibir cada detecção com ✓ ou ✗
- [ ] S8.3.3 — Exibir mensagem final com próximos passos:
  ```
  ✓ mocchi.config.ts created
  
  Next steps:
    1. Edit mocchi.config.ts and set your migrations command
    2. Run: mocchi doctor
    3. Run: mocchi ready
  ```
- [ ] S8.3.4 — Implementar `--force` para sobrescrever config existente sem perguntar
- [ ] S8.3.5 — Tratar caso onde config já existe: pedir confirmação interativa

---

## T8.4 — Testar o comando init manualmente

- [ ] S8.4.1 — Rodar `mocchi init` em um projeto Node.js com Prisma
- [ ] S8.4.2 — Rodar `mocchi init` em projeto sem ORM reconhecido
- [ ] S8.4.3 — Rodar `mocchi init` duas vezes (deve pedir confirmação)
- [ ] S8.4.4 — Verificar conteúdo do arquivo gerado

---

## T8.5 — Commit do comando init

- [ ] S8.5.1 — Commit: `feat(cli): implement mocchi init command`

---

---

# FASE 9 — Comando `mocchi ready` {#fase-9}

**Objetivo:** Implementar o comando principal de day-to-day. `mocchi ready` deve criar um sandbox completo e deixar o dev pronto para trabalhar.

**Duração estimada:** 4–5 horas

---

## T9.1 — Implementar o fluxo `ready` no Core

- [ ] S9.1.1 — Criar `packages/core/src/commands/ready.ts`
- [ ] S9.1.2 — Implementar `runReady(opts: ReadyOptions): Promise<ReadyResult>`:
  ```ts
  type ReadyOptions = {
    config: ResolvedMocchiConfig
    projectRoot: string
    name?: string        // --name flag
    skipMigrations?: boolean
    skipSeed?: boolean
  }
  type ReadyResult = {
    sandbox: SandboxState
    migrationsRan: boolean
    seedRan: boolean
    envFileWritten: boolean
  }
  ```
- [ ] S9.1.3 — Passo 1: Verificar se Docker está rodando
- [ ] S9.1.4 — Passo 2: Subir Docker Compose se `autoStart: true` e não estiver rodando
- [ ] S9.1.5 — Passo 3: Esperar Postgres ficar saudável
- [ ] S9.1.6 — Passo 4: Verificar se sandbox já existe (ler state file)
  - Se já existe e `status: ready`, retornar o sandbox existente
  - Se já existe mas `status: error`, recriar
- [ ] S9.1.7 — Passo 5: Criar sandbox database
- [ ] S9.1.8 — Passo 6: Registrar signal handlers para cleanup
- [ ] S9.1.9 — Passo 7: Rodar migrations
- [ ] S9.1.10 — Passo 8: Rodar seed (se configurada e não `skipSeed`)
- [ ] S9.1.11 — Passo 9: Escrever `.env.mocchi`
- [ ] S9.1.12 — Passo 10: Salvar state file

---

## T9.2 — Implementar comando ready na CLI

- [ ] S9.2.1 — Implementar handler do Commander
- [ ] S9.2.2 — Adicionar opção `--name <name>` para override do nome
- [ ] S9.2.3 — Adicionar opção `--skip-migrations` para pular migrations
- [ ] S9.2.4 — Adicionar opção `--skip-seed` para pular seed
- [ ] S9.2.5 — Implementar output com spinners para cada passo:
  ```
  ✓ Docker is running
  ✓ PostgreSQL is healthy
  ✓ Created database sbx_fix_audit_logs_3841
  ✓ Applied migrations (2.3s)
  ✓ Seed skipped (optional)
  ✓ Generated .env.mocchi
  
  DATABASE_URL=postgres://...
  ```
- [ ] S9.2.6 — Usar spinner enquanto espera Postgres ficar healthy
- [ ] S9.2.7 — Mostrar tempo de cada etapa
- [ ] S9.2.8 — Em caso de erro em qualquer passo, mostrar mensagem e sugestões

---

## T9.3 — Testar o comando ready manualmente

- [ ] S9.3.1 — Rodar `mocchi ready` com Docker e Postgres rodando
- [ ] S9.3.2 — Verificar criação do banco no psql/DBeaver
- [ ] S9.3.3 — Verificar conteúdo do `.env.mocchi`
- [ ] S9.3.4 — Rodar `mocchi ready` uma segunda vez (deve reutilizar sandbox existente)
- [ ] S9.3.5 — Rodar `mocchi ready --name my-test`
- [ ] S9.3.6 — Simular falha de migrations e verificar output

---

## T9.4 — Commit do comando ready

- [ ] S9.4.1 — Commit: `feat(cli): implement mocchi ready command`

---

---

# FASE 10 — Comando `mocchi down` {#fase-10}

**Objetivo:** Implementar o comando de cleanup. Deve ser seguro, preciso e verificável.

**Duração estimada:** 1–2 horas

---

## T10.1 — Implementar o fluxo `down` no Core

- [ ] S10.1.1 — Criar `packages/core/src/commands/down.ts`
- [ ] S10.1.2 — Implementar `runDown(opts: DownOptions): Promise<DownResult>`:
  - Ler state file para obter sandbox atual
  - Se não existir state, verificar se há banco com o prefixo no cluster
  - Destruir sandbox com todas as proteções de segurança
  - Remover state file
  - Remover `.env.mocchi`
- [ ] S10.1.3 — Implementar `--force` para pular confirmação interativa
- [ ] S10.1.4 — Implementar `--database <name>` para especificar banco explícito
- [ ] S10.1.5 — Listar bancos com prefixo `sbx_` se `--database` não for fornecido e houver múltiplos

---

## T10.2 — Implementar comando down na CLI

- [ ] S10.2.1 — Implementar handler do Commander
- [ ] S10.2.2 — Output:
  ```
  ✓ Dropped database sbx_fix_audit_logs_3841
  ✓ Removed .env.mocchi
  ```
- [ ] S10.2.3 — Implementar confirmação interativa quando `--force` não está presente e operação é destrutiva
- [ ] S10.2.4 — Mostrar claramente qual database vai ser dropada antes de dropar

---

## T10.3 — Testar o comando down manualmente

- [ ] S10.3.1 — Rodar `mocchi ready` e depois `mocchi down`
- [ ] S10.3.2 — Verificar que banco não existe mais
- [ ] S10.3.3 — Verificar que `.env.mocchi` foi removido
- [ ] S10.3.4 — Tentar `mocchi down` sem sandbox existente (deve falhar graciosamente)

---

## T10.4 — Commit do comando down

- [ ] S10.4.1 — Commit: `feat(cli): implement mocchi down command`

---

---

# FASE 11 — Comando `mocchi run` {#fase-11}

**Objetivo:** Implementar o comando mais crítico para CI. `mocchi run` deve criar sandbox, injetar env, executar comando e propagar exit code corretamente.

**Duração estimada:** 4–5 horas

---

## T11.1 — Implementar o fluxo `run` no Core

- [ ] S11.1.1 — Criar `packages/core/src/commands/run.ts`
- [ ] S11.1.2 — Implementar `runCommand(opts: RunOptions): Promise<RunResult>`:
  ```ts
  type RunOptions = {
    config: ResolvedMocchiConfig
    projectRoot: string
    command: string[]       // os args depois do '--'
    keep?: boolean          // --keep
    seedName?: string       // --seed <name>
    sandboxName?: string    // --name <name>
    skipMigrations?: boolean
  }
  type RunResult = {
    exitCode: number
    sandbox: SandboxState
    durationMs: number
  }
  ```
- [ ] S11.1.3 — Passo 1: Criar sandbox (mesma lógica do `ready`)
- [ ] S11.1.4 — Passo 2: Rodar migrations
- [ ] S11.1.5 — Passo 3: Rodar seed
- [ ] S11.1.6 — Passo 4: Executar comando do usuário com `DATABASE_URL` injetado:
  - Usar `execa` com `{ env: { ...process.env, DATABASE_URL: sandboxUrl } }`
  - Herdar `stdio: 'inherit'` para que o output do comando apareça diretamente
  - Capturar exit code
- [ ] S11.1.7 — Passo 5: Cleanup sandbox se `!keep`
- [ ] S11.1.8 — Retornar `RunResult` com exit code do comando filho
- [ ] S11.1.9 — CRÍTICO: O exit code do processo filho deve ser propagado para o processo pai

---

## T11.2 — Implementar comando run na CLI

- [ ] S11.2.1 — Implementar handler do Commander
- [ ] S11.2.2 — Parsear `--` corretamente (tudo depois de `--` é o comando do usuário)
- [ ] S11.2.3 — Adicionar opção `--keep` para não destruir sandbox após execução
- [ ] S11.2.4 — Adicionar opção `--seed <name>` para usar seed específica
- [ ] S11.2.5 — Adicionar opção `--name <name>` para nomear sandbox
- [ ] S11.2.6 — Adicionar opção `--skip-migrations`
- [ ] S11.2.7 — Output inicial:
  ```
  Mocchi Run
  
  Sandbox: sbx_main_4421
  Command: yarn test:e2e
  
  Setting up sandbox...
  ```
- [ ] S11.2.8 — Durante execução do comando: mostrar apenas o output do próprio comando
- [ ] S11.2.9 — Output final (em caso de sucesso):
  ```
  Mocchi: command exited with code 0 (12.3s)
  Mocchi: sandbox destroyed
  ```
- [ ] S11.2.10 — Output final (em caso de falha):
  ```
  Mocchi: command exited with code 1
  Mocchi: sandbox kept for inspection: DATABASE_URL=...
  ```
- [ ] S11.2.11 — CRÍTICO: `process.exit(result.exitCode)` ao final

---

## T11.3 — Testar o comando run manualmente

- [ ] S11.3.1 — Rodar `mocchi run -- echo "hello"` (deve passar)
- [ ] S11.3.2 — Rodar `mocchi run -- exit 1` (deve falhar com exit code 1)
- [ ] S11.3.3 — Verificar que exit code é propagado: `mocchi run -- exit 42; echo $?`
- [ ] S11.3.4 — Rodar `mocchi run --keep -- sleep 5` e fazer Ctrl+C — verificar cleanup
- [ ] S11.3.5 — Rodar sem `--` (deve dar erro amigável)

---

## T11.4 — Commit do comando run

- [ ] S11.4.1 — Commit: `feat(cli): implement mocchi run command with exit code propagation`

---

---

# FASE 12 — Comando `mocchi reset` {#fase-12}

**Objetivo:** Implementar reset — destruir e recriar o sandbox atual.

**Duração estimada:** 1 hora

---

## T12.1 — Implementar o fluxo `reset` no Core

- [ ] S12.1.1 — Criar `packages/core/src/commands/reset.ts`
- [ ] S12.1.2 — Implementar `runReset`: reusar `runDown` + `runReady` em sequência
- [ ] S12.1.3 — Preservar o mesmo nome de sandbox ao recriar (a menos que `--name` seja fornecido)

---

## T12.2 — Implementar comando reset na CLI

- [ ] S12.2.1 — Implementar handler
- [ ] S12.2.2 — Output: mostrar down e ready em sequência
- [ ] S12.2.3 — Adicionar `--keep-name` para preservar nome do sandbox

---

## T12.3 — Commit do comando reset

- [ ] S12.3.1 — Commit: `feat(cli): implement mocchi reset command`

---

---

# FASE 13 — Comando `mocchi shell` {#fase-13}

**Objetivo:** Abrir shell psql no sandbox atual.

**Duração estimada:** 1–2 horas

---

## T13.1 — Implementar o fluxo `shell` no Core

- [ ] S13.1.1 — Criar `packages/core/src/commands/shell.ts`
- [ ] S13.1.2 — Implementar `runShell(opts: ShellOptions): Promise<void>`:
  - Ler sandbox do state file
  - Tentar abrir `psql <DATABASE_URL>` com `stdio: 'inherit'`
  - Fallback: tentar `docker compose exec <service> psql` se psql local não disponível

---

## T13.2 — Implementar comando shell na CLI

- [ ] S13.2.1 — Implementar handler
- [ ] S13.2.2 — Adicionar opção `--database <name>` para especificar banco manualmente
- [ ] S13.2.3 — Tratar caso onde psql não está instalado: mostrar alternativas

---

## T13.3 — Commit do comando shell

- [ ] S13.3.1 — Commit: `feat(cli): implement mocchi shell command`

---

---

# FASE 14 — v0.1 Release — Hardening e qualidade {#fase-14}

**Objetivo:** Antes de publicar v0.1, revisar tudo, escrever testes de integração reais, polir UX e garantir que o MVP básico funciona de ponta a ponta.

**Duração estimada:** 8–12 horas

---

## T14.1 — Testes de integração end-to-end da v0.1

- [ ] S14.1.1 — Criar `tests/e2e/` na raiz do monorepo
- [ ] S14.1.2 — Criar teste E2E: `init → doctor → ready → down`
- [ ] S14.1.3 — Criar teste E2E: `ready → run (echo) → verificar exit 0`
- [ ] S14.1.4 — Criar teste E2E: `ready → run (exit 1) → verificar exit 1`
- [ ] S14.1.5 — Criar teste E2E: `ready → reset → down`
- [ ] S14.1.6 — Criar teste E2E: `down sem sandbox existente → erro amigável`
- [ ] S14.1.7 — Configurar Vitest para rodar testes E2E separadamente: `pnpm test:e2e`
- [ ] S14.1.8 — Configurar CI para rodar E2E com serviço PostgreSQL:
  ```yaml
  services:
    postgres:
      image: postgres:16
      env:
        POSTGRES_PASSWORD: postgres
      ports:
        - 5432:5432
  ```

---

## T14.2 — Revisão de segurança

- [ ] S14.2.1 — Revisar todas as chamadas de `DROP DATABASE` — verificar que guards estão aplicados
- [ ] S14.2.2 — Verificar que `NODE_ENV=production` bloqueia execução
- [ ] S14.2.3 — Verificar que prefixo `sbx_` é verificado antes de qualquer drop
- [ ] S14.2.4 — Verificar que senha não aparece em nenhum log
- [ ] S14.2.5 — Verificar que DATABASE_URL original nunca é usado como sandbox
- [ ] S14.2.6 — Testar: tentar `mocchi down` com `NODE_ENV=production` → deve bloquear

---

## T14.3 — Revisão de UX e mensagens de erro

- [ ] S14.3.1 — Revisar todas as mensagens de erro do projeto
- [ ] S14.3.2 — Garantir que toda mensagem de erro tem pelo menos uma sugestão de correção
- [ ] S14.3.3 — Garantir que a ferramenta nunca imprime stack traces crus (capturar e formatar)
- [ ] S14.3.4 — Adicionar `--verbose` em todos os comandos para mostrar stack trace
- [ ] S14.3.5 — Testar com usuário que não tem Docker instalado → verificar mensagem
- [ ] S14.3.6 — Testar com DATABASE_URL inválida → verificar mensagem
- [ ] S14.3.7 — Testar com migration command incorreto → verificar mensagem

---

## T14.4 — Documentação inicial

- [ ] S14.4.1 — Escrever `README.md` completo com:
  - Badges: CI, npm version, license
  - Install
  - Quick start (init → doctor → ready → run → down)
  - Todos os comandos com exemplos
  - Configuração com todos os campos explicados
  - Requisitos (Node 20+, Docker, PostgreSQL 14+)
- [ ] S14.4.2 — Criar `docs/ARCHITECTURE.md` com diagrama dos pacotes
- [ ] S14.4.3 — Criar `docs/CONFIGURATION.md` com referência completa do config file
- [ ] S14.4.4 — Atualizar `CHANGELOG.md` com todas as entregas da v0.1

---

## T14.5 — Publicação no npm

- [ ] S14.5.1 — Criar conta no npmjs.com se não tiver
- [ ] S14.5.2 — Configurar organização `@mocchi` no npm
- [ ] S14.5.3 — Verificar `package.json` de cada pacote: `name`, `version`, `description`, `keywords`, `author`, `license`, `repository`, `homepage`
- [ ] S14.5.4 — Configurar `files` no `package.json` para publicar apenas `dist/` e `README.md`
- [ ] S14.5.5 — Rodar `pnpm publish --dry-run` para verificar o que vai ser publicado
- [ ] S14.5.6 — Publicar `@mocchi/config` → npm
- [ ] S14.5.7 — Publicar `@mocchi/postgres` → npm
- [ ] S14.5.8 — Publicar `@mocchi/docker` → npm
- [ ] S14.5.9 — Publicar `@mocchi/core` → npm
- [ ] S14.5.10 — Publicar `@mocchi/cli` → npm
- [ ] S14.5.11 — Verificar: `npx @mocchi/cli --version` em um diretório vazio

---

## T14.6 — Tag e release v0.1.0

- [ ] S14.6.1 — Criar tag: `git tag v0.1.0`
- [ ] S14.6.2 — Criar GitHub Release com notas do `CHANGELOG.md`
- [ ] S14.6.3 — Criar `v0.1.0` como release no GitHub Projects
- [ ] S14.6.4 — Fechar issue `[META] v0.1 — Core local`

---

---

# FASE 15 — Comando `mocchi sql` {#fase-15}

**Objetivo:** Implementar execução de SQL com validação de erro esperado vs real.

**Duração estimada:** 3–4 horas

---

## T15.1 — Implementar o fluxo `sql` no Core

- [ ] S15.1.1 — Criar `packages/core/src/commands/sql.ts`
- [ ] S15.1.2 — Implementar `runSql(opts: SqlOptions): Promise<SqlResult>`:
  ```ts
  type SqlOptions = {
    config: ResolvedMocchiConfig
    projectRoot: string
    input: string        // caminho de arquivo ou query inline
    expectError?: string // SQLSTATE code
    expectSuccess?: boolean
    reuseExisting?: boolean
  }
  type SqlResult = {
    passed: boolean
    queryResult: QueryResult
    expectedError?: string
    receivedError?: string
    durationMs: number
  }
  ```
- [ ] S15.1.3 — Resolver `input`: se parece caminho de arquivo, ler o arquivo; senão, usar como SQL inline
- [ ] S15.1.4 — Criar sandbox (ou reutilizar se `reuseExisting`)
- [ ] S15.1.5 — Executar SQL usando `@mocchi/postgres`
- [ ] S15.1.6 — Implementar lógica de validação:
  - `--expect-error <code>`: PASS se query falhou com esse SQLSTATE exato
  - `--expect-success`: PASS se query teve sucesso
  - Sem flags: PASS se não lançou exceção (sucesso por padrão)
- [ ] S15.1.7 — Implementar caso de falha inesperada: mostrar o erro recebido vs esperado
- [ ] S15.1.8 — Destruir sandbox ao final (a menos que falhou e `--keep`)

---

## T15.2 — Implementar comando sql na CLI

- [ ] S15.2.1 — Implementar handler do Commander
- [ ] S15.2.2 — Adicionar opção `--expect-error <sqlstate>`
- [ ] S15.2.3 — Adicionar opção `--expect-success`
- [ ] S15.2.4 — Adicionar opção `--reuse` para reutilizar sandbox existente
- [ ] S15.2.5 — Adicionar opção `--keep`
- [ ] S15.2.6 — Output de sucesso:
  ```
  [PASS] Query failed with expected error 42501
  
  Error:
    permission denied for table admin_audit_log
  ```
- [ ] S15.2.7 — Output de falha:
  ```
  [FAIL] Expected error 42501 but query succeeded
  
  Rows returned: 5
  ```
- [ ] S15.2.8 — Exit code 0 para PASS, 1 para FAIL

---

## T15.3 — Testar o comando sql manualmente

- [ ] S15.3.1 — Testar `mocchi sql "SELECT 1;"` (deve passar)
- [ ] S15.3.2 — Testar `mocchi sql "SELECT 1;" --expect-success` (deve passar)
- [ ] S15.3.3 — Testar com query que falha e `--expect-error <code>` (deve passar)
- [ ] S15.3.4 — Testar com query que falha sem `--expect-error` (deve falhar)
- [ ] S15.3.5 — Testar com arquivo SQL

---

## T15.4 — Commit do comando sql

- [ ] S15.4.1 — Commit: `feat(cli): implement mocchi sql command with error assertions`

---

---

# FASE 16 — Sistema de scenarios {#fase-16}

**Objetivo:** Implementar o modelo de scenario declarativo: `defineScenario`, loader, executor de assertions.

**Duração estimada:** 5–7 horas

---

## T16.1 — Definir os tipos de scenario

- [ ] S16.1.1 — Criar `packages/core/src/scenarios/types.ts`
- [ ] S16.1.2 — Definir tipo `ScenarioAssertion` (conforme PRD seção 12)
- [ ] S16.1.3 — Definir tipo `ScenarioSeed` (função async que recebe `{ sql }`)
- [ ] S16.1.4 — Definir tipo `Scenario` (conforme PRD seção 12)
- [ ] S16.1.5 — Definir tipo `AssertionResult`:
  ```ts
  type AssertionResult = {
    name: string
    passed: boolean
    expected: string
    received: string
    durationMs: number
    error?: PostgresQueryError
  }
  ```
- [ ] S16.1.6 — Definir tipo `ScenarioResult`:
  ```ts
  type ScenarioResult = {
    scenarioName: string
    passed: boolean
    assertions: AssertionResult[]
    sandbox: SandboxState
    totalDurationMs: number
  }
  ```

---

## T16.2 — Implementar `defineScenario`

- [ ] S16.2.1 — Criar `packages/core/src/scenarios/define.ts`
- [ ] S16.2.2 — Implementar `defineScenario(scenario: Scenario): Scenario`:
  - Apenas retorna o objeto (type safety helper, igual ao `defineMocchiConfig`)
- [ ] S16.2.3 — Exportar de `@mocchi/core`

---

## T16.3 — Implementar o loader de scenarios

- [ ] S16.3.1 — Criar `packages/core/src/scenarios/loader.ts`
- [ ] S16.3.2 — Implementar `findScenarioFile(name: string, projectRoot: string): string | null`:
  - Procurar em `mocchi/scenarios/<name>.ts`
  - Procurar em `mocchi/scenarios/<name>/index.ts`
  - Suportar extensões `.ts`, `.js`
- [ ] S16.3.3 — Implementar `loadScenario(filePath: string): Promise<Scenario>`:
  - Usar `jiti` para carregar o arquivo
  - Validar que o export default é um objeto com `name` e `assertions`
  - Lançar erro descritivo se formato inválido
- [ ] S16.3.4 — Implementar `listAvailableScenarios(projectRoot: string): string[]`:
  - Listar arquivos `.ts` em `mocchi/scenarios/`

---

## T16.4 — Implementar o executor de assertions

- [ ] S16.4.1 — Criar `packages/core/src/scenarios/executor.ts`
- [ ] S16.4.2 — Implementar `executeAssertion(assertion: ScenarioAssertion, client: PostgresClient): Promise<AssertionResult>`:
  - Executar SQL ou command da assertion
  - Capturar resultado com SQLSTATE
  - Comparar com expectativa
  - Calcular `passed: boolean`
  - Medir duração
- [ ] S16.4.3 — Implementar lógica para `expect: "success"`:
  - PASS se não lançou exceção
  - FAIL se lançou qualquer exceção
- [ ] S16.4.4 — Implementar lógica para `expect: "failure"`:
  - PASS se lançou exceção
  - Se `errorCode` definido: PASS apenas se SQLSTATE corresponde exatamente
  - FAIL se não lançou exceção
- [ ] S16.4.5 — Implementar lógica para `errorContains`:
  - Verificar se mensagem de erro contém substring
- [ ] S16.4.6 — Implementar timeout de assertion via `Promise.race`
- [ ] S16.4.7 — Garantir que uma assertion que lança TypeError/etc é capturada e reportada como erro interno

---

## T16.5 — Implementar o executor de cenário completo

- [ ] S16.5.1 — Criar `packages/core/src/scenarios/runner.ts`
- [ ] S16.5.2 — Implementar `runScenario(opts: RunScenarioOptions): Promise<ScenarioResult>`:
  - Criar sandbox
  - Rodar migrations se `scenario.migrate = true`
  - Rodar seed do cenário (seed é uma função TypeScript, não um comando)
  - Executar cada assertion em sequência (não em paralelo — ordem importa)
  - Gerar `ScenarioResult`
  - Destruir sandbox (ou manter em caso de falha para inspeção)

---

## T16.6 — Implementar gerador de relatório de cenário

- [ ] S16.6.1 — Criar `packages/core/src/scenarios/report.ts`
- [ ] S16.6.2 — Implementar `formatScenarioReport(result: ScenarioResult): string`:
  - Formatar exatamente como o PRD seção 19
  - Usar ✓ e ✗
  - Mostrar sandbox info
  - Mostrar cada assertion com expected vs received
  - Mostrar summary: `N passed, M failed`
  - Se falhou: mostrar DATABASE_URL para inspeção e comando `mocchi shell`

---

## T16.7 — Testes do sistema de scenarios

- [ ] S16.7.1 — Criar scenario de fixture para testes
- [ ] S16.7.2 — Testar `findScenarioFile` com diferentes estruturas de pasta
- [ ] S16.7.3 — Testar `loadScenario` com scenario válido
- [ ] S16.7.4 — Testar `loadScenario` com scenario inválido
- [ ] S16.7.5 — Testar `executeAssertion` com expect success/failure (integration test)

---

## T16.8 — Commit do sistema de scenarios

- [ ] S16.8.1 — Commit: `feat(core): implement scenario system with assertions and reporting`

---

---

# FASE 17 — Comando `mocchi verify` {#fase-17}

**Objetivo:** Implementar o comando `verify` que executa um scenario declarativo.

**Duração estimada:** 2–3 horas

---

## T17.1 — Implementar o fluxo `verify` no Core

- [ ] S17.1.1 — Criar `packages/core/src/commands/verify.ts`
- [ ] S17.1.2 — Implementar `runVerify(opts: VerifyOptions): Promise<VerifyResult>`:
  - Encontrar e carregar scenario
  - Rodar `runScenario`
  - Retornar resultado

---

## T17.2 — Implementar comando verify na CLI

- [ ] S17.2.1 — Implementar handler do Commander
- [ ] S17.2.2 — Aceitar nome do scenario como argumento posicional: `mocchi verify <name>`
- [ ] S17.2.3 — Adicionar opção `--keep` para preservar sandbox após falha
- [ ] S17.2.4 — Adicionar opção `--list` para listar scenarios disponíveis
- [ ] S17.2.5 — Usar `formatScenarioReport` para exibir output exato do PRD
- [ ] S17.2.6 — Exit code 0 se todas assertions passaram, 1 se alguma falhou

---

## T17.3 — Criar scenario de exemplo

- [ ] S17.3.1 — Criar `examples/scenarios/audit-log-append-only.ts` como exemplo funcional
- [ ] S17.3.2 — Documentar como usar em `README.md`

---

## T17.4 — Testar o comando verify manualmente

- [ ] S17.4.1 — Criar scenario simples de teste
- [ ] S17.4.2 — Rodar `mocchi verify <nome>` e verificar output
- [ ] S17.4.3 — Testar com scenario que falha (assertion não satisfeita)
- [ ] S17.4.4 — Testar `mocchi verify --list`

---

## T17.5 — Commit do comando verify

- [ ] S17.5.1 — Commit: `feat(cli): implement mocchi verify command`

---

---

# FASE 18 — v0.2 Release — Hardening e qualidade {#fase-18}

**Objetivo:** Consolidar a v0.2 (Verification harness) antes de publicar.

**Duração estimada:** 6–8 horas

---

## T18.1 — Testes de integração da v0.2

- [ ] S18.1.1 — Criar teste E2E: `sql "SELECT 1;" --expect-success` → PASS
- [ ] S18.1.2 — Criar teste E2E: `sql "SELECT 1;" --expect-error 42501` → FAIL (query não falhou)
- [ ] S18.1.3 — Criar scenario de teste que cria tabela e valida permissão
- [ ] S18.1.4 — Criar teste E2E: `verify <scenario>` com scenario que passa
- [ ] S18.1.5 — Criar teste E2E: `verify <scenario>` com scenario que falha

---

## T18.2 — Polir o output do verify

- [ ] S18.2.1 — Revisar output contra o PRD seção 19 linha por linha
- [ ] S18.2.2 — Verificar que sandbox info aparece no início
- [ ] S18.2.3 — Verificar que cada assertion mostra expected vs received
- [ ] S18.2.4 — Verificar que summary final está correto
- [ ] S18.2.5 — Verificar que em caso de falha, DATABASE_URL e comando `mocchi shell` aparecem

---

## T18.3 — Documentação da v0.2

- [ ] S18.3.1 — Adicionar seção `mocchi sql` ao `README.md`
- [ ] S18.3.2 — Adicionar seção `mocchi verify` ao `README.md`
- [ ] S18.3.3 — Criar `docs/SCENARIOS.md` com guia completo de scenarios
- [ ] S18.3.4 — Documentar todos os campos de `defineScenario`
- [ ] S18.3.5 — Criar scenario de exemplo funcional com comentários
- [ ] S18.3.6 — Atualizar `CHANGELOG.md`

---

## T18.4 — Publicação e release v0.2.0

- [ ] S18.4.1 — Bump de versão para `0.2.0` em todos os pacotes
- [ ] S18.4.2 — Publicar no npm
- [ ] S18.4.3 — Tag `v0.2.0` e GitHub Release
- [ ] S18.4.4 — Fechar issue `[META] v0.2`

---

---

# FASE 19 — Comando `mocchi migrate:test` {#fase-19}

**Objetivo:** Implementar o teste de migrations: aplicar em sandbox, medir tempo, validar sucesso ou falha esperada.

**Duração estimada:** 3–4 horas

---

## T19.1 — Implementar o fluxo `migrate:test` no Core

- [ ] S19.1.1 — Criar `packages/core/src/commands/migrate-test.ts`
- [ ] S19.1.2 — Implementar `runMigrateTest(opts: MigrateTestOptions): Promise<MigrateTestResult>`:
  ```ts
  type MigrateTestOptions = {
    config: ResolvedMocchiConfig
    projectRoot: string
    expectFailure?: boolean
    expectError?: string  // SQLSTATE
  }
  type MigrateTestResult = {
    passed: boolean
    durationMs: number
    stdout: string
    stderr: string
    exitCode: number
    expectedFailure: boolean
    sqlstateReceived?: string
  }
  ```
- [ ] S19.1.3 — Criar sandbox vazio (sem rodar migrations ainda)
- [ ] S19.1.4 — Rodar migrations e medir tempo
- [ ] S19.1.5 — Se `expectFailure: true`: PASS se migration falhou, FAIL se passou
- [ ] S19.1.6 — Se `expectError`: PASS apenas se SQLSTATE corresponde (precisa parsear stderr para extrair código)
- [ ] S19.1.7 — Destruir sandbox ao final

---

## T19.2 — Implementar extração de SQLSTATE de stderr

- [ ] S19.2.1 — Criar `packages/postgres/src/error-parser.ts`
- [ ] S19.2.2 — Implementar `extractSqlstateFromOutput(text: string): string | null`:
  - Procurar padrão de SQLSTATE em output de psql, prisma, drizzle, etc
  - Suportar formatos: `ERROR: ... (SQLSTATE 42501)`, `error code: 42501`
  - Retornar `null` se não encontrar

---

## T19.3 — Implementar comando migrate:test na CLI

- [ ] S19.3.1 — Implementar handler do Commander
- [ ] S19.3.2 — Adicionar opção `--expect-failure`
- [ ] S19.3.3 — Adicionar opção `--expect-error <sqlstate>`
- [ ] S19.3.4 — Output de sucesso:
  ```
  [PASS] Sandbox created
  [PASS] Migrations applied (842ms)
  [PASS] Sandbox destroyed
  ```
- [ ] S19.3.5 — Output com expect-failure:
  ```
  [PASS] Migration failed with expected error 23505
  ```

---

## T19.4 — Testar o comando migrate:test manualmente

- [ ] S19.4.1 — Testar com migrations válidas (deve passar)
- [ ] S19.4.2 — Testar com migration inválida e `--expect-failure` (deve passar)

---

## T19.5 — Commit do comando migrate:test

- [ ] S19.5.1 — Commit: `feat(cli): implement mocchi migrate:test command`

---

---

# FASE 20 — Comando `mocchi migrate:report` {#fase-20}

**Objetivo:** Gerar relatório de migration em Markdown, útil para PRs.

**Duração estimada:** 2–3 horas

---

## T20.1 — Implementar o fluxo `migrate:report` no Core

- [ ] S20.1.1 — Criar `packages/core/src/commands/migrate-report.ts`
- [ ] S20.1.2 — Implementar `runMigrateReport(opts: MigrateReportOptions): Promise<MigrateReport>`:
  - Rodar `runMigrateTest` internamente
  - Gerar relatório estruturado com: timestamp, sandbox name, migration command, resultado, duração, stdout/stderr (truncados)
- [ ] S20.1.3 — Implementar detector básico de operações destrutivas no stdout:
  - Procurar por `DROP TABLE`, `TRUNCATE`, `DROP COLUMN`, `DELETE FROM` no migration output
  - Marcar como warning se encontrar

---

## T20.2 — Implementar formatador de relatório Markdown

- [ ] S20.2.1 — Criar `packages/core/src/scenarios/markdown-report.ts`
- [ ] S20.2.2 — Implementar `formatMigrateReport(report: MigrateReport): string`
- [ ] S20.2.3 — Formato do relatório:
  ```md
  # Mocchi Migration Report
  
  **Date:** 2026-05-29 23:59:00
  **Project:** my-project
  **Status:** ✅ PASS
  **Duration:** 842ms
  
  ## Details
  - Sandbox: sbx_main_4421
  - Migration command: yarn db:migrate
  
  ## Output
  ```
  migration output here
  ```
  
  ## Warnings
  - Detected destructive operation: DROP TABLE users
  ```

---

## T20.3 — Implementar comando migrate:report na CLI

- [ ] S20.3.1 — Implementar handler do Commander
- [ ] S20.3.2 — Adicionar opção `--output <file>` para salvar relatório em arquivo
- [ ] S20.3.3 — Output padrão: imprimir Markdown no stdout

---

## T20.4 — Commit do comando migrate:report

- [ ] S20.4.1 — Commit: `feat(cli): implement mocchi migrate:report command`

---

---

# FASE 21 — v0.3 Release — Hardening e qualidade {#fase-21}

**Objetivo:** Consolidar a v0.3 (Migration safety).

**Duração estimada:** 4–6 horas

---

## T21.1 — Testes de integração da v0.3

- [ ] S21.1.1 — Criar teste E2E: `migrate:test` com migrations válidas
- [ ] S21.1.2 — Criar teste E2E: `migrate:test --expect-failure` com migration inválida
- [ ] S21.1.3 — Criar fixture de migration inválida para testes

---

## T21.2 — Documentação da v0.3

- [ ] S21.2.1 — Adicionar seções `migrate:test` e `migrate:report` ao README
- [ ] S21.2.2 — Criar `docs/MIGRATIONS.md` com guia de uso em PRs
- [ ] S21.2.3 — Atualizar CHANGELOG.md

---

## T21.3 — Publicação e release v0.3.0

- [ ] S21.3.1 — Bump versão, publicar, tag, fechar issue

---

---

# FASE 22 — Template database cache {#fase-22}

**Objetivo:** Implementar a estratégia de performance: criar banco template com migrations aplicadas e clonar para sandboxes subsequentes.

**Duração estimada:** 6–8 horas

---

## T22.1 — Implementar o hash de migrations

- [ ] S22.1.1 — Criar `packages/core/src/cache/hash.ts`
- [ ] S22.1.2 — Implementar `computeMigrationsHash(migrationsDir: string): Promise<string>`:
  - Listar todos os arquivos de migration em ordem lexicográfica
  - Calcular SHA256 do conteúdo concatenado
  - Retornar hash de 16 chars (truncado)
- [ ] S22.1.3 — Implementar `hasMigrationsChanged(currentHash: string, cachedHash: string): boolean`
- [ ] S22.1.4 — Implementar `readCachedHash(cacheDir: string): Promise<string | null>`
- [ ] S22.1.5 — Implementar `writeCachedHash(cacheDir: string, hash: string): Promise<void>`

---

## T22.2 — Implementar o template database manager

- [ ] S22.2.1 — Criar `packages/postgres/src/template.ts`
- [ ] S22.2.2 — Implementar `createTemplateDatabase(opts: TemplateDatabaseOptions): Promise<string>`:
  - Nome padrão: `sbx_template_<hash>`
  - Criar banco, rodar migrations, marcar como não-conexão (usar `datallowconn = false` via `ALTER DATABASE`)
- [ ] S22.2.3 — Implementar `cloneFromTemplate(templateName: string, newName: string): Promise<void>`:
  - `CREATE DATABASE <newName> TEMPLATE <templateName>`
- [ ] S22.2.4 — Implementar `dropTemplateIfExists(templateName: string): Promise<void>`
- [ ] S22.2.5 — Implementar `templateExists(templateName: string): Promise<boolean>`

---

## T22.3 — Integrar template cache no Core

- [ ] S22.3.1 — Criar `packages/core/src/cache/manager.ts`
- [ ] S22.3.2 — Implementar `getOrCreateTemplate(opts: TemplateManagerOptions): Promise<string>`:
  - Verificar hash atual
  - Se hash mudou ou template não existe: criar novo template
  - Dropar template antigo
  - Retornar nome do template
- [ ] S22.3.3 — Modificar `createSandbox` para usar template cache quando configurado
- [ ] S22.3.4 — Adicionar opção `useTemplateCache: boolean` no `SandboxConfig`

---

## T22.4 — Adicionar opção de cache na configuração

- [ ] S22.4.1 — Adicionar `cache?: { enabled: boolean; migrationsDir?: string }` ao `SandboxConfig`
- [ ] S22.4.2 — Atualizar `defineMocchiConfig` tipos
- [ ] S22.4.3 — Atualizar validador de config

---

## T22.5 — Testar o template cache

- [ ] S22.5.1 — Testar: primeiro `mocchi ready` cria template e sandbox
- [ ] S22.5.2 — Testar: segundo `mocchi ready` usa template existente (muito mais rápido)
- [ ] S22.5.3 — Testar: após mudar migration, template é recriado
- [ ] S22.5.4 — Medir e comparar tempo com/sem cache

---

## T22.6 — Commit do template cache

- [ ] S22.6.1 — Commit: `feat(core): implement template database cache for fast sandbox creation`

---

---

# FASE 23 — Warm mode e snapshot {#fase-23}

**Objetivo:** Implementar reuso de sandbox e modo warm para execuções subsequentes rápidas.

**Duração estimada:** 4–5 horas

---

## T23.1 — Implementar reuso de sandbox

- [ ] S23.1.1 — Criar `packages/core/src/cache/reuse.ts`
- [ ] S23.1.2 — Implementar lógica de detecção de sandbox reutilizável:
  - Verificar se sandbox do state file ainda existe no cluster
  - Verificar se hash de migrations mudou desde criação
  - Se mudou: recriar (ou avisar user)
- [ ] S23.1.3 — Adicionar opção `--reuse` aos comandos `ready` e `run`

---

## T23.2 — Implementar warm mode

- [ ] S23.2.1 — Criar `packages/core/src/cache/warm.ts`
- [ ] S23.2.2 — Implementar `warmSandbox(opts: WarmOptions): Promise<void>`:
  - Criar sandbox e deixar pronto (como `ready`)
  - Mas sem destruir ao final
  - Registrar no state file como `status: warm`
- [ ] S23.2.3 — Ao executar `run` com sandbox warm disponível, reutilizar em vez de criar novo

---

## T23.3 — Comando `mocchi warm` (novo comando)

- [ ] S23.3.1 — Implementar `packages/cli/src/commands/warm.ts`
- [ ] S23.3.2 — `mocchi warm` — cria template + sandbox pronto para reuso
- [ ] S23.3.3 — `mocchi warm --template-only` — apenas cria o template

---

## T23.4 — Commit do warm mode

- [ ] S23.4.1 — Commit: `feat(core): implement warm mode and sandbox reuse`

---

---

# FASE 24 — v0.4 Release — Hardening e qualidade {#fase-24}

**Objetivo:** Consolidar a v0.4 (Performance).

**Duração estimada:** 6–8 horas

---

## T24.1 — Benchmarks

- [ ] S24.1.1 — Criar script de benchmark: `pnpm bench`
- [ ] S24.1.2 — Medir tempo de `mocchi ready` sem cache
- [ ] S24.1.3 — Medir tempo de `mocchi ready` com template cache
- [ ] S24.1.4 — Medir tempo de `mocchi ready` com sandbox reuse
- [ ] S24.1.5 — Documentar resultados em `docs/PERFORMANCE.md`

---

## T24.2 — Documentação da v0.4

- [ ] S24.2.1 — Criar `docs/PERFORMANCE.md` com guia de otimização
- [ ] S24.2.2 — Documentar opções de cache na `CONFIGURATION.md`
- [ ] S24.2.3 — Atualizar CHANGELOG.md

---

## T24.3 — Publicação e release v0.4.0

- [ ] S24.3.1 — Bump versão, publicar, tag, fechar issue

---

---

# FASE 25 — Modo CI {#fase-25}

**Objetivo:** Implementar o modo CI com logs compactos, output estruturado e confiabilidade total de exit codes.

**Duração estimada:** 4–6 horas

---

## T25.1 — Implementar modo CI

- [ ] S25.1.1 — Criar `packages/core/src/ci.ts`
- [ ] S25.1.2 — Implementar detecção de ambiente CI:
  - Verificar variáveis: `CI`, `GITHUB_ACTIONS`, `CIRCLECI`, `TRAVIS`, `JENKINS_URL`, `BUILDKITE`
- [ ] S25.1.3 — Implementar `isCiEnvironment(): boolean`

---

## T25.2 — Implementar output compacto para CI

- [ ] S25.2.1 — Criar `packages/cli/src/output-ci.ts`
- [ ] S25.2.2 — Implementar output compacto sem spinners, sem cores, com timestamps:
  ```
  [2026-05-29T23:59:00Z] mocchi: creating sandbox sbx_main_4421
  [2026-05-29T23:59:01Z] mocchi: running migrations
  [2026-05-29T23:59:03Z] mocchi: sandbox ready
  ```
- [ ] S25.2.3 — Ativar automaticamente quando `isCiEnvironment()` for true
- [ ] S25.2.4 — Ativar com flag `--ci`

---

## T25.3 — Implementar artifacts de relatório

- [ ] S25.3.1 — Adicionar opção `--report-file <path>` para salvar relatório JSON
- [ ] S25.3.2 — Implementar `writeJsonReport(filePath: string, result: unknown): Promise<void>`
- [ ] S25.3.3 — Suportar output de relatório para: `verify`, `migrate:test`, `migrate:report`

---

## T25.4 — Implementar config por ambiente

- [ ] S25.4.1 — Suportar `mocchi.config.ci.ts` como config específica para CI
- [ ] S25.4.2 — Mesclar config base com config CI quando em ambiente CI
- [ ] S25.4.3 — Documentar campos que mudam tipicamente em CI: cleanup, timeout, cache

---

## T25.5 — Implementar GitHub Actions workflow de exemplo

- [ ] S25.5.1 — Criar `examples/github-actions/test-with-mocchi.yml`:
  ```yaml
  name: Tests
  on: [push]
  jobs:
    test:
      runs-on: ubuntu-latest
      services:
        postgres:
          image: postgres:16
          env:
            POSTGRES_PASSWORD: postgres
          ports:
            - 5432:5432
      steps:
        - uses: actions/checkout@v4
        - run: npm ci
        - run: npx mocchi run -- npm test
          env:
            DATABASE_URL: postgres://postgres:postgres@localhost:5432/mydb
  ```

---

## T25.6 — Testar em ambiente CI real

- [ ] S25.6.1 — Criar GitHub Actions workflow que usa `mocchi run` nos próprios testes do Mocchi
- [ ] S25.6.2 — Verificar que exit codes são propagados corretamente no CI
- [ ] S25.6.3 — Verificar que output compacto funciona no GitHub Actions log

---

## T25.7 — Commit do modo CI

- [ ] S25.7.1 — Commit: `feat(cli): implement CI mode with compact output and report artifacts`

---

---

# FASE 26 — v0.5 Release — Hardening e qualidade {#fase-26}

**Objetivo:** Consolidar a v0.5 (CI mode). Essa é a versão de feature-complete do MVP.

**Duração estimada:** 8–10 horas

---

## T26.1 — Revisão de segurança final

- [ ] S26.1.1 — Auditoria completa de todas as operações destrutivas
- [ ] S26.1.2 — Verificar guards em todos os caminhos de código
- [ ] S26.1.3 — Testar com banco de produção simulado (deve bloquear tudo)
- [ ] S26.1.4 — Verificar que senhas não aparecem em logs de CI

---

## T26.2 — Testes de integração completos da v0.5

- [ ] S26.2.1 — Criar suite de teste E2E completa cobrindo todos os comandos
- [ ] S26.2.2 — Testar em GitHub Actions com PostgreSQL como service
- [ ] S26.2.3 — Verificar coverage de testes unitários (meta: 70%+ nas funções críticas)

---

## T26.3 — Documentação final do MVP

- [ ] S26.3.1 — Revisar e atualizar `README.md` completo
- [ ] S26.3.2 — Criar `docs/CI.md` com guia de integração com CI
- [ ] S26.3.3 — Criar `docs/TROUBLESHOOTING.md` com problemas comuns e soluções
- [ ] S26.3.4 — Atualizar `CHANGELOG.md`

---

## T26.4 — Publicação e release v0.5.0

- [ ] S26.4.1 — Bump versão, publicar, tag, fechar issue

---

---

# FASE 27 — Documentação pública {#fase-27}

**Objetivo:** Criar documentação de alta qualidade para atrair a comunidade. Documentação é o produto para open source.

**Duração estimada:** 8–12 horas

---

## T27.1 — Criar site de documentação

- [ ] S27.1.1 — Escolher ferramenta: Nextra (Next.js) ou VitePress ou Docusaurus
- [ ] S27.1.2 — Criar repositório separado `mocchi-docs` ou pasta `docs-site/` no monorepo
- [ ] S27.1.3 — Configurar domínio: `mocchi.dev` ou `docs.mocchi.dev` (registrar)
- [ ] S27.1.4 — Configurar deploy no Vercel ou Netlify

---

## T27.2 — Escrever documentação completa

- [ ] S27.2.1 — Página: Getting Started (install → init → doctor → ready → run → down)
- [ ] S27.2.2 — Página: Configuration reference (cada campo com tipo, default, exemplo)
- [ ] S27.2.3 — Página: Commands reference (cada comando, cada opção, exemplos)
- [ ] S27.2.4 — Página: Scenarios (o que são, como escrever, exemplos reais)
- [ ] S27.2.5 — Página: Migrations (migrate:test, migrate:report, uso em PRs)
- [ ] S27.2.6 — Página: CI Integration (GitHub Actions, CircleCI, Buildkite)
- [ ] S27.2.7 — Página: Performance (template cache, warm mode, dicas)
- [ ] S27.2.8 — Página: Security (como as proteções funcionam)
- [ ] S27.2.9 — Página: Troubleshooting (problemas comuns)
- [ ] S27.2.10 — Página: API Reference (para quem usa `@mocchi/core` programaticamente)

---

## T27.3 — Escrever blog post de lançamento

- [ ] S27.3.1 — Rascunhar post: "Why I built Mocchi — stop breaking your local database"
- [ ] S27.3.2 — Incluir: problema, solução, exemplos reais, demonstração
- [ ] S27.3.3 — Incluir GIF de demo do terminal
- [ ] S27.3.4 — Publicar no blog do site ou em dev.to/hashnode

---

---

# FASE 28 — Exemplo real: NestJS + Prisma {#fase-28}

**Objetivo:** Criar um exemplo real funcional que qualquer dev pode clonar e rodar para ver o Mocchi em ação.

**Duração estimada:** 4–6 horas

---

## T28.1 — Criar o projeto de exemplo

- [ ] S28.1.1 — Criar `examples/nestjs-prisma-api/` com um projeto NestJS + Prisma básico
- [ ] S28.1.2 — Incluir schema Prisma com tabelas: `users`, `audit_log`
- [ ] S28.1.3 — Adicionar regra RLS/trigger no PostgreSQL que bloqueia UPDATE/DELETE em `audit_log`
- [ ] S28.1.4 — Configurar `docker-compose.yml` com PostgreSQL
- [ ] S28.1.5 — Configurar `mocchi.config.ts`
- [ ] S28.1.6 — Criar scenario `audit-log-append-only`
- [ ] S28.1.7 — Adicionar testes E2E que usam `DATABASE_URL` injetado pelo Mocchi
- [ ] S28.1.8 — Criar `README.md` do exemplo com passo a passo completo

---

## T28.2 — Documentar o exemplo

- [ ] S28.2.1 — Documentar o exemplo na documentação oficial
- [ ] S28.2.2 — Criar vídeo ou GIF de demo rodando o exemplo do zero
- [ ] S28.2.3 — Incluir link para o exemplo no README principal

---

---

# FASE 29 — Open source launch {#fase-29}

**Objetivo:** Fazer um lançamento planejado para conseguir tracção na comunidade.

**Duração estimada:** 4–6 horas (mais contínuo)

---

## T29.1 — Preparar o repositório para o lançamento

- [ ] S29.1.1 — Verificar que `CONTRIBUTING.md` tem instruções claras
- [ ] S29.1.2 — Criar issues com label `good first issue` para contribuições externas
- [ ] S29.1.3 — Criar issue template para bug report
- [ ] S29.1.4 — Criar issue template para feature request
- [ ] S29.1.5 — Criar pull request template
- [ ] S29.1.6 — Configurar GitHub Discussions para Q&A da comunidade
- [ ] S29.1.7 — Verificar que CI passa em 100% dos testes
- [ ] S29.1.8 — Verificar que `npx @mocchi/cli init` funciona sem instalação prévia

---

## T29.2 — Preparar material de divulgação

- [ ] S29.2.1 — Gravar demo em terminal (usar `asciinema` ou similar)
- [ ] S29.2.2 — Escrever post para Hacker News Show HN
- [ ] S29.2.3 — Escrever post para Reddit r/node, r/PostgreSQL, r/typescript
- [ ] S29.2.4 — Escrever thread para Twitter/X com demo e link
- [ ] S29.2.5 — Escrever post dev.to com tutorial completo

---

## T29.3 — Lançamento

- [ ] S29.3.1 — Postar em Hacker News (Show HN: Mocchi – Disposable PostgreSQL sandboxes for backend engineers)
- [ ] S29.3.2 — Postar nos subreddits
- [ ] S29.3.3 — Postar no Twitter/X
- [ ] S29.3.4 — Postar em Discord/Slack de comunidades de backend (NodeJS, Prisma, NestJS, etc)
- [ ] S29.3.5 — Abrir `mocchi.dev` ao público
- [ ] S29.3.6 — Monitorar issues e responder no primeiro dia

---

## T29.4 — Manutenção pós-lançamento

- [ ] S29.4.1 — Responder todas as issues em até 48h no primeiro mês
- [ ] S29.4.2 — Criar roadmap público no GitHub Projects
- [ ] S29.4.3 — Coletar feedback da comunidade e priorizar próximas features
- [ ] S29.4.4 — Planejar v0.6 com base no feedback (possíveis: suporte MySQL, integração profunda Prisma, dashboard TUI, etc)

---

---

## Sumário de versões

| Versão | Fases | Entregas principais |
|--------|-------|---------------------|
| v0.1.0 | 0–14 | Monorepo, config, postgres, docker, core, CLI scaffold, `doctor`, `init`, `ready`, `down`, `run`, `reset`, `shell` |
| v0.2.0 | 15–18 | `sql` com expect-error/success, sistema de scenarios, `verify` |
| v0.3.0 | 19–21 | `migrate:test`, `migrate:report`, detection de ops destrutivas |
| v0.4.0 | 22–24 | Template database cache, warm mode, sandbox reuse |
| v0.5.0 | 25–26 | Modo CI, output compacto, report artifacts, config por ambiente |
| launch | 27–29 | Documentação pública, exemplo NestJS+Prisma, open source launch |

---

## Estimativa de tempo total (solo dev)

| Fase | Estimativa |
|------|------------|
| Fases 0–6 (setup + core packages + CLI scaffold) | ~25–35h |
| Fases 7–14 (comandos v0.1 + release) | ~30–40h |
| Fases 15–18 (sql + verify + v0.2) | ~20–28h |
| Fases 19–21 (migrate + v0.3) | ~12–18h |
| Fases 22–24 (performance + v0.4) | ~20–28h |
| Fases 25–26 (CI + v0.5) | ~18–24h |
| Fases 27–29 (docs + launch) | ~20–28h |
| **Total estimado** | **~145–200 horas** |

> Com dedicação de ~15h/semana (desenvolvimento solo paralelo a trabalho/faculdade), o MVP completo (v0.5) fica pronto em ~7 meses. Com mais tempo por semana, pode ser em 3–4 meses.

---

## Princípio de desenvolvimento para solo dev

Faz uma coisa por vez, do mais profundo para o mais superficial:

```
Config → Postgres → Docker → Core → CLI
```

Nunca trabalhe na CLI sem o Core estar funcionando. Nunca trabalhe no Core sem o Postgres estar testado. Cada pacote tem seus próprios testes antes de avançar.

Commit pequeno e frequente. A cada Tarefa concluída, um commit. A cada Fase concluída, um checkpoint.

---

*Roadmap gerado em 2026-05-29 | Mocchi PRD v1.0*
