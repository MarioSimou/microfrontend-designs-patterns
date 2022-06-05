import Tailor from 'node-tailor'
import express from 'express'
import path from 'path'
import {cwd} from 'process'

const getPath = (...args) => path.join(cwd(), ...args)

const pagesPath = getPath('src','pages')

const tailor = new Tailor({
    templatesPath: pagesPath,
})

const server = express()

server.use('/public',express.static(pagesPath))
server.use(tailor.requestHandler)

server.listen(3000, () => {
    console.log('The app is listening on port 3000')
})

// const webappServer = express()
// webappServer.get('*', (req, res) => {
//     res.setHeader('Content-Type', 'text/html')
//     res.end('hello world')
// })

// webappServer.listen(3001, () => {
//     console.log('The web app is running on port 3001')
// })