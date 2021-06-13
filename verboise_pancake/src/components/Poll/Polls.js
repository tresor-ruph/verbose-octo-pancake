
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TabView, TabPanel } from 'primereact/tabview';
import { QRCode } from 'react-qr-svg'
import { useSelector, useDispatch } from 'react-redux'
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from 'primereact/toast';

import CreateQuestion from 'components/CreateQuestions'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import 'helper/axiosConfig'
import { useHistory } from 'react-router'
import firebase from 'firebase';
import 'firebase/firestore';

import PollGraphs from './PollGraphs'
import './poll.scss'

let chartDataList = []
let ranks = []
let votesNumb = []
let questionStats = []
let optionsResults = []

const db = firebase.firestore();
let questionIndex = 0

const Poll = ({ code }) => {

    const [activeIndex, setActiveIndex] = useState(0)
    const [option, setOption] = useState([])
    const [poll, setPoll] = useState([])
    const [question, setQuestion] = useState([])
    const [fetchData, setFetchData] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [reload, setReload] = useState(false)
    const [voteLock, setVoteLock] = useState(true)
    const [dataSet, setDataSet] = useState([])
    const [defChart, setDefChart] = useState("bar-chart")
    const [chartLabels, setchartLabels] = useState([1])
    const [pieChartData, setPieChartData] = useState([1])
    const [numbVotes, setNumbVotes] = useState(0)
    const [sendQuestion, setSendQuestion] = useState()
    const toast = useRef(null);

    let percent = null

    const dispatch = useDispatch()
    const eventState = useSelector(state => state.EventReducer.event)
    const history = useHistory()
    let pollRef = db.collection('polls')

    useEffect(() => {

        fetchData ? getQuestions(true) : registerFireStore(poll[0].id, question[questionIndex])

    }, [reload])


    const registerFireStore = (pollId, currQuest) => {
        try {
            const unsubscribe = pollRef.doc(pollId).collection(currQuest.id).onSnapshot((querySnapshot) => {

                querySnapshot.docChanges().filter(({ type }) => type === "added").map(({ doc }) => {

                    if (doc.data().message === 'FETCH_QUESTIONS') {
                        console.log('fetch data')
                        getQuestions(false)
                    }
                    else if (doc.data().message === 'START_EVENT') {
                        console.log('startEvent')
                    }
                    else if (doc.data().message === 'REVEAL_RESULTS') {
                        console.log('reveal question')

                    }
                    else if (doc.data().message === 'NEXT_QUESTION') {
                        console.log('next question')
                    }

                    else if (doc.data().message === 'POLL_DATA') {

                        ranks.push(doc.data().score)


                        chartDataList.push(doc.data().value)
                        votesNumb.push(doc.data().partCount)
                        let frequency = chartDataList.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
                        frequency = [...frequency.entries()]
                        let tempArr = []
                        let tempLabels = []
                        let tempPieChart = []
                        let resultPercent = []
                        let pieResultPercent = []
                        let total = 0

                        frequency.forEach(elt => {
                            tempArr.push({
                                x: elt[0], y: elt[1]
                            })
                            tempLabels.push(elt[0])
                            tempPieChart.push(elt[1])
                            total += elt[1]
                        })

                        tempArr.forEach(elt => {
                            resultPercent.push({ x: elt.x, y: ((parseInt(elt.y) / total) * 100).toFixed(1) })
                            pieResultPercent.push(((parseInt(elt.y) / total) * 100).toFixed(1))
                        })
                        setchartLabels(tempLabels)
                        if (percent) {
                            setDataSet(resultPercent)
                            optionsResults = tempArr
                            setPieChartData(pieResultPercent)

                        } else {
                            optionsResults = tempArr

                            setDataSet(tempArr)
                            setPieChartData(tempPieChart)
                        }

                        setNumbVotes(prev => prev + 1)

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




    const getQuestions = (x) => {
        axios.get(`/getAllQuestions/${code}`).then(res => {
            let sorted = res.data.questions.sort(function (a, b) { return a.order - b.order })
            setQuestion(sorted)
            setOption(res.data.options)
            if (x) {
                setPoll(res.data.poll)
                if (res.data.poll[0].questionIndex != null) {
                    questionIndex = res.data.poll[0].questionIndex
                }
                registerFireStore(res.data.poll[0].id, sorted[questionIndex])
                setLoaded(true)
                setFetchData(false)
                setDefChart(res.data.poll[0].layout)
                percent = res.data.poll[0].resultInPercent
                if (res.data.poll[0].layout === 'pie-chart' || res.data.poll[0].layout === 'donut') {
                    setDataSet([1, 1, 1, 1, 1, 1])
                }

            } else {

                pollRef.doc(poll[0].id).collection(question[questionIndex].id).add({ message: '' })

            }

        }).catch(err => {
            console.log(err)
        })

    }

    const handleNextQuestion = () => {

        let optionsResults = dataSet
        optionsResults.forEach(elt => {
            questionStats.push({ optionText: elt.x, vote: elt.y, QuestionQuestionId: question[questionIndex].id })
        })

        optionsResults.questionId = question[questionIndex].questionId
        const data = {
            id: poll[0].id,
            questionIndex: questionIndex + 1,
        }
        axios.put('/questionCount', data).then(res => {
            setVoteLock(true)

            pollRef.doc(poll[0].id).collection(question[questionIndex].id).add({ message: 'NEXT_QUESTION', index: ++questionIndex }).then(() => {
                chartDataList = []
                setDataSet([])
                setNumbVotes(0)
                setReload(prev => !prev)
            }).catch(err => {
                console.log(err)
            })


        }).catch(err => {
            console.log(err.response)
        })

    }

    const handleEndQuestion = () => {

        pollRef.doc(poll[0].id).collection(question[questionIndex].id).add({ message: 'REVEAL_RESULTS', index: questionIndex })
        setVoteLock(false)

    }


    const handleIndex = (e) => {

        if (e.index == 0 || e.index == 1) {
            setSendQuestion(false)
        }
        setActiveIndex(e.index)
    }

    const addNewQuestion = async () => {
        if (!eventState.questionList) {
            let optionErr = document.getElementById('null-question')
            if (optionErr !== null) optionErr.style.display = 'inline'
            return
        } else {
            let optionErr = document.getElementById('null-question')
            if (optionErr !== null) optionErr.style.display = 'none'
        }
        if (!eventState.optionList) {
            let optionErr = document.getElementById(`inv-option${eventState.questionList.length - 1}`)
            if (optionErr !== null) optionErr.style.display = 'inline'
            return
        } else {
            let optionErr = document.getElementById(`inv-option${eventState.questionList.length - 1}`)
            if (optionErr !== null) optionErr.style.display = 'none'

        }

        if (eventState.optionList[eventState.optionList.length - 1].questionId === "") {
            let optionErr = document.getElementById(`inv-quest${eventState.questionList.length - 1}`)
            if (optionErr !== null) optionErr.style.display = 'inline'
            return
        } else {
            let optionErr = document.getElementById(`inv-quest${eventState.questionList.length - 1}`)
            if (optionErr !== null) optionErr.style.display = 'none'

        }
        if (eventState.questionList[eventState.questionList.length - 1].answer === "") {
            let optionErr = document.getElementById(`inv-answ${eventState.questionList.length - 1}`)
            if (optionErr !== null) optionErr.style.display = 'inline'
            return
        } else {
            let optionErr = document.getElementById(`inv-answ${eventState.questionList.length - 1}`)
            if (optionErr !== null) optionErr.style.display = 'none'
        }


        const questions = eventState.questionList.filter(elt => elt.id != "")
        const options = eventState.optionList.filter(elt => elt.id != "")


        for (let i of questions) {
            for (let j of options) {
                if (i.id === j.questionId) {
                    i.option = j.answers.filter(elt => elt.id != undefined)
                }
            }
        }




        questions.forEach((elt, idx, array) => {
            let data1 = {
                order: elt.id + question.length,
                question: elt.question,
                image: elt.picture.length < 3 ? '' : questions[0].picture,
                answer: elt.answer,
                pollId: poll[0].id
            }
            console.log('data1', data1)
            axios.post('/addQuestions', data1).then(res => {
                let optionData = []

                elt.option.forEach(elt2 => {
                    optionData.push({
                        order: elt2.id,
                        optionText: elt2.value,
                        QuestionQuestionId: res.data.response.questionId
                    })
                })
                axios.post('/addOption', optionData).then(res => {

                    if (idx === array.length - 1) {
                        pollRef.doc(poll[0].id).collection(question[questionIndex].id).add({ message: 'FETCH_QUESTIONS', index: questionIndex })
                        setSendQuestion(false)
                        setActiveIndex(0)
                        eventState.questionList = []
                        eventState.optionList = []
                        eventState.questionCount = 0
                        eventState.tempQuestionArr = []
                        dispatch({
                            type: "NEW_EVENT",
                            payload: {
                                event: eventState,

                            },
                        });

                    }

                }).catch(err => {
                    console.log(err.response)

                })

            }).catch(err => {
                console.log(err)
                console.log(err.response)
            })


        })

    }

    const findIndex = (arr, str) => {
        if (arr.length === 0) {
            return -1
        }
        let exist = false
        for (let i in arr) {
            if (arr[i].pseudo === str) {
                exist = i
            }
        }
        if (exist) {
            return exist
        } else {
            return -1
        }
    }

    const handleCloseEvent = () => {
        console.log('optionres', optionsResults)
        optionsResults.forEach(elt => {
            questionStats.push({ optionText: elt.x, vote: elt.y, QuestionQuestionId: question[questionIndex].id })
        })
        console.log('questionStats', questionStats)
        let frequency = [];

        try {
            ranks.forEach(elt => {

                if (findIndex(frequency, elt.pseudo) === -1) {
                    frequency.push({ pseudo: elt.pseudo, points: elt.score, PollPollId: poll[0].id })
                } else {

                    frequency[findIndex(frequency, elt.pseudo)].points += elt.score
                }
            })
        } catch (error) {
            console.log(error)
        }


        if (questionStats.length === 0) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Cannot end event without participation', life: 5000 });
            return
        }
        axios.post('/surveyResults', questionStats).then(res => {
            const data = {
                id: eventState.eventId,
                status: 'Ended'
            }
            if (frequency.length !== 0) {
                axios.post('/ranking', frequency).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err.response)
                })
            }


            axios.put('/updateStatus', data).then(res => {
                pollRef.doc(poll[0].id).collection(question[questionIndex].id).add({ message: 'END_EVENT' })
                eventState.questionList = []
                eventState.optionList = []
                eventState.questionCount = 0
                eventState.tempQuestionArr = []
                dispatch({
                    type: "NEW_EVENT",
                    payload: {
                        event: eventState,

                    },
                });
                questionIndex = 0
                history.push('/result')
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err.response)

        })

    }


    return (
        <div className='poll-main'>
            <Toast ref={toast} style={{ marginTop: '5vh' }} />
            {loaded ?
                <div className=''>
                    <div className='row poll-container'>
                        <div className='p-shadow-2 col-7 graphs'>
                            <div className='graph-sub-mess'>
                                <PollGraphs handleNextQuestion={handleNextQuestion} questionIndex={questionIndex} defChart={defChart} question={question} handleStopEvent={handleEndQuestion} voteLock={voteLock} dataSet={dataSet} numbVotes={numbVotes} handleCloseEvent={handleCloseEvent} chartLabels={chartLabels} pieChartData={pieChartData} />
                            </div>
                        </div>

                        <div className='p-shadow-2 col-4  qr-codes'>
                            <TabView activeIndex={activeIndex} onTabChange={(e) => handleIndex(e)}>
                                <TabPanel headerClassName='tab-view-title' header="Question">
                                    <div className='question-div'>
                                        <span className='question-txt'>{question[questionIndex]?.question || ''}</span>
                                        {question[questionIndex]?.image != "" && <div className='img-div'><img src={question[questionIndex].image} width='300px' /></div>}
                                    </div>
                                </TabPanel>
                                <TabPanel headerClassName='tab-view-title' header="Invite Participants">
                                    <div className='scan-div'>

                                        <QRCode bgColor="#FFFFFF"
                                            fgColor="#000000"
                                            level="Q"
                                            className='qr-code'
                                            value={`http://localhost:3000/${code}`} />
                                        <div className='or-div' >
                                            <span className='or-text'> -- OR -- </span><br />
                                            <div className='url-div'>
                                                <span className='url-text'>{`verbosePancake/${code}`}</span>
                                            </div>
                                        </div>
                                    </div>

                                </TabPanel>
                                <TabPanel headerClassName='tab-view-title' header="Add Question">
                                    <div>
                                        <CreateQuestion addNew={true} setSendQuestion={setSendQuestion} />
                                        {sendQuestion && <Button onClick={addNewQuestion}>send</Button>}

                                    </div>
                                </TabPanel>

                            </TabView>

                        </div>
                    </div>
                    <div className='p-shadow-2 p-d-flex p-jc-between param-div'>
                        <div className='p-d-flex left-icons'>
                            <div className="p-mr-2 p-order-1">
                                {voteLock ? <FontAwesomeIcon icon="lock-open" color='#5F98FA' size='2x' onClick={() => handleEndQuestion()} /> : <FontAwesomeIcon icon="lock" color='#5F98FA' size='2x' />}
                            </div>
                            <div className="p-mr-2 p-order-2 lock-icon">
                                {questionIndex < question.length - 1 ? <FontAwesomeIcon icon="arrow-alt-circle-right" color='#5F98FA' size='2x' onClick={() => handleNextQuestion()} /> : <FontAwesomeIcon icon="stop" color='#5F98FA' onClick={() => handleCloseEvent()} size='2x' />}
                            </div>
                        </div>
                        <div className="right-icons">
                            <div><span className='particip-div'>{numbVotes} /</span><FontAwesomeIcon icon="user-friends" color='gray' size='2x' className='particip-icon' /></div>
                        </div>
                    </div>
                </div> : <div
                    className="spinner p-d-flex p-jc-center"
                    style={{ marginTop: "40vh" }}
                >
                    <ProgressSpinner />
                </div>}
        </div>
    )

}
export default Poll