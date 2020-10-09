import { Resolver } from '../../types/resolver'

const query = `
  SELECT tracks.id AS id, 
  song AS artwork,
  duration, name, song, year, 
  content_type AS "contentType", 
  artist_name AS "artist" FROM tracks
  INNER JOIN artists ON tracks.artist = artists.id
  WHERE artists.id = $1
`

export const tracks: Resolver = async (_, { artist }, { pool }) => {
  try {
    const { rows, rowCount } = await pool.query(query, [artist])
    if (rowCount === 0) {
      return []
    }

    return rows
  } catch (e) {
    throw new Error('Track not found')
  }
}
