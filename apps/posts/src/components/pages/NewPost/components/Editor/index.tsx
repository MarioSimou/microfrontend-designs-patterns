import * as React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styled from '@emotion/styled'

type EditorProps = {
  html: string
  onChange: (html: string) => void
}

const Container = styled.div`
  border-radius: 0.5rem;

  & .ql-toolbar {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  & .ql-container {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`

const Editor = ({html, onChange}: EditorProps) => {
  return (
    <Container>
      <ReactQuill placeholder="Type your content" theme="snow" value={html} onChange={onChange} />
    </Container>
  )
}

export default Editor
