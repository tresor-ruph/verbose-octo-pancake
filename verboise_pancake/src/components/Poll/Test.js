import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useDispatch, useSelector } from 'react-redux'
import { Bar, Pie, Doughnut } from 'react-chartjs-2'
import { Button, Spinner } from 'react-bootstrap'
import './test.scss'
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


const Test = ({ handleNextQuestion, questionIndex, question ,handleStopEvent,voteLock,numbVotes,dataSet,redraw}) => {
    const eventState = useSelector(state => state.EventReducer.event)
    const sessState = useSelector(state => state.SessionReducer)
    const [event, setEvent] = useState({})
    const [eventStart, setEventStart] = useState(false)
    const [connect, setConnect] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [refresh, setRefresh] = useState(0)
    const [votes, setVotes] = useState(0)



    const [defChart, setDefChart] = useState('bar-chart')

    let pollRef = db.collection('polls')

    useEffect(() => {


        // fetchData && getQuestions()

    }, [])



    const registerFireStore = (pollId, currQuest) => {


    }


    const loadEvent = async () => {


    }
    const handleStart = () => {




    }
    const nextQuestion = async () => {

    }

    const revealAnswers = () => {


    }


    let chartData = {
        datasets: [{
            data: dataSet,
            // data: dataSet,
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
    const chartOptions = {
        indexAxis: 'x',

        elements: {
            bar: {
                borderWidth: 1,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
    };

    const renderChart = () => {
        if (defChart === 'bar-chart') {
            return <div style={{ width: '85%', marginTop: '2vh', marginLeft: '3vw' }}> <Bar key={questionIndex}  data={chartData} options={chartOptions}  /></div>
        } else if (defChart === 'pie-chart') {
            return <div style={{ width: '45%', marginTop: '5vh', marginLeft: '10vw' }}> <Pie key={questionIndex} data={chartData} options={chartOptions} redraw={false} /></div>

        } else if (defChart === 'donut') {
            return <div style={{ width: '45%', marginTop: '5vh', marginLeft: '10vw' }}><Doughnut key={questionIndex} data={chartData} options={chartOptions} redraw={false} /></div>

        }

    }
   
    const stopEvent = () => {
        handleStopEvent()
        
    }

    return (
        <div className='graph-div'>



            <div>
                {renderChart()}
                <div className='row param-div'>
                    <div className='col-3'>
                        {voteLock ? <FontAwesomeIcon icon="lock-open" color='#5F98FA' size='3x' onClick={() => stopEvent()} className='add-option' /> : <FontAwesomeIcon icon="lock" color='#5F98FA' size='3x' />}
                    </div>
                    <div className='col-3'>
                        {questionIndex < question.length - 1 ? <FontAwesomeIcon icon="arrow-alt-circle-right" color='#5F98FA' size='3x' onClick={() => handleNextQuestion()} className='add-option' /> : <Button>Stop Event</Button>}

                    </div>
                    <div className='col-3'>
                        <div><span className='particip-div'>{numbVotes} /</span><FontAwesomeIcon icon="user-friends" color='gray' size='2x' className='particip-icon' /></div>
                    </div>


                </div>
            </div>
        </div>
    )

}

export default Test