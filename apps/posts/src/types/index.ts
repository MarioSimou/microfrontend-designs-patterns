import type {Nullable} from 'lib/types'

export * from 'lib/types'

type Data = Record<string, unknown>
type Fallback = Record<string, unknown>

export type ServerProps<TData extends Data, TFallback extends Nullable<Fallback> = null> = TFallback extends Fallback
  ? TData & Fallback & {cacheKey: string}
  : TData

export type PageProps<TData extends Data = {}, ServerData extends Nullable<Data> = null> = ServerData extends Data
  ? TData & ServerData
  : TData
