import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Bar, Pie } from 'react-chartjs-2'

import { Button } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'

import axios from 'axios'
import 'helper/axiosConfig'
import 'helper/firebaseConfig'

import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore();
let pollId = ''
let currentQuestion = ''
let index = 0;
let chartDataList = []

const JoinPolls = ({ eventId, pseudo }) => {
    const eventState = useSelector(state => state.EventReducer.event)
    const sessState = useSelector(state => state.SessionReducer)


    const [event, setEvent] = useState({})
    const [poll, setPoll] = useState({})
    const [question, setQuestion] = useState([])
    const [selectedAns, setSelectedAns] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [dataSet, setDataSet] = useState([''])
    const [reveal, setReveal] = useState(false)
    const [revealQuestions, setRevealQuestions] = useState(false)
    const [refresh, setRefresh] = useState(0)

    let pollRef = db.collection('polls')

    useEffect(() => {

        currentQuestion = question[index]

        loadEvent()

    }, [refresh])

    const registerFireStore = (pollId, currQuest) => {
        try {
            const unsubscribe = pollRef.doc(pollId).collection(currQuest.id).onSnapshot((querySnapshot) => {

                querySnapshot.docChanges().filter(({ type }) => type === "added").map(({ doc }) => {

                    if (doc.data().message === 'FETCH_QUESTIONS') {
                        return 'new connection'
                    }
                    else if (doc.data().message === 'START_EVENT') {
                        setRevealQuestions(true)
                    }
                    else if (doc.data().message === 'REVEAL_RESULTS') {
                        setReveal(true)
                    }
                    else if (doc.data().message === 'NEXT_QUESTION') {
                        index = index + 1
                        setReveal(false)
                        setRefresh(prev => !prev)

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

            pollRef.doc(pollId).collection(currentQuestion.id).add({ message: 'NEW_CONNECTIONS', connection: 1 })

        }
        else {
            registerFireStore(pollId, currentQuestion)
        }
    }

    const sendAnswer = () => {
        pollRef.doc(pollId).collection(currentQuestion.id).add({ message: 'POLL_DATA', question: question[index].question, answer: selectedAns })

    }


    const handleOptionChange = (evt) => {
        setSelectedAns(evt.target.value)
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
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };

    return (<div className="container bootstrap snippet">
        <div className="main-div">
            {loaded ?
                <div className="center-div">
                    {revealQuestions ? <div> <p className="text-res">{question[index]?.question || 'test'}</p>
                        <div >
                            {question[index].options.map((elt, val) => (
                                <div className="form-check" key={val}>
                                    <label className="form-check-label op-label">
                                        <input type="radio" className="form-check-input" id="poll" value={elt.id} checked={selectedAns == elt.id} onChange={(event) => handleOptionChange(event)} /> {elt.value}
                                        <i className="input-helper"></i>
                                    </label>
                                </div>
                            ))}

                            {reveal ? <Bar data={chartData} options={options} /> : <Button onClick={() => sendAnswer()}>send Answer</Button>}


                        </div>
                    </div>
                        :
                        <div>
                            <h1>waiting for question</h1>
                            <div className='spinner'><Spinner animation="border" role="status" variant="primary" size='x-lg'>
                                <span className="sr-only">Loading...</span>
                            </Spinner></div>
                        </div>
                    }
                </div> :
                <div className='spinner'><Spinner animation="border" role="status" variant="primary" size='x-lg'>
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </div>
            }

        </div>
    </div>)
}
export default JoinPolls