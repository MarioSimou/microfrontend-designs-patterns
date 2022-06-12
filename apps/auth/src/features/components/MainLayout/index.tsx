import React from 'react'
import {Flex, VStack} from '@chakra-ui/react'
import {Navbar} from '../Navbar'
import {Outlet} from 'react-router-dom'

export const MainLayout: React.FC = () => (
  <Flex flexDir="column" as="main">
    <Navbar />
    <Flex w="100%" maxW="1200px" m="0 auto">
      <Outlet />
    </Flex>
  </Flex>
)
