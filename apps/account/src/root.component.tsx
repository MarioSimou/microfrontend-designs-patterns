import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import {Fonts, Layout} from '@lib/components'
import {SignUp, SignIn} from '@components/pages'

import {AuthProvider, AppProvider} from '@lib/providers'
import {theme} from '@lib/theme'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <AuthProvider>
          <Fonts />
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </AppProvider>
    </ChakraProvider>
  )
}

export default App
