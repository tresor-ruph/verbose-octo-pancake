
import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import publicIp from "public-ip";

import Gallup from 'components/Gallup/Gallup'
import JoinPoll from 'components/Poll/JoinPoll'
import NotFound from 'components/Error/Notfound'
import EventStatus from 'components/Events/EventStatus'
import AddUsername from 'components/Poll/AddUsername'

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
    const dispatch = useDispatch()
    const eventState = useSelector(state => state.EventReducer.event)

    const handlePseudo = (x) => {
        setPseudo(x)
    }

    const handleValidatePseudo = () => {
        if (pseudo.length < 3) {
            console.log('Invalid pseudo')
            return
        }
        eventState.pseudo = pseudo
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: eventState,

            },
        });

        let data = {
            audAddress: userIp,
            pseudo: pseudo,
            questionIndex: 0,
            EventEventId: eventId
        }

        axios.post('addPart', data).then(res => {
            setStartCompet(true)

        }).catch(err => {
            console.log(err)
        })

    }

    const getClientIp = async () => await publicIp.v4({
        fallbackUrls: ["https://ifconfig.co/ip"]
    }).then(res => {
        return res
    })




    useEffect(async () => {
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: [],

            },
        });
        let test = await getClientIp()
        setUserIp(test)
        axios
            .get(`/getEvent/${path}`).then(res => {

                if (res.data.length > 0) {
                    setEventId(res.data[0].eventId)
                    setEventType(res.data[0].eventType)
                    setEventStatus(res.data[0].status)

                    axios.get(`/audience/${test}/${res.data[0].eventId}`).then(res2 => {
                        if (res2.data.length === 0) {
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
                                let data = {
                                    audAddress: test,
                                    pseudo: r,
                                    questionIndex: 0,
                                    EventEventId: res.data[0].eventId
                                }

                                axios.post('addPart', data).then(res => {
                                    setLoaded(true)

                                }).catch(err => {
                                    console.log(err)
                                })

                            } else if (res.data[0].eventType === 'ranking') {
                                setStartCompet(false)
                                setLoaded(true)

                            }

                        } else {
                            eventState.pseudo = res2.data[0].pseudo
                            if(res2.data[0].questionIndex >= 1000){
                                eventState.maxVotes = res2.data[0].questionIndex -1000
                            }
                            dispatch({
                                type: "NEW_EVENT",
                                payload: {
                                    event: eventState,

                                },
                            });
                            setLoaded(true)

                        }

                    }).catch(err => {
                        console.log(err.response)
                    })



                }

            }).catch(err => {
                console.log(err)
                console.log(err.response)
            })

           


    }, [])
    const renderEvent = () => {
        if (eventStatus === 'In progress') {

            if (eventType === 'gallup') {
                return (<Gallup setEventStatus={setEventStatus} code={path} eventId={eventId} userIp={userIp}  />)
            } else if (eventType === 'polls') {
                return (<JoinPoll setEventStatus={setEventStatus} code={path} uniqueId={pseudo} eventId={eventId} userIp={userIp}  />)
            } else if (eventType === 'ranking') {
                return (<div>
                    {
                        startCompet ? <JoinPoll setEventStatus={setEventStatus} code={path} uniqueId={pseudo} eventId={eventId} userIp={userIp} /> : <AddUsername pseudo={pseudo} handlePseudo={handlePseudo} handleValidatePseudo={handleValidatePseudo} />

                    }

                </div>)
            } else {
                return (<NotFound />)
            }
        } else {
            return (<EventStatus status={eventStatus} />)
        }
    }

    return (
        <div>
            {loaded ? renderEvent() : <div><NotFound /></div>}
        </div>
    )

}

export default JoinEvent