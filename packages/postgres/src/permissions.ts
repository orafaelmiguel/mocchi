import { createClient, type PostgresClient } from './client.js'
import { createDatabase, dropDatabase } from './operations.js'

export async function checkCanCreateDatabase(client: PostgresClient): Promise<boolean> {
  const databaseName = createPermissionCheckDatabaseName()
  let created = false

  try {
    await createDatabase(client, databaseName)
    created = true
  } catch {
    return false
  }

  if (!created) {
    return false
  }

  try {
    await dropDatabase(client, databaseName)
    return true
  } catch {
    return false
  }
}

export async function checkCanConnect(url: string): Promise<boolean> {
  const client = createClient(url)

  try {
    await client.connect()
    return true
  } catch {
    return false
  } finally {
    await closeClientQuietly(client)
  }
}

async function closeClientQuietly(client: PostgresClient): Promise<void> {
  try {
    await client.end()
  } catch {
    // Permission checks must report only true or false.
  }
}

function createPermissionCheckDatabaseName(): string {
  const timestamp = Date.now().toString(36)
  const suffix = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')

  return `sbx_permission_check_${timestamp}_${suffix}`
}
