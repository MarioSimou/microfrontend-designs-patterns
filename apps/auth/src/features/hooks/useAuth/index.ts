import {newFirebaseFactory} from 'lib/features/firebase'

export const useAuth = () => {
  const {auth} = newFirebaseFactory()

  return {
    signIn: auth.queries.signIn,
    signUp: auth.queries.signUp,
  }
}
