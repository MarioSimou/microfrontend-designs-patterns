import React from 'react'
import {newFirebaseFactory, ErrDocsNotFound} from '@features/firebase'
import type {Post} from '@types'

export const usePosts = () => {
  const {firestore} = newFirebaseFactory()

  const getPosts = React.useCallback(async (): Promise<Post[]> => {
    const [e, posts] = await firestore.queries.getPosts()
    if (e) {
      if (e === ErrDocsNotFound) {
        return []
      }
      throw e
    }

    return posts
  }, [])

  const getPost = React.useCallback(async (id: Post['id']): Promise<Post> => {
    const [e, post] = await firestore.queries.getPost(id)
    if (e) {
      throw e
    }

    return post
  }, [])

  return {
    getPosts,
    getPost,
    deletePost: firestore.queries.deletePost,
    putPost: firestore.queries.putPost,
  }
}
