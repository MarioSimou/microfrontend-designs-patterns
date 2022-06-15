import type {Nullable} from '@types'
import {initializeApp, cert, App, getApp} from 'firebase-admin/app'
import {getAuth} from 'firebase-admin/auth'

const getFirebaseAdminApp = (): Nullable<App> => {
  try {
    const app = getApp()
    return app
  } catch (e) {
    return null
  }
}

export const newFirebaseAdmin = () => {
  const initialisedApp = getFirebaseAdminApp()
  if (initialisedApp) {
    return {
      app: initialisedApp,
      auth: getAuth(initialisedApp),
    }
  }

  const app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    }),
  })

  return {
    app,
    auth: getAuth(app),
  }
}
