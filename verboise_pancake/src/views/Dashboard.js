import React, { useState, useEffect } from "react";
import { QRCode } from 'react-qr-svg'
import axios from 'axios'
import Questions from "components/Questions"
import "helper/axiosConfig"


let arrtest = []
let questionCount = 0
let optionArr = []
let newArr = []
function Dashboard(props) {

  const [title, setTitle] = useState('')
  const [selected, setSelected] = useState('')
  const [link, setLink] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [next, setNext] = useState(false)
  const [mode, setMode] = useState('')
  const [layout, setLayout] = useState('')
  const [time, setTime] = useState('')
  const [questionArr, setQuestionArr] = useState([])
  const [leo, setLeo] = useState(0)
  const [eventId, setEventId] = useState('')

  useEffect(() => {

    if (leo > 0) {
      arrtest = questionArr
    }
  }, [leo])

  const generateLink = (x) => {
    let url = process.env.REACT_APP_EVENTBASEURL + x
    setLink(url)
  }


  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleSelected = (event) => {
    setSelected(event.target.value)
  }
  const handleSelectedMode = (event) => {
    setMode(event.target.value)
  }
  const handleSelectedLayout = (event) => {
    setLayout(event.target.value)
  }
  const handleTime = (event) => {
    setTime(event.target.value)
  }

  const handleSubmit = () => {
    const data = {
      title: title,
      selected: selected
    }


    axios.post('/createEvent', data).then(res => {

      if (res.status === 200) {
        console.log(res)
        generateLink(res.data.link)
        setEventId(res.data.eventId)
        setLoaded(true)
        setNext(true)
      }
    }).catch(err => {
      console.log(err.response)
    })

  }
  const rmvQuestion = (x) => {
    arrtest = arrtest.filter(elt => elt.key != x.toString())
    newArr = newArr.filter(elt => elt.id != x);
    questionCount++
    setQuestionArr(arrtest)

  }

  const createQuestion = () => {
    questionCount++
    setQuestionArr(prevState => [...prevState, <div key={questionCount}><Questions questionKey={questionCount} handleQuestions={handleQuestions} rmvQuestion={rmvQuestion} questionCount={questionCount} handleOptionChange={handleOptionChange} removeFieldArray={removeFieldArray} />
    </div>])
    setLeo(p => p + 1)
  }


  const handleQuestions = (questionId, event) => {
    newArr[questionId] = { id: questionId, question: event.target.value }
    optionArr[questionId] = { questionId: '', answers: [] }
  }

  const handleOptionChange = (id, elt, event) => {

    optionArr[id].questionId = id
    optionArr[id].answers[elt] = { id: elt, value: event.target.value }
  }

  const postQuestions = () => {
    console.log(newArr)
    console.log(optionArr)

  }
  const removeFieldArray = (x, y) => {

    console.log(x)
    optionArr[y].answers = optionArr[y].answers.filter(elt => elt.id != x)
    console.log(optionArr)

  }
  const handleSubmit2 = () => {
    const data = {
      layout,time,mode ,eventId
    }
    axios.post('/createPoll', data).then(res => {
      console.log(res)
    }).catch(err => console.log(err?.response))
    console.log(data)

  }

  return (
    <div className="container bootstrap snippet">
      <div className="main-div">
        <div className="center-div">
          <label htmlFor="exampleFormControlInput1" className="form-label">Titre</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="title" onChange={(event) => handleTitle(event)} />
          <select className="form-select" aria-label="Default select example" onChange={(event) => handleSelected(event)}>
            <option value="polls">Polls</option>
            <option value="reactions">Reaction</option>
          </select><br />
          <button className='btn-primary' onClick={() => handleSubmit()}>submit</button>
          {loaded && <div>
            <h3>{link}</h3>
            <QRCode bgColor="#FFFFFF"
              fgColor="#000000"
              level="Q"
              style={{ width: 256 }}
              value={link} />
          </div>}



          {next && <div>
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
            <button className='btn-primary' onClick={() => postQuestions()}>Envoyer</button>
          </div>}
          <button className='btn-primary' onClick={() => { handleSubmit2() }}>test code</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
