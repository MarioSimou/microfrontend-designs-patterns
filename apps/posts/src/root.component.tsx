import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Posts from '@components/pages/Posts'
import Post from '@components/pages/Post'
import NewPost from '@components/pages/NewPost'
import {AppProvider, AuthProvider} from '@lib/providers'
import {ChakraProvider} from '@chakra-ui/react'
import {Layout, Fonts} from '@lib/components'
import {theme} from '@lib/theme'

const Root = () => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <AppProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout enableRedirectToSignIn />}>
                <Route path="/" element={<Posts />} />
                <Route path="/posts/:id" element={<Post />} />
                <Route path="/posts/new" element={<NewPost />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </AppProvider>
    </ChakraProvider>
  )
}

export default Root
