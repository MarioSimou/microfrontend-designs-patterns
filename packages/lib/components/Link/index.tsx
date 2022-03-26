import {Link as ChakraLink} from '@chakra-ui/react'
import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom'

export type LinkProps = {} & RouterLinkProps
const Link: React.FC<LinkProps> = ({children, ...rest}) => {
  return (
    <ChakraLink as={RouterLink} {...rest} _hover={{textDecoration: 'none'}}>
      {children}
    </ChakraLink>
  )
}

export default Link
