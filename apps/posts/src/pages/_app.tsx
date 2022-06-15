import React from 'react'
import {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {SWRConfig} from 'swr'
import {MainLayout, NavbarLink} from '@features/components'
import {getSignInURL, getCookieDomain} from '@features/configuration'
import {PageProps} from '@types'

const App = ({Component, pageProps, router}: AppProps<PageProps>) => {
  const signInURL = getSignInURL()
  const onClickLogout = () => {
    const cookieDomain = getCookieDomain()
    document.cookie = `sessionId=false; max-age=-1; domain=${cookieDomain}`
    router.push(signInURL)
  }

  const navbarLinks: NavbarLink[] = [
    {text: 'Posts', href: '/posts', type: 'any'},
    {text: 'New Post', href: '/posts/new', type: 'any'},
    {text: 'Sign In' , href: signInURL, type: 'sign-in'},
    {text: 'Logout', type: 'sign-out', onClick: onClickLogout}
  ]

  return (
    <ChakraProvider>
      <SWRConfig value={{fallback: pageProps.fallback ?? {}}}>
        <MainLayout navbarLinks={navbarLinks} user={pageProps.user}>
          <Component {...pageProps} />
        </MainLayout>
      </SWRConfig>
    </ChakraProvider>
  )
}

export default App
