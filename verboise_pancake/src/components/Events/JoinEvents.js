
import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import Gallup from 'components/Gallup/Gallup'
import JoinPoll from 'components/Poll/JoinPoll'
import NotFound from 'components/Error/Notfound'
import EventStatus from 'components/Events/EventStatus'
import AddUsername from 'components/Poll/AddUsername'
import { ProgressSpinner } from "primereact/progressspinner";
import ls from 'local-storage'

import axios from 'axios'
import 'helper/axiosConfig'

const JoinEvent = () => {

    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const [eventType, setEventType] = useState(null)
    const [loaded, setLoaded] = useState('')
    const [eventId, setEventId] = useState('')
    const [eventStatus, setEventStatus] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [startCompet, setStartCompet] = useState(false)
    const [userIp, setUserIp] = useState('')
    const [userNameErr, setUserNameErr] = useState(false)
    
    const newEventState =  JSON.parse(ls.get('newEventState'))
    const handlePseudo = (x) => {
        setPseudo(x)
    }

    const handleValidatePseudo = () => {
        if (pseudo.length < 3) {
            setUserNameErr(true)
            return
        }
     
        ls.set('newEventState', JSON.stringify({pseudo: pseudo}))
        
        setStartCompet(true)
    }

  

    const handleFocus = () => {
        setUserNameErr(false)
    }

    useEffect(async () => {
    
        console.log(newEventState)
      
        axios
            .get(`/getEvent/${path}`).then(res => {

                if (res.data.length > 0) {

                    setEventId(res.data[0].eventId)
                    setEventType(res.data[0].eventType)
                    setEventStatus(res.data[0].status)

                    if (newEventState != null && newEventState.pseudo != '' ) {
                        setPseudo(newEventState.pseudo)
                        setStartCompet(true)

                    } else {
                        if (res.data[0].eventType === 'polls' || res.data[0].eventType === 'gallup') {

                            let r = Math.random().toString(36).substring(7)
                            setPseudo(r)
                            ls.set('newEventState', JSON.stringify({pseudo: r}))
                         

                        } else if (res.data[0].eventType === 'ranking') {

                        setStartCompet(false)
                            setLoaded(true)
                        }else {
                         

                        }
                    }
                    setLoaded(true)
                } else {
                    setLoaded(true)
                }
            }).catch(err => {
                console.log(err)
                console.log(err.response)
            })

    }, [])
    const renderEvent = () => {

        if (eventStatus === 'In progress') {

            if (eventType === 'gallup') {
                return (<Gallup setEventStatus={setEventStatus} code={path} eventId={eventId} userIp={userIp} />)
            } else if (eventType === 'polls') {
                return (<JoinPoll setEventStatus={setEventStatus} code={path} uniqueId={pseudo} eventId={eventId} userIp={userIp} />)
            } else if (eventType === 'ranking') {
                return (<div>
                    {
                        startCompet ? <JoinPoll setEventStatus={setEventStatus} code={path} uniqueId={pseudo} eventId={eventId} userIp={userIp} /> : <AddUsername pseudo={pseudo} userNameErr={userNameErr} handleFocus={handleFocus} handlePseudo={handlePseudo} handleValidatePseudo={handleValidatePseudo} />

                    }

                </div>)
            } else {
                return (<NotFound />)
            }
        } else if (eventStatus === '') {
            return (<NotFound />)
        }
        else {
            return (<EventStatus status={eventStatus} />)
        }
    }

    return (
        <div>
            {loaded ? renderEvent() : <div
                className="spinner p-d-flex p-jc-center"
                style={{ marginTop: "40vh" }}
            >
                <ProgressSpinner />
            </div>}
        </div>
    )

}

export default JoinEvent