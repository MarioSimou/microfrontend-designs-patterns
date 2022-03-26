import * as React from 'react'
import {Flex, Button} from '@chakra-ui/react'
import Link, {LinkProps} from '@lib/components/Link'
import {useAuth} from '@lib/hooks'
import {useNavigate} from 'react-router-dom'

const NavbarLink: React.FC<LinkProps> = ({children, ...rest}) => {
  return (
    <Link
      color="secondary.700"
      style={{letterSpacing: '0.2rem', textTransform: 'uppercase', fontSize: '0.9rem'}}
      {...rest}>
      {children}
    </Link>
  )
}

const Navbar = () => {
  const {user, logout} = useAuth()
  const navigate = useNavigate()

  const onClickLogout = React.useCallback(async () => {
    await logout()
    navigate('/sign-in')
  }, [navigate, logout])

  return (
    <Flex as="nav" bg="secondary.200" p="1.2rem" justifyContent="space-between">
      <Flex gridGap="1rem">
        <NavbarLink to="/">Home</NavbarLink>
        {!user && <NavbarLink to="/sign-in">Sign In</NavbarLink>}
      </Flex>
      {user && (
        <Button
          color="secondary.700"
          size="sm"
          style={{letterSpacing: '0.2rem', textTransform: 'uppercase', fontSize: '0.9rem'}}
          onClick={onClickLogout}>
          Sign Out
        </Button>
      )}
    </Flex>
  )
}

export default Navbar
