import React from 'react'
import {VStack, Flex, Input, Button, Heading, Text, Link as ChakraLink, useToast} from '@chakra-ui/react'
import {Field} from '@features/components'
import {useFormValues, useAuth} from '@features/hooks'
import Link from 'next/link'
import {useRouter} from 'next/router'

const SignUp: React.FC = () => {
  const router = useRouter()
  const {signUp} = useAuth()
  const toast = useToast({
    title: 'Authentication',
    position: 'bottom-right',
    isClosable: true,
    status: 'error',
  })
  const {formValues, handleOnBlur, handleOnChange} = useFormValues({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const onClickSignUp = async () => {
    const {email, password, confirmPassword} = formValues
    const isTouched = email.touched && password.touched && confirmPassword.touched
    const isError = !email.value || !password.value || !confirmPassword.value
    const isPasswordMismatch = password.value !== confirmPassword.value

    if (isPasswordMismatch) {
      return toast({description: 'Passwords do not match'})
    }

    if (!isTouched || isError) {
      return toast({description: 'Please fill all fields'})
    }

    const [signUpError] = await signUp(email.value, password.value)
    if (signUpError) {
      return toast({description: signUpError.message})
    }
    return router.push('/sign-in')
  }

  return (
    <VStack w="100%" mt="4rem">
      <Flex flexDirection="column" gridGap="2rem" p="2rem">
        <VStack alignItems="flex-start" spacing="1.5rem">
          <Heading as="h1">Register now...</Heading>
          <Flex columnGap="0.5rem">
            <Text>Do you already have an account?</Text>
            <Link href="/sign-in" passHref>
            <ChakraLink textDecoration="underline" color="teal.500" >
              Sign In
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
            <Field
              id="confirmPassword"
              label="Confirm password:"
              error={formValues.confirmPassword.error}
              touched={formValues.confirmPassword.touched}>
              <Input
                type="password"
                autoComplete="password"
                placeholder="Your password"
                value={formValues.confirmPassword.value}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
              />
            </Field>
          </VStack>
          <Button type="button" variant="outline" colorScheme="teal" onClick={onClickSignUp}>
            Sign up
          </Button>
        </Flex>
      </Flex>
    </VStack>
  )
}

export default SignUp
