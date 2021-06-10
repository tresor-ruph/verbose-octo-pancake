import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import 'helper/firebaseConfig'
import moment, { Moment } from 'moment'
import firebase from 'firebase';
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import 'helper/axiosConfig'

const db = firebase.firestore();
let r = Math.random().toString(36).substring(7);

const Gallup = ({code,eventId,userIp,setEventStatus}) => {
    const reactionRef = db.collection('reaction')
    const [hideAll, setHideAll] = useState(false)
    const [maxVotes, setMaxVotes] = useState(5)

    const eventState = useSelector(state => state.EventReducer.event)
    const dispatch =useDispatch()


    useEffect(() => {

        axios.get(`reaction/${eventId}`).then(res =>{
            setMaxVotes(res.data[0].waitingTime)
            if(eventState.maxVotes === null ||eventState.maxVotes === undefined){
                eventState.maxVotes =maxVotes
                dispatch({
                    type: "NEW_EVENT",
                    payload: {
                        event: eventState,
        
                    },
                });
        
            }else {
                setMaxVotes(eventState.maxVotes)
            }
           
        }).catch(err => {
            console.log(err.response)
        })

       
        const unsubscribe = reactionRef.doc(eventId).collection(code).onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().filter(({ type }) => type === "added").map(({ doc }) => {

                if (doc.data().message === 'BLOCK') {
                  console.log('block')
                    if(doc.data().id ==r){
                        setHideAll(true)
                    }
                }else if(doc.data().message === 'UN_BLOCK'){
                    console.log('unblock')
                    if(doc.data().id ==r){
                        console.log(true)
                        setHideAll(false)
                    }
                }else if(doc.data().message === 'END_EVENT'){
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


    const handleText = (event) => {
        setText(event.target.value)
    }

    const handleSend = () => {
        reactionRef.doc(eventId).collection(code).add({ message: 'MESSAGE', textMessage: text , id:{r}})
    }
    const handleChoice=(choice)=> {
        let maxVote =maxVotes
        eventState.maxVotes = --maxVote
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: eventState,

            },
        });

        let data ={
            ip: eventState.pseudo,
            eventId :eventId,
            questionIndex: 1000 + maxVote
        }
        console.log(data)
        // console.log(userIp)
        axios.put('updateIndex',data ).then(res => {
            reactionRef.doc(eventId).collection(code).add({ message: 'VOTE', vote: {value: choice, date: moment().format() } }).then(res => {
                setMaxVotes(prev =>prev -1 )
            })
        }).catch(err => {console.log(err.response)})

    }

    return (
        <div>
        {!hideAll ? <div>
            <div style={{ marginBottom: '20%', marginTop: '10%' }}>
                <div><h1>{maxVotes}</h1></div>
               {maxVotes > 0 ? <div className='row'>
                    <div className='col-md-2'>
                        <Button onClick= {() => handleChoice(1)}>1</Button>
                    </div>
                    <div className='col-md-2'>
                        <Button onClick= {() => handleChoice(2)}>2</Button>
                    </div>
                    <div className='col-md-2'>
                        <Button onClick= {() => handleChoice(3)}>3</Button>
                    </div>
                    <div className='col-md-2'>
                        <Button onClick= {() => handleChoice(4)}>4</Button>
                    </div>
                    <div className='col-md-2'>
                        <Button onClick= {() => handleChoice(5)}>5</Button>
                    </div>
                </div> : <div>you caanot vot</div>}

            </div>

            <div>
                <div style={{ marginBottom: '5%' }}>
                    <input type='text' className='form-control' placeholder='message' onChange={(event) => handleText(event)} /><br />
                </div>
                <Button onClick={() => handleSend()}>Send</Button>
            </div>
        </div> : <h1>You have been blocked</h1>}

        </div>

    )

}

export default Gallup