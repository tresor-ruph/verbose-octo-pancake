
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { QRCode } from 'react-qr-svg'

import axios from 'axios'
import "helper/axiosConfig"
import './step3.scss'

let eventId = null
let pollId = null
let eventUrl = ''
const Step3 = () => {
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()
    const eventState = useSelector(state => state.EventReducer.event)

    useEffect(() => {
        console.log(eventState)
        makeRequest(eventState)
        console.log('requests done')

    }, [])

    const generateLink = (x) => {
        eventUrl = process.env.REACT_APP_EVENTBASEURL + x
    }


    const postEvent = async (x) => {
        const data = {
            title: x.title,
            selected: x.eventType
        }
        await axios.post('/createEvent', data).then(res => {
            if (res.status === 200) {
                generateLink(res.data.link)
                eventId = res.data.eventId
                // console.log('eventResponse', res)
            }
        }).catch(err => {
            console.log(err.response)
        })
    }

    const postPoll = async (x) => {
        const data = {
            layout: x.defaultResultLayout,
            time: x.waitingTime,
            mode: x.mode,
            eventId: eventId
        }

        await axios.post('/createPoll', data).then(res => {
            pollId = res.data.pollId
            postQuestions(x)

        }).catch(err => {
            console.log(err.response)
        })
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: {
                    title: "",
                    eventType: "",
                    code: eventUrl,
                    defaultResultLayout: '',
                    waitingTime: '',
                    mode: '',
                    question: [],
                    options: [],
                    id: eventId,
                },

            },
        });
        setLoaded(true)

    }

    const postQuestions = async (x) => {
        x.question.forEach(elt => {
            x.options.forEach(opt => {
                if (elt != null && opt != null) {
                    if (elt.id === opt.questionId) {
                        elt.options = opt.answers.filter(elt => elt != null)
                        elt.pollId = pollId;
                        return
                    }
                }
            })
        })

        x.question = x.question.filter(elt => elt != null)
        x.question.forEach(elt => {
            axios.post('/addQuestions', elt).then(res => {
                console.log(res)
            }).catch(err => console.log(err))
        })


    }

    const makeRequest = async (x) => {
        await postEvent(x);
        if (eventId != null) {
            await postPoll(x);
        }
    }

    return (
        <div className='step3'>
            {!loaded ?
                (<div className='spinner'><Spinner animation="border" role="status" variant="primary" size='x-lg'>
                    <span className="sr-only">Loading...</span>
                </Spinner></div>) :

                (<div className='row'>
                    <div className='col md-4'>
                        
                        <div className='qr'>
                        <span class='qr-text'>Scan code </span>

                            <QRCode bgColor="#FFFFFF"
                                fgColor="#000000"
                                level="Q"
                                style={{ width: 350 }}
                                value={eventUrl} />
                        </div>
                    </div>
                    <div className='col md-2 url-or' >
                        <span> - OR -</span>
                        </div>
                    <div className='col md-4 url-txt' >
                    
                        <h3>{eventUrl}</h3>
                    </div>


                </div>)}
        </div>)
}

export default Step3