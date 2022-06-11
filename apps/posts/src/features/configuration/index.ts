import {development} from './development'
import {production} from './production'
export * from './selectors'

export const getConfig = () => {
  const envConfig = process.env.NEXT_PUBLIC_ENV_CONFIG

  if (envConfig === 'development') {
    return development
  }
  return production
}
