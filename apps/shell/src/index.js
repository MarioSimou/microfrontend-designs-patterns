import express from 'express'
import Tailor from 'node-tailor'
import path from 'path'
import {cwd} from 'process'

const port = process.env.PORT ?? 3000
const server = express()
const getPath = (...args) => path.join(cwd(), ...args)
const pagesPath = getPath('src', 'pages')

const tailor = new Tailor({
  templatesPath: pagesPath,
})

server.use('/public', express.static(pagesPath))
server.use(tailor.requestHandler)

server.listen(port, () => console.log(`The app listens on port :${port}`))
