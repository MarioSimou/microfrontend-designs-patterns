import {renderWithThemeProvider, screen} from '@lib/test'
import React from 'react'
import SignUp from '.'

const DummyProvider: React.FC = ({children}) => {
  return <div>{children}</div>
}

jest.mock('@lib/providers/AppProvider', () => ({
  __esModule: true,
  useApp: () => ({auth: {}}),
  AppProvider: DummyProvider,
}))

describe('Sign In component', () => {
  it('should be in the document', () => {
    renderWithThemeProvider(<SignUp />)
    expect(screen.getByText(/Register now and start rolling/i)).toBeInTheDocument()
  })
})
