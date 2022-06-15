export type Nullable<TData> = null | TData
export type Result<TData> = [Error] | [undefined, TData]
export type Post = {
  id: string
  title: string
  html: string
  createdAt: string
  updatedAt: string
}

export type HTTPResponse<TData> = {
  status: number
  success: boolean
  message?: string
  data?: TData
}

export type User = {
  email?: string
  exp: number
  iat: number
  sub: string
  aud: string
  iss: string
  uid: string
}
