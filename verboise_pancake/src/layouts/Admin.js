
import React from "react";
import { useLocation } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Poll from 'components/Poll/Poll'
import PollTest from 'components/Poll/PollTest'
import JoinPoll from 'components/Poll/JoinPoll'

import NewPoll from 'components/Poll/NewPoll'
import Notfound from "components/Error/Notfound"
import Reaction from 'components/Events/Reaction' 




function Admin() {
  const location = useLocation();

  const renderComponent = () => {

    if (location.pathname === '/dashboard/event') {
      return (<Dashboard />)
    } else if (location.pathname === '/dashboard/userprofile') {
      return (<UserProfile />)
    }else if(location.pathname === '/dashboard/poll'){
      return (<Poll />)
    }else if(location.pathname === '/dashboard/gallup'){
      return(<Reaction />)
    }else if(location.pathname === '/dashboard/newpoll'){
      return (<NewPoll />)
    } else if(location.pathname === '/dashboard/polltest'){
      return (<PollTest />)
    }
    else if(location.pathname === '/dashboard/joinpoll'){
      return (<JoinPoll />)
    }
    else {
      return (<Notfound />)
    }
  }

  return (
    <div >
        <AdminNavbar />
        {/* <Sidebar /> */}
      <div id='dash' className='dash-min dash-max'>
        {renderComponent()}
      </div>
    </div>


  );
}

export default Admin;
