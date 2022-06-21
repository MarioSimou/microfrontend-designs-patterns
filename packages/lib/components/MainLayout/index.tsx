import React from 'react'
import {Flex} from '@chakra-ui/react'
import {Navbar, NavbarLink} from '../Navbar'
import type {User} from '@types'

type MainLayoutProps = {
  navbarLinks: NavbarLink[]
  children: JSX.Element
  user?: User
}

export const MainLayout: React.FC<MainLayoutProps> = ({children, navbarLinks, user}) => {
  return (
    <Flex as="main" flexDirection="column" minH="100vh">
      <Navbar links={navbarLinks} user={user} />
      <Flex flexDirection="column" maxW="1200px" m="0 auto" w="100%" p={['1rem', '1rem', '2rem']}>
        {children}
      </Flex>
    </Flex>
  )
}
