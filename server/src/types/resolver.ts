import { PoolClient } from 'pg'
import {
  IGraphQLToolsResolveInfo,
  IResolverObject
} from 'apollo-server-express'

export type Resolver = (
  parent: IResolverObject,
  args: Args,
  context: Context,
  info: IGraphQLToolsResolveInfo
) => any

interface Context {
  pool: PoolClient
  req: any
}

interface Args extends Data {
  id: number
  data: Data
  artist: number
}

interface Data {
  artistName: string
  email: string
  password: string
}
