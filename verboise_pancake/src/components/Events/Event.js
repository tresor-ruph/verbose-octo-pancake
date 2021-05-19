import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router'
import 'helper/axiosConfig'
import EventStatus from './EventStatus'
import Polls from './Polls'
import Reactions from './Reactions'


const Event = () => {

    const location = useLocation()
    const [eventStatus, setEventStatus] = useState('')
    const [evenType, setEventType] = useState('')

    useEffect(() => {
        const paths = location.pathname.split('/')
        if (paths[2].length !== 6) {
            console.log('invalid event code')

        } else {
            axios.get(`/getEvent/${paths[2]}`).then(res => {
                // console.log(res)
                setEventStatus(res.data[0].status)
                setEventType(res.data[0].eventType)
            }).catch(err => console.log(err.response))
        }

    })

    const renderEvent = () => {
        if (eventStatus === 'inactive' || eventStatus === 'completed') {
            return (<EventStatus status={eventStatus} />)
        } else if (eventStatus === 'ongoing' && evenType === 'reactions') {
            return (<Reactions />)
        } else if (eventStatus === 'ongoing' && evenType === 'polls') {
            return (<Polls />)
        }else {
            return(<h1>An error occured</h1>)
        }
    }

    return (
        <div>
            {/* {renderEvent()} */}
            <Polls />
        </div>
    );
};

export default Event;
