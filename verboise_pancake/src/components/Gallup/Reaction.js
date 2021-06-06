import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import ReactionGraph from './ReactionGraph'
import { TabView, TabPanel } from 'primereact/tabview';
import { useDispatch, useSelector } from 'react-redux'
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

const LoadGallup = ({ code }) => {
    const reactionRef = db.collection('reaction')
    const eventState = useSelector(state => state.EventReducer.event)

    const [activeIndex, setActiveIndex] = useState(0)
    const [eventStart, setEventStart] = useState(false)


    const [chats, setChats] = useState([])
    const [dataSet, setDataSet] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [voteFreq, setVoteFreq] = useState(3)

    useEffect(() => {

        const unsubscribe = reactionRef.doc('tresor85550').collection('ruphin85550').onSnapshot((querySnapshot) => {
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

                        }, 10000)
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
        reactionRef.doc('tresor85550').collection('ruphin85550').add({ message: 'BLOCK', id: x.r })

    }

    const handleUnblock = (x) => {
        reactionRef.doc('tresor85550').collection('ruphin85550').add({ message: 'UN_BLOCK', id: x.r })
    }

    const handleIndex = (e) => {
        setActiveIndex(e.index)
    }
    const handleStartEvent = () => {
      
        const data = {
            id: eventState.eventId,
            status: 'In progress'
        }
        axios.put('/updateStatus', data).then(res => {
            let data2 = {
                audienceNumber: 0,
                voteFreq: voteFreq,
                eventId: eventState.eventId
            }
            axios.post('/newReaction', data2).then(res => {
                console.log(res)
                setEventStart(true)
            }).catch(err => {
                console.log(err.response)
            
            })

        }).catch(err => {
            console.log(err.response)

        })
    }


    return (
        <div>
            {eventStart ? (<div>
                <div className='row'>
                    <div className='col-7'>
                        <ReactionGraph dataSet={dataSet} />
                    </div>
                    <div className='col-3'>
                        <TabView activeIndex={activeIndex} onTabChange={(e) => handleIndex(e)}>
                            <TabPanel headerClassName='join-tab' header={eventStart ? 'Comments' : 'Start eVent'}>
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
            </div>) : (<StartReaction voteFreq={voteFreq} setVoteFreq={setVoteFreq} handleStartEvent={handleStartEvent} />)}
        </div>
    )

}

export default LoadGallup