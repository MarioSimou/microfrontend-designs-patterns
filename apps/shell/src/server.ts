import express from 'express'
import Tailor from 'node-tailor'
import fetchTemplate from './fetchTemplate'
import requestFragment from './requestFragment'
import {getPath} from './utils'
import pinoHTTP from 'pino-http'

const port = process.env.PORT ?? 3000
const server = express()
const pagesPath = getPath('src', 'apps')
const pino = pinoHTTP({
  autoLogging: false,
})

const tailor = new Tailor({
  templatesPath: pagesPath,
  fetchTemplate: fetchTemplate as any,
  requestFragment: requestFragment as any,
})

server.use(pino)
server.use('/public', express.static(pagesPath))
server.use(tailor.requestHandler)

server.listen(port, () => console.log(`The app listens on port :${port}`))
