import useSwr from 'swr'
import {usePosts} from '@features/hooks'
import PostCard from '@components/pages/Posts/components/PostCard'
import {VStack, useToast, Heading, Skeleton, Text, Button, Grid} from '@chakra-ui/react'
import {Link} from '@lib/components'

const Posts = () => {
  const {getPosts} = usePosts()
  const toast = useToast({position: 'bottom-left', isClosable: true, title: 'Posts'})
  const {data: posts} = useSwr(
    'posts',
    async () => {
      const [getPostsError, posts] = await getPosts()
      if (getPostsError) {
        toast({description: getPostsError.message, status: 'error'})
        return undefined
      }
      return posts
    },
    {fallback: {'posts': []}},
  )

  return (
    <VStack w="100%" p="2rem" alignItems="flex-start" spacing="2rem">
      <Heading letterSpacing="0.08rem">Check our latest posts</Heading>
      <Skeleton w="100%" isLoaded={Boolean(posts.length)}>
        <Grid w="100%" gridGap="1rem" templateColumns="repeat(auto-fit, minmax(300px, 1fr))">
          {posts.map(post => {
            return <PostCard key={post.id} post={post} />
          })}
        </Grid>
      </Skeleton>
      <VStack bg="secondary.50" borderRadius="0.5rem" p="2rem" w="100%" spacing="1.5rem">
        <VStack>
          <Heading fontSize="1.25rem">Do you want to add your own post?</Heading>
          <Text>If you are interested writing your own post, please click below:</Text>
        </VStack>
        <Link to="posts/new">
          <Button colorScheme="teal" variant="outline">
            Write post
          </Button>
        </Link>
      </VStack>
    </VStack>
  )
}

export default Posts
