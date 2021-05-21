import React, { useEffect, useState } from 'react'
import 'helper/firebaseConfig'

import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore();


let messageList = []
const Reaction = () => {
    const reactionRef = db.collection('reaction')

    const [chats, setChats] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {

        const unsubscribe = reactionRef.doc('tresor85550').collection('ruphin85550').onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().filter(({ type }) => type === "added").map(({ doc }) => {

                if (doc.data().message === 'VOTE') {
                    console.log('vote')
                }
                else if (doc.data().message === 'MESSAGE') {
                    messageList.push(doc.data().textMessage)
                    setChats(messageList)
                    setRefresh(prev=>!prev)

                }
            })
            return () => {
                unsubscribe()
            }
        })


    }, [])

    return (
        <div>
            <h1>Hello world</h1>
            <div>
                {console.log(chats)}
                <ul>
                    {
                        chats.map((elt, idx) => (
                            <li key={idx}>{elt.freeText}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Reaction