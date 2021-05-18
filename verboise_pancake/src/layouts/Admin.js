
import React from "react";
import { useLocation } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Poll from 'components/Poll/Poll'
import Notfound from "components/Error/Notfound"



function Admin() {
  const location = useLocation();

  const renderComponent = () => {

    if (location.pathname === '/dashboard/event') {
      return (<Dashboard />)
    } else if (location.pathname === '/dashboard/userprofile') {
      return (<UserProfile />)
    }else if(location.pathname === '/dashboard/poll'){
      return (<Poll />)
    } 
    else {
      return (<Notfound />)
    }
  }

  return (
    <div >
        <AdminNavbar />
        <Sidebar />
      <div id='dash' className='dash-min dash-max'>
        {renderComponent()}
      </div>
    </div>


  );
}

export default Admin;
