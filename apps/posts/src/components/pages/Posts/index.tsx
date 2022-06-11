import {VStack, Text, Grid, Collapse} from '@chakra-ui/react'
import useSWR from 'swr'
import {usePosts} from '@features/hooks'
import type {NextPage} from 'next'
import type {PageProps} from '@types'
import type {GetStaticPropsResult} from './getStaticProps'
import {PostCard} from '@features/components'
import {ErrDocsNotFound} from '@features/firebase'

export type PostsProps = PageProps<{}, GetStaticPropsResult>

const Posts: NextPage<PostsProps> = ({cacheKey}) => {
  const {getPosts} = usePosts()
  const {data: posts, error} = useSWR(cacheKey, getPosts)

  if (!posts || (error && error !== ErrDocsNotFound)) {
    return null
  }

  const arePosts = Boolean(posts.length)

  return (
    <VStack alignItems="flex-start" mt="2rem">
      <Collapse in={!arePosts}>
        <Text>Currently there aren't any posts available</Text>
      </Collapse>
      <Collapse in={arePosts} style={{width: '100%'}}>
        <Grid flexDirection="column" gridGap="1rem" w="100%">
          {posts.map((post, index) => {
            return <PostCard key={post.id} post={post} />
          })}
        </Grid>
      </Collapse>
    </VStack>
  )
}

export default Posts
