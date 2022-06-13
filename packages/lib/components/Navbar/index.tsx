import React from 'react'
import {Flex, Link as ChakraLink, Text, Grid} from '@chakra-ui/react'
import Link, {LinkProps} from 'next/link'

type NavbarLinkProps = LinkProps & {children: JSX.Element}

const NavbarLink: React.FC<NavbarLinkProps> = ({children, ...rest}) => {
  return (
    <Link passHref {...rest}>
      <ChakraLink p="0.8rem 1rem" _hover={{textDecoration: 'none', bg: 'white', color: 'teal.500'}}>
        {children}
      </ChakraLink>
    </Link>
  )
}

export type NavbarLink = {
  href:string
  text: string
}

type NavbarProps = {
  links: NavbarLink[]
}

export const Navbar: React.FC<NavbarProps> = ({links}) => {
  return (
    <Flex as="nav" p="0rem 1rem" bgColor="teal.500" justifyContent="flex-end" alignItems="center">
      <Flex color="teal.100" textAlign="center">
        {links.map(navbarLink => {
          return (
            <NavbarLink key={navbarLink.text} href={navbarLink.href}>
              <Text>{navbarLink.text}</Text>
            </NavbarLink>  
          )
        })}
        {/* <NavbarLink href="/posts">
          <Text>Posts</Text>
        </NavbarLink>
        <NavbarLink href="/posts/new">
          <Text>New Post</Text>
        </NavbarLink>
        <NavbarLink href={signInURL}>
          <Text>Sign In</Text>
        </NavbarLink> */}
      </Flex>
    </Flex>
  )
}
