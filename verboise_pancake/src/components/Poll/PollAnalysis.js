import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'underscore'
import axios from 'axios'
import 'helper/axiosConfig'


const PollAnalysis = () => {

    const [ranks, setRanks] = useState(null)
    const [results, setResults] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [questKey, setQuestKey] = useState([])

    const eventState = useSelector(state => state.EventReducer.event)

    useEffect(() => {




        // console.log(eventState)
        // getRanks()
        getResults()
    }, [])

    const getRanks = () => {
        axios.get(`/ranks/4f2d74a0-a951-4051-aa12-39e351c2b55c`).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err.response)
        })
    }

    const getResults = () => {
        axios.get(`eventResults/${eventState.eventId}`).then(res => {
            // console.log(res)
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
            console.log(Object.keys(test))
            console.log(test)
            setResults(test)
            setLoaded(true)


            // console.log(survey)

        }).catch(err => {
            console.log(err.response)
            console.log(err)
        })
    }

    return (
        <div>
            {!loaded ? <h1>Polls analysis</h1> : (
                <div>
                    {questKey.map((elt, idx) => (
                        <div key={idx}>
                            <span>{elt}</span>

                            {results[elt].map((elt2, idx) => (
                                <ul key={idx}>
                                    <li>{elt2.optionText} : {elt2.vote}</li>
                                </ul>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PollAnalysis