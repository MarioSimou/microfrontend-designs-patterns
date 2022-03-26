import * as React from 'react'
import {Flex, Input, Button, VStack, useToast} from '@chakra-ui/react'
import Editor from '@components/pages/NewPost/components/Editor'
import {Field} from '@lib/components'
import {usePosts, useStringFormValues, useFormValues, isValid} from '@features/hooks'
import {format} from 'date-fns'
import {v4 as uuid} from 'uuid'
import {useNavigate} from 'react-router-dom'
import type {Post} from '@types'

const NewPost = () => {
  const toast = useToast({isClosable: true, position: 'bottom-right', title: 'New Post'})
  const navigate = useNavigate()
  const {
    formValues: {title, html},
    setValue,
    setError,
    handleOnChange,
    handleOnBlur,
  } = useStringFormValues<'title' | 'html'>({
    'title': {
      touched: false,
      error: '',
      value: '',
    },
    'html': {
      touched: false,
      error: '',
      value: '',
    },
  })
  const {
    formValues: {createdAt},
  } = useFormValues<'createdAt', Date>({
    'createdAt': {
      touched: true,
      error: '',
      value: new Date(),
    },
  })
  const {postPost} = usePosts()

  const onClickSubmit = React.useCallback(async () => {
    const isInvalid = !(isValid(title) && isValid(html))

    if (isInvalid) {
      return toast({description: 'Please provide all the necessary options to submit your post'})
    }

    const body: Post = {
      id: uuid(),
      title: title.value,
      html: html.value,
      createdAt: createdAt.value.toISOString(),
    }
    const [postPostError] = await postPost(body)

    if (postPostError) {
      return toast({description: postPostError.message})
    }

    navigate('/')
  }, [toast, postPost, title, html, createdAt, navigate])

  return (
    <Flex w="100%" flexDirection="column" p="2rem" gridGap="1rem">
      <Flex as="form" flexDirection="column" gridGap="2rem">
        <VStack>
          <Field id="title" label="Title:" error={title.error} touched={title.touched}>
            <Input value={title.value} onChange={handleOnChange} onBlur={handleOnBlur} />
          </Field>
          <Field id="createdAt" label="Created At:" disabled error={createdAt.error} touched={createdAt.touched}>
            <Input defaultValue={format(createdAt.value, 'iiii, do LLLL yyy')} />
          </Field>
          <Field id="html" label="Content:" touched={html.touched} error={html.error}>
            <Editor
              html={html.value}
              onChange={(html: string) => {
                if (!html || html === '<p><br></p>') {
                  setValue('html', '')
                  return setError('html', 'error: value not found')
                }
                setValue('html', html)
              }}
            />
          </Field>
        </VStack>
        <Button colorScheme="primary" type="button" variant="outline" onClick={onClickSubmit}>
          Submit
        </Button>
      </Flex>
    </Flex>
  )
}

export default NewPost
