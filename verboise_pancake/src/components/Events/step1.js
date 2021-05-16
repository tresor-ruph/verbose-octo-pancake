

import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const Step1 = () => {

  const eventSate = useSelector(state => state.EventReducer.event)
  const [title, setTitle] = useState('')
  const [eventType, setSelected] = useState('')
  const dispatch = useDispatch();

  const handleTitle = (event) => {

    setTitle(event.target.value)
    eventSate.title = event.target.value
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventSate,
      },
    });
  }
  const handleSelected = (event) => {
    setSelected(event.target.value)
    eventSate.eventType = event.target.value
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventSate
      },
    });
  }

  return (
    <div className="container bootstrap snippet">
      <div>
        <label htmlFor="exampleFormControlInput1" className="form-label">Titre</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="title" onChange={(event) => handleTitle(event)} value={title} />
        <select className="form-select" aria-label="Default select example" onChange={(event) => handleSelected(event)} selected={eventType}>
          <option value="polls">Polls</option>
          <option value="reactions">Reaction</option>
        </select><br />
      </div>
    </div>
  )
}

export default Step1