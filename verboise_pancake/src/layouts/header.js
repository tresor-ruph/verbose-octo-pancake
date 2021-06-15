import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router'

const Header = ({ children }) => {
  const history = useHistory()

  return (
    <Navbar collapseOnSelect expand="lg"  variant="dark" style={{left: '0px', backgroundColor:'#00C0F8', height: '12vh'}}>
      <Navbar.Brand href="#" style={{marginLeft: '5vw', color: 'white', fontWeight: '600'}} onClick={() => history.push('/login')}>Survey Hunt</Navbar.Brand>

      <Nav className="mr-auto" />
      <Nav>
        {children}
      </Nav>
    </Navbar>
  )
}

export default Header