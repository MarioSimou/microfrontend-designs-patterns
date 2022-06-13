import {newFirebaseFactory, NewAuthFactoryResult} from 'lib/features/firebase'

type UseAuthResult = NewAuthFactoryResult['queries']
export const useAuth = (): UseAuthResult => {
  const {auth} = newFirebaseFactory()

  return {
    signIn: auth.queries.signIn,
    signUp: auth.queries.signUp,
    signOut: auth.queries.signOut,
  }
}
