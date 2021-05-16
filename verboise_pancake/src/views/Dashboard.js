import React, { useState, useEffect } from "react";
// import StepZilla from "react-stepzilla";
// import '../customcss/stepZilla.css'
import EventModal from '../components/Events/EventModal'

function Dashboard(props) {

  const steps =
    [
      { name: 'Step 1', component: <button>step</button> },
      { name: 'Step 2', component: <h1>step2</h1> },
      { name: 'Step 3', component: <h1>step3</h1> },
      { name: 'Step 4', component: <h1>step4</h1> },
      { name: 'Step 5', component: <h1>step5</h1> }
    ]


  return (
    <div className="container bootstrap snippet">
      <EventModal />
    </div>
  );
}

export default Dashboard;
