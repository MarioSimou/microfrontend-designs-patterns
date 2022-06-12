import {Request, Response} from 'express'
import http from 'http'
import https from 'https'
import {URL} from 'node:url'
import {applications} from './utils'

type Application = 'posts' | 'auth'
type Maybe<TData> = TData | undefined

const getApplicationName = (pathName: string): Maybe<Application> => {
  switch (true) {
    case /\/posts(\/.+)?$/.test(pathName): {
      return 'posts'
    }
    case /\/sign-in/.test(pathName): {
      return 'auth'
    }
    default: {
      return undefined
    }
  }
}

const getApplicationBaseURL = (applicationName: Maybe<Application>): Maybe<string> => {
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

const getFragmentURL = (req: Request): URL => {
  const applicationName = getApplicationName(req.url)
  const baseURL = getApplicationBaseURL(applicationName)

  // fallback url
  if (!baseURL || !applicationName) {
    return new URL('http://localhost:3000/public/404.html')
  }

  return new URL(req.url, baseURL)
}

const requestFragment = (_: string, __: FragmentAttributes, req: Request): Promise<Response> =>
  new Promise((resolve, reject) => {
    try {
      const options = getFragmentURL(req)

      const fragmentRequest = req.secure ? https.request(options) : http.request(options)
      fragmentRequest.on('response', (res: Response) => {
        if (res.statusCode !== 200) {
          return reject('error')
        }
        return resolve(res)
      })
      fragmentRequest.on('error', reject)
      fragmentRequest.end()
    } catch (e) {
      if (e instanceof Error) {
        req.log.error(e.message)
        return reject(e.message)
      }

      req.log.error('internal server error: request fragment')
      return reject('internal server error: request fragment')
    }
  })

export default requestFragment
