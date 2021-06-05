import { useState, useEffect } from 'react'
import axios from 'axios'
import 'helper/axiosConfig'
import { Button } from 'react-bootstrap'
import { Bar, Pie, Doughnut } from 'react-chartjs-2'
import firebase from 'firebase';
import 'firebase/firestore';
import './JoinPoll.scss'

let chartDataList = []
let questionIndex = 0
const db = firebase.firestore();

const JoinPoll = () => {
    const [poll, setPoll] = useState(null)
    const [question, setQuestion] = useState(null)
    const [option, setOption] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [selectedAns, setSelectedAns] = useState('')
    const [displayGraph, setDisplayGraph] = useState(false)
    const [defChart, setDefChart] = useState('bar-chart')
    const [disabledField, setDisabledField] = useState(false)
    const [fetchData, setFetchData] = useState(true)
    const [reload, setReload] = useState(false)
    const [dataSet, setDataSet] = useState([])



    let pollRef = db.collection('polls')


    useEffect(() => {
        fetchData ? getQuestions() : registerFireStore(poll[0].id, question[questionIndex])
    }, [reload])

    const registerFireStore = (pollId, currQuest) => {
        try {
            const unsubscribe = pollRef.doc(pollId).collection(currQuest.id).onSnapshot((querySnapshot) => {

                querySnapshot.docChanges().filter(({ type }) => type === "added").map(({ doc }) => {

                    if (doc.data().message === 'NEW_CONNECTION') {
                        return 'new connection'
                    }
                    else if (doc.data().message === 'START_EVENT') {
                    }
                    else if (doc.data().message === 'REVEAL_RESULTS') {
                        questionIndex = doc.data().index
                        setDisplayGraph(true)
                    }
                    else if (doc.data().message === 'NEXT_QUESTION') {
                        console.log('next question')
                        questionIndex = doc.data().index
                        chartDataList = []
                        setDataSet([])
                        setDisplayGraph(false)
                        setReload(prev => prev + 1)

                    }
                    else if (doc.data().message === 'POLL_DATA') {
                        console.log("data-poll")
                        chartDataList.push(doc.data().value)
                        let frequency = chartDataList.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
                        frequency = [...frequency.entries()]
                        let tempArr = []
                        frequency.forEach(elt => {
                            tempArr.push({
                                x: elt[0], y: elt[1]
                            })
                        })
                        questionIndex = doc.data().index
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
    const sentVote = () => {
        console.log(selectedAns)
        pollRef.doc(poll[0].id).collection(question[questionIndex].id).add({ message: 'POLL_DATA', value: selectedAns, index: questionIndex })

    }



    const getQuestions = () => {
        axios.get(`/getAllQuestions/${'z3yu9'}`).then(res => {
            console.log(res.data)
            setPoll(res.data.poll)
            let sorted = res.data.questions.sort(function (a, b) { return a.order - b.order })

            setQuestion(sorted)
            registerFireStore(res.data.poll[0].id, sorted[questionIndex])
            setFetchData(false)
            setOption(res.data.options)
            setLoaded(true)

        }).catch(err => {
            console.log(err.response)
        })

    }
    const handleOptionChange = (evt) => {
        setSelectedAns(evt.target.value)
    }

    let chartData = {

        datasets: [{
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
            return <div className='bar-chart-custom'> <Bar key={questionIndex} data={chartData} options={chartOptions} redraw={false} /></div>
        } else if (defChart === 'pie-chart') {
            return <div className='pie-chart-custom'> <Pie key={questionIndex} data={chartData} options={chartOptions} redraw={false} /></div>

        } else if (defChart === 'donut') {
            return <div className='pie-chart-custom'><Doughnut key={questionIndex} data={chartData} options={chartOptions} redraw={false} /></div>

        }

    }

    return (
        <div className='join-poll' >
            {loaded ?
                <div>

                    {displayGraph ? <div>
                        <div className='corr-answ-div'> Correct Answer: <span className='ans-val'>{'Test'}</span></div>
                        <div className='graph-div'>
                            {renderChart()}
                        </div>
                    </div> :
                        <div className='container join-poll-body'>
                            <div className='text-question-div'>
                                <span className='text-question-span'>{question[questionIndex].question || ''}</span>
                            </div>
                            {question[questionIndex].image != "" && <div className='image-div'>
                                <img src={question[questionIndex].image} alt='question picture' className='quest-img' />
                            </div>}
                            <div>
                                <div className='quest-option-div'>
                                    {
                                        option.filter(elt => elt.questionId == question[questionIndex].id).map((elt, index) => (
                                            <div className="form-check" key={index}>
                                                <label className="form-check-label op-label opt-lab">
                                                    <input type="radio" className="form-check-input opt-val" id="poll" value={elt.optionText} checked={selectedAns == elt.optionText} onChange={(event) => handleOptionChange(event)} disabled={disabledField} /> {elt.optionText}
                                                    <i className="input-helper"></i>
                                                </label>
                                            </div>

                                        ))
                                    }

                                </div>

                                <div className='snd-answer'> <Button onClick={() => sentVote()} className='snd-answ-btn' disabled={disabledField} >Answer</Button></div>
                            </div>

                        </div>}
                </div>
                :
                <h1>Loading</h1>
            }

        </div>
    )
}
export default JoinPoll