import React, { useState, useEffect } from "react";

import EventModal from '../components/Events/EventModal'

function Dashboard(props) {

  const [show, setShow] = useState(false)


  const handleHide = (x) => {
    setShow(false)
  }
  return (

    <div>
      <EventModal show={show} hide={handleHide} />
      <div >
        <button onClick={() => { setShow(true) }}>open Modal</button>
      </div>
    </div>
  );
}

export default Dashboard;
