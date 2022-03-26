import * as React from 'react'
import {useApp} from '@lib/hooks'
import {initializeFirestore, collection, getDocs, getDoc, query, doc, deleteDoc, setDoc} from 'firebase/firestore'
import type {Post, Result} from '@types'

type GetPostsResult = Promise<Result<Post[]>>
type GetPostByIdResult = Promise<Result<Post>>
type DeletePostByIdResult = Promise<Result<Post>>
type PostPostResult = Promise<Result<Post>>

export const COLLECTIONS = {
  POSTS: 'posts',
}

export const usePosts = () => {
  const {app} = useApp()
  const firestore = React.useMemo(() => initializeFirestore(app, {}), [app])

  const getPosts = React.useCallback(async (): Promise<GetPostsResult> => {
    try {
      const postsRef = collection(firestore, COLLECTIONS.POSTS)
      const getPostsQuery = query(postsRef)
      const postsSnapshot = await getDocs(getPostsQuery)
      const posts = postsSnapshot.docs.map<Post>(doc => doc.data() as Post)
      return [undefined, posts]
    } catch (e) {
      return [e]
    }
  }, [firestore])

  const getPostById = React.useCallback(
    async (id: string): Promise<GetPostByIdResult> => {
      try {
        const postRef = doc(firestore, COLLECTIONS.POSTS, id)
        const postSnapshot = await getDoc(postRef)
        const post = postSnapshot.data() as Post
        return [undefined, post]
      } catch (e) {
        return [e]
      }
    },
    [firestore],
  )

  const postPost = React.useCallback(
    async (body: Post): Promise<PostPostResult> => {
      try {
        const postRef = doc(firestore, COLLECTIONS.POSTS, body.id)
        await setDoc(postRef, body)
        const [getPostByIdError, post] = await getPostById(body.id)
        if (getPostByIdError) {
          return [getPostByIdError]
        }
        return [undefined, post]
      } catch (e) {
        return [e]
      }
    },
    [getPostById, firestore],
  )

  const deletePostById = React.useCallback(
    async (id: string): Promise<DeletePostByIdResult> => {
      try {
        const [getPostByIdError, post] = await getPostById(id)
        if (getPostByIdError) {
          return [getPostByIdError]
        }

        const postRef = doc(firestore, COLLECTIONS.POSTS, id)
        await deleteDoc(postRef)
        return [undefined, post]
      } catch (e) {
        return [e]
      }
    },
    [firestore, getPostById],
  )

  return {
    getPosts,
    getPostById,
    postPost,
    deletePostById,
  }
}
