import React, { useState, useEffect } from "react";
import { QRCode } from 'react-qr-svg'
import axios from 'axios'
import "helper/axiosConfig"

let arrtest = []
let questionCount = 0
let optionArr = [{ questionId: '', answers: [] }]
let responses = []

let newArr = []
function Dashboard() {

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

  const [count, setCount] = useState(2)
  const [inputField, setInputField] = useState([1, 2])

  useEffect(() => {

    if (leo > 0) {
      arrtest = questionArr
    }
  }, [leo, count])

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
        generateLink(res.data.message)
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
    setQuestionArr(arrtest)
  }

  const createQuestion = () => {

    questionCount++
    setQuestionArr(prevState => [...prevState,
    <div key={questionCount}>
      <input type='text' placeholder='question' onChange={(event) => handleQuestions(questionCount, event)} />
      <br />
      {displayElts(id)}
      <button className='btn-primary' onClick={() => addField()}>add option</button><br />
      <button className='btn-primary' onClick={() => rmvQuestion(id)}>delete question</button><br />
    </div>

    ])
    setLeo(p => p + 1)

}

  const addField = () => {

    if (count === 6) {
      return
    }
    inputField.push(count + 1)
    setCount(prev => prev + 1)

  }

  const rmvField = (x) => {
    let newArr2 = []
    newArr2 = inputField.filter(elt => elt != x)
    setInputField(newArr2)

  }

  const handleOptionChange = (id, elt, event) => {
    console.log(id)
    optionArr[elt].answers[elt] = event.target.value
    optionArr[id].questionId = id

  }

  const displayElts = (x) => {
    let arr = []
    Array.from(inputField).forEach(elt => {
      arr.push(
        <div key={elt} ><input type='text' placeholder={elt} onChange={(event) => handleOptionChange(x, elt, event)} />
          <button className='btn-primary' onClick={() => rmvField(elt)}>remove option</button><br />
        </div>
      )
    })

    return arr
  }

  const renderTest = (id) => {
    return (
      
    )
  }

  const handleQuestions = (questionId, event) => {
    newArr[questionId] = { id: questionId, question: event.target.value }
  }
  const postQuestions = () => {
    console.log(newArr)
    console.log(optionArr)
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
            {/* <QRCode src={link} /> */}
          </div>}



          {next && <div>
            <select className="form-select" aria-label="Default select example" onChange={(event) => handleSelectedLayout(event)}>
              <option value="polls">barChart</option>
              <option value="reactions">PieChart</option>
            </select><br />
            <select className="form-select" aria-label="Default select example" onChange={(event) => handleSelectedMode(event)}>
              <option value="polls">automatique</option>
              <option value="reactions">manual</option>
            </select><br />

            <label htmlFor="exampleFormControlInput1" className="form-label">waiting Time</label>
            <input type="Number" className="form-control" id="exampleFormControlInput1" placeholder="title" onChange={(event) => handleTime(event)} />
            <button className='btn-primary' onClick={() => createQuestion()}>create question</button><br /><br />
            {questionArr}
            <button className='btn-primary' onClick={() => postQuestions()}>Envoyer</button>

          </div>}

          <button className='btn-primary' onClick={() => { console.log(questionArr) }}>test code</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
