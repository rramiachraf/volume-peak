import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient(process.env.GQL_URL, {
  credentials: 'include',
  mode: 'cors'
})
