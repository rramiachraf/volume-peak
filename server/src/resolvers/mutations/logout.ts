import { Resolver } from '../../types/resolver'

export const logout: Resolver = async (_, __, { req }) => {
  const logoutUser = () => {
    return new Promise((resolve, reject) => {
      req.session.destroy((err: any) => {
        if (err) {
          reject(err)
        }
        resolve(true)
      })
    })
  }
  try {
    await logoutUser()
    return true
  } catch (e) {
    return false
  }
}
