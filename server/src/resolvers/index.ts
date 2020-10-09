import { IResolvers } from 'apollo-server-express'

import { createArtist } from './mutations/createArtist'
import { loginArtist } from './mutations/loginArtist'
import { logout } from './mutations/logout'
import { deleteTrack } from './mutations/deleteTrack'

import { artist } from './queries/artist'
import { track } from './queries/track'
import { tracks } from './queries/tracks'
import { me } from './queries/me'

export const resolvers: IResolvers = {
  Query: { artist, track, tracks, me },
  Mutation: { createArtist, loginArtist, deleteTrack, logout }
}
