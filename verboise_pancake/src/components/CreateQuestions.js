
import React, { useState, useEffect, useRef } from 'react'
import Questions from 'components/Questions'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import 'customcss/survey.scss'

//  tempQuestionArr:  A temporary array that allows me to manipulate questionArr without producing undesirable sideeffects
//  questionCount: Keep count of the number of questions
//  optionList: array containing the options
//  questionList:  array containing the questions

let [tempQuestionArr, questionCount, optionList, questionList] = [[], 0, [], []]

const CreateQuestions = ({ setSendQuestion }) => {
    const [questionArr, setQuestionArr] = useState([]) //contain de component Question
    const [questCompCount, setquestCompCount] = useState(0) //Keep count of the number of Question components
    const eventState = useSelector(state => state.EventReducer.event)
    const toast = useRef(null);

    const dispatch = useDispatch()

    useEffect(() => {
        if (questionArr.length === 0) {
            tempQuestionArr = eventState.tempQuestionArr
            questionCount = eventState.questionCount
            optionList = eventState.optionList
            questionList = eventState.questionList
        }
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
        questionCount--
        eventState.questionList = questionList
        eventState.optionList = optionList
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: eventState,

            },
        });

    }
    const removeFieldArray = (x, y) => {
        if (optionList[y] !== undefined)
            optionList[y].answers = optionList[y].answers.filter(elt => elt.id != x)
        eventState.optionList = optionList
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: eventState,

            },
        });

    }
    const handleCorrectAnswer = (x, y) => {
        questionList[x].answer = y
        eventState.questionList = questionList
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: eventState,

            },
        });

    }
    const handleOptionChange = (id, elt, event) => {

        optionList[id].questionId = id
        optionList[id].answers[elt] = { id: elt, value: event.target.value }
        eventState.optionList = optionList
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: eventState,

            },
        });

    }

    const handleQuestions = (questionId, event) => {
        questionList[questionId].id = questionId;
        questionList[questionId].question = event.target.value;
        eventState.questionList = questionList
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: eventState,

            },
        });




    }
    const handleQuestionImage = (x, y) => {
   
        questionList[x].picture = y
        eventState.questionList = questionList
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: eventState,

            },
        });

    }
    const deleteQuestionImage = (x) => {
        questionList[x].picture = ''
        eventState.questionList = questionList
        dispatch({
            type: "NEW_EVENT",
            payload: {
                event: eventState,

            },
        });

    }
    const hideQuestion = (id) => {
        let idt = 'option' + id
        let optionsDiv = document.getElementsByClassName('options-list')
        let currentOption = document.getElementById(`${idt}`)
        Array.from(optionsDiv).forEach(elt => {
            elt.style.display = 'none'
        });

        if (currentOption != null) currentOption.style.display = 'block'
        let questDiv = document.getElementsByClassName('edit-quests')
        Array.from(questDiv).forEach(elt => {
            if (elt != null) elt.style.display = 'inline'
        })
        const editQuest = document.getElementById('edit-quest' + questionCount)
        if (editQuest != null) editQuest.style.display = 'none'
    }

    const addQuestions = () => {
        setSendQuestion(true)
        if (questionCount > 6   ) {
            toast.current.show({severity:'error', summary: 'Erreurr', detail:'vous ne pouvez pas ajouter plus de 7 questions à la fois', life: 5000});
            return
        }

        if (questionCount > 6 && questionList[questionCount].question === "") {
            let questionErr = document.getElementById(`inv-quest${questionCount}`)
            if (questionErr !== null) questionErr.style.display = 'inline'
            return
        } else {
            let questionErr = document.getElementById(`inv-quest${questionCount}`)
            if (questionErr !== null) questionErr.style.display = 'none'
        }
        if (questionCount > 0 && optionList[questionCount].answers.filter(elt => elt.id != undefined).length < 2) {
            let optionErr = document.getElementById(`inv-option${questionCount}`)
            if (optionErr !== null) optionErr.style.display = 'inline'
            return
        } else {
            let optionErr = document.getElementById(`inv-option${questionCount}`)

            if (optionErr !== null) optionErr.style.display = 'none'

        }
        if (questionCount > 0 && questionList[questionCount].answer === "") {
            let answerErr = document.getElementById(`inv-answ${questionCount}`)
            if (answerErr !== null) answerErr.style.display = 'inline'
            return
        } else {

            let answerErr = document.getElementById(`inv-answ${questionCount}`)
            if (answerErr !== null) answerErr.style.display = 'none'

        }
        let optionErr = document.getElementById('null-question')
        if (optionErr !== null) optionErr.style.display = 'none'

        questionCount++
        questionList[questionCount] = { id: '', question: '', answer: '', picture: '' }
        optionList[questionCount] = { questionId: '', answers: [] }


        setQuestionArr(prevState =>
            [...prevState, <div key={questionCount}>
                <Questions questionKey={questionCount} handleQuestions={handleQuestions} deleteQuestionImage={deleteQuestionImage}
                    rmvQuestion={rmvQuestion} handleCorrectAnswer={handleCorrectAnswer} handleQuestionImage={handleQuestionImage}
                    questionCount={questionCount} handleOptionChange={handleOptionChange} removeFieldArray={removeFieldArray} eventId={eventState.eventId} />
            </div>])

        setquestCompCount(p => p + 1)

    }

    return (<div>

        <div className='questions-div'>
        <Toast ref={toast} style={{marginTop:'5vh'}}/>

            <Button className="p-button-raised p-button-success" style={{ backgroundColor: "#00C0F8", fontWeight: '500' }} onClick={() => addQuestions()}>Nouvelle question</Button><br /><br />
            <small id="username2-help" className="p-error" id='null-question' style={{ display: 'none' }}>Veuillez ajouter votre question.</small>

            {questionCount > 0 && questionArr}
        </div>
    </div>)


}
export default CreateQuestions