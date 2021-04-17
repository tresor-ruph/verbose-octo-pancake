
import React from "react";
import { useDispatch } from "react-redux";
import AdminNavbarUI from 'components/Navbars/UI/AdminNavbarUI'
import avatar from 'assets/images/faces-clipart/pic-1.png'


function Header() {
  const dispatch = useDispatch();

  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }


  const handleLogOut = () => {
    dispatch({
      type: "LOG_OUT",
    });

  }

  return (
    <AdminNavbarUI handleLogOut={handleLogOut} toggleOffcanvas={toggleOffcanvas} avatar={avatar}/>
  );
}

export default Header;
