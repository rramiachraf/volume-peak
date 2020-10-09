import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server-express'

import { Resolver } from '../../types/resolver'
import { User } from '../../types/database'

const query = `
    SELECT id, email, password,
    created_at AS "createdAt",
    artist_name AS "artistName"
    FROM artists
    WHERE email = $1
`

export const loginArtist: Resolver = async (
  _,
  { email, password },
  { pool, req }
) => {
  try {
    const { rowCount, rows } = await pool.query(query, [email])

    if (rowCount === 0) {
      throw new Error()
    }

    const user: User = rows[0]

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      throw new Error()
    }

    req.session.userId = user.id
    return user
  } catch (e) {
    throw new AuthenticationError('Invalid credentials')
  }
}
