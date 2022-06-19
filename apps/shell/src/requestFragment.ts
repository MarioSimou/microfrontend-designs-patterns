import {Request, Response} from 'express'
import http from 'http'
import https, {RequestOptions} from 'https'
import {URL} from 'node:url'
import {getApplicationName, getApplicationBaseURL} from './utils'

const getFragmentURL = (req: Request): URL => {
  const applicationName = getApplicationName(req.url)
  const baseURL = getApplicationBaseURL(applicationName)

  // fallback url
  if (!baseURL || !applicationName) {
    const appBaseURL = process.env.APPLICATION_BASE_URL
    return new URL('public/404.html', appBaseURL)
  }

  return new URL(req.url, baseURL)
}

const requestFragment = (_: string, __: FragmentAttributes, req: Request): Promise<Response> =>
  new Promise((resolve, reject) => {
    try {
      const {hostname, host, origin, port, protocol, pathname} = getFragmentURL(req)
      const options: RequestOptions = {
        headers: {
          ...req.headers,
          origin,
        },
        hostname,
        host,
        port,
        protocol,
        path: pathname,
      }

      const fragmentRequest = protocol === 'http:' ? http.request(options) : https.request(options)
      fragmentRequest.on('response', (res: Response) => {
        if (res.statusCode >= 400) {
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
