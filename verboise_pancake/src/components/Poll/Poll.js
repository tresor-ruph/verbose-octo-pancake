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
    const [index, setIndex]= useState(0)
    const [label, setLabel] = useState([''])
    const [data, setData] = useState([])
    const [chatText, setChatText] = useState([])

    let pollRef = db.collection('polls')

    useEffect(() => {
        loadEvent()

    }, [])

    const registerFireStore = (pollId, currQuest) => {
        try {
            const unsubscribe = pollRef.doc(pollId).collection(currQuest.id).onSnapshot((querySnapshot) => {
               
                const data =[];
                querySnapshot.forEach(doc => {
                    // console.log(doc.data())
                    data.push( parseInt(doc.data().answer))
                })
                const map = data.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
                let test =[...map.entries()]
console.log(currQuest.options)
console.log(test)
                let tempArr = []
                for(let i of currQuest.options){
                    for(let j of test){
                        console.log(j)
                        if(i.id == j[0]){
                            tempArr.push({x: i.value, y:j[1]})
                        }
                    }
                }
                console.log(tempArr)
                setLabel(tempArr)
                




                // console.info([...map.values()])
                //  querySnapshot.docChanges().filter(({ type}) => type === 'added').map(({doc}) => {
                //     console.log(doc.data)
                // })

                try {
                    return () => unsubscribe()
                }catch(error){
                    console.log('subscribe err', error)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleStart = () => {
        pollRef.doc(pollId).collection(currentQuestion).add({message: 'test'})
    }

    const loadEvent = async () => {
        await axios.get('/getEventPoll/' + eventState.id).then(res => {
            console.log(res.data)
            setEvent(res.data.event)
            setPoll(res.data.poll)
            setQuestion(res.data.questions)
            pollId = res.data.poll.id
            currentQuestion = res.data.questions[index]
            registerFireStore(pollId, currentQuestion)

        }).catch(err => {
            console.log(err);
            console.log(err.response)
        })
    }

    const calculate = () => {

    }


    let chartData = {
        // labels: label ,
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
            <Bar  data={chartData} options={options}  />
            <Button onClick ={() =>handleStart()}>Start Event</Button>


        </div>
    </div>)

}

export default Poll