import React from 'react'
import {Flex} from '@chakra-ui/react'
import {Navbar} from '@features/components'

export const MainLayout: React.FC<{children: JSX.Element}> = ({children}) => {
  // bg="#f0f2f5"

  return (
    <Flex as="main" flexDirection="column" minH="100vh">
      <Navbar />
      <Flex flexDirection="column" maxW="1200px" m="0 auto" w="100%" p="2rem">
        {children}
      </Flex>
    </Flex>
  )
}
