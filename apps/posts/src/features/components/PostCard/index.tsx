import {Flex, Heading, Text, Divider, useTheme} from '@chakra-ui/react'
import type {Post} from '@types'
import Link from 'next/link'
import {formatDate} from '@features/utils'
import {motion, Variants, useViewportScroll} from 'framer-motion'
import React from 'react'

type PostCardProps = {
  post: Post
  index?: number
}

export const PostCard: React.FC<PostCardProps> = ({post}) => {
  const theme = useTheme()
  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      background: theme.colors.gray['200'],
      borderRadius: '0.5rem',
    },
    hovered: {
      scale: 0.95,
      background: theme.colors.gray['100'],
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      style={{opacity: 0, scale: 0}}
      whileHover="hovered">
      <Link href={`/posts/${post.id}`}>
        <Flex as="a" flexDir="column" p="1rem 1.25rem" w="100%" _hover={{cursor: 'pointer'}}>
          <Flex flexDir="column" rowGap="0.5rem">
            <Heading as="h2" fontSize="1.1rem" fontWeight={500}>
              {post.title}
            </Heading>
            <Divider />
            <Text pt="0.25rem" color="gray.700">
              {post.html}
            </Text>
          </Flex>
          <Flex flexDir="column" alignSelf="flex-end" color="gray.600">
            <Flex columnGap="0.35rem">
              <Text fontSize="0.85em">Published at:</Text>
              <Text fontSize="0.85rem">{formatDate(post.updatedAt)}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </motion.div>
  )
}
