
import React from "react";
import { useDispatch } from "react-redux";
import AdminNavbarUI from 'components/Navbars/UI/AdminNavbarUI'
import avatar from 'assets/images/faces-clipart/pic-1.png'


function Header() {
  const dispatch = useDispatch();

  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

const toggleClass = () => {
  document.body.classList.toggle('sidebar-icon-only')
  let dashDiv =document.getElementById('dash')
  dashDiv.classList.toggle('dash-max')

}
  const handleLogOut = () => {
    dispatch({
      type: "LOG_OUT",
    });

  }

  return (
    <AdminNavbarUI handleLogOut={handleLogOut} toggleOffcanvas={toggleOffcanvas} toggleClass={toggleClass} avatar={avatar}/>
  );
}

export default Header;
