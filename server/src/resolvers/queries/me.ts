import { AuthenticationError } from 'apollo-server-express'
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

export const me: Resolver = async (_, __, { pool, req }) => {
  const { userId } = req.session
  try {
    const { rows, rowCount } = await pool.query(query, [userId])
    if (rowCount === 0) {
      throw new Error()
    }
    return rows[0]
  } catch (e) {
    throw new AuthenticationError('Not authenticated')
  }
}
