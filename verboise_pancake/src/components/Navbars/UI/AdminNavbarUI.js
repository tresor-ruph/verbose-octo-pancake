import React from 'react'
import {Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Settings from 'components/Navbars/Settings'

const AdminNavbarUI = (props) => {
  const { handleLogOut, toggleOffcanvas, avatar, toggleClass, userName, showModal,onHide,handleSettings } = props

  return (
    <div>
            <Settings show ={showModal} onHide={onHide} />

    <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between ">
        {/* <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="!#" onClick={evt => evt.preventDefault()}><img src={avatar} alt="logo" /></a> */}
        <button className="navbar-toggler align-self-center" type="button" onClick={() => toggleClass()}>
          <i className="mdi mdi-menu"></i>
        </button>

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item  nav-profile border-0">
            <Dropdown>
              <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
                <img className="img-xs rounded-circle" src={avatar} width='45%' alt="Profile" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
                <Dropdown.Item className='admin-options user-option' >
                <FontAwesomeIcon  icon='user-alt'  size='sm'  style ={{marginRight: '10px'}}  /><span>{userName}</span>     
                </Dropdown.Item>
                <hr />
                <Dropdown.Item  className='admin-options' onClick={() => handleSettings()}>
                <FontAwesomeIcon  icon='cog'  size='sm'  style ={{marginRight: '10px'}}  /><span>Settings</span>     
                </Dropdown.Item>
                <hr />
                <Dropdown.Item  className='admin-options' onClick={() => handleLogOut()}>
                <FontAwesomeIcon  icon='sign-out-alt'  size='sm'  style ={{marginRight: '10px'}}  /><span>Sign out</span>     
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
    </div>
  )

}

export default AdminNavbarUI