import React from 'react'
import {Flex} from '@chakra-ui/react'
import {Navbar, NavbarLink} from '../Navbar'

type MainLayoutProps = {
  navbarLinks: NavbarLink[]
  children: JSX.Element
}

export const MainLayout: React.FC<MainLayoutProps> = ({children, navbarLinks}) => {
  return (
    <Flex as="main" flexDirection="column" minH="100vh">
      <Navbar links={navbarLinks} />
      <Flex flexDirection="column" maxW="1200px" m="0 auto" w="100%" p="2rem">
        {children}
      </Flex>
    </Flex>
  )
}
