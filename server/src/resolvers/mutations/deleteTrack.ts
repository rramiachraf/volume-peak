import fs from 'fs'
import { join } from 'path'
import { artworkDestination, songDestination } from '../../rest/addTrack'
import { Resolver } from '../../types/resolver'

const query = `
    DELETE FROM tracks 
    WHERE id = $1
    RETURNING song
`

export const deleteTrack: Resolver = async (_, { id }, { pool }) => {
  try {
    const { rows, rowCount } = await pool.query(query, [id])
    if (rowCount === 0) {
      throw new Error()
    }
    await fs.promises.unlink(join(songDestination, rows[0].song))
    await fs.promises.unlink(join(artworkDestination, rows[0].song))
    return true
  } catch (e) {
    return false
  }
}
