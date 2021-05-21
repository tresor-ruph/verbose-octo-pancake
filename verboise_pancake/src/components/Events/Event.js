import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router'
import 'helper/axiosConfig'
import EventStatus from './EventStatus'
import JoinPolls from './JoinPoll'
import Gallup from 'components/Gallup/Gallup'
import { useSelector, useDispatch } from 'react-redux'

import Reactions from './Reactions'
// import Name from './Name'

const Event = () => {

    const eventState = useSelector(state => state.EventReducer.event)
    const sessState = useSelector(state => state.SessionReducer)
    const dispatch = useDispatch()
    const [pseudo, setPseudo] = useState('')
    const [revealPoll, setRevealPoll] = useState(false)
    const [eventId, setEventId] = useState(null)
    const [loaded, setLoaded] = useState(false)

    const location = useLocation()
    const [eventStatus, setEventStatus] = useState('')
    const [evenType, setEventType] = useState('')

    useEffect(() => {
        const paths = location.pathname.split('/')
        axios.get(`/getEvent/${paths[2]}`).then(res => {
            setEventId(res.data[0].eventId)
            setEventStatus(res.data[0].status)
            setEventType(res.data[0].eventType)
            eventState.eventId = res.data[0].eventId
            if(eventState.pseudo === null || eventState.pseudo === undefined){
            eventState.pseudo = Math.random().toString(36).substring(7)
            }
            dispatch({
                type: "NEW_EVENT",
                payload: {
                    event: eventState,

                },
            });
            setLoaded(true)


        }).catch(err => {
            console.error(err)
        })


    }, [])


    // const renderEvent = () => {
    //     if (eventStatus === 'inactive' || eventStatus === 'completed') {
    //         return (<EventStatus status={eventStatus} />)
    //     } else if (eventStatus === 'ongoing' && evenType === 'reactions') {
    //         return (<Reactions />)
    //     } else if (eventStatus === 'ongoing' && evenType === 'polls') {
    //         return (<Polls />)
    //     } else {
    //         return (<h1>An error occured</h1>)
    //     }
    // }

    return (
        // <div>
        //     {
        //         loaded ? <div>
        //             <JoinPolls pseudo={eventState.pseudo} eventId={eventId} /></div>
        //             : <div><h1>hello world</h1></div>}

        // </div>
        <div>
            <Gallup />
        </div>
    );
};

export default Event;
