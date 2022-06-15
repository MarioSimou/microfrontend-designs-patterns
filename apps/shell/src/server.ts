import express from 'express'
import Tailor from 'node-tailor'
import fetchTemplate from './fetchTemplate'
import requestFragment from './requestFragment'
import {getPath, getApplicationBaseURL, getApplicationName} from './utils'
import pinoHTTP from 'pino-http'
import {URL} from 'node:url'

const port = process.env.PORT ?? 3000
const server = express()
const pagesPath = getPath('src', 'apps')
const pino = pinoHTTP({
  autoLogging: false,
})

const tailor = new Tailor({
  templatesPath: pagesPath,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchTemplate: fetchTemplate as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestFragment: requestFragment as any,
})

server.all('/api/v1/*', (req, res) => {
  const appName = getApplicationName(req.path)
  const appBaseURL = getApplicationBaseURL(appName)

  const url = new URL(req.path, appBaseURL)
  return res.redirect(307, url.href)
})
server.use(pino)
server.use('/public', express.static(pagesPath))
server.use(tailor.requestHandler)

server.listen(port, () => console.log(`The app listens on port :${port}`))
