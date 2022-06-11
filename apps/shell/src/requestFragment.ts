import {Request, Response} from 'express'
import http from 'http'
import https from 'https'
import {URL} from 'node:url'

const getFragmentURL = (fragmentURL: string, req: Request): URL => {
  const url = new URL(fragmentURL)
  const {protocol, host} = url
  const baseURL = `${protocol}//${host}`

  switch (true) {
    case /\/posts\/\:postId$/.test(fragmentURL): {
      return new URL(req.url, baseURL)
    }
    default:
      return url
  }
}

const requestFragment = (fragmentUrl: string, _: FragmentAttributes, req: Request): Promise<Response> =>
  new Promise((resolve, reject) => {
    try {
      const options = getFragmentURL(fragmentUrl, req)
      const isHTTP = options.protocol === 'http:'

      const fragmentRequest = isHTTP ? http.request(options) : https.request(options)
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
