import React from 'react'
import {VStack, Flex, Input, Button, Heading, Text, Link as ChakraLink, useToast} from '@chakra-ui/react'
import {Field} from 'src/features/components'
import {useFormValues} from 'src/features/hooks'
import {Link} from 'react-router-dom'

const SignIn: React.FC = () => {
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

  const onClickSignIn = async () => {
    const {email, password} = formValues
    const isTouched = email.touched && password.touched
    const isError = !email.value || !password.value

    if (!isTouched || isError) {
      return toast({description: 'Please fill all fields'})
    }

    console.log('sign in')
    // await signIn(email.value, password.value)
  }

  return (
    <VStack w="100%" mt="4rem">
      <Flex flexDirection="column" gridGap="2rem" p="2rem">
        <VStack alignItems="flex-start" spacing="1.5rem">
          <Heading as="h1">Hey, welcome back</Heading>
          <Flex columnGap="0.5rem">
            <Text>Still don't have an account?</Text>
            <ChakraLink textDecoration="underline" color="teal.500" to="/sign-up" as={Link}>
              Register now
            </ChakraLink>
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
        <VStack alignItems="flex-end">
          <Flex columnGap="0.5rem">
            <Text>Forgot your password?</Text>
            <ChakraLink as={Link} textDecoration="underline" color="teal.500" to="/forgot-password">
              Reset it
            </ChakraLink>
          </Flex>
        </VStack>
      </Flex>
    </VStack>
  )
}

export default SignIn
