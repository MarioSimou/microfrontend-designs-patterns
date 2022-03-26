import * as React from 'react'
import {Flex, Input, Button, Heading, Text, VStack, useToast} from '@chakra-ui/react'
import {Field, Link} from '@lib/components'
import {useStringFormValues, isValid, useAuth} from '@lib/hooks'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const toast = useToast({
    title: 'Sign Up',
    isClosable: true,
    position: 'bottom-right',
  })
  const navigate = useNavigate()
  const {signUp, loading} = useAuth()
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
  const onSignUp = React.useCallback(async () => {
    const isEmailValid = isValid(email)
    const isPasswordValid = isValid(password)

    if (!isEmailValid || !isPasswordValid) {
      return toast({description: 'Please fill the email and password details', status: 'error'})
    }

    const [signUpError, user] = await signUp(email.value, password.value)
    if (signUpError) {
      return toast({description: signUpError.message, status: 'error'})
    }

    toast({description: `You have successfully sign up ${user.email}. Welcome!`, status: 'success'})
    navigate('/', {replace: true})
  }, [toast, email, password, navigate, signUp])

  return (
    <Flex flexDirection="column" alignItems="center" mt={['0', '0', '2rem', '2rem']}>
      <Flex flexDirection="column" w={['100%', '100%', '400px', '400px']} p="2rem" gridGap="2rem">
        <VStack alignItems="flex-start" spacing="1rem">
          <Heading>Register now and start rolling...</Heading>
          <Flex gridGap="0.5rem">
            <Text color="secondary.700" fontSize="0.9rem">
              Do you already have an account?
            </Text>
            <Link
              to="/sign-in"
              color="primary.500"
              style={{fontSize: '0.9rem', textDecoration: 'underline', textTransform: 'uppercase'}}>
              Sign In
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
          <Button type="button" onClick={onSignUp} isLoading={loading}>
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SignUp
