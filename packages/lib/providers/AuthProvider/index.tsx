import * as React from 'react'
import {User} from 'firebase/auth'
import {useApp} from '@lib/providers'

type AuthContextProps = {
  user: User
  loading: boolean
  setUser: (user: User) => void
  setIsLoading: () => void
  resetUser: () => void
  resetLoading: () => void
}
const AuthContext = React.createContext({} as AuthContextProps)

export const useAuth = () => {
  const ctx = React.useContext(AuthContext)
  if (!ctx) {
    throw new Error("error: Please wrap a component around 'AuthProvider'")
  }

  return ctx
}

const SET_USER = 'SET_USER'
const RESET_USER = 'RESET_USER'
const SET_IS_LOADING = 'SET_IS_LOADING'
const RESET_LOADING = 'RESET_LOADING'
type ActionTypes = typeof SET_USER | typeof RESET_USER | typeof SET_IS_LOADING | typeof RESET_LOADING

type Maybe<P> = P | undefined

type Action<P extends Object = {}, T = string> = {
  type: T
  payload?: Maybe<P>
}

type State = {
  loading: boolean
  user: User | undefined
}
const initialState = {loading: false, user: undefined}

const authReducer = (state: State, action: Action<{user: User}, ActionTypes>): State => {
  switch (action.type) {
    case 'SET_USER': {
      return {loading: false, user: action.payload.user}
    }
    case 'SET_IS_LOADING': {
      return {...state, loading: true}
    }
    case 'RESET_USER': {
      return {user: undefined, loading: false}
    }
    case 'RESET_LOADING': {
      return {...state, loading: false}
    }
    default: {
      return state
    }
  }
}

export const AuthProvider: React.FC = ({children}) => {
  const {auth} = useApp()
  const [state, dispatch] = React.useReducer(authReducer, initialState)

  const setUser = React.useCallback(
    (user: User) => {
      return dispatch({type: 'SET_USER', payload: {user}})
    },
    [dispatch],
  )
  const resetUser = React.useCallback(() => {
    return dispatch({type: 'RESET_USER'})
  }, [dispatch])

  const setIsLoading = React.useCallback(() => {
    return dispatch({type: 'SET_IS_LOADING'})
  }, [dispatch])
  const resetLoading = React.useCallback(() => {
    return dispatch({type: 'RESET_LOADING'})
  }, [dispatch])

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user && !state.user) {
        setUser(user)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{...state, setIsLoading, setUser, resetUser, resetLoading}}>
      {children}
    </AuthContext.Provider>
  )
}
