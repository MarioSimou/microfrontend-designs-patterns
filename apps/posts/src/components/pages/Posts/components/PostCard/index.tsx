import {VStack, Heading, Text} from '@chakra-ui/react'
import type {Post} from '@types'
import {Link} from '@lib/components'

type PostCardProps = {
  post: Post
}

const PostCard = ({post}: PostCardProps) => {
  return (
    <Link to={`/posts/${post.id}`}>
      <VStack padding="0.5rem" alignItems="flex-start" _hover={{cursor: 'pointer'}} borderRadius="0.5rem" bg="gray.50">
        <VStack spacing="0.5.25rem">
          <Heading fontSize="1.25rem" color="secondary.800">
            {post.title}
          </Heading>
          <Text color="secondary.700" fontSize="0.95rem" dangerouslySetInnerHTML={{__html: post.html}} />
        </VStack>
        <VStack>
          <Text color="secondary.300" fontSize="0.9rem">
            {post.createdAt}
          </Text>
        </VStack>
      </VStack>
    </Link>
  )
}

export default PostCard
