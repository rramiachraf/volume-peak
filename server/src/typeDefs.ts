import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Artist {
    id: ID!
    artistName: String!
    email: String!
    createdAt: String!
  }

  type Track {
    id: ID!
    name: String!
    artist: String!
    artwork: String
    song: String!
    contentType: String!
    duration: Int!
    year: Int!
  }

  type Query {
    me: Artist
    artist(id: ID!): Artist
    tracks(artist: ID!): [Track]!
    track(id: ID!): Track!
  }

  type Mutation {
    createArtist(data: CreateArtistInput): Boolean!
    loginArtist(email: String!, password: String!): Artist!
    logout: Boolean!
    deleteTrack(id: ID!): Boolean!
  }

  input CreateArtistInput {
    artistName: String!
    email: String!
    password: String!
  }
`
