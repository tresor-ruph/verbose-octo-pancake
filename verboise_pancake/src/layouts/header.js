import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'

const Header = ({ children }) => {
  const history = useHistory()

  return (
    <Navbar collapseOnSelect expand="lg" bg='dark' variant="dark">
      <Navbar.Brand href="#" onClick={() => history.push('/login')}>Verbose</Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
      {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
        <Nav className="mr-auto" />
        <Nav>
          {children}
        </Nav>
      {/* </Navbar.Collapse> */}
    </Navbar>
  )
}

export default Header