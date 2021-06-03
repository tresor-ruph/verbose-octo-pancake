import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'primereact/card';
import { Button } from 'react-bootstrap'

import { InputSwitch } from 'primereact/inputswitch';
import { InputNumber } from 'primereact/inputnumber';
import Questions from 'components/Questions'

import 'customcss/survey.scss'

let tempQuestionArr = [] //A temporary array that allows me to manipulate questionArr without producing undesirable sideeffects
let questionCount = 0 // Keep count of the number of questions
let optionList = [] //array containing the options
let questionList = [] // array containing the questions

const NewPoll = () => {

    const [resultFormat, setResultFormat] = useState(false)
    const [timerMode, setTimerMode] = useState(false)
    const [time, setTime] = useState(0)
    const [questionArr, setQuestionArr] = useState([]) //contain de component Question
    const [questCompCount, setquestCompCount] = useState(0) //Keep count of the number of Question components
    
    useEffect(() => {
        // console.log(eventState)
        if (questCompCount > 0) {
            tempQuestionArr = questionArr
            hideQuestion(questionCount)

        }
    }, [questCompCount])

    const rmvQuestion = (x) => {
        tempQuestionArr = tempQuestionArr.filter(elt => elt.key != x.toString())
        questionList = questionList.filter(elt => elt.id != x);
        optionList = optionList.filter(elt => elt.questionId != x);
           setQuestionArr(tempQuestionArr)
           questionCount --

    }
    const removeFieldArray = (x, y) => {
        if(optionList[y] !== undefined)
        optionList[y].answers = optionList[y].answers.filter(elt => elt.id != x)

    }
    const handleCorrectAnswer = (x,y) => {
        questionList[x].answer = y
    }

    const handleOptionChange = (id, elt, event) => {
       
        optionList[id].questionId = id
        optionList[id].answers[elt] = { id: elt, value: event.target.value }

    }

    const handleQuestions = (questionId, event) => {
        questionList[questionId].id =questionId;
        questionList[questionId].question =event.target.value;
        // optionList[questionId] = { questionId: '', answers: [] }


    }

    const hideQuestion = (id) => {
        let idt = 'option' + id
        let optionsDiv = document.getElementsByClassName('options-list')
        let currentOption = document.getElementById(`${idt}`)
        Array.from(optionsDiv).forEach(elt => {
            elt.style.display = 'none'
        });
        
        if(currentOption != null) currentOption.style.display = 'block'
        let questDiv = document.getElementsByClassName('edit-quests')
        Array.from(questDiv).forEach(elt => {
            if(elt !=null) elt.style.display = 'inline'
        })
       const editQuest = document.getElementById('edit-quest' + questionCount)
       if(editQuest !=null) editQuest.style.display = 'none'
    }

    const createQuestion = () => {

        questionCount++
        questionList[questionCount]={id:'', question:'', answer:''}

        optionList[questionCount] = { questionId: '', answers: [] }

        setQuestionArr(prevState =>
            [...prevState, <div key={questionCount}>
                <Questions questionKey={questionCount} handleQuestions={handleQuestions}
                    rmvQuestion={rmvQuestion} handleCorrectAnswer={handleCorrectAnswer}
                    questionCount={questionCount} handleOptionChange={handleOptionChange} removeFieldArray={removeFieldArray} />
            </div>])
        setquestCompCount(p => p + 1)

    }

    const handleTest = () => {
        console.log('questionList', questionList)
        console.log('optionList', optionList)
    }

    return (
        <div className='create-survey'>
            <div className='row survey-container'>
                <div className='col-7 survey-questions'>

                    <div>
                        <Button variant="success" onClick={() => createQuestion()}>{!questionCount > 0 ? 'Add Questions' : 'New Question'}</Button><br /><br />
                        {questionCount > 0 && questionArr}
                    </div>



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

                            <Card className='layout-display'>
                                <a onClick={() => handleSelect("polls")}>
                                    <div>
                                        <FontAwesomeIcon icon='chart-bar' color='gray' size="1x" />
                                    </div>
                                    Bar char
                                </a>
                            </Card>
                            <Card className='layout-display'>
                                <a onClick={() => handleSelect("polls")}>
                                    <div>
                                        <FontAwesomeIcon icon='chart-pie' color='gray' size="1x" />
                                    </div>
                                    Pie chart
                                </a>
                            </Card>
                            <Card className='layout-display'>
                                <a onClick={() => handleSelect("polls")}>
                                    <div>
                                        <FontAwesomeIcon icon='chart-bar' color='gray' size="1x" />
                                    </div>
                                    Donut
                                </a>
                            </Card>

                        </div>

                        <div className='result-format'>
                            <span className='format-text'>Result in percentage :</span><br />

                            <InputSwitch checked={resultFormat} onChange={(e) => setResultFormat(e.value)} className='format-input' />
                        </div>

                        <div className='survey-timer'>
                            <span className='survey-timer-name'>Timer mode :  </span><br />
                            <InputSwitch checked={timerMode} onChange={(e) => setTimerMode(e.value)} className='survey-mode-input' />
                            <div className="p-field timer-div">
                                <label htmlFor="minmax-buttons" className='time-label'>Time</label>
                                <InputNumber id="minmax-buttons" value={time} onValueChange={(e) => setTime(e.value)} mode="decimal" showButtons min={0} max={100} size={1} className='timer-input' />
                            </div>
                        </div>


                    </div>
                </div>
                <Button  className="primary" onClick={() => handleTest()}>Test</Button>

            </div>

        </div>
    )

}

export default NewPoll