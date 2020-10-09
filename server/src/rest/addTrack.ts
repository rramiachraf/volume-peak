import { Router } from 'express'
import multer from 'multer'
import { parseFile } from 'music-metadata'
import { join } from 'path'
import fs from 'fs'

import { pool } from '../database'

const router = Router()

export const songDestination = join(__dirname, '../../', 'songs')
export const artworkDestination = join(__dirname, '../../', 'artworks')

const upload = multer({
  dest: songDestination,
  limits: { fileSize: 20000000 },
  fileFilter(_, { mimetype }, cb) {
    const regex = /^audio\/.+$/
    if (!mimetype.match(regex)) {
      return cb(new Error('file must be an audio file'))
    }
    cb(null, true)
  }
})

const addArtworkQuery = `
    INSERT INTO artworks(file_name, content_type)
    VALUES($1, $2)
    RETURNING id
`

const addSongQuery = `
    INSERT INTO tracks(name, artwork, song, duration, content_type, artist, year)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
`

export const addTrack = router.post(
  '/addTrack',
  upload.single('song'),
  async ({ file, session }, res) => {
    try {
      const song = join(file.destination, file.filename)

      const { common, format } = await parseFile(song)
      const { picture, title, year } = common
      const { duration } = format
      const { format: artworkType, data } = picture![0]

      await fs.promises.writeFile(join(artworkDestination, file.filename), data)

      const { rows: artworkRows } = await pool.query(addArtworkQuery, [
        file.filename,
        artworkType
      ])
      const artworkId = artworkRows[0].id

      const { rows: songRows } = await pool.query(addSongQuery, [
        title,
        artworkId,
        file.filename,
        duration?.toFixed(0),
        file.mimetype,
        session!.userId,
        year
      ])

      res.status(201).send({ id: songRows[0].id })
    } catch (e) {
      console.log(e)
      res.status(500).send()
    }
  }
)
