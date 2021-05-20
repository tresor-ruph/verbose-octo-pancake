import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Bar, Pie } from 'react-chartjs-2'
import { Button } from 'react-bootstrap'
import './polls.scss'
import axios from 'axios'
import 'helper/axiosConfig'
import 'helper/firebaseConfig'

import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore();

let pollId = ''
let currentQuestion = ''

const Poll = () => {
    const eventState = useSelector(state => state.EventReducer.event)
    const [event, setEvent] = useState({})
    const [poll, setPoll] = useState({})
    const [question, setQuestion] = useState([])
    const [index, setIndex] = useState(0)
    const [dataSet, setDataSet] = useState([''])
    const [eventStart, setEventStart] = useState(false)


    let pollRef = db.collection('polls')

    useEffect(() => {
        loadEvent()

    }, [index])

    const registerFireStore = (pollId, currQuest) => {
        try {
            const unsubscribe = pollRef.doc(pollId).collection(currQuest.id).onSnapshot((querySnapshot) => {

                let data = [];
                let message = ''
                querySnapshot.forEach(doc => {

                    if (doc.data().message === 'startEvent') {
                        setEventStart(true)
                    } 
                    else if (doc.data().message === 'next-question') {
                        message = 'next question'
                        data = []
                    }
                    else {
                        data.push(parseInt(doc.data().answer))

                    }

                })
                if (data.length > 0 && message == '') {
                    const map = data.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
                    let test = [...map.entries()]
                    let tempArr = []
                    for (let i of currQuest.options) {
                        for (let j of test) {
                            if (i.id == j[0]) {
                                tempArr.push({ x: i.value, y: j[1] })
                            }
                        }
                    }
                    setDataSet(tempArr)
                }
                try {
                    return () => unsubscribe()
                } catch (error) {
                    console.log('subscribe err', error)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleStart = () => {
        
        pollRef.doc(pollId).collection(currentQuestion.id).add({ message: 'startEvent' })

        const data ={
            id: event.id,
            status: 'active'
        }
        axios.put('/updateStatus', data).then(res=> {
            console.log(res)
        }).catch(err => {
            console.log(err.response)
        })
    }

    const loadEvent = async () => {
        await axios.get('/getEventPoll/' + eventState.id).then(res => {
            setEvent(res.data.event)
            setPoll(res.data.poll)
            console.log('poll', res.data.poll.questionIndex)
            setIndex(res.data.poll.questionIndex)
            setQuestion(res.data.questions)
            pollId = res.data.poll.id
            currentQuestion = res.data.questions[res.data.poll.questionIndex]
            registerFireStore(pollId, currentQuestion)

        }).catch(err => {
            console.log(err);
            console.log(err.response)
        })
    }

    const nextQuestion =async () => {

        pollRef.doc(pollId).collection(currentQuestion.id).add({ message: 'next-question' })
        setIndex(prev => prev + 1);
        currentQuestion = question[index]
        console.log('index',index)
        const data = {
            id : poll.id,
            questionIndex: index +1,
        }
       await axios.put('/questionCount', data).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err.response)
        })
        
        
    }

    const revealAnswers = () => {
        pollRef.doc(pollId).collection(currentQuestion.id).add({ message: 'reveal' })

    }

    const endEvent = () => {
    }

    let chartData = {
        datasets: [{
            label: '# of Votes',
            data: dataSet,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }]
    }
    const options = {
        indexAxis: 'x',

        elements: {
            bar: {
                borderWidth: 1,
            },
        },
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


    return (<div>
        <div className='chart'>
            {eventStart && <div>Event Started</div>}
            <h1>{question[index]?.question || 'hahahah '}</h1>
            <Bar data={chartData} options={options} redraw={false} />
            <div style={{ marginBottom: "5%" }}><Button onClick={() => handleStart()}>Start Event</Button></div>
           <div> <Button style={{ marginBottom: "5%" }} onClick={() => revealAnswers()}>Reveal Answers</Button></div>

            {! (index === question.length )? <Button onClick={() => nextQuestion()}>Next question</Button> :<Button onClick={() => endEvent()}>End Event</Button> }
        </div>
    </div>)

}

export default Poll