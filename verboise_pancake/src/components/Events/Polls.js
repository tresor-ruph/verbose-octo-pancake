import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Bar, Pie } from 'react-chartjs-2'
import { Button } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'

// import './polls.scss'
import axios from 'axios'
import 'helper/axiosConfig'
import 'helper/firebaseConfig'

import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore();

let pollId = ''
let currentQuestion = ''
// let index = 0;
const Polls = () => {
    const eventState = useSelector(state => state.EventReducer.event)

    const [event, setEvent] = useState({})
    const [poll, setPoll] = useState({})
    const [question, setQuestion] = useState([])
    const [selectedAns, setSelectedAns] = useState('')
    const [index, setIndex] = useState(0)
    const [loaded, setLoaded] = useState(false)
    let pollRef = db.collection('polls')

    useEffect(() => {

        loadEvent()

    }, [])


    const loadEvent = async () => {
        await axios.get('/getEventPoll/' + eventState.id).then(res => {
            console.log(res)
            setEvent(res.data.event)
            setPoll(res.data.poll)
            setQuestion(res.data.questions)
            pollId = res.data.poll.id
            currentQuestion = res.data.questions[index].id
            console.log(res)
            setLoaded(true)

            // registerFireStore(pollId, currentQuestion)

        }).catch(err => {
            console.log(err);
            console.log(err.response)
        })
    }

    const handleOptionChange = (evt) => {
        console.log('test')
        console.log(evt.target.value)
        setSelectedAns(evt.target.value)
    }

const sendAnswer = () => {
    pollRef.doc(pollId).collection(currentQuestion).add({question: question[index].question, answer: selectedAns})

}

    return (<div className="container bootstrap snippet">
        <div className="main-div">
            {loaded ? <div className="center-div">

                <p className="text-res">{question[index].question || 'test'}</p>
                <div >
                    {question[index].options.map((elt, index) => (
                        <div className="form-check" key={index}>
                            <label className="form-check-label op-label">
                                <input type="radio" className="form-check-input" id="poll" value={elt.id} checked={selectedAns == elt.id} onChange={(event) => handleOptionChange(event)} /> {elt.value}
<i className="input-helper"></i>
                            </label>
                        </div>
                    ))}


                </div>
            </div> : <div className='spinner'><Spinner animation="border" role="status" variant="primary" size='x-lg'>
                <span className="sr-only">Loading...</span>
            </Spinner></div>}
            <Button onClick= {() => sendAnswer()}>send Answer</Button>
        </div>
    </div>)
}
export default Polls