import { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Questions from '../Questions'


let tempQuestionArr = [] //A temporary array that allows me to manipulate questionArr without producing undesirable sideeffects
let questionCount = 0 // Keep count of the number of questions
let optionList = [] //array containing the options
let questionList = [] // array containing the questions

const Step2 = () => {
  const eventState = useSelector(state => state.EventReducer.event)
  const dispatch = useDispatch();
  const [questionArr, setQuestionArr] = useState([]) //contain de component Question
  const [questCompCount, setquestCompCount] = useState(0) //Keep count of the number of Question components


  useEffect(() => {
    console.log(eventState)
    if (questCompCount > 0) {
      tempQuestionArr = questionArr
    }
  }, [questCompCount])


  const handleSelectedLayout = (event) => {
    eventState.defaultResultLayout = event.target.value
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventState,

      },
    });
  }

  const handleSelectedMode = (event) => {
    dispatch({
      type: "NEW_EVENT",
      payload: {
        event: eventState,

      },
    });
  }

  const handleTime = (event) => {
    eventState.waitingTime = event.target.value
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
    questionCount++
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
    <div>
      <select className="form-select" aria-label="Default select example" onChange={(event) => handleSelectedLayout(event)}>
        <option value="barChart">barChart</option>
        <option value="pieChart">pieChart</option>
      </select><br />
      <select className="form-select" aria-label="Default select example" onChange={(event) => handleSelectedMode(event)}>
        <option value="automatique">automatique</option>
        <option value="manual">manual</option>
      </select><br />

      <label htmlFor="exampleFormControlInput1" className="form-label">waiting Time</label>
      <input type="Number" className="form-control" id="exampleFormControlInput1" placeholder="title" onChange={(event) => handleTime(event)} />

      <button className='btn-primary' onClick={() => createQuestion()}>create question</button><br /><br />
      {questionCount > 0 && questionArr}
    </div>
  )
}

export default Step2