import { describe, expect, it } from 'vitest'

import { wrapQuery } from '../result.js'

describe('wrapQuery', () => {
  it('returns successful rows and row count', async () => {
    const rows = Object.assign([{ id: 1 }], { count: 3 })

    await expect(wrapQuery(async () => rows)).resolves.toEqual({
      success: true,
      rows: [{ id: 1 }],
      rowCount: 3,
    })
  })

  it('captures SQLSTATE and postgres error fields', async () => {
    const error = Object.assign(new Error('permission denied for table users'), {
      code: '42501',
      detail: 'Missing SELECT privilege.',
      hint: 'Grant SELECT on users.',
      position: '12',
    })

    await expect(
      wrapQuery(async () => {
        throw error
      }),
    ).resolves.toEqual({
      success: false,
      error: {
        message: 'permission denied for table users',
        sqlstate: '42501',
        detail: 'Missing SELECT privilege.',
        hint: 'Grant SELECT on users.',
        position: '12',
      },
    })
  })

  it('captures unknown errors without throwing', async () => {
    await expect(
      wrapQuery(async () => {
        throw 'unexpected failure'
      }),
    ).resolves.toEqual({
      success: false,
      error: {
        message: 'Unknown PostgreSQL query error',
        sqlstate: 'XXXXX',
      },
    })
  })
})
