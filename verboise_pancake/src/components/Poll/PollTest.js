
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TabView, TabPanel } from 'primereact/tabview';
import { QRCode } from 'react-qr-svg'
import { useSelector, useDispatch } from 'react-redux'
import CreateQuestion from 'components/CreateQuestions'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import 'helper/axiosConfig'

import firebase from 'firebase';
import 'firebase/firestore';

import Test from './Test'
import './pollTest.scss'

let chartDataList = []
const db = firebase.firestore();

let questionIndex = 0
const PollTest = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [option, setOption] = useState(null)
    const [poll, setPoll] = useState(null)
    const [question, setQuestion] = useState(null)
    const [fetchData, setFetchData] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [reload, setReload] = useState(false)
    const [voteLock, setVoteLock] = useState(true)
    const [dataSet, setDataSet] = useState([])
    const [numbVotes, setNumbVotes] = useState(0)
    const [redraw, setRedraw] = useState(false)
    const [sendQuestion, setSendQuestion] = useState()

    const eventState = useSelector(state => state.EventReducer.event)
    let pollRef = db.collection('polls')
    useEffect(() => {
        fetchData ? getQuestions(true) : registerFireStore(poll[0].id, question[questionIndex])
    }, [reload])


    const registerFireStore = (pollId, currQuest) => {
        try {
            const unsubscribe = pollRef.doc(pollId).collection(currQuest.id).onSnapshot((querySnapshot) => {

                querySnapshot.docChanges().filter(({ type }) => type === "added").map(({ doc }) => {

                    if (doc.data().message === 'FETCH_QUESTIONS') {
                        getQuestions(false)
                    }
                    else if (doc.data().message === 'START_EVENT') {
                    }
                    else if (doc.data().message === 'REVEAL_RESULTS') {

                    }
                    else if (doc.data().message === 'NEXT_QUESTION') {
                        setRedraw(false)

                    }
                    else if (doc.data().message === 'POLL_DATA') {

                        chartDataList.push(doc.data().value)
                        let frequency = chartDataList.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
                        frequency = [...frequency.entries()]
                        let tempArr = []
                        frequency.forEach(elt => {
                            tempArr.push({
                                x: elt[0], y: elt[1]
                            })
                        })
                        setNumbVotes(prev => prev + 1)
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




    const getQuestions = (x) => {
        axios.get(`/getAllQuestions/${'z3yu9'}`).then(res => {
            setPoll(res.data.poll)
            let sorted = res.data.questions.sort(function (a, b) { return a.order - b.order })
            setQuestion(sorted)
            setOption(res.data.options)

            if (x) {
                registerFireStore(res.data.poll[0].id, sorted[questionIndex])
                setLoaded(true)
                setFetchData(false)
            }

        }).catch(err => {
            console.log(err)
            console.log(err.response)
        })

    }

    const handleNextQuestion = () => {
        const data = {
            id: poll[0].id,
            questionIndex: questionIndex + 1,
        }
        axios.put('/questionCount', data).then(res => {
            console.log(res)
            pollRef.doc(poll[0].id).collection(question[questionIndex].id).add({ message: 'NEXT_QUESTION', index: ++questionIndex })
            setVoteLock(true)
            chartDataList = []
            setDataSet([])
            setRedraw(true)
    
            setReload(prev => !prev)
        }).catch(err => {
            console.log(err.response)
        })
      
    }

    const handleStopEvent = () => {
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



        questions.forEach(elt => {
            let data1 = {
                order: elt.id + question.length,
                question: elt.question,
                image: elt.picture.length < 3 ? '' : questions[0].picture,
                answer: elt.answer,
                pollId: poll[0].id
            }

            axios.post('/addQuestions', data1).then(res => {
                setTimeout('', 200)
                elt.option.forEach(elt2 => {
                    let data2 = {
                        order: elt2.id,
                        optionText: elt2.value,
                        questionId: res.data.response.questionId
                    }
                    axios.post('/addOption', data2).then(res => {
                        console.log(res)
                        pollRef.doc(poll[0].id).collection(question[questionIndex].id).add({ message: 'FETCH_QUESTIONS', index: questionIndex })
                        setActiveIndex(0)

                    }).catch(err => {
                        console.log(err.response)

                    })
                })


            }).catch(err => {
                console.log(err)
                console.log(err.response)
            })


        })

    }




    return (
        <div className='poll-main'>
            {loaded ? <div className=''>
                <div className='row poll-container'>
                    <div className='col-7 graphs'>
                        <Test handleNextQuestion={handleNextQuestion} questionIndex={questionIndex} question={question} handleStopEvent={handleStopEvent} voteLock={voteLock} dataSet={dataSet} numbVotes={numbVotes} redraw={redraw} />
                    </div>
                    <div className='col-4  qr-codes'>
                        <TabView activeIndex={activeIndex} onTabChange={(e) => handleIndex(e)}>
                            <TabPanel headerClassName='quest-tab' header="Question">
                                <div className='question-div'>
                                    <span className='question-txt'>{question[questionIndex].question || ''}</span>
                                    {question[questionIndex].image != "" && <div className='img-div'><img src={question[questionIndex].image} width='300px' /></div>}
                                </div>
                            </TabPanel>
                            <TabPanel headerClassName='join-tab' header="Invite Participants">
                                <div className='scan-div'>

                                    <QRCode bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="Q"
                                        style={{ width: 270 }}
                                        className='qr-code'
                                        value='test' />
                                    <div className='or-div' >
                                        <span className='or-text'> -- OR -- </span><br />
                                        <div className='url-div'>
                                            <span className='url-text'>{`verbosePancake/code`}</span>
                                        </div>
                                    </div>
                                </div>

                            </TabPanel>
                            <TabPanel headerClassName='add-quest-tab' header="Add Question">
                                <div>
                                    <CreateQuestion addNew={true} setSendQuestion={setSendQuestion} />
                                    {sendQuestion && <Button onClick={addNewQuestion}>send</Button>}

                                </div>
                            </TabPanel>

                        </TabView>

                    </div>
                </div>
            </div> : <div>Loadind</div>}
        </div>
    )

}
export default PollTest