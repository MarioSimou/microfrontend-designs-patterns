import {development} from './development'
import {production} from './production'
import {complete} from './complete'
export * from './selectors'

export const getConfig = () => {
  switch (process.env.ENV_CONFIG) {
    case 'development': {
      return development
    }
    case 'complete': {
      return complete
    }
    default: {
      return production
    }
  }
}
