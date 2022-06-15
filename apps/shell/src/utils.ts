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

type Application = 'posts' | 'auth'
type Maybe<TData> = TData | undefined

export const getApplicationName = (pathName: string): Maybe<Application> => {
  switch (true) {
    case /\/posts(\/.+)?$/.test(pathName): {
      return 'posts'
    }
    case /\/api\/v1\/profile\/verify$/.test(pathName):
    case /\/sign-(in|up)$/.test(pathName): {
      return 'auth'
    }
    default: {
      return undefined
    }
  }
}

export const getApplicationBaseURL = (applicationName: Maybe<Application>): Maybe<string> => {
  switch (applicationName) {
    case 'auth': {
      return applications.auth.baseURL
    }
    case 'posts': {
      return applications.posts.baseURL
    }
    default: {
      return undefined
    }
  }
}
