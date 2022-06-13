import React from 'react'
import {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {SWRConfig} from 'swr'
import {MainLayout, NavbarLink} from '@features/components'
import {getPostsBaseURL} from '@features/configuration'

const App = ({Component, pageProps}: AppProps) => {
  const postsBaseURL = getPostsBaseURL()

  const navbarLinks: NavbarLink[] = [
    {text: 'Posts', href: `${postsBaseURL}/posts`},
    {text: 'New Post', href: `${postsBaseURL}/posts/new`},
    {text: 'Sign In' , href: '/sign-in'},
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
