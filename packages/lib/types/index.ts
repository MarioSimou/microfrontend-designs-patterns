export type Nullable<TData> = null | TData
export type Result<TData> = [Error] | [undefined, TData]
export type Post = {
  id: string
  title: string
  html: string
  createdAt: string
  updatedAt: string
}
