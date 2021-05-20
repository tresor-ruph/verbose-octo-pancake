import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
const Polls = () => {
    const eventState = useSelector(state => state.EventReducer.event)

    const [event, setEvent] = useState({})
    const [poll, setPoll] = useState({})
    const [question, setQuestion] = useState([])
    const [selectedAns, setSelectedAns] = useState('')
    const [index, setIndex] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [label, setLabel] = useState([''])
    const [reveal, setReveal] = useState(false)
    const [revealQuestions, setRevealQuestions] = useState(false)
    let pollRef = db.collection('polls')

    useEffect(() => {

        loadEvent()
        console.log('lolol')
        setReveal(false)
        

    }, [index])

    const registerFireStore = (pollId, currQuest) => {

        try {
            const unsubscribe = pollRef.doc(pollId).collection(currQuest.id).onSnapshot((querySnapshot) => {

                let data = [];
                let message = ''
                querySnapshot.forEach(doc => {
                    if (doc.data().message === 'startEvent') {
                        // message = 'start event'
                        setRevealQuestions(true)
                    } else if (doc.data().message === 'next-question') {
                        message = 'next question'
                        setIndex(prev => prev + 1)
                        data = []

                    } else if (doc.data().message === 'reveal') {
                        setReveal(true)
                    }

                    else { data.push(parseInt(doc.data().answer)) }
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
                    setLabel(tempArr)
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


    const loadEvent = async () => {
        await axios.get('/getEventPoll/' + eventState.id).then(res => {
            setEvent(res.data.event)
            setPoll(res.data.poll)
            setQuestion(res.data.questions)
            pollId = res.data.poll.id
            console.log(res.data.poll.questionIndex)
             setIndex(res.data.poll.questionIndex)
            currentQuestion = res.data.questions[res.data.poll.questionIndex]
            registerFireStore(pollId, currentQuestion)
            setLoaded(true)
            // if(event.status === 'active'){
            // setRevealQuestions(true)
            // }
        }).catch(err => {
            console.log(err);
            console.log(err.response)
        })
    }

    const handleOptionChange = (evt) => {
        setSelectedAns(evt.target.value)
    }

    const sendAnswer = () => {
        pollRef.doc(pollId).collection(currentQuestion.id).add({ question: question[index].question, answer: selectedAns })

    }

    let chartData = {
        datasets: [{
            label: '# of Votes',
            data: label,
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
            {console.log('index',index)}
            {loaded ? <div className="center-div">

                {revealQuestions ? <div> <p className="text-res">{question[index].question || 'test'}</p>
                    <div >
                        {question[index].options.map((elt, index) => (
                            <div className="form-check" key={index}>
                                <label className="form-check-label op-label">
                                    <input type="radio" className="form-check-input" id="poll" value={elt.id} checked={selectedAns == elt.id} onChange={(event) => handleOptionChange(event)} /> {elt.value}
                                    <i className="input-helper"></i>
                                </label>
                            </div>
                        ))}

                        {reveal && <Bar data={chartData} options={options} />
                        }
                    </div></div> : <h1>Event will start soon</h1>}
            </div> : <div className='spinner'><Spinner animation="border" role="status" variant="primary" size='x-lg'>
                <span className="sr-only">Loading...</span>
            </Spinner></div>}
            <Button onClick={() => sendAnswer()}>send Answer</Button>

        </div>
    </div>)
}
export default Polls