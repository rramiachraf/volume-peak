import { Router } from 'express'
import fs from 'fs'
import { join } from 'path'

import { pool } from '../database'
import { artworkDestination } from './addTrack'

const route = Router()

export const readArtwork = route.get(
  '/artwork/:id',
  async ({ params }, res) => {
    try {
      const { rowCount, rows } = await pool.query(
        `
        SELECT file_name, content_type FROM artworks
        WHERE file_name = $1
      `,
        [params.id]
      )

      if (rowCount === 0) {
        throw new Error()
      }

      const artwork = fs.createReadStream(join(artworkDestination, params.id))

      res.setHeader('Content-Type', rows[0].content_type)
      artwork.pipe(res)
    } catch (e) {
      res.status(404).send()
    }
  }
)
