import type {GetServerSideProps, Redirect} from 'next'
import type {Post, ServerProps} from '@types'
import {newFirebaseFactory, ErrDocsNotFound} from '@features/firebase'
import {getSignInURL} from '@features/configuration'
import {verifyToken} from '@features/utils'

export type GetServerSidePropsResult = ServerProps<{postId: string}, Record<string, Post>>
export const getServerSideProps: GetServerSideProps<GetServerSidePropsResult> = async ({params, req}) => {
  const {postId} = params ?? {postId: ''}
  const {sessionId} = req.cookies
  const signInURL = getSignInURL()
  const signInRedirect: Redirect = {permanent: false, destination: signInURL}

  if (!postId) {
    return {notFound: true}
  }

  if (!sessionId) {
    return {redirect: signInRedirect}
  }

  const [verifyTokenError, user] = await verifyToken(sessionId)

  if (verifyTokenError) {
    return {redirect: signInRedirect}
  }

  const {firestore} = newFirebaseFactory()
  const [getPostError, post] = await firestore.queries.getPost(postId as string)

  if (getPostError) {
    if (getPostError === ErrDocsNotFound) {
      return {notFound: true}
    }

    throw getPostError
  }

  const cacheKey = `/posts/${postId}`
  return {
    props: {
      user,
      postId: postId as string,
      cacheKey,
      fallback: {
        [cacheKey]: post,
      },
    },
  }
}
