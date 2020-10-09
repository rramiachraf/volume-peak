import { Resolver } from '../../types/resolver'

const query = `
  SELECT tracks.id AS id, 
  song AS artwork,
  duration, name, song, year, 
  content_type AS "contentType", 
  artist_name AS "artist" FROM tracks
  INNER JOIN artists ON tracks.artist = artists.id
  WHERE tracks.id = $1
`

export const track: Resolver = async (_, { id }, { pool }) => {
  try {
    const { rows, rowCount } = await pool.query(query, [id])
    if (rowCount === 0) {
      throw new Error()
    }

    return rows[0]
  } catch (e) {
    throw new Error('Track not found')
  }
}
