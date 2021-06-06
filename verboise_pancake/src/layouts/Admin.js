
import React from "react";
import { useLocation } from "react-router-dom";
import HomePage from 'components/Home/HomePage'
import AdminNavbar from "components/Navbars/AdminNavbar";
import Events from "components/Events/Events"
import PollAnalysis from 'components/Poll/PollAnalysis'
// import Dashboard from "views/Dashboard";
// import Poll from 'components/Poll/Poll'
// import PollTest from 'components/Poll/PollTest'
// import JoinPoll from 'components/Poll/JoinPoll'

// import NewPoll from 'components/Poll/NewPoll'
import Notfound from "components/Error/Notfound"
// import Reaction from 'components/Events/Reaction' 





function Admin() {
  const location = useLocation();
  const path = location.pathname.split('/')[1]


  const renderComponent = () => {
    if (path === "Home") {
      return (<HomePage />)
    } else if (path === 'Event') {
      return (<Events />)
    }else if(path === 'result'){
      return (<PollAnalysis />)
    }
     else {
      return (<Notfound />)
    }
  }

  return (
    <div >
      <AdminNavbar />
      <div id='dash' className='dash-min dash-max'>
        {renderComponent()}
      </div>
    </div>


  );
}

export default Admin;
