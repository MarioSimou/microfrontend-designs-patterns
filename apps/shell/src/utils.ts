import path from 'path'
import {cwd} from 'process'
export const getPath = (...args: string[]) => path.join(cwd(), ...args)

const {APPLICATION_AUTH_BASE_URL, APPLICATION_POSTS_BASE_URL} = process.env

if (!APPLICATION_AUTH_BASE_URL || !APPLICATION_POSTS_BASE_URL) {
  throw new Error('error: invalid configuration')
}

export const applications = {
  posts: {
    baseURL: APPLICATION_POSTS_BASE_URL,
  },
  auth: {
    baseURL: APPLICATION_AUTH_BASE_URL,
  },
}
