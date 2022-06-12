import {Request} from 'express'
import {readFile} from 'fs'
import {promisify} from 'util'
import {getPath} from './utils'

const readFilePromise = promisify(readFile)

const getApplicationTemplate = (req: Request): string => {
  switch (true) {
    case /^\/posts(\/.+)?$/.test(req.url): {
      return 'posts.html'
    }
    case /\/sign-in$/.test(req.url): {
      return 'auth.html'
    }
  }

  return '404.html'
}

const fetchTemplate = async (req: Request, parseTemplate: (path: string) => string): Promise<unknown> => {
  try {
    const templateName = getApplicationTemplate(req)
    const templatePath = getPath('src', 'apps', templateName)
    const template = await readFilePromise(templatePath, {encoding: 'utf-8'})

    if (!template) {
      throw new Error('template not found')
    }
    return parseTemplate(template)
  } catch (e) {
    if (e instanceof Error) {
      req.log.error(e.message)
      return Promise.reject(e.message)
    }

    req.log.error('internal server error: fetch template')
    return Promise.reject('internal server error: fetch template')
  }
}

export default fetchTemplate
