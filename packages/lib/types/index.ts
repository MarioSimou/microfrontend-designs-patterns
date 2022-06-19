import type {NextApiRequest, NextApiResponse} from 'next'

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

export interface Request<TBody> extends NextApiRequest {
  body: TBody
}

export type RequestBody = Record<string, unknown>
export type APIHandler<TData = unknown, TBody extends RequestBody = RequestBody> = (
  req: Request<TBody>,
  res: NextApiResponse<TData>
) => Promise<void>
