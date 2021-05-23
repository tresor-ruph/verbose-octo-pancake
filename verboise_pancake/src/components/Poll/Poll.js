import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Bar, Pie } from 'react-chartjs-2'
import { Button, Spinner } from 'react-bootstrap'
import './polls.scss'
import axios from 'axios'
import 'helper/axiosConfig'
import 'helper/firebaseConfig'

import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore();

let pollId = ''
let currentQuestion = ''
let index = 0
let chartDataList = []


const Poll = () => {
    const eventState = useSelector(state => state.EventReducer.event)
    const sessState = useSelector(state => state.SessionReducer)
    const [event, setEvent] = useState({})
    const [poll, setPoll] = useState({})
    const [question, setQuestion] = useState([])
    const [dataSet, setDataSet] = useState([''])
    const [eventStart, setEventStart] = useState(false)
    const [connect, setConnect] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [votes, setVotes] = useState(0)


    let pollRef = db.collection('polls')

    useEffect(() => {

        currentQuestion = question[index]

        loadEvent()

    }, [refresh])

    const registerFireStore = (pollId, currQuest) => {
        try {
            const unsubscribe = pollRef.doc(pollId).collection(currQuest.id).onSnapshot((querySnapshot) => {

                querySnapshot.docChanges().filter(({ type }) => type === "added").map(({ doc }) => {

                    if (doc.data().message === 'NEW_CONNECTIONS') {
                        setConnect(prev => prev + 1)
                    }
                    else if (doc.data().message === 'START_EVENT') {
                        // ----------- TO DO ------------------------------
                    }
                    else if (doc.data().message === 'REVEAL_RESULTS') {
                        // --------------- TO DO -------------------------
                    }
                    else if (doc.data().message === 'NEXT_QUESTION') {
                        // --------------TO DO --------------------------   

                    }

                    else if (doc.data().message === 'POLL_DATA') {
                        chartDataList.push(doc.data().answer)
                        let frequency = chartDataList.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
                        frequency = [...frequency.entries()]
                        let tempArr = []
                        for (let i of currQuest.options) {
                            for (let j of frequency) {
                                if (i.id == j[0]) {
                                    tempArr.push({ x: i.value, y: j[1] })
                                }
                            }
                        }
                        setDataSet(tempArr)
                        setVotes(tempArr.length)
                    }
                })
                return () => {
                    unsubscribe()
                }

            })

        }
        catch (error) {
            console.log(error)
        }

    }


    const loadEvent = async () => {

        if (index === 0) {
            await axios.get(`/getEventPoll/${eventState.eventId}/${sessState.userId}`).then(res => {
                setEvent(res.data.event)
                setPoll(res.data.poll)
                setQuestion(res.data.questions)
                pollId = res.data.poll.id
                currentQuestion = res.data.questions[index]
                registerFireStore(pollId, currentQuestion)
                setLoaded(true)

            }).catch(err => {
                console.log(err.response)
            })
        }
        else {
            registerFireStore(pollId, currentQuestion)
        }
    }
    const handleStart = () => {
        const data = {
            id: event.id,
            status: 'active'
        }
        axios.put('/updateStatus', data).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err.response)
        })

        pollRef.doc(pollId).collection(currentQuestion.id).add({ message: 'START_EVENT', ctrl: 0 }).then(
            setEventStart(true)
        ).catch(err => console.log(err))



    }
    const nextQuestion = async () => {
        pollRef.doc(pollId).collection(currentQuestion.id).add({ message: 'NEXT_QUESTION', ctrl: index })
        index = index + 1;
        setRefresh(prev => !prev)
        setVotes(0)
        chartDataList=[]
        setDataSet([])

        /*   const data = {
               id: poll.id,
               questionIndex: index + 1,
           }
           await axios.put('/questionCount', data).then(res => {
               console.log(res)
           }).catch(err => {
               console.log(err.response)
           })
       */
    }

    const revealAnswers = () => {
        pollRef.doc(pollId).collection(currentQuestion.id).add({ message: 'REVEAL_RESULTS' }).then(() => {
            // ---------------- TO DO -----------------------------------
        }).catch(err => console.log(err))

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


    return (
        <div>
            <div className='chart'>
                {loaded ?
                    <div>
                        <h3 style={{ marginBottom: '10%' }}>{`Number of participants  ${connect}`}</h3>

                        {
                            !eventStart ?
                                <div style={{ marginBottom: "5%" }}><Button onClick={() => handleStart()}>Start Event</Button></div>
                                :
                                <div>
                                    <h3 style={{ marginBottom: '10%' }}>{`Number of votes  ${votes}/${connect}`}</h3>

                                    <h1>{question[index]?.question || ''}</h1><Bar data={chartData} options={options} redraw={false} />
                                    <div> <Button style={{ marginBottom: "5%" }} onClick={() => revealAnswers()}>Reveal Answers</Button></div>
                                    {!(index === question.length - 1) ?
                                        <Button onClick={() => nextQuestion()}>Next question</Button>
                                        :
                                        <Button onClick={() => endEvent()}>End Event</Button>}</div>
                        }
                    </div>
                    :
                    <div className='spinner'><Spinner animation="border" role="status" variant="primary" size='x-lg'>
                        <span className="sr-only">Loading...</span>
                    </Spinner></div>}
            </div>
        </div>
    )

}

export default Poll