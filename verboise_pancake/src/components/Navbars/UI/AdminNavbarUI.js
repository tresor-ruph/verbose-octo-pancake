import React from 'react'
import {Navbar, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppLogo from '../../../assets/images/SurveyHuntLogo.png'
import Settings from '../../Navbars/Settings'
const AdminNavbarUI = (props) => {
  const { handleLogOut, avatar, userName, showModal,onHide,handleSettings,profilePicture,handleRedirectHome } = props

  return (
    <div>
      <Settings show ={showModal} onHide={onHide} />

    <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between ">
        <button className="navbar-toggler align-self-center " type="button" onClick={() => handleRedirectHome()}>
        <img
          src={AppLogo}
          width="150px"
          height="150px"
          className="d-inline-block align-top p-3"
          alt="SurveyHunt Logo"
        />
        </button>

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item  nav-profile border-0">
            <Dropdown>
              <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
                <img className="img-xs rounded-circle" src={ profilePicture|| avatar} alt="Profile" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
                <Dropdown.Item className='admin-options user-option' >
                <FontAwesomeIcon  icon='user-alt'  size='sm'  style ={{marginRight: '10px',color: 'gray'}}  /><span style={{color: 'gray'}}>{userName}</span>     
                </Dropdown.Item>
                <hr />
                <Dropdown.Item  className='admin-options' onClick={() => handleSettings()}>
                <FontAwesomeIcon  icon='cog'  size='sm'  style ={{marginRight: '10px', color: 'gray'}}  /><span style={{color: 'gray'}}>Paramètres</span>     
                </Dropdown.Item>
                <hr />
                <Dropdown.Item  className='admin-options' onClick={() => handleLogOut()}>
                <FontAwesomeIcon  icon='sign-out-alt'  size='sm'  style ={{marginRight: '10px',color: 'gray'}}  /><span style={{color: 'gray'}}>Se déconnecter</span>     
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
     
      </div>
    </nav>
    </div>
  )

}

export default AdminNavbarUI