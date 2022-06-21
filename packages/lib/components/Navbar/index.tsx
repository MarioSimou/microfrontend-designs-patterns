import React from 'react'
import {Flex, Link as ChakraLink, Text, Grid} from '@chakra-ui/react'
import Link, {LinkProps} from 'next/link'
import type {User} from '@types'

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

type NavbarLinkType = 'sign-in' | 'sign-out' | 'any'
type LogoutNavbarLink = {
  onClick: () => void
  text: string
  type: NavbarLinkType
}
type PlainNavbarLink = {
  text: string
  href: string
  type: NavbarLinkType
}

export type NavbarLink = PlainNavbarLink | LogoutNavbarLink
const isLogoutNavbarLink = (link: NavbarLink): link is LogoutNavbarLink => {
  return link.type === 'sign-out'
}

type NavbarProps = {
  links: NavbarLink[]
  user?: User
}

export const Navbar: React.FC<NavbarProps> = ({links, user}) => {
  return (
    <Flex as="nav" p="0rem 1rem" bgColor="teal.500" justifyContent="flex-end" alignItems="center">
      <Flex color="teal.100" textAlign="center">
        {links.map(navbarLink => {
          if (navbarLink.type === 'sign-in' && user) {
            return null
          }
          if (isLogoutNavbarLink(navbarLink)) {
            return (
              <ChakraLink
                key={navbarLink.text}
                as="button"
                p="0.8rem 1rem"
                _hover={{textDecoration: 'none', bg: 'white', color: 'teal.500'}}
                onClick={navbarLink.onClick}
              >
                {navbarLink.text}
              </ChakraLink>
            )
          }

          return (
            <NavbarLink key={navbarLink.text} href={navbarLink.href}>
              <Text>{navbarLink.text}</Text>
            </NavbarLink>
          )
        })}
      </Flex>
    </Flex>
  )
}
