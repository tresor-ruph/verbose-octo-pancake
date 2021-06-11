import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'underscore'
import axios from 'axios'
import 'helper/axiosConfig'
import 'customcss/ResultPoll.scss'

const PollAnalysis = () => {

    const [ranks, setRanks] = useState(null)
    const [results, setResults] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [questKey, setQuestKey] = useState([])

    const eventState = useSelector(state => state.EventReducer.event)

    useEffect(() => {
        console.log('eventState', eventState)
        // getRanks()
        // getResults()
    }, [])

    const getRanks = () => {

    }

    const getResults = () => {
        axios.get(`eventResults/${eventState.eventId}`).then(res => {
            console.log('res', res.data)
            let questions = res.data.questions
            let results = res.data.SurveyResults


            for (let i of results) {
                for (let j of questions) {
                    if (i.questionId === j.id) {
                        i.questionText = j.question
                    }
                }
            }

            let test = _.groupBy(results, elt => elt.questionText);
            setQuestKey(Object.keys(test))
            setResults(test)
            axios.get(`/ranks/${res.data.poll[0].id}`).then(res => {
                console.log('ranking', res.data)
                let sortedData = res.data.sort((a, b) => a.points - b.points)
                setRanks(sortedData)
                setLoaded(true)

            }).catch(err => {
                console.log(err.response)
            })
        }).catch(err => {
            console.log(err.response)
            console.log(err)
        })
    }

    return (
        <div className='result-body'>
            {!loaded ? <h1>Polls analysis</h1> : (
                <div className='row result-container p-d-flex p-jc-center'>
                    <div className="p-shadow-4 col-5 poll-result">
                        <div className='res-txt'><span>Poll Results</span></div>
                        <hr />
                        {questKey.map((elt, idx) => (
                            <div key={idx}>
                                <div className='p-d-flex p-jc-center quest-text'> <span>{elt}</span></div>

                                {results[elt].map((elt2, idx) => (
                                    <div key={idx} className='row'>
                                        <div className='col-8'>{elt2.optionText}</div> <div className='col-2 vote-txt'> {elt2.vote}</div>
                                    </div>
                                ))}
                                <hr />
                            </div>

                        ))}

                    </div>
                    <div className='p-shadow-4 col-5 ranking'>
                        <div className='res-txt'><span> Ranking</span></div>
                        <hr />
                        {ranks.map((elt, idx) => (
                            <div className='p-d-flex p-jc-center row  rank-div' key={idx}>
                                <div className='col-1'>{idx +1 }</div>
                                <div className='col-5'>{elt.pseudo}</div>
                                <div className='col-2 pts-div'>{elt.points + 'pts'}</div>
                                <hr />

                            </div>
                        ))} 
                    </div>

                </div>
            )}
        </div>
    )
}

export default PollAnalysis