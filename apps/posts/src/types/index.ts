import type {Nullable, User} from 'lib/types'

export * from 'lib/types'

type AnyData = Record<string, unknown>
type Fallback = Record<string, unknown>
type DefaultData = {
  user: User
}

export type ServerProps<
  TData extends AnyData = AnyData,
  TFallback extends Nullable<Fallback> = null
> = TFallback extends Fallback ? TData & Fallback & {cacheKey: string} & DefaultData : TData & DefaultData

export type PageProps<
  TData extends AnyData = AnyData,
  ServerData extends Nullable<AnyData> = null
> = ServerData extends AnyData ? TData & ServerData & DefaultData : TData & DefaultData
