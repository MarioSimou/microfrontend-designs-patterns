import {getProfileVerifyURL} from '@features/configuration'
import type {Result, HTTPResponse} from '@types'
import type {DecodedIdToken} from 'firebase-admin/auth'

export const verifyToken = async (token: string): Promise<Result<DecodedIdToken>> => {
  try {
    const url = getProfileVerifyURL()

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({token}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const {status, data, success, message}: HTTPResponse<DecodedIdToken> = await res.json()

    if (!success) {
      const e = new Error(`status: ${status}\tmessage: ${message}`)
      return [e]
    }

    if (!data) {
      const e = new Error('error: data not found')
      return [e]
    }
    return [undefined, data]
  } catch (e) {
    return [e as Error]
  }
}
