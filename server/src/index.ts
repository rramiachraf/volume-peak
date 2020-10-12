import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import 'dotenv/config'

import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'
import { pool } from './database'

import { addTrack } from './rest/addTrack'
import { readTrack } from './rest/readTrack'
import { readArtwork } from './rest/readArtwork'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ pool, req })
})

const app = express()

app.set('trust proxy', 1)

app.use(cors({ origin: process.env.CORS!, credentials: true }))

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    name: 'session_id',
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'strict',
      signed: true
    }
  })
)

app.use(addTrack)
app.use(readTrack)
app.use(readArtwork)

server.applyMiddleware({
  app,
  path: '/gql',
  cors: { origin: '', credentials: true }
})

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at ${server.graphqlPath}`)
)
