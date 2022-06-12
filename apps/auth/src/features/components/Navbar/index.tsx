import React from 'react'
import {Flex, Link as ChakraLink, Text, useBoolean, useTheme} from '@chakra-ui/react'
import {LinkProps, Link} from 'react-router-dom'
import {getPostsBaseURL} from '../../configuration'

type NavbarLinkProps = LinkProps & {children: JSX.Element; isExternal?: boolean}

const NavbarLink: React.FC<NavbarLinkProps> = ({children, isExternal = false, ...rest}) => {
  const hoverStyles = {textDecoration: 'none', background: 'white', color: 'teal.500'}
  if (isExternal) {
    return (
      <ChakraLink href={rest.to as string} p="0.8rem 1rem" _hover={hoverStyles}>
        {children}
      </ChakraLink>
    )
  }

  return (
    <ChakraLink {...rest} as={Link} p="0.8rem 1rem" _hover={hoverStyles}>
      {children}
    </ChakraLink>
  )
}

export const Navbar: React.FC = () => {
  const postsBaseURL = getPostsBaseURL()
  const newPostURL = `${postsBaseURL}/posts/new`
  const postsURL = `${postsBaseURL}/posts`

  return (
    <Flex as="nav" w="100%" p="0rem 1rem" bgColor="teal.500" justifyContent="flex-end" alignItems="center">
      <Flex color="teal.100" textAlign="center">
        <NavbarLink isExternal to={postsURL}>
          <Text as="span">Posts</Text>
        </NavbarLink>
        <NavbarLink isExternal to={newPostURL}>
          <Text as="span">New Post</Text>
        </NavbarLink>
        <NavbarLink to="sign-in">
          <Text as="span">Sign In</Text>
        </NavbarLink>
      </Flex>
    </Flex>
  )
}
