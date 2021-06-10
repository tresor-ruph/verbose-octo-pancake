import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import ReactionGraph from './ReactionGraph'
import { TabView, TabPanel } from 'primereact/tabview';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import axios from 'axios'
import 'helper/axiosConfig'
import { QRCode } from 'react-qr-svg'
import 'helper/firebaseConfig'
import firebase from 'firebase';
import 'firebase/firestore';
import Comment from './Comments'
import StartReaction from './StartReaction'
let voteCount = 0
let messageList = []
let votes = []
let votesData = []
let ctrl = 0
let interval = null
const db = firebase.firestore();

const LoadGallup = ({ code, ongoing }) => {
    const reactionRef = db.collection('reaction')

    const [activeIndex, setActiveIndex] = useState(0)


    const [chats, setChats] = useState([])
    const [dataSet, setDataSet] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [show, setShow] = useState(true);
    const [duration, setDuration] = useState(60)
    const [voteFreq, setVoteFreq] = useState(duration / 10)
    const [delay, setDelay] = useState(3000)
    const history = useHistory()
    const eventState = useSelector(state => state.EventReducer.event)


    const dispatch = useDispatch()
    const handleDuration = (x) => {
        setDuration(x)
        setVoteFreq(Math.round(x / 10))
    }

    useEffect(() => {
        console.log('eventState', eventState.eventId, eventState.delay)
        console.log('code', code)
        const unsubscribe = reactionRef.doc(eventState.eventId).collection(code).onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().filter(({ type }) => type === "added").map(({ doc }) => {

                if (doc.data().message === 'VOTE') {
                    console.log(doc.data().vote.value)
                    votes.push(doc.data().vote.value)

                    if (ctrl === 0) {
                        interval = setInterval(() => {
                            votesData.push({ x: `${voteCount}`, y: average(votes) })
                            voteCount++
                            console.log(votesData)
                            setDataSet(votesData)

                            setRefresh(prev => !prev)

                        }, eventState?.delay || 3000)
                    }
                    ctrl++


                }
                else if (doc.data().message === 'MESSAGE') {
                    messageList.push({ freeText: doc.data().textMessage, id: doc.data().id })
                    console.log(doc.data().textMessage)
                    setChats(messageList)
                    setRefresh(prev => !prev)


                }
            })
            return () => {
                unsubscribe()
            }
        })
        return () => {
            clearInterval(interval)
            unsubscribe()
        }

    }, [])

    const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
    const handleBlock = (x) => {
        reactionRef.doc(eventState.eventId).collection(code).add({ message: 'BLOCK', id: x.r })

    }

    const handleUnblock = (x) => {
        reactionRef.doc(eventState.eventId).collection(code).add({ message: 'UN_BLOCK', id: x.r })
    }

    const handleIndex = (e) => {
        setActiveIndex(e.index)
    }

    const handleClose = () => {
        setShow(false)
        history.push('/Home')
    }

    const handleStartEvent = () => {


        const data = {
            id: eventState.eventId,
            status: 'In progress'
        }
        axios.put('/updateStatus', data).then(res => {
            let data2 = {
                audienceNumber: duration,
                voteFreq: voteFreq,
                eventId: eventState.eventId
            }
            axios.post('/newReaction', data2).then(res => {
                eventState.status = "In progress"
                eventState.delay = delay
                dispatch({
                    type: "NEW_EVENT",
                    payload: {
                        event: eventState,
                    },
                });
                setShow(false)
            }).catch(err => {
                console.log(err.response)
                console.log(err)

            })

        }).catch(err => {
            console.log(err.response)

        })
    }

    const StopEvent = () => {
        const data = {
            id: eventState.eventId,
            status: 'Ended'
        }
        try {
            reactionRef.doc(eventState.eventId).collection(code).add({ message: 'END_EVENT', dataSet })

            reactionRef.doc(eventState.eventId).collection(`${code}result`).add({ message: 'RESULTANALYSIS', dataSet })

        } catch (error) {
            console.log(err)
        }


        axios.put('/updateStatus', data).then(res => {
            history.push('/resultGallup')
        })


    }



    return (
        <div>
            {   !ongoing && <StartReaction show={show} setDelay={setDelay} setShow={handleClose} duration={duration} setDuration={handleDuration} voteFreq={voteFreq} setVoteFreq={setVoteFreq} handleStartEvent={handleStartEvent} />}            <div>
                <div className='row'>
                    <div className='col-7'>
                        <ReactionGraph dataSet={dataSet} StopEvent={StopEvent} />
                    </div>
                    <div className='col-3'>
                        <TabView activeIndex={activeIndex} onTabChange={(e) => handleIndex(e)}>
                            <TabPanel headerClassName='join-tab' >
                                <div><Comment message={chats} handleBlock={handleBlock} handleUnblock={handleUnblock} /></div>
                            </TabPanel>
                            <TabPanel headerClassName='add-quest-tab' header="Invite Participants">
                                <div className='scan-div'>

                                    <QRCode bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="Q"
                                        style={{ width: 270 }}
                                        className='qr-code'
                                        value={`http://localhost:3000/${code}`} />
                                    <div className='or-div' >
                                        <span className='or-text'> -- OR -- </span><br />
                                        <div className='url-div'>
                                            <span className='url-text'>{`verbosePancake/${code}`}</span>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                        </TabView>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LoadGallup