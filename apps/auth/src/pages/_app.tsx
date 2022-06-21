import React from 'react'
import {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {MainLayout, NavbarLink} from '@features/components'
import {getPostsBaseURL} from '@features/configuration'

const App = ({Component, pageProps}: AppProps) => {
  const postsBaseURL = getPostsBaseURL()

  const navbarLinks: NavbarLink[] = [
    {text: 'Posts', href: `${postsBaseURL}/posts`, type: 'any'},
    {text: 'New Post', href: `${postsBaseURL}/posts/new`, type: 'any'},
  ]

  return (
    <ChakraProvider>
      <MainLayout navbarLinks={navbarLinks}>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  )
}

export default App
