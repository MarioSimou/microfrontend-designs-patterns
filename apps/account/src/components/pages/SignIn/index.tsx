import * as React from 'react'
import {Flex, Input, Button, Heading, Text, VStack, useToast} from '@chakra-ui/react'
import {Field, Link} from '@lib/components'
import {useStringFormValues, isValid, useAuth} from '@lib/hooks'
import {useNavigate, useLocation} from 'react-router-dom'

const SignIn = () => {
  const toast = useToast({
    title: 'Sign In',
    isClosable: true,
    position: 'bottom-right',
  })
  const navigate = useNavigate()
  const location = useLocation()
  const {signIn, loading} = useAuth()
  const {formValues, handleOnBlur, handleOnChange} = useStringFormValues<'email' | 'password'>({
    email: {
      value: '',
      touched: false,
      error: '',
    },
    password: {
      value: '',
      touched: false,
      error: '',
    },
  })
  const {email, password} = formValues
  const onSignIn = React.useCallback(async () => {
    const isEmailValid = isValid(email)
    const isPasswordValid = isValid(password)

    if (!isEmailValid || !isPasswordValid) {
      return toast({description: 'Please fill the email and password details', status: 'error'})
    }

    const [signInError, user] = await signIn(email.value, password.value)
    if (signInError) {
      return toast({description: signInError.message, status: 'error'})
    }

    toast({description: `Welcome, ${user.email}. You have successfully logged in`, status: 'success'})

    const to = (location.state as any)?.from ?? '/'
    navigate(to, {replace: true})
  }, [toast, email, password, location, navigate, signIn])

  return (
    <Flex flexDirection="column" alignItems="center" mt={['0', '0', '2rem', '2rem']}>
      <Flex flexDirection="column" w={['100%', '100%', '400px', '400px']} p="2rem" gridGap="2rem">
        <VStack alignItems="flex-start" spacing="1rem">
          <Heading>Hey, Welcome Back</Heading>
          <Flex gridGap="0.5rem">
            <Text color="secondary.700" fontSize="0.9rem">
              Still don't have an account
            </Text>
            <Link
              to="/sign-up"
              color="primary.500"
              style={{fontSize: '0.9rem', textDecoration: 'underline', textTransform: 'uppercase'}}>
              Sign Up
            </Link>
          </Flex>
        </VStack>
        <Flex flexDirection="column" as="form" gridGap="1rem">
          <Flex flexDirection="column" gridGap="0.5rem">
            <Field id="email" label="Email:" touched={email.touched} error={email.error}>
              <Input type="email" value={email.value} onChange={handleOnChange} onBlur={handleOnBlur} />
            </Field>
            <Field id="password" label="Password:" touched={password.touched} error={password.error}>
              <Input type="password" value={password.value} onChange={handleOnChange} onBlur={handleOnBlur} />
            </Field>
          </Flex>
          <Button type="button" onClick={onSignIn} isLoading={loading}>
            Sign In
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SignIn
