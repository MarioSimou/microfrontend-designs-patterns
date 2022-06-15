import type {GetServerSideProps, Redirect} from 'next'
import {newFirebaseFactory, ErrDocsNotFound} from '@features/firebase'
import type {ServerProps, Post} from '@types'
import {getSignInURL} from '@features/configuration'
import {verifyToken} from '@features/utils'

export type GetServerSidePropsResult = ServerProps<{}, {'/posts': Post[]}>

export const getServerSideProps: GetServerSideProps<GetServerSidePropsResult> = async ({req}) => {
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

  const {firestore} = newFirebaseFactory()
  const cacheKey = '/posts'
  const [getPostsError, posts] = await firestore.queries.getPosts()

  if (getPostsError) {
    if (getPostsError === ErrDocsNotFound) {
      return {
        props: {
          user,
          cacheKey,
          fallback: {
            [cacheKey]: [],
          },
        },
      }
    }

    throw getPostsError
  }

  return {
    props: {
      user,
      cacheKey,
      fallback: {
        [cacheKey]: posts,
      },
    },
  }
}
