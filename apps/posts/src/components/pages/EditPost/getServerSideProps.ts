import type {GetServerSideProps, Redirect} from 'next'
import {ServerProps, Post} from '@types'
import {newFirebaseFactory, ErrDocsNotFound} from '@features/firebase'
import {getSignInURL} from '@features/configuration'
import {verifyToken} from '@features/utils'

export type GetServerSidePropsResult = ServerProps<{post: Post}>
export const getServerSideProps: GetServerSideProps<GetServerSidePropsResult, {postId: string}> = async ({
  params,
  req,
}) => {
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
    if (ErrDocsNotFound === getPostError) {
      return {notFound: true}
    }
    throw getPostError
  }

  return {
    props: {
      post,
      user,
    },
  }
}
