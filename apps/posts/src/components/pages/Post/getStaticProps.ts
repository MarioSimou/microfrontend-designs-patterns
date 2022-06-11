import type {GetStaticProps, GetStaticPaths} from 'next'
import type {Post, ServerProps} from '@types'
import {newFirebaseFactory, ErrDocsNotFound} from '@features/firebase'

export const getStaticPaths: GetStaticPaths<{postId: string}> = async () => {
  const {firestore} = newFirebaseFactory()
  const [getPostsError, posts] = await firestore.queries.getPosts()

  if (getPostsError) {
    throw getPostsError
  }

  const paths = posts.map(({id}) => ({params: {postId: id}}))

  return {
    paths,
    fallback: true,
  }
}

export type GetStaticPropsResult = ServerProps<{postId: string}, Record<string, Post>>
export const getStaticProps: GetStaticProps<GetStaticPropsResult> = async ({params}) => {
  const {postId} = params ?? {postId: ''}

  if (!postId) {
    return {notFound: true}
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
      postId: postId as string,
      cacheKey,
      fallback: {
        [cacheKey]: post,
      },
    },
  }
}
