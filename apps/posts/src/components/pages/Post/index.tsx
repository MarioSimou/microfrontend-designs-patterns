import * as React from 'react'
import {usePosts} from '@features/hooks'
import {useParams, useNavigate} from 'react-router-dom'
import useSWR from 'swr'
import {useToast, VStack, Heading, Text, Skeleton, ButtonGroup, Button} from '@chakra-ui/react'
import type {Post as PostT} from '@types'
import {formatDistanceToNow} from 'date-fns'

const dummyPost: PostT = {title: '', html: '', createdAt: '', id: ''}

const Post = () => {
  const navigate = useNavigate()
  const {id} = useParams<{id: string}>()
  const toast = useToast({position: 'bottom-left', isClosable: true, title: 'Post'})
  const {getPostById, deletePostById} = usePosts()
  const postKey = `posts/${id}`
  const {data: post} = useSWR(
    postKey,
    async () => {
      const [getPostByIdError, blog] = await getPostById(id)
      if (getPostByIdError) {
        toast({description: getPostByIdError.message, status: 'error'})
        return undefined
      }
      return blog
    },
    {fallback: {[postKey]: dummyPost}},
  )

  const onClickDeletePost = React.useCallback(async () => {
    const [deletePostByIdError] = await deletePostById(post.id)
    if (deletePostByIdError) {
      return toast({description: deletePostByIdError.message, status: 'error'})
    }

    return navigate('/')
  }, [post.id, toast, navigate, deletePostById])

  return (
    <VStack p="2rem" alignItems="flex-start">
      <Skeleton w="100%" colorScheme="green" size="lg" startColor="blue" endColor="black" isLoaded={Boolean(post.id)}>
        {post.id && (
          <VStack w="100%" spacing="2rem">
            <VStack w="100%" alignItems="flex-start">
              <Heading>{post.title}</Heading>
              <Text color="secondary.500" fontSize="0.9rem">
                published: {formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}
              </Text>
              <Text dangerouslySetInnerHTML={{__html: post.html}} />
            </VStack>
            <ButtonGroup variant="outline" w="100%">
              <Button isFullWidth colorScheme="red" onClick={onClickDeletePost}>
                Delete
              </Button>
            </ButtonGroup>
          </VStack>
        )}
      </Skeleton>
    </VStack>
  )
}

export default Post
