import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'primereact/card';
import { Button } from 'react-bootstrap'
import CreateQuestion from 'components/CreateQuestions'
import { InputSwitch } from 'primereact/inputswitch';
import { InputNumber } from 'primereact/inputnumber';
import { useSelector, useDispatch } from 'react-redux'

import axios from 'axios'
import "helper/axiosConfig"

const NewPoll = ({handleStartEvent}) => {

    const [resultFormat, setResultFormat] = useState(false)
    const [timerMode, setTimerMode] = useState(false)
    const [time, setTime] = useState(0)
    const dispatch = useDispatch()

    const [layout, setLayout] = useState(null)
    const [layoutErr, setLayoutErr] = useState(false)
    const eventState = useSelector(state => state.EventReducer.event)
    



    const handleSelect = (x) => {

        let allCards = document.getElementsByClassName('layout-display')
        Array.from(allCards).forEach(elt => {
            elt.style.backgroundColor = 'white'
        })
        let selectedCard = document.getElementsByClassName(`card-${x}`)
        Array.from(selectedCard)[0].style.backgroundColor = 'rgba(255,0,0,0.2)'
        setLayout(x)
        setLayoutErr(false)

    }
    const setSendQuestion = () => {
        //------
    }

    const startEvent = async () => {
        await postQuestion()

    }
    const postQuestion = () => {

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
        console.log(questions, options)
        if (layout === null) {
            setLayoutErr(true)
            return
        }


        for (let i of questions) {
            for (let j of options) {
                if (i.id === j.questionId) {
                    i.option = j.answers.filter(elt => elt.id != undefined)
                }
            }
        }

        const data = {
            layout: layout,
            percentage: resultFormat,
            timerMode: timerMode,
            time: time,
            eventId: eventState.eventId

        }
        axios.post('/createPoll', data).then(res => {
            questions.forEach((elt, idx, array) => {
                let data1 = {
                    order: elt.id,
                    question: elt.question,
                    image: elt.picture.length < 3 ? '' : questions[0].picture,
                    answer: elt.answer,
                    pollId: res.data.pollId
                }

                axios.post('/addQuestions', data1).then(res => {

                    // setTimeout('', 200)
                    let optionData = []
                    elt.option.forEach(elt2 => {
                        optionData.push({
                            order: elt2.id,
                            optionText: elt2.value,
                            QuestionQuestionId: res.data.response.questionId
                        })
                    })

                    axios.post('/addOption', optionData).then(res => {
                        console.log('bit')
                        console.log(idx)
                        console.log(array.length - 1)
                        if (idx === array.length - 1) {
                            const data = {
                                id: eventState.eventId,
                                status: 'In progress'
                            }
                            axios.put('/updateStatus', data).then(res => {
                                eventState.questionList = []
                                eventState.optionList = []
                                eventState.questionCount=0
                                eventState.tempQuestionArr=[]
                                eventState.status ='In progress'
                                dispatch({
                                    type: "NEW_EVENT",
                                    payload: {
                                        event: eventState,
                        
                                    },
                                });
                                handleStartEvent(true)
                            }).catch(err => {
                                console.log(err.response)
                            })
                        }
                    }).catch(err => {
                        console.log(err.response)

                    })



                }).catch(err => {
                    console.log(err)
                    console.log(err.response)
                })

            })


        }).catch(err => {
            console.log(err.response)

        })

        console.log('lol')


    }

    return (
        <div className='create-survey'>
            <div className='row survey-container'>
                <div className='col-7 survey-questions'>


                    <CreateQuestion setSendQuestion={setSendQuestion} />

                </div>
                <div className='col-3 survey-config'>
                    <div className='config-header'>
                        <FontAwesomeIcon icon='cog' color='gray' />
                        <span className='config-title'>Configuration</span>
                        <hr />
                    </div>
                    <div>
                        <span className='result-layout-title'> Result layout</span>
                        <div className='row'>

                            <Card className='layout-display card-bar-chart'>
                                <a className='stretched-link' onClick={() => handleSelect("bar-chart")}>
                                    <div>
                                        <FontAwesomeIcon icon='chart-bar' color='gray' size="1x" />
                                    </div>
                                    Bar char
                                </a>
                            </Card>
                            <Card className='layout-display card-pie-chart'>
                                <a className='stretched-link' onClick={() => handleSelect("pie-chart")}>
                                    <div>
                                        <FontAwesomeIcon icon='chart-pie' color='gray' size="1x" />
                                    </div>
                                    Pie chart
                                </a>
                            </Card>
                            <Card className='layout-display card-donut'>
                                <a className='stretched-link' onClick={() => handleSelect("donut")}>
                                    <div>
                                        <FontAwesomeIcon icon='chart-bar' color='gray' size="1x" />
                                    </div>
                                    Donut
                                </a>
                            </Card>

                        </div>
                        {layoutErr && <small className="p-error p-d-block" >Please select your result layout.</small>}
                        <div className='result-format'>
                            <span className='format-text'>Result in percentage :</span><br />

                            <InputSwitch checked={resultFormat} onChange={(e) => setResultFormat(e.value)} className='format-input' />
                        </div>

                        <div className='survey-timer'>
                            <span className='survey-timer-name'>Timer mode :  </span><br />
                            <InputSwitch checked={timerMode} onChange={(e) => setTimerMode(e.value)} className='survey-mode-input' />
                            {timerMode && <div className="p-field timer-div">
                                <label htmlFor="minmax-buttons" className='time-label'>Time</label>
                                <InputNumber id="minmax-buttons" value={time} onValueChange={(e) => setTime(e.value)} mode="decimal" showButtons min={0} max={100} size={1} className='timer-input' />
                            </div>}
                        </div>


                    </div>
                    <div className='post-questiion'>
                        <Button className="primary" onClick={() => startEvent()}>Start Event</Button>
                    </div>
                </div>

            </div>

        </div>
    )

}

export default NewPoll