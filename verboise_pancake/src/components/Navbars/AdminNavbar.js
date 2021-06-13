
import React, {useState} from "react";
import {useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router'
import AdminNavbarUI from 'components/Navbars/UI/AdminNavbarUI'
import avatar from 'assets/images/default-avatar.png'
import 'customcss/navBar.scss'


function Header() {
  const usersInfo = useSelector(state => state.SessionReducer.user)
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory() 
  const hideModal = () => {
    setShowModal(false)
  }
  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

const toggleClass = () => {
  document.body.classList.toggle('sidebar-icon-only')
  let dashDiv =document.getElementById('dash')
  dashDiv.classList.toggle('dash-max')

}

const handleSettings = () => {
  setShowModal(true)
}
const handleRedirectHome = () => {
  history.push('/Home')
  
}

  const handleLogOut = () => {
    dispatch({
      type: "LOG_OUT",
    });

  }

  return (
    <AdminNavbarUI handleSettings={handleSettings} handleLogOut={handleLogOut} toggleOffcanvas={toggleOffcanvas} toggleClass={toggleClass} avatar={avatar} userName ={usersInfo.username} showModal={showModal} handleRedirectHome={handleRedirectHome} onHide={hideModal} profilePicture ={usersInfo?.picture || ''} />
  );
}

export default Header;
