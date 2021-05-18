

import React, { useState, useRef } from "react";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import './step1.scss'

const Step1 = () => {

  const eventSate = useSelector(state => state.EventReducer.event)
  const [title, setTitle] = useState(eventSate.title)
  const [eventMode, setEventMode] = useState(eventSate.eventType)
  const eventTitle = useRef(null);

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
  const handleEventFocus = () => {
    eventTitle.current.classList.add("field--not-empty");
  };
  const handleEventBlur = () => {
    if (title.length === 0)
      eventTitle.current.classList.remove("field--not-empty");
  };
  const handleOptionChange = (event) => {
    setEventMode(event.target.value)
    eventSate.eventType = event.target.value
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventSate
      },
    });
  }

  return (
    <div className="container">
      <div className='step1'>
        <div className="form-group" ref={eventTitle}>
          <label className="label" className='ev-label' htmlFor="eventName">
            Title
          </label>
          <input
            type="text"
            className="form-control ev-title"
            id="eventName"
            value={title}
            onFocus={handleEventFocus}
            onBlur={handleEventBlur}
            onChange={(event) => handleTitle(event)} />

        </div>

        <div className="form-group op">
          <label className='ev-label'>Event Mode</label>
          <div className='row'>
            <div className="col-sm-2">
              <div className="form-check">
                <label className="form-check-label op-label">
                  <input type="radio" className="form-check-input" id="poll" value='polls' checked={eventMode === 'polls'} onChange={(event) => handleOptionChange(event)} /> Survey
                  <i className="input-helper"></i>
                </label>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-check">
                <label className="form-check-label op-label">
                  <input type="radio" className="form-check-input" id="gallop" value='reactions' checked={eventMode === 'reactions'} onChange={(event) => handleOptionChange(event)} /> Gallop
                   <i className="input-helper"></i>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Step1