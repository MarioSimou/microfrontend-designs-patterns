import React from 'react'
import {VStack, Flex, Input, Button, Heading, Text, Link as ChakraLink, useToast} from '@chakra-ui/react'
import {Field} from '@features/components'
import {useFormValues, useAuth} from '@features/hooks'
import {getPostsBaseURL, getCookieDomain} from 'src/features/configuration'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useCookie} from 'react-use'

const SignIn: React.FC = () => {
  const router = useRouter()
  const [_, setSessionId] = useCookie('sessionId')
  const {signIn} = useAuth()
  const toast = useToast({
    title: 'Authentication',
    position: 'bottom-right',
    isClosable: true,
    status: 'error',
  })
  const {formValues, handleOnBlur, handleOnChange} = useFormValues({
    email: '',
    password: '',
  })
  const postsBaseURL = getPostsBaseURL()
  const cookieDomain = getCookieDomain()

  const onClickSignIn = async () => {
    const {email, password} = formValues
    const isTouched = email.touched && password.touched
    const isError = !email.value || !password.value

    if (!isTouched || isError) {
      return toast({description: 'Please fill all fields'})
    }

    const [signInError, user] = await signIn(email.value, password.value)
    if (signInError) {
      return toast({description: signInError.message})
    }
    const token= await user.user.getIdToken()
    setSessionId(token, {domain: cookieDomain})
    toast({description: 'Successful login', status: 'success'})
    return router.push(`${postsBaseURL}/posts`)
  }

  return (
    <VStack w="100%" mt="4rem">
      <Flex flexDirection="column" gridGap="2rem" p="2rem">
        <VStack alignItems="flex-start" spacing="1.5rem">
          <Heading as="h1">Hey, welcome back</Heading>
          <Flex columnGap="0.5rem">
            <Text>Still do not have an account?</Text>
            <Link href="/sign-up" passHref>
            <ChakraLink textDecoration="underline" color="teal.500">
              Register now
            </ChakraLink>
            </Link>
            
          </Flex>
          <Text color="gray.600" fontSize="0.9rem" w="430px">
            Our goal is to deliver the best experience for you. We are always looking for new ways to improve our
          </Text>
        </VStack>
        <Flex alignSelf="center" flexDir="column" gridRowGap="1.5rem" as="form" w={['100%', '100%', '500px', '500px']}>
          <VStack spacing="1.5rem">
            <Field id="email" label="Email:" error={formValues.email.error} touched={formValues.email.touched}>
              <Input
                type="email"
                placeholder="Your email"
                value={formValues.email.value}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
              />
            </Field>
            <Field
              id="password"
              label="Password:"
              error={formValues.password.error}
              touched={formValues.password.touched}>
              <Input
                type="password"
                autoComplete="password"
                placeholder="Your password"
                value={formValues.password.value}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
              />
            </Field>
          </VStack>
          <Button type="button" variant="outline" colorScheme="teal" onClick={onClickSignIn}>
            Sign in
          </Button>
        </Flex>
      </Flex>
    </VStack>
  )
}

export default SignIn
