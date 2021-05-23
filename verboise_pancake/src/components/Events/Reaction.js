import React, { useEffect, useState } from 'react'
// import Moment from 'react-moment';
// import 'moment-timezone';
import { Moment } from 'moment'
import 'helper/firebaseConfig'
import { Line } from 'react-chartjs-2'

import firebase from 'firebase';
import 'firebase/firestore';
import { Button } from 'react-bootstrap';

const db = firebase.firestore();

let count = 0
let messageList = []
let chartDataList = []
let test = []
let test3 = []
let ctrl =0
let interval= 0
let randomId =  Math.random().toString(36).substring(7);
const Reaction = () => {
    const reactionRef = db.collection('reaction')

    const [chats, setChats] = useState([])
    const [dataSet, setDataSet] = useState([])
    const [label, setLabel] = useState(0)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {

        const unsubscribe = reactionRef.doc('tresor85550').collection('ruphin85550').onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().filter(({ type }) => type === "added").map(({ doc }) => {

                if (doc.data().message === 'VOTE') {
                    test.push(doc.data().vote.value)

                     if(ctrl === 0){                
                    interval= setInterval(() => {
                        console.log('hahahah')
                        test3.push({x:`${count}`, y:average(test)})
                        count ++
                        setDataSet(test3)

                        setRefresh(prev => !prev)

                    }, 10000)
                }
                    ctrl ++
                 
                    // chartDataList.push({ x: doc.data().vote.date, y: doc.data().vote.value })
                    // setDataSet(chartDataList)
                    // setRefresh(prev => !prev)


                }
                else if (doc.data().message === 'MESSAGE') {
                    messageList.push({freeText:doc.data().textMessage, id:doc.data().id})
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

    const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

const stoptest = () => {
    console.log('ahahahahhahahahha')
if(interval != 0){
    console.log(interval)
    console.log('lol')
    clearInterval(interval)

}else {
    console.log(' an error occured')
}
}
    let chartData = {
        datasets: [{
            label: '# of Votes',
            data: dataSet

        }]
    }
    const options = {
        indexAxis: 'x',

        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: false,
            },
        },
    };
    const handleBlock = (x)=> {
        reactionRef.doc('tresor85550').collection('ruphin85550').add({ message: 'BLOCK', id:x.r })

    }

    const handleUnblock = (x) => {
        reactionRef.doc('tresor85550').collection('ruphin85550').add({ message: 'UN_BLOCK', id:x.r })
    }

    return (
        <div>
            <h1>Hello world</h1>
            <Line data={chartData} options={options} />
            <Button onClick ={() =>stoptest() }>Stop</Button>
            {console.log(chats)}
            <div>
                <ul>
                    {
                        chats.map((elt, idx) => (
                            <li key={idx}>{elt.freeText}<button onClick={() => handleBlock(elt.id)}>block</button><button onClick={() => handleUnblock(elt.id)}>unblock</button></li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Reaction