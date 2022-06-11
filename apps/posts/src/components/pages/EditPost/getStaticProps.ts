import {GetStaticProps} from 'next'

import {ServerProps, Post} from '@types'
import {newFirebaseFactory, ErrDocsNotFound} from '@features/firebase'

export type GetStaticPropsResult = ServerProps<{post: Post}>
export const getStaticProps: GetStaticProps<GetStaticPropsResult, {postId: string}> = async ({params}) => {
  const {postId} = params ?? {postId: ''}
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
    },
  }
}
