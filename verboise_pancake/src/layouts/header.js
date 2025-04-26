import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router'
import AppLogo from '../assets/images/SurveyHuntLogo.png'

const Header = ({ children }) => {
  const history = useHistory()

  return (
    <Navbar collapseOnSelect expand="lg"  variant="dark" style={{left: '0px', backgroundColor:'#F5F5F5', height: '83px'}}>

      <Navbar.Brand href="#" style={{marginLeft: '5vw', color: 'white', fontWeight: '600'}} onClick={() => history.push('/login')}>
        <img
          src={AppLogo}
          width="150px"
          height="150px"
          className="d-inline-block align-top"
          alt="SurveyHunt Logo"
        />
      </Navbar.Brand>

      <Nav className="mr-auto" />
      <Nav>
        {children}
      </Nav>
    </Navbar>
  )
}

export default Header