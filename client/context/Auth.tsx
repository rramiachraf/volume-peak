import { Context, createContext, Dispatch, useState } from 'react'

interface defaultValues {
  authenticated: boolean
  id: number
  artistName: string
  setId: Dispatch<any>
  setArtistName: Dispatch<any>
  setAuth: Dispatch<any>
}

export const AuthContext = createContext(null) as Context<defaultValues>

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuth] = useState(undefined)
  const [id, setId] = useState(undefined)
  const [artistName, setArtistName] = useState(undefined)
  return (
    <AuthContext.Provider
      value={{ id, setId, artistName, setArtistName, authenticated, setAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}
