import { describe, expect, it } from 'vitest'

import { createClient } from '../client.js'
import { createDatabase, databaseExists, dropDatabase } from '../operations.js'

const testDatabaseUrl = process.env['MOCCHI_TEST_DATABASE_URL'] ?? ''
const describeWithDatabase = testDatabaseUrl ? describe : describe.skip

describeWithDatabase('database operations integration', () => {
  it('creates, checks and drops a database', async () => {
    const client = createClient(testDatabaseUrl)
    const databaseName = `sbx_integration_${Date.now().toString(36)}`

    try {
      await expect(databaseExists(client, databaseName)).resolves.toBe(false)

      await createDatabase(client, databaseName)

      await expect(databaseExists(client, databaseName)).resolves.toBe(true)

      await dropDatabase(client, databaseName)

      await expect(databaseExists(client, databaseName)).resolves.toBe(false)
    } finally {
      await dropDatabase(client, databaseName).catch(() => {})
      await client.end().catch(() => {})
    }
  })
})
