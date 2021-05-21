import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import 'helper/firebaseConfig'

import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore();


const Gallup = () => {
    const reactionRef = db.collection('reaction')

    const [text, setText] = useState('')


    const handleText = (event) => {
        setText(event.target.value)
    }

    const handleSend = () => {
        console.log('bababba')
        reactionRef.doc('tresor85550').collection('ruphin85550').add({ message: 'MESSAGE', textMessage: {freeText: text} })
    }

    return (
        <div>
            <div style={{ marginBottom: '20%', marginTop: '10%' }}>
                <div className='row'>
                    <div className='col-md-2'>
                        <Button>1</Button>
                    </div>
                    <div className='col-md-2'>
                        <Button>2</Button>
                    </div>
                    <div className='col-md-2'>
                        <Button>3</Button>
                    </div>
                    <div className='col-md-2'>
                        <Button>4</Button>
                    </div>
                    <div className='col-md-2'>
                        <Button>5</Button>
                    </div>
                </div>

            </div>

            <div>
                <div style={{ marginBottom: '5%' }}>
                    <input type='text' className='form-control' placeholder='message' onChange={(event) => handleText(event)} /><br />
                </div>
                <Button onClick={() => handleSend()}>Send</Button>
            </div>
        </div>

    )

}

export default Gallup