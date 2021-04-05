import React from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap'
import {useLocation} from 'react-router'

const Header = ({children}) => {
    const route = useLocation()

  
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand href="#home">Verbose</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />         
          <Nav>
                {children}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default Header