import {render, RenderOptions, RenderResult} from '@testing-library/react'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'

export * from '@testing-library/react'

export const renderWithThemeProvider = (Component: React.ReactNode, options: RenderOptions = {}): RenderResult => {
  return render(
    <ChakraProvider>
      <BrowserRouter>{Component}</BrowserRouter>
    </ChakraProvider>,
    options,
  )
}
