import {extendTheme, theme as defaultTheme} from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    primary: defaultTheme.colors.teal,
    secondary: defaultTheme.colors.gray,
  },
  fonts: {
    heading: 'Ubuntu Condensed',
    text: 'Ubuntu Condensed',
  },
})
