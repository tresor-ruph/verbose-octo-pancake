import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'primereact/button'
import 'helper/firebaseConfig'
import moment, { Moment } from 'moment'
import firebase from 'firebase';
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import 'helper/axiosConfig'
import 'customcss/Reaction.scss'
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputTextarea } from 'primereact/inputtextarea';



const db = firebase.firestore();
let r = Math.random().toString(36).substring(7);

const Gallup = ({ code, eventId, userIp, setEventStatus }) => {
    const reactionRef = db.collection('reaction')
    const [hideAll, setHideAll] = useState(false)
    const [maxVotes, setMaxVotes] = useState(5)
    const [activeIndex, setActiveIndex] = useState(0)

    const toast = useRef(null);

    const eventState = useSelector(state => state.EventReducer.event)
    const dispatch = useDispatch()


    useEffect(() => {

        axios.get(`reaction/${eventId}`).then(res => {
            setMaxVotes(res.data[0].waitingTime)
            if (eventState.maxVotes === null || eventState.maxVotes === undefined) {
                eventState.maxVotes = maxVotes
                dispatch({
                    type: "NEW_EVENT",
                    payload: {
                        event: eventState,

                    },
                });

            } else {
                setMaxVotes(eventState.maxVotes)
            }

        }).catch(err => {
            console.log(err.response)
        })


        const unsubscribe = reactionRef.doc(eventId).collection(code).onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().filter(({ type }) => type === "added").map(({ doc }) => {

                if (doc.data().message === 'BLOCK') {
                    console.log('block')
                    if (doc.data().id == r) {
                        setHideAll(true)
                    }
                } else if (doc.data().message === 'UN_BLOCK') {
                    console.log('unblock')
                    if (doc.data().id == r) {
                        console.log(true)
                        setHideAll(false)
                    }
                } else if (doc.data().message === 'END_EVENT') {
                    setEventStatus('Ended')
                }

            })
            return () => {
                unsubscribe()
            }
        })
        return () => {
            // clearInterval(interval)
            unsubscribe()
            dispatch({
                type: "NEW_EVENT",
                payload: {
                    event: [],

                },
            });
        }

    }, [])

    const [text, setText] = useState('')
    const [messageErr, setMessageErr] = useState(false)


    const handleText = (event) => {
        setText(event.target.value)
    }

    const handleSend = () => {
        if (text === '') {
            setMessageErr(true)
            return

        }
        reactionRef.doc(eventId).collection(code).add({ message: 'MESSAGE', textMessage: text, id: { r } })
    }
    const handleChoice = (choice) => {

        let allCards = document.getElementsByClassName('layout-display')
        if (allCards.length != 0) {
            Array.from(allCards).forEach(elt => {
                elt.style.backgroundColor = 'white'
            })
            let selectedCard = document.getElementsByClassName(`card-${choice}`)
            if (selectedCard !== null && selectedCard !== undefined)
                Array.from(selectedCard)[0].style.backgroundColor = 'rgba(255,0,0,0.2)'
        }

        let maxVote = maxVotes
        eventState.maxVotes = --maxVote
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: eventState,

            },
        });

        let data = {
            ip: eventState.pseudo,
            eventId: eventId,
            questionIndex: 1000 + maxVote
        }
        axios.put('updateIndex', data).then(res => {
            reactionRef.doc(eventId).collection(code).add({ message: 'VOTE', vote: { value: choice, date: moment().format() } }).then(res => {
                setMaxVotes(prev => prev - 1)
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Vote submited', life: 3000 });

            })
        }).catch(err => { console.log(err.response) })

    }

    const handleOnfocus = () => {
        setMessageErr(false)
    }

    return (
        <div className='join-reaction p-d-flex p-jc-center'>
            <div className='join-sub-div '>
                <Toast ref={toast} style={{ marginTop: '10vh' }} />

                {!hideAll ? <div className='p-shadow-4 ' >
                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className='tab-view'>
                        <TabPanel headerClassName='vote-title1' header="Vote">
                            <div className='div-1  '>
                                <div className='vote-cnt p-d-flex p-jc-center'>Number of votes left :  <span className='vote-cnter'>{maxVotes}</span></div>
                                {maxVotes > 0 ?
                                    // p-flex-column p-flex-md-row div1
                                    <div className='p-d-flex p-jc-center '>
                                        <div className="p-d-flex p-flex-column p-flex-md-row">
                                            <Card className='layout-display card-1 cards p-mr-2 p-mb-2 p-d-flex p-jc-center'>
                                                <a className='stretched-link' onClick={() => handleChoice(1)}>
                                                    <div className='vote-numb'>
                                                        <span>1</span>
                                                    </div>

                                                </a>
                                            </Card>
                                            <Card className='layout-display card-2 cards p-mr-2 p-mb-2 p-d-flex p-jc-center'>
                                                <a className='stretched-link' onClick={() => handleChoice(2)}>
                                                    <div className='vote-numb'>
                                                        <span>2</span>
                                                    </div>

                                                </a>
                                            </Card>
                                            <Card className='layout-display card-3 cards p-mr-2 p-mb-2 p-d-flex p-jc-center'>
                                                <a className='stretched-link' onClick={() => handleChoice(3)}>
                                                    <div className='vote-numb'>
                                                        <span>3</span>
                                                    </div>

                                                </a>
                                            </Card>
                                        </div>
                                        <div className="p-d-flex p-flex-column p-flex-md-row">
                                            <Card className='layout-display card-4  cards p-mr-2 p-mb-2 p-d-flex p-jc-center'>
                                                <a className='stretched-link' onClick={() => handleChoice(4)}>
                                                    <div className='vote-numb'>
                                                        <span>4</span>
                                                    </div>

                                                </a>
                                            </Card>
                                            <Card className='layout-display card-5 cards p-mr-2 p-mb-2 p-d-flex p-jc-center'>
                                                <a className='stretched-link' onClick={() => handleChoice(5)}>
                                                    <div className='vote-numb'>
                                                        <span>5</span>
                                                    </div>

                                                </a>
                                            </Card>
                                            <Card className=' card-6 cards layout-display p-mr-2 p-mb-2 p-d-flex p-jc-center'>
                                                <a className='stretched-link' onClick={() => handleChoice(6)}>
                                                    <div className='vote-numb'>
                                                        <span>6</span>
                                                    </div>

                                                </a>
                                            </Card>
                                        </div>

                                    </div> 
                                    :
                                    <div>
                                        <div className='vote-cnt p-d-flex p-jc-center'>Thank You for your participation.</div>
                                        <div className='p-d-flex p-jc-center txt-mess-2' style ={{fontSize:'1.2rem', color:'#888', fontFamily: '100'}}> you cannot vote anymore but can still leave comments </div>
                                    </div>
                                }
                            </div>
                        </TabPanel>
                        <TabPanel headerClassName='vote-title2' header="Comment">
                            <div className='div-1'>
                                <div className='p-d-flex p-jc-center comm-div'>
                                    <div style={{ marginBottom: '5%' }}>
                                        <InputTextarea className='txt-area' onChange={(e) => handleText(e)} rows={5} cols={30} autoResize placeholder='leave your message' onFocus={() => handleOnfocus()} /><br />
                                        {messageErr && <small className="p-error" >Please add your message.</small>}

                                    </div>
                                </div>
                                <div className='p-d-flex p-jc-center'>
                                    <Button onClick={() => handleSend()}>Send</Button>

                                </div>
                            </div>
                        </TabPanel>
                    </TabView>



                </div> : 
                <div style={{textAlign:'center'}}>
                    <span className='p-d-flex p-jc-center' style ={{fontSize:'1.5rem', color:'white', fontWeight: '500', marginTop:'10vh', marginBottom:'5vh'}}>You cannot participate anymore</span>
                    <span className='p-d-flex p-jc-center' style ={{fontSize:'1.2rem', color:'white', fontWeight: '500'}}>Seems like you have been banned from this event. Please contact the organiser</span>

                    </div>}
            </div>
        </div>

    )

}

export default Gallup