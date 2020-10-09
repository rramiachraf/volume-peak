import { Resolver } from '../../types/resolver'

const query = `
  SELECT 
  id,
  artist_name AS "artistName",
  email,
  created_at AS "createdAt"
  FROM artists
  WHERE id = $1
`

export const artist: Resolver = async (_, { id }, { pool }) => {
  try {
    const { rows, rowCount } = await pool.query(query, [id])
    if (rowCount === 0) {
      throw new Error()
    }
    return rows[0]
  } catch (e) {
    throw new Error('User not found')
  }
}
