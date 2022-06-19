import type {APIHandler} from '@types'

const ping: APIHandler = async (req, res) => {
  res.end('pong')
}

export default ping
