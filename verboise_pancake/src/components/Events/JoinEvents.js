
import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import publicIp from "public-ip";

import Gallup from 'components/Gallup/Gallup'
import JoinPoll from 'components/Poll/JoinPoll'
import NotFound from 'components/Error/Notfound'
import EventStatus from 'components/Events/EventStatus'
import AddUsername from 'components/Poll/AddUsername'
import { ProgressSpinner } from "primereact/progressspinner";

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
    const dispatch = useDispatch()
    
    const eventState = useSelector(state => state.EventReducer.event)
    const handlePseudo = (x) => {
        setPseudo(x)
    }

    const handleValidatePseudo = () => {
        if (pseudo.length < 3) {
            setUserNameErr(true)
            return
        }
        eventState.pseudo = pseudo
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: eventState,

            },
        });
        setStartCompet(true)
    }

    const getClientIp = async () => await publicIp.v4({
        fallbackUrls: ["https://ifconfig.co/ip"]
    }).then(res => {
        return res
    })

    const handleFocus = () => {
        setUserNameErr(false)
    }

    useEffect(async () => {
    

        let test = await getClientIp()
        setUserIp(test)
        axios
            .get(`/getEvent/${path}`).then(res => {
                // console.log(res)

                if (res.data.length > 0) {

                    setEventId(res.data[0].eventId)
                    setEventType(res.data[0].eventType)
                    setEventStatus(res.data[0].status)
                    if (eventState.pseudo && eventState.pseudo != '' ) {
                        setPseudo(eventState.pseudo)
                        console.log(eventState.pseudo)
                    } else {
                        if (res.data[0].eventType === 'polls' || res.data[0].eventType === 'gallup') {

                            let r = Math.random().toString(36).substring(7)
                            setPseudo(r)
                            eventState.pseudo = r
                            dispatch({
                                type: "NEW_EVENT",
                                payload: {
                                    event: eventState,
                                },
                            });

                        } else if (res.data[0].eventType === 'ranking') {

                        // setStartCompet(false)
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