import {renderWithThemeProvider, screen} from '@lib/test'
import React from 'react'
import Post from '.'

const DummyProvider: React.FC = ({children}) => {
  return <div>{children}</div>
}

jest.mock('@lib/providers/AppProvider', () => ({
  __esModule: true,
  useApp: () => ({auth: {}}),
  AppProvider: DummyProvider,
}))

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  initializeFirestore: jest.fn(),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data: {
      id: '1',
      title: 'title',
      html: '<p>html</p>',
      createdAt: new Date().toISOString(),
    },
  })),
)

describe('Post component', () => {
  it('should render the title of a post', () => {
    renderWithThemeProvider(<Post />)
    expect(screen.getByText(/title/i)).toBeInTheDocument()
  })
})
