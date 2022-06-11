import React from 'react'
import {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {SWRConfig} from 'swr'
import {MainLayout} from '@features/components'

const App = ({Component, pageProps}: AppProps) => {
  return (
    <ChakraProvider>
      <SWRConfig value={{fallback: pageProps.fallback}}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SWRConfig>
    </ChakraProvider>
  )
}

export default App
