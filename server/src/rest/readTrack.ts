import { Router } from 'express'
import fs from 'fs'
import { join } from 'path'

import { pool } from '../database'
import { songDestination } from './addTrack'

const route = Router()

export const readTrack = route.get('/track/:id', async ({ params }, res) => {
  try {
    const { rowCount, rows } = await pool.query(
      `
        SELECT song, content_type FROM tracks
        WHERE song = $1
      `,
      [params.id]
    )

    if (rowCount === 0) {
      throw new Error()
    }

    const readableStream = fs.createReadStream(join(songDestination, params.id))

    res.setHeader('Content-Type', rows[0].content_type)
    readableStream.pipe(res)
  } catch (e) {
    res.status(404).send()
  }
})
