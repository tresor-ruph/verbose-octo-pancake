import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Button } from 'primereact/button'
import { ProgressSpinner } from "primereact/progressspinner";

import _ from 'underscore'
import axios from 'axios'
import 'helper/axiosConfig'
import 'customcss/ResultPoll.scss'

const PollAnalysis = () => {

    const [ranks, setRanks] = useState(null)
    const [results, setResults] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [questKey, setQuestKey] = useState([])
    const [noData, setNoData] = useState(false)

    const history = useHistory()
    const eventState = useSelector(state => state.EventReducer.event)

    useEffect(() => {
        getResults()
    }, [])



    const getResults = () => {
        axios.get(`eventResults/${eventState.eventId}`).then(res => {
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
            console.log(res.data.poll[0].id)
            axios.get(`/ranks/${res.data.poll[0].id}`).then(res => {
                let sortedData = res.data.sort((a, b) => a.points - b.points).reverse()
                setRanks(sortedData)
                setLoaded(true)

            }).catch(err => {
                console.log(err.response)
                setNoData(true)

            setLoaded(true)
            })
        }).catch(err => {
            console.log(err.response)
            console.log(err)
            
        })
    }

    const handleReturn = () => {
        history.push('/Home')
    }

    return (
        <div className='result-body'>
            {!loaded ?
                <div
                    className="spinner p-d-flex p-jc-center"
                    style={{ marginTop: "40vh" }}
                >
                    <ProgressSpinner />
                </div> : (
                    <div>
                        <div className='row result-container p-d-flex p-jc-center'>
                            <div className="p-shadow-4 col-5 poll-result">
                                <div className='res-txt'><span>Résultats du sondage</span></div>
                                <hr />
                                <div>
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

                            </div>
                            <div className='p-shadow-4 col-5 ranking'>
                                <div className='res-txt'><span> Classement</span></div>
                                <hr />
                                {!noData ? <div>
                                    {eventState.eventType === 'polls' ? <div style={{ marginTop: '20vh', fontSize: '1.5rem', fontWeight: '200' }} className='p-d-flex p-jc-center no-rank' >Pas de classement pour cet événement  </div> : <div>
                                        {ranks.map((elt, idx) => (
                                            <div className='p-d-flex p-jc-center row  rank-div' key={idx}>
                                                <div className='col-1'>{idx + 1}</div>
                                                <div className='col-5'>{elt.pseudo}</div>
                                                <div className='col-2 pts-div'>{elt.points + 'pts'}</div>
                                                <hr />

                                            </div>
                                        ))}
                                    </div>}
                                </div> : <div style={{ marginTop: '20vh', fontSize: '1.5rem', fontWeight: '200' }} className='p-d-flex p-jc-center no-rank' > Pas de classement pour cet événement </div>}
                            </div>

                        </div><div className='p-d-flex p-jc-center' style={{ marginTop: '2vh' }}>
                            <Button onClick={() => handleReturn()} style={{ fontWeight: '500' }}> Page d'accueil</Button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default PollAnalysis