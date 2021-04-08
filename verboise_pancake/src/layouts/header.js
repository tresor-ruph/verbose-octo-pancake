import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'

const Header = ({ children }) => {
  const history = useHistory()

  return (
    <Navbar collapseOnSelect expand="lg" bg='dark' variant="dark">
      <Navbar.Brand href="#" onClick={() => history.push('/login')}>Verbose</Navbar.Brand>

      <Nav className="mr-auto" />
      <Nav>
        {children}
      </Nav>
    </Navbar>
  )
}

export default Header