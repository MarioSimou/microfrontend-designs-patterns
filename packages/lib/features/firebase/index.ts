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
    apiKey: 'AIzaSyARS17qOFYGCay9XIYImbhnyJUM3tinQzY',
    authDomain: 'microfrontends-design-pa-b3d23.firebaseapp.com',
    projectId: 'microfrontends-design-pa-b3d23',
    storageBucket: 'microfrontends-design-pa-b3d23.appspot.com',
    messagingSenderId: '842500981886',
    appId: '1:842500981886:web:30b9638e360fefe0d6442f',
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
