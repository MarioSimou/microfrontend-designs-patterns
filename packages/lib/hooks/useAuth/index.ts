import * as React from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  signInWithCustomToken,
} from 'firebase/auth'
import {useApp, useAppAuth} from '@lib/hooks'
import type {Result} from '@lib/types'
import {useCookie} from 'react-use'

type SignInResult = Result<User>
type SignUpResult = Result<User>
type SignOutResult = [undefined | Error]
type SignInWithToken = Result<User>

export const useAuth = () => {
  const {loading, user, setIsLoading, resetLoading, resetUser, setUser} = useAppAuth()
  const {auth} = useApp()
  const [_, updateCookie, removeCookie] = useCookie('uid')

  const signIn = React.useCallback(
    async (email: string, password: string): Promise<SignInResult> => {
      try {
        setIsLoading()
        const {user} = await signInWithEmailAndPassword(auth, email, password)
        setUser(user)

        // const event = new CustomEvent('user-sign-in', {detail: user})
        // window.dispatchEvent(event)
        updateCookie(user.uid)
        return [undefined, user]
      } catch (e) {
        resetLoading()
        return [e]
      }
    },
    [auth, setIsLoading, setUser, resetLoading, updateCookie],
  )

  const signUp = React.useCallback(
    async (email: string, password: string): Promise<SignUpResult> => {
      try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password)

        // const event = new CustomEvent('user-sign-up', {detail: user})
        // window.dispatchEvent(event)
        updateCookie(user.uid)
        setUser(user)
        return [undefined, user]
      } catch (e) {
        resetLoading()
        return [e]
      }
    },
    [auth, setUser, resetLoading, updateCookie],
  )

  const logout = React.useCallback(async (): Promise<SignOutResult> => {
    try {
      setIsLoading()
      await signOut(auth)

      // const event = new CustomEvent('user-sign-out', {detail: user})
      // window.dispatchEvent(event)

      removeCookie()
      resetUser()
      return [undefined]
    } catch (e) {
      resetLoading()
      return [e]
    }
  }, [auth, resetUser, resetLoading, setIsLoading, removeCookie])

  const signInWithToken = React.useCallback(
    async (accessToken: string): Promise<SignInWithToken> => {
      try {
        setIsLoading()
        const {user} = await signInWithCustomToken(auth, accessToken)
        setUser(user)
        updateCookie(user.uid)
        return [undefined, user]
      } catch (e) {
        resetLoading()
        return [e]
      }
    },
    [resetLoading, setIsLoading, setUser, auth, updateCookie],
  )

  return {
    signInWithToken,
    loading,
    user,
    signIn,
    signUp,
    logout,
  }
}
