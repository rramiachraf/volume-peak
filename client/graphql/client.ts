import { GraphQLClient } from 'graphql-request'
import isNode from 'detect-node'

const url = isNode ? process.env.GQL_URL_SERVER : process.env.GQL_URL_CLIENT

export const client = new GraphQLClient(url, {
  credentials: 'include',
  mode: 'cors'
})
