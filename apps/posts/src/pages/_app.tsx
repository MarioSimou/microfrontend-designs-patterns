import React from 'react'
import {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {SWRConfig} from 'swr'
import {MainLayout, NavbarLink} from '@features/components'
import {getSignInURL} from '@features/configuration'

const App = ({Component, pageProps}: AppProps) => {
  const signInURL = getSignInURL()

  const navbarLinks: NavbarLink[] = [
    {text: 'Posts', href: '/posts'},
    {text: 'New Post', href: '/posts/new'},
    {text: 'Sign In' , href: signInURL},
  ]

  return (
    <ChakraProvider>
      <SWRConfig value={{fallback: pageProps.fallback ?? {}}}>
        <MainLayout navbarLinks={navbarLinks}>
          <Component {...pageProps} />
        </MainLayout>
      </SWRConfig>
    </ChakraProvider>
  )
}

export default App
