import bcrypt from 'bcrypt'

import { Resolver } from '../../types/resolver'

const query = `
  INSERT INTO artists(artist_name, email, password)
  VALUES($1, $2, $3)
  RETURNING id, artist_name
`

export const createArtist: Resolver = async (_, { data }, { pool }) => {
  try {
    const { artistName, email, password } = data
    const hashedPassword = await bcrypt.hash(password, 12)
    await pool.query(query, [artistName, email, hashedPassword])
    return true
  } catch (e) {
    return false
  }
}
