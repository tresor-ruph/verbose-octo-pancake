import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Button} from 'react-bootstrap'
import Questions from '../Questions'
import './step2.scss'


let tempQuestionArr = [] //A temporary array that allows me to manipulate questionArr without producing undesirable sideeffects
let questionCount = 0 // Keep count of the number of questions
let optionList = [] //array containing the options
let questionList = [] // array containing the questions

const Step2 = () => {
  const eventState = useSelector(state => state.EventReducer.event)
  const dispatch = useDispatch();

  const [questionArr, setQuestionArr] = useState([]) //contain de component Question
  const [questCompCount, setquestCompCount] = useState(0) //Keep count of the number of Question components
  const [defaultLayout, setDefaultLayout] = useState(eventState.defaultResultLayout)
  const [mode, setMode] = useState(eventState.mode)

  useEffect(() => {
    console.log(eventState)
    if (questCompCount > 0) {
      tempQuestionArr = questionArr
      hideQuestion( questionCount)
      
    }
  }, [questCompCount])


  const handleSelectedLayout = (event) => {
    setDefaultLayout(event.target.value)
    eventState.defaultResultLayout = event.target.value
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventState,

      },
    });
  }

  const handleSelectedMode = (event) => {
    setMode(event.target.value)
    eventState.mode = event.target.value
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventState,

      },
    });
  }

  const handleTime = (event) => {
    eventState.waitingTime = parseInt(event.target.value)
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventState,

      },
    });
  }
  //Called when a question is deleted
  const rmvQuestion = (x) => {
    tempQuestionArr = tempQuestionArr.filter(elt => elt.key != x.toString())
    questionList = questionList.filter(elt => elt.id != x);
    eventState.question = questionList
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventState,

      },
    });
    setQuestionArr(tempQuestionArr)

  }

  //Called when an option is deleted
  const removeFieldArray = (x, y) => {
    optionList[y].answers = optionList[y].answers.filter(elt => elt.id != x)
    eventState.options = optionList
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
    eventState.options = optionList
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventState,

      },
    });
  }

  const handleQuestions = (questionId, event) => {
    questionList[questionId] = { id: questionId, question: event.target.value }
    optionList[questionId] = { questionId: '', answers: [] }

    eventState.question = questionList
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventState,

      },
    });

  }

const hideQuestion =(id)=> {
  
  let idt = 'option'+ id
  let optionsDiv = document.getElementsByClassName('options-list')
  let currentOption =document.getElementById(`${idt}`)
  Array.from(optionsDiv).forEach(elt => {
    elt.style.display ='none'
  });
  currentOption.style.display='block'
  let questDiv = document.getElementsByClassName('edit-quests')
  Array.from(questDiv).forEach(elt => {
    elt.style.display='inline'
  })
  document.getElementById('edit-quest'+questionCount).style.display ='none'
}

  const createQuestion = () => {
    
    questionCount++
    setQuestionArr(prevState =>
      [...prevState, <div key={questionCount}>
        <Questions questionKey={questionCount} handleQuestions={handleQuestions}
          rmvQuestion={rmvQuestion}
          questionCount={questionCount} handleOptionChange={handleOptionChange} removeFieldArray={removeFieldArray} />
      </div>])
    setquestCompCount(p => p + 1)
   
  }

  return (
    <div className='step2'>
      <div className='row'>
        <div className='col-md-5' style ={{backgroundColor: '', height: '100%'}}>
          <div>
            <label className='op-label'>Default result Layout</label>
            <div className='row'>
              <div className="col-sm-2">
                <div className="form-check ">
                  <label className="form-check-label op-label">
                    <input type="radio" className="form-check-input" id="barChart" value='barChart' checked={defaultLayout === 'barChart'} onChange={(event) => handleSelectedLayout(event)} /> barChart
                  <i className="input-helper"></i>
                  </label>
                </div>
              </div>
              <div className="col-sm-2 poll-op">
                <div className="form-check">
                  <label className="form-check-label op-label">
                    <input type="radio" className="form-check-input" id="pieChart" value='pieChart' checked={defaultLayout === 'pieChart'} onChange={(event) => handleSelectedLayout(event)} /> pieChart
                   <i className="input-helper"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='timer' >
            <label className='op-label'>Timer Mode</label>
            <div className='row'>
              <div className="col-sm-2">
                <div className="form-check">
                  <label className="form-check-label op-label">
                    <input type="radio" className="form-check-input" id="barChart" value='automatique' checked={mode === 'automatique'} onChange={(event) => handleSelectedMode(event)} /> auto
                  <i className="input-helper"></i>
                  </label>
                </div>
                <hr width="1" size="500"></hr>
              </div>
              <div className="col-sm-2 poll-op">
                <div className="form-check ">
                  <label className="form-check-label op-label">
                    <input type="radio" className="form-check-input" id="pieChart" value='manual' checked={mode === 'manual'} onChange={(event) => handleSelectedMode(event)} /> Manual
                   <i className="input-helper"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>


          {mode === 'automatique' && <div><label htmlFor="exampleFormControlInput1" className="form-label op-label">waiting Time</label>
            <input type="Number" className="timer-inp" id="exampleFormControlInput1"  onChange={(event) => handleTime(event)} /></div>}
        </div>
        <div className='col-md-5'>
          <Button variant="success"  onClick={() => createQuestion()}>{!questionCount> 0?  'Add Questions' :'New Question'}</Button><br /><br />
          {questionCount > 0 && questionArr}
        </div>
      </div>
    </div>
  )
}

export default Step2