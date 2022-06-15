import {initializeFirestore, Firestore} from 'firebase/firestore'
import {initializeApp, FirebaseApp} from 'firebase/app'
import {Auth, initializeAuth} from 'firebase/auth'
import type {Nullable} from '@types'
import {newFirestoreFactory} from './firestore'
import {newAuthFactory} from './auth/index'

export * from './firestore'
export * from './auth'

let app: Nullable<FirebaseApp> = null
let firestore: Nullable<Firestore> = null
let auth: Nullable<Auth> = null

type NewFirebaseFactoryResult = {
  app: FirebaseApp
  firestore: {
    instance: Firestore
  } & ReturnType<typeof newFirestoreFactory>
  auth: {
    instance: Auth
  } & ReturnType<typeof newAuthFactory>
}

export const newFirebaseFactory = (): NewFirebaseFactoryResult => {
  if (app && firestore && auth) {
    return {
      app,
      auth: {
        instance: auth,
        ...newAuthFactory(auth),
      },
      firestore: {
        instance: firestore,
        ...newFirestoreFactory(firestore),
      },
    }
  }

  app = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  })
  firestore = initializeFirestore(app, {})
  auth = initializeAuth(app)

  return {
    app,
    firestore: {
      instance: firestore,
      ...newFirestoreFactory(firestore),
    },
    auth: {
      instance: auth,
      ...newAuthFactory(auth),
    },
  }
}
