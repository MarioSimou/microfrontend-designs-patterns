import React from 'react'
import {Flex, Heading, Divider, VStack, Button, Text, ButtonGroup, useToast, Link as ChakraLink} from '@chakra-ui/react'
import useSWR from 'swr'
import {usePosts} from '@features/hooks'
import {Post, PageProps} from '@types'
import {NextPage} from 'next'
import type {GetStaticPropsResult} from './getStaticProps'
import {formatDate} from '@features/utils'
import {useRouter} from 'next/router'
import Link from 'next/link'

export type PostProps = PageProps<{}, GetStaticPropsResult>

const Post: NextPage<PostProps> = ({cacheKey, postId}) => {
  const {getPost, deletePost} = usePosts()
  const router = useRouter()
  const {data: post} = useSWR(cacheKey, (): Promise<Post> => getPost(postId))
  const toast = useToast({
    title: 'Post',
    position: 'bottom-right',
    isClosable: true,
    status: 'error',
  })

  const onClickDelete = React.useCallback(async () => {
    const [deletePostError] = await deletePost(postId)
    if (deletePostError) {
      return toast({description: deletePostError.message})
    }

    router.push('/posts')
    return toast({description: 'Post deleted', status: 'success'})
  }, [toast, deletePost, postId, router])

  if (!post) {
    return null
  }

  return (
    <VStack alignItems="flex-start" spacing="2rem">
      <Flex flexDir="column" rowGap="1rem" w="100%">
        <Heading>{post.title}</Heading>
        <Divider />
      </Flex>
      <Flex flexDir="column" rowGap="2rem" w="100%">
        <Text>{post.html}</Text>
        <VStack alignItems="flex-end" fontSize="0.9rem" color="gray.500" w="100%">
          <Text>Created at: {formatDate(post.updatedAt)}</Text>
          <Text>Published at: {formatDate(post.updatedAt)}</Text>
        </VStack>
        <Divider />
        <ButtonGroup colorScheme="teal" variant="outline" w="100%" gridGap="1rem" justifyContent="flex-end">
          <Link href={`/posts/${postId}/edit`} passHref>
            <Button as="a" w={['1rem', '1rem', '200px']}>
              Edit
            </Button>
          </Link>
          <Button w={['1rem', '1rem', '200px']} onClick={onClickDelete}>
            Delete
          </Button>
        </ButtonGroup>
        <Divider />
      </Flex>
    </VStack>
  )
}

export default Post
