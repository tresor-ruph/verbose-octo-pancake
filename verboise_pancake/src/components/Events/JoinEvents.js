
import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'

import Gallup from 'components/Gallup/Gallup'
import JoinPoll from 'components/Poll/JoinPoll'
import NotFound from 'components/Error/Notfound'
import EventStatus from 'components/Events/EventStatus'

import axios from 'axios'
import 'helper/axiosConfig'
let r = Math.random().toString(36).substring(7);
const JoinEvent = () => {

    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const [eventType, setEventType] = useState(null)
    const [loaded, setLoaded] = useState('')
    const [eventId, setEventId] = useState('')
    const [eventStatus, setEventStatus] = useState('')

    useEffect(() => {
        axios
            .get(`/getEvent/${path}`).then(res => {
                console.log(res)
                if (res.data.length > 0) {
                     setEventId(res.data[0].eventId)
                     setEventType(res.data[0].eventType)
                     setEventStatus(res.data[0].status)
                    setLoaded(true)
                }
            }).catch(err => {
                console.log(err)
                console.log(err.response)
            })


    }, [])
    const renderEvent = () => {
if(eventStatus ==='In progress'){

        if (eventType === 'gallup') {
            return (<Gallup setEventStatus={setEventStatus} code={path} eventId={eventId} />)
        } else if (eventType === 'polls') {
            return (<JoinPoll setEventStatus={setEventStatus} code={path} uniqueId ={r} />)
        } else if (eventType === 'ranking') {
            return (<JoinPoll setEventStatus={setEventStatus} code={path} />)
        } else {
            return (<NotFound />)
        }
}else {
    return(<EventStatus status ={eventStatus}/>)
}
    }

    return (
        <div>
            {loaded ? renderEvent() : <div><NotFound /></div>}
        </div>
    )

}

export default JoinEvent