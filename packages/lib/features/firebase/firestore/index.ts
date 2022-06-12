import {Firestore, getDocs, getDoc, doc, deleteDoc, collection, setDoc, query} from 'firebase/firestore'
import type {Post, Result} from '@types'

const COLLECTIONS = {
  POSTS: 'posts',
}

export const ErrDocsNotFound = new Error('error: docs not found')

type FirestoreFn<Fn extends (...args: any[]) => Promise<any>> = (firestore: Firestore) => Fn

const getPosts: FirestoreFn<() => Promise<Result<Post[]>>> = firestore => async () => {
  try {
    const postsCollection = collection(firestore, COLLECTIONS.POSTS)
    const q = query(postsCollection)
    const postsSnapshot = await getDocs(q)

    if (postsSnapshot.empty) {
      return [ErrDocsNotFound]
    }
    const posts = postsSnapshot.docs.map(doc => doc.data() as Post)
    return [undefined, posts]
  } catch (e) {
    return [e as Error]
  }
}

const getPost: FirestoreFn<(id: Post['id']) => Promise<Result<Post>>> = firestore => async id => {
  try {
    const postRef = doc(firestore, COLLECTIONS.POSTS, id)
    const postSnapshot = await getDoc(postRef)

    if (!postSnapshot.exists()) {
      return [ErrDocsNotFound]
    }
    const post = postSnapshot.data() as Post
    return [undefined, post]
  } catch (e) {
    return [e as Error]
  }
}

const deletePost: FirestoreFn<(id: Post['id']) => Promise<[Error | undefined]>> = firestore => async id => {
  try {
    const postRef = doc(firestore, COLLECTIONS.POSTS, id)
    await deleteDoc(postRef)

    return [undefined]
  } catch (e) {
    return [e as Error]
  }
}

type CreatePostParams = Omit<Post, 'createdAt' | 'updatedAt'> & Partial<Pick<Post, 'createdAt'>>
const putPost: FirestoreFn<(post: CreatePostParams) => Promise<Result<Post>>> = firestore => async post => {
  try {
    const updatedAt = new Date().toISOString()
    const postRef = doc(firestore, COLLECTIONS.POSTS, post.id)
    await setDoc(postRef, {...post, updatedAt}, {merge: true})

    const [getPostError, createdPost] = await getPost(firestore)(post.id)

    if (getPostError) {
      return [getPostError]
    }
    return [undefined, createdPost]
  } catch (e) {
    return [e as Error]
  }
}

type NewFirestoreResult = {
  queries: {
    getPosts: ReturnType<typeof getPosts>
    getPost: ReturnType<typeof getPost>
    deletePost: ReturnType<typeof deletePost>
    putPost: ReturnType<typeof putPost>
  }
}

export const newFirestoreFactory = (firestore: Firestore): NewFirestoreResult => {
  return {
    queries: {
      getPosts: getPosts(firestore),
      getPost: getPost(firestore),
      deletePost: deletePost(firestore),
      putPost: putPost(firestore),
    },
  }
}
