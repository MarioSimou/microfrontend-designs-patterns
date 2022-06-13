import {development} from './development'
import {production} from './production'

export * from './selectors'
export const getConfig = () => {
  if (process.env.NEXT_PUBLIC_ENV_CONFIG === 'development') {
    return development
  }

  return production
}
