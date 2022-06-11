import {Flex, useToast, Button, Heading, Text, VStack, Textarea, Input} from '@chakra-ui/react'
import {Field} from '@features/components'
import {useFormValues, usePosts} from '@features/hooks'
import {v4 as uuid} from 'uuid'
import {useRouter} from 'next/router'
import {formatDate} from '@features/utils'
import {getConfig} from '@features/configuration'

const CreatePost = () => {
  const router = useRouter()
  const toast = useToast({
    title: 'Post',
    position: 'bottom-right',
    isClosable: true,
    status: 'error',
  })
  const {formValues, handleOnBlur, handleOnChange} = useFormValues({
    title: '',
    html: '',
    createdAt: new Date().toISOString(),
  })
  const {putPost} = usePosts()

  const onSubmitForm = async () => {
    const {title, html, createdAt} = formValues
    const isError = title.error || html.error
    const isTouched = title.touched && html.touched

    if (!isTouched || isError) {
      return toast({description: 'Please fill out the form'})
    }

    const id = uuid()
    const [putPostError] = await putPost({
      id,
      title: title.value,
      html: html.value,
      createdAt: createdAt.value,
    })

    if (putPostError) {
      return toast({description: putPostError.message})
    }

    router.push('/posts')
    return toast({description: 'Post created', status: 'success'})
  }

  return (
    <Flex flexDir="column" pt="2rem">
      <Heading textAlign="center" fontStyle="italic">
        Create Post
      </Heading>
      <VStack w="100%" p="1.5rem 0">
        <Flex as="form" flexDirection="column" w="100%" rowGap="2em" p="2rem">
          <Field
            id="title"
            touched={formValues.title.touched}
            error={formValues.title.error}
            label="Title:"
            placeholder="Your title">
            <Input value={formValues.title.value} onChange={handleOnChange} onBlur={handleOnBlur} />
          </Field>
          <Field id="html" touched={formValues.html.touched} error={formValues.html.error} label="Description:">
            <Textarea
              value={formValues.html.value}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              placeholder="Your description..."
              rows={10}
            />
          </Field>
          <Field
            id="createdAt"
            touched={formValues.createdAt.touched}
            error={formValues.createdAt.error}
            disabled
            label="Created At:">
            <Input value={formatDate(formValues.createdAt.value)} />
          </Field>

          <Button type="button" mt="1rem" colorScheme="teal" onClick={onSubmitForm}>
            Create
          </Button>
        </Flex>
      </VStack>
    </Flex>
  )
}

export default CreatePost
