import type {GetStaticProps} from 'next'
import {newFirebaseFactory, ErrDocsNotFound} from '@features/firebase'
import type {ServerProps, Post} from '@types'

export type GetStaticPropsResult = ServerProps<{}, {'/posts': Post[]}>

export const getStaticProps: GetStaticProps<GetStaticPropsResult> = async () => {
  const {firestore} = newFirebaseFactory()
  const cacheKey = '/posts'
  const [getPostsError, posts] = await firestore.queries.getPosts()

  if (getPostsError) {
    if (getPostsError === ErrDocsNotFound) {
      return {
        props: {
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
      cacheKey,
      fallback: {
        [cacheKey]: posts,
      },
    },
  }
}
