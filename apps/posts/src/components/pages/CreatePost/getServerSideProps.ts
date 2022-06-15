import type {GetServerSideProps, Redirect} from 'next'
import {getSignInURL} from '@features/configuration'
import {verifyToken} from '@features/utils'
import {ServerProps} from '@types'

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({req}) => {
  const {sessionId} = req.cookies
  const signInURL = getSignInURL()
  const signInRedirect: Redirect = {permanent: false, destination: signInURL}

  if (!sessionId) {
    return {redirect: signInRedirect}
  }

  const [verifyTokenError, user] = await verifyToken(sessionId)

  if (verifyTokenError) {
    return {redirect: signInRedirect}
  }

  return {
    props: {
      user,
    },
  }
}
