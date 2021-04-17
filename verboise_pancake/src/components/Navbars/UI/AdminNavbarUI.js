import React from 'react'
import {Dropdown } from "react-bootstrap";
const AdminNavbarUI = (props) => {
  const { handleLogOut, toggleOffcanvas, avatar } = props

  return (
    <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between ">
        {/* <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="!#" onClick={evt => evt.preventDefault()}><img src={avatar} alt="logo" /></a> */}
        <button className="navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
          <i className="mdi mdi-menu"></i>
        </button>

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item  nav-profile border-0 pl-4">
            <Dropdown>
              <Dropdown.Toggle className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                <i className="mdi mdi-bell-outline"></i>
                <span className="count bg-success">4</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="navbar-dropdown preview-list">
                <Dropdown.Item className="dropdown-item py-3 d-flex align-items-center" href="!#" onClick={evt => evt.preventDefault()}>
                  <p className="mb-0 font-weight-medium float-left"><span>You have</span> 4 <span>new notifications</span> </p>
                  <span className="badge badge-pill badge-primary float-right">View all</span>
                </Dropdown.Item>
                <div className="dropdown-divider"></div>
                <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={evt => evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <i className="mdi mdi-alert m-auto text-primary"></i>
                  </div>
                  <div className="preview-item-content py-2">
                    <h6 className="preview-subject font-weight-normal text-dark mb-1"><span>Application Error</span></h6>
                    <p className="font-weight-light small-text mb-0"> <span>Just now</span> </p>
                  </div>
                </Dropdown.Item>
                <div className="dropdown-divider"></div>
                <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={evt => evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <i className="mdi mdi-settings m-auto text-primary"></i>
                  </div>
                  <div className="preview-item-content py-2">
                    <h6 className="preview-subject font-weight-normal text-dark mb-1"><span>Settings</span></h6>
                    <p className="font-weight-light small-text mb-0"> <span>Private message</span> </p>
                  </div>
                </Dropdown.Item>
                <div className="dropdown-divider"></div>
                <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={evt => evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <i className="mdi mdi-airballoon m-auto text-primary"></i>
                  </div>
                  <div className="preview-item-content py-2">
                    <h6 className="preview-subject font-weight-normal text-dark mb-1"><span>New user registration</span></h6>
                    <p className="font-weight-light small-text mb-0"> 2 <span>days ago</span> </p>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>

          <li className="nav-item  nav-profile border-0">
            <Dropdown>
              <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
                <img className="img-xs rounded-circle" src={avatar} width='45%' alt="Profile" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
                <Dropdown.Item className="dropdown-item p-0 preview-item d-flex align-items-center border-bottom" href="!#" onClick={evt => evt.preventDefault()}>

                </Dropdown.Item>
                <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={evt => evt.preventDefault()}>
                  <span>Manage Accounts</span>
                </Dropdown.Item>
                <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={evt => evt.preventDefault()}>
                  <span>Change Password</span>
                </Dropdown.Item>
                <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={evt => evt.preventDefault()}>
                  <span>Check Inbox</span>
                </Dropdown.Item>
                <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={() => handleLogOut()}>
                  <span>Sign Out</span>
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
   
  )

}

export default AdminNavbarUI