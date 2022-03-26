import * as React from 'react'
import {initializeApp, FirebaseOptions, FirebaseApp} from 'firebase/app'
import {getPerformance} from 'firebase/performance'
import {getAuth, Auth} from 'firebase/auth'

type AppContextProps = {
  app: FirebaseApp
  auth: Auth
}
export const AppContext = React.createContext<AppContextProps>({} as AppContextProps)
export const useApp = () => {
  const ctx = React.useContext(AppContext)

  if (!ctx) {
    throw new Error("error: please configure 'AppProvider'")
  }

  return ctx
}

const configuration: FirebaseOptions = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_MEASUREMENT_ID,
}

const app = initializeApp(configuration)

const auth = getAuth(app)
const perf = getPerformance(app)

export const AppProvider: React.FC = ({children}) => {
  return <AppContext.Provider value={{app, auth}}>{children}</AppContext.Provider>
}
