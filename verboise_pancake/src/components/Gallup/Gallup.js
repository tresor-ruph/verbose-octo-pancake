import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import 'helper/firebaseConfig'
import moment, { Moment } from 'moment'
import firebase from 'firebase';
import 'firebase/firestore';
import { TrendingUpRounded } from '@material-ui/icons';

const db = firebase.firestore();
let r = Math.random().toString(36).substring(7);

const Gallup = () => {
    const reactionRef = db.collection('reaction')
    const [hideAll, setHideAll] = useState(false)

    useEffect(() => {

        const unsubscribe = reactionRef.doc('tresor85550').collection('ruphin85550').onSnapshot((querySnapshot) => {
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
                }
                
            })
            return () => {
                unsubscribe()
            }
        })
        return () => {
            // clearInterval(interval)
            unsubscribe()
        }

    }, [])

    const [text, setText] = useState('')


    const handleText = (event) => {
        setText(event.target.value)
    }

    const handleSend = () => {
        reactionRef.doc('tresor85550').collection('ruphin85550').add({ message: 'MESSAGE', textMessage: text , id:{r}})
    }
    const handleChoice=(choice)=> {
        reactionRef.doc('tresor85550').collection('ruphin85550').add({ message: 'VOTE', vote: {value: choice, date: moment().format() } })

    }

    return (
        <div>
        {!hideAll ? <div>
            <div style={{ marginBottom: '20%', marginTop: '10%' }}>
                <div className='row'>
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
                </div>

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