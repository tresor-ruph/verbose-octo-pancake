import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router'

const Header = ({ children }) => {
  const history = useHistory()

  return (
    <Navbar collapseOnSelect expand="lg"  variant="dark" style={{left: '0px', backgroundColor:'#343A40', height: '12vh'}}>
      <Navbar.Brand href="#" onClick={() => history.push('/login')}>Verbose</Navbar.Brand>

      <Nav className="mr-auto" />
      <Nav>
        {children}
      </Nav>
    </Navbar>
  )
}

export default Header