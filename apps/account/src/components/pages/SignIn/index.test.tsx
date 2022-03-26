import {renderWithThemeProvider, screen} from '@lib/test'
import React from 'react'
import SignIn from '.'

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
    renderWithThemeProvider(<SignIn />)
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument()
  })
})
