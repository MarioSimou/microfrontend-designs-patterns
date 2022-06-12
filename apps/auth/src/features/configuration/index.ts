import {development} from './development'
import {production} from './production'

export * from './selectors'
export const getConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    return development
  }

  return production
}
