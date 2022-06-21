import {Flex, useToast, Button, Heading, VStack, Textarea, Input} from '@chakra-ui/react'
import {Field} from '@features/components'
import {useFormValues, usePosts} from '@features/hooks'
import {useRouter} from 'next/router'
import {formatDate} from '@features/utils'
import {PageProps} from '@types'
import type {GetServerSidePropsResult} from './getServerSideProps'
import type {NextPage} from 'next'

type EditPostProps = PageProps<{}, GetServerSidePropsResult>

const EditPost: NextPage<EditPostProps> = ({post}) => {
  const router = useRouter()
  const toast = useToast({
    title: 'Post',
    position: 'bottom-right',
    isClosable: true,
    status: 'error',
  })
  const {formValues, handleOnBlur, handleOnChange} = useFormValues({
    title: post?.title,
    html: post?.html,
    createdAt: post?.createdAt,
  })
  const {putPost} = usePosts()

  const onSubmitForm = async () => {
    const {title, html, createdAt} = formValues
    const isError = title.error || html.error

    if (isError) {
      return toast({description: 'Please fill out the form'})
    }

    const [putPostError] = await putPost({
      id: post.id,
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

  if (router.isFallback) {
    return null
  }

  return (
    <Flex flexDir="column" pt="2rem">
      <Heading textAlign="center" fontStyle="italic">
        Edit Post
      </Heading>
      <VStack w="100%" p="1.5rem 0">
        <Flex as="form" flexDirection="column" w="100%" rowGap="2em" p={['1rem', '1rem', '2rem']}>
          <Field
            id="title"
            touched={formValues.title.touched}
            error={formValues.title.error}
            label="Title:"
            placeholder="Your title"
          >
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
            label="Created At:"
          >
            <Input defaultValue={formatDate(formValues.createdAt.value)} />
          </Field>

          <Button type="button" mt="1rem" colorScheme="teal" onClick={onSubmitForm}>
            Create
          </Button>
        </Flex>
      </VStack>
    </Flex>
  )
}

export default EditPost
