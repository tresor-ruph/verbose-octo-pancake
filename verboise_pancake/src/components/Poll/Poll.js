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
import { error } from 'jquery'

const db = firebase.firestore();

let pollId =''
let currentQuestion= ''
let index = 0;
const Poll = () => {
    const eventState = useSelector(state => state.EventReducer.event)
    const [event, setEvent] = useState({})
    const [poll, setPoll] = useState({})
    const [question, setQuestion] = useState([])

    let pollRef = db.collection('polls')
    useEffect( () => {
      loadEvent()
         
    }, [])

    const registerFireStore =(pollId, currQuest) => {
    try {
            const unsubscribe = pollRef.doc(`${poll.id}`).collection('question').doc(`${currentQuestion}`).onSnapshot((doc) => {
                console.log('current data:', doc.data())

                return () => unsubscribe()
            })
        }catch(error){
            console.log(error)
        }
    }

    const loadEvent = async () => {
        await axios.get('/getEventPoll/' + eventState.id).then(res => {
            setEvent(res.data.event)
            setPoll(res.data.poll)
            setQuestion(res.data.questions)
            pollId =res.data.poll.id
            currentQuestion = res.data.questions[index].id
            registerFireStore(pollId,currentQuestion)

        }).catch(err => {
            console.log(err);
            console.log(err.response)
        })
    }
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
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


    return (<div>
        <div className='chart'>
            <Button >Start Event</Button>
            {/* <Bar  data={data} options={options}  /> */}

        </div>
    </div>)

}

export default Poll