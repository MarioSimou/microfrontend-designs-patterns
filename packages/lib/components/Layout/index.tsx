import * as React from 'react'
import Navbar from '../Navbar'
import {Flex} from '@chakra-ui/react'
import {useAuth} from '@lib/hooks'
import {useLocation, Navigate, Outlet} from 'react-router-dom'
import {useCookie} from 'react-use'

type LayoutProps = {
  enableRedirectToSignIn?: boolean
}
const Layout = ({enableRedirectToSignIn = false}: LayoutProps) => {
  const {user} = useAuth()
  const location = useLocation()
  const [cookieValue] = useCookie('uid')

  if (!user && !cookieValue && enableRedirectToSignIn) {
    return <Navigate to="/sign-in" state={{from: location.pathname}} replace />
  }

  return (
    <Flex flexDirection="column">
      <Navbar />
      <Flex as="main" flexDirection="column" width="100%" maxW="1200px" alignSelf="center">
        <Outlet />
      </Flex>
    </Flex>
  )
}

export default Layout
