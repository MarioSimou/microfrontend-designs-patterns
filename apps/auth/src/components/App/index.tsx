import {ChakraProvider} from '@chakra-ui/react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import SignIn from 'src/components/pages/SignIn'
import SignUp from 'src/components/pages/SignUp'
import ForgotPassword from 'src/components/pages/ForgotPassword'
import {MainLayout} from 'src/features/components'
import {useFormValues} from 'lib/features/hooks'

export const App = () => {
  const {} = useFormValues({email: ''})
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<SignIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}
