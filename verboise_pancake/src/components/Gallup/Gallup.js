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
    const [text, setText] = useState('')
    const [messageErr, setMessageErr] = useState(false)
    const [disableVotes, setDisableVotes] = useState(false)


    const toast = useRef(null);

    const eventState = useSelector(state => state.EventReducer.event)
    const dispatch = useDispatch()


    useEffect(() => {
        // console.log('newVote', eventState.refreshTime)
        // if(eventState.refreshTime && eventState.refreshTime != ''){
        //     let now = moment().format('hh:mm:ss')
        //     console.log('now',now)
        //     let duration = moment.duration(eventState.refreshTime.diff(now))
        //     let seconds = duration.asSeconds()
        //     console.log(seconds)
        // }

        axios.get(`reaction/${eventId}`).then(res => {
            setMaxVotes(parseInt(res.data[0].waitingTime) * 1000)
        }).catch(err => {
            console.log(err.response)
        })



        const unsubscribe = reactionRef.doc(eventId).collection(code).onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().filter(({ type }) => type === "added").map(({ doc }) => {

                if (doc.data().message === 'BLOCK') {
                    if (doc.data().id == r) {
                        setHideAll(true)
                    }
                } else if (doc.data().message === 'UN_BLOCK') {
                    if (doc.data().id == r) {
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
            unsubscribe()
            dispatch({
                type: "NEW_EVENT",
                payload: {
                    event: [],

                },
            });
        }

    }, [])




    const handleText = (event) => {
        setText(event.target.value)
    }

    const handleSend = () => {
        if (text === '') {
            setMessageErr(true)
            return

        }
        reactionRef.doc(eventId).collection(code).add({ message: 'MESSAGE', textMessage: text, id: { r } }).then(() => {
            toast.current.show({ severity: 'success', summary: 'succès', detail: 'message envoyé', life: 3000 });
        })
    }
    const handleChoice = (choice) => {

        setDisableVotes(true)

        reactionRef.doc(eventId).collection(code).add({ message: 'VOTE', vote: { value: choice, date: moment().format() } }).then(res => {

            toast.current.show({ severity: 'success', summary: 'succès', detail: 'Vote soumis', life: 3000 });

        })

        let newTime = moment().add(maxVotes, 'seconds').format('hh:mm:ss')
        eventState.refreshTime = newTime
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: eventState,

            },
        });
        setTimeout(function () {
            setDisableVotes(false)
        }, maxVotes)

    }

    const handleOnfocus = () => {
        setMessageErr(false)
    }

    return (
        <div className='join-reaction p-d-flex p-jc-center'>
            <div className='join-sub-div '>
                <Toast ref={toast} style={{ marginTop: '10vh' }} />


                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className='tab-view'>
                    <TabPanel headerClassName='vote-title1' header="Vote">
                        <div className='div-1  '>

                            <div className='p-d-flex p-jc-center '>
                                <div className="p-d-flex p-flex-column p-flex-md-row" style={{marginTop: '10vh'}}>
                                    <Button className='layout-display card-1 cards p-mr-2 p-mb-2 p-d-flex p-jc-center' onClick={() => handleChoice(1)} disabled={disableVotes} >
                                        1

                                    </Button>
                                    <Button className='layout-display card-2 cards p-mr-2 p-mb-2 p-d-flex p-jc-center' onClick={() => handleChoice(2)} disabled={disableVotes}>
                                        2

                                    </Button>
                                    <Button className='layout-display card-3 cards p-mr-2 p-mb-2 p-d-flex p-jc-center' onClick={() => handleChoice(3)} disabled={disableVotes}>
                                        3

                                    </Button>
                                </div>
                                <div className="p-d-flex p-flex-column p-flex-md-row" style={{marginTop: '10vh'}}>
                                    <Button className='layout-display card-4  cards p-mr-2 p-mb-2 p-d-flex p-jc-center' onClick={() => handleChoice(4)} disabled={disableVotes}>
                                        4

                                    </Button>
                                    <Button className='layout-display card-5 cards p-mr-2 p-mb-2 p-d-flex p-jc-center' onClick={() => handleChoice(5)} disabled={disableVotes}>
                                        5

                                    </Button>
                                    <Button className=' card-6 cards layout-display p-mr-2 p-mb-2 p-d-flex p-jc-center' onClick={() => handleChoice(6)} disabled={disableVotes}>
                                        6

                                    </Button>
                                </div>

                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel headerClassName='vote-title2' header="Comment">
                        <div className='div-1'>
                            <div className='p-d-flex p-jc-center comm-div'>
                                <div style={{ marginBottom: '5%' }}>
                                    <InputTextarea className='txt-area' onChange={(e) => handleText(e)} rows={5} cols={30} autoResize placeholder='leave your message' onFocus={() => handleOnfocus()} /><br />
                                    {messageErr && <small className="p-error" >Veuillez ajouter votre message.</small>}

                                </div>
                            </div>
                            <div className='p-d-flex p-jc-center'>
                                <Button onClick={() => handleSend()}>Envoyer</Button>

                            </div>
                        </div>
                    </TabPanel>
                </TabView>


            </div>
        </div>

    )

}

export default Gallup