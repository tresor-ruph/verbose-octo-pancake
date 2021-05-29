
import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Notfound from "components/Error/Notfound"



function Admin() {
  const location = useLocation();

  const renderComponent = () => {
    console.log(location.pathname)

    if (location.pathname === '/dashboard/event') {
      return (<Dashboard />)
    } else if (location.pathname === '/dashboard/userprofile') {
      return (<UserProfile />)
    } else {
      return (<Notfound />)
    }
  }

  return (
    <>
      <div className="wrapper">
        <AdminNavbar />
        <Sidebar />
        <div className='content'>
          {renderComponent()}
        </div>
      </div>

    </>
  );
}

export default Admin;
