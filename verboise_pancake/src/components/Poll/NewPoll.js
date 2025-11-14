import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router'
import CreateQuestion from 'components/CreateQuestions'
import { InputSwitch } from 'primereact/inputswitch';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import "helper/axiosConfig"

import 'customcss/newPoll.scss'

/**
 * Composant de création et configuration d'un nouveau sondage
 * 
 * @component NewPoll
 * @description Interface permettant de configurer un sondage avec questions, options
 * et paramètres d'affichage (graphiques, pourcentages, minuterie)
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {function} props.handleStartEvent - Fonction de rappel pour démarrer l'événement
 * 
 * @returns {JSX.Element} Interface de création de sondage avec configuration
 */
const NewPoll = ({ handleStartEvent }) => {

    // États de configuration du sondage
    const [resultFormat, setResultFormat] = useState(false) // Affichage des résultats en pourcentage
    const [timerMode, setTimerMode] = useState(false) // Activation du mode minuterie
    const [time, setTime] = useState(0) // Durée de la minuterie en secondes
    const dispatch = useDispatch()

    // États de l'interface utilisateur
    const [layout, setLayout] = useState(null) // Type de graphique sélectionné (bar-chart|pie-chart|donut)
    const [layoutErr, setLayoutErr] = useState(false) // État d'erreur pour la sélection du graphique

    // Accès aux données Redux et navigation
    const eventState = useSelector(state => state.EventReducer.event)
    const history = useHistory()



    /**
     * Gère la sélection du type de graphique pour l'affichage des résultats
     * @param {string} x - Type de graphique ('bar-chart'|'pie-chart'|'donut')
     */
    const handleSelect = (x) => {
        // Réinitialise le style de toutes les cartes
        let allCards = document.getElementsByClassName('layout-display')
        Array.from(allCards).forEach(elt => {
            elt.style.backgroundColor = 'white'
        })
        // Met en évidence la carte sélectionnée
        let selectedCard = document.getElementsByClassName(`card-${x}`)
        Array.from(selectedCard)[0].style.backgroundColor = 'rgba(0,255,0,0.2)'
        setLayout(x)
        setLayoutErr(false)
    }

    /**
     * Placeholder pour la fonction de soumission de question
     */
    const setSendQuestion = () => {
        //------
    }

    /**
     * Démarre l'événement en publiant les questions configurées
     */
    const startEvent = async () => {
        await postQuestion()
    }
    /**
     * Valide et publie les questions du sondage
     * Effectue la validation des données, crée le sondage et ajoute les questions/options
     */
    const postQuestion = () => {

        if (!eventState.questionList) {
            let optionErr = document.getElementById('null-question')
            if (optionErr !== null) optionErr.style.display = 'inline'
            return
        } else {
            let optionErr = document.getElementById('null-question')
            if (optionErr !== null) optionErr.style.display = 'none'
        }
        if (!eventState.optionList) {
            let optionErr = document.getElementById(`inv-option${eventState.questionList.length - 1}`)
            if (optionErr !== null) optionErr.style.display = 'inline'
            return
        } else {
            let optionErr = document.getElementById(`inv-option${eventState.questionList.length - 1}`)
            if (optionErr !== null) optionErr.style.display = 'none'

        }

        if (eventState.optionList[eventState.optionList.length - 1].questionId === "") {
            let optionErr = document.getElementById(`inv-quest${eventState.questionList.length - 1}`)
            if (optionErr !== null) optionErr.style.display = 'inline'
            return
        } else {
            let optionErr = document.getElementById(`inv-quest${eventState.questionList.length - 1}`)
            if (optionErr !== null) optionErr.style.display = 'none'

        }
        if (eventState.questionList[eventState.questionList.length - 1].answer === "") {
            let optionErr = document.getElementById(`inv-answ${eventState.questionList.length - 1}`)
            if (optionErr !== null) optionErr.style.display = 'inline'
            return
        } else {
            let optionErr = document.getElementById(`inv-answ${eventState.questionList.length - 1}`)
            if (optionErr !== null) optionErr.style.display = 'none'
        }
        const questions = eventState.questionList.filter(elt => elt.id != "")
        const options = eventState.optionList.filter(elt => elt.id != "")
        if (layout === null) {
            setLayoutErr(true)
            return
        }


        for (let i of questions) {
            for (let j of options) {
                if (i.id === j.questionId) {
                    i.option = j.answers.filter(elt => elt.id != undefined)
                }
            }
        }

        const data = {
            layout: layout,
            percentage: resultFormat,
            timerMode: timerMode,
            time: time,
            eventId: eventState.eventId

        }

        axios.post('/createPoll', data).then(res => {
            questions.forEach((elt, idx, array) => {
                let pic = ''
                let data1 = {
                    order: elt.id,
                    question: elt.question,
                    image: elt.picture,
                    answer: elt.answer,
                    pollId: res.data.pollId
                }
                axios.post('/addQuestions', data1).then(res => {
                    let optionData = []
                    elt.option.forEach(elt2 => {
                        optionData.push({
                            order: elt2.id,
                            optionText: elt2.value,
                            QuestionQuestionId: res.data.response.questionId
                        })
                    })
                    if (optionData.length > 6) {
                        return
                    }

                    axios.post('/addOption', optionData).then(res2 => {
                        if (idx === array.length - 1) {
                            const data = {
                                id: eventState.eventId,
                                status: 'In progress'
                            }
                            axios.put('/updateStatus', data).then(res => {
                                eventState.questionList = []
                                eventState.optionList = []
                                eventState.questionCount = 0
                                eventState.tempQuestionArr = []
                                eventState.status = 'In progress'
                                dispatch({
                                    type: "NEW_EVENT",
                                    payload: {
                                        event: eventState,

                                    },
                                });
                                handleStartEvent(true)
                            }).catch(err => {
                                console.log(err.response)
                            })
                        }
                    }).catch(err => {
                        console.log(err.response)
                        console.log(err)

                    })



                }).catch(err => {
                    console.log(err)
                    console.log(err.response)
                })

            })


        }).catch(err => {
            console.log(err.response)

        })


    }
    /**
     * Navigation de retour vers la page d'accueil
     */
    const goBack = () => {
        history.push('/Home')
    }

    return (
        <div className='new-poll-container'>
            <div className='p-d-flex p-jc-center new-poll-bottons'>
                <Button label="Retour" className="p-button-raised p-button-secondary p-button-sm" icon="pi pi-arrow-left" onClick={() => goBack()} iconPos="left" style={{ marginRight: '2vw' }} />
                <Button className="primary p-button-raised p-button-sm" onClick={() => startEvent()}>Démarrer</Button>
            </div>
            <div className='new-poll-subcontainer row '>
                <div className='p-shadow-4 col-7 '>
                    <div className='new-poll-question'>
                        <CreateQuestion setSendQuestion={setSendQuestion} />
                    </div>
                </div>
                <div className='p-shadow-4 col-3 new-poll-config '>
                    <div className='config-content'>
                        <FontAwesomeIcon icon='cog' color='gray' />
                        <span className='config-title'>Configuration</span>
                        <hr />
                    </div>
                    <div>
                        <span className='result-layout-title'>Format d'affichage des résultats</span>
                        <div className='row'>

                            <Card className='layout-display card-bar-chart'>
                                <a className='stretched-link' onClick={() => handleSelect("bar-chart")}>
                                    <div>
                                        <FontAwesomeIcon icon='chart-bar' color='gray' size="1x" />
                                    </div>
                                    Graphique en barres
                                </a>
                            </Card>
                            <Card className='layout-display card-pie-chart'>
                                <a className='stretched-link' onClick={() => handleSelect("pie-chart")}>
                                    <div>
                                        <FontAwesomeIcon icon='chart-pie' color='gray' size="1x" />
                                    </div>
                                    Graphique circulaire
                                </a>
                            </Card>
                            <Card className='layout-display card-donut'>
                                <a className='stretched-link' onClick={() => handleSelect("donut")}>
                                    <div>
                                        <FontAwesomeIcon icon='chart-bar' color='gray' size="1x" />
                                    </div>
                                    Graphique en anneau
                                </a>
                            </Card>

                        </div>
                        {layoutErr && <small className="p-error p-d-block" >Veuillez sélectionner un type de graphique.</small>}
                        <div className='result-format'>
                            <span className='format-text'>Afficher les résultats en pourcentage :</span><br />

                            <InputSwitch checked={resultFormat} onChange={(e) => setResultFormat(e.value)} className='format-input' />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )

}

export default NewPoll