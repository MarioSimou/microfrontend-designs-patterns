import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import type {Result} from '@types'

const ErrUnauthenticated = new Error('errro: authentication error')

const signIn =
  (auth: Auth) =>
  async (email: string, password: string): Promise<Result<UserCredential>> => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)

      if (!userCredentials) {
        return [ErrUnauthenticated]
      }

      return [undefined, userCredentials]
    } catch (e) {
      return [e as Error]
    }
  }

const signUp =
  (auth: Auth) =>
  async (email: string, password: string): Promise<Result<UserCredential>> => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

      if (!userCredentials) {
        return [ErrUnauthenticated]
      }

      return [undefined, userCredentials]
    } catch (e) {
      return [e as Error]
    }
  }

const signOut = (auth: Auth) => async (): Promise<[Error | undefined]> => {
  try {
    await firebaseSignOut(auth)
    return [undefined]
  } catch (e) {
    return [e as Error]
  }
}

type NewAuthFactoryResult = {
  queries: {
    signIn: ReturnType<typeof signIn>
    signUp: ReturnType<typeof signUp>
    signOut: ReturnType<typeof signOut>
  }
}

export const newAuthFactory = (auth: Auth): NewAuthFactoryResult => {
  return {
    queries: {signIn: signIn(auth), signUp: signUp(auth), signOut: signOut(auth)},
  }
}
