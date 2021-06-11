import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputText } from 'primereact/inputtext';
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import UploadImage from '../components/modal/UploadImage'
import { Avatar } from 'primereact/avatar';
import './question.scss'

const Questions = (props) => {
    const [count, setCount] = useState(2)
    const [inputField, setInputField] = useState([1, 2])
    const [radioValue1, setRadioValue1] = useState('');
    const [showQuestModaln, setShowQuestModal] = useState(false)
    const [picture, setPicture] = useState(null)
    const [pictureRef, setPictureRef] = useState(null)

    const handleRadioValues = (x, y) => {
        setRadioValue1(x)
        props.handleCorrectAnswer(y, x)
    }
    const addField = () => {
        if (inputField.length >= 6) {
            return
        }
        inputField.push(count + 1)
        setCount(prev => prev + 1)
    }

    const rmvField = (x, y) => {
        let newArr = []
        newArr = inputField.filter(elt => elt != x)
        props.removeFieldArray(x, y)
        setInputField(newArr)
        setCount(prev => prev - 1)
    }

    const displayElts = () => {
        let arr = []
        Array.from(inputField).forEach(elt => {
            arr.push(
                <div key={elt} >                  
                        <div className="p-inputgroup option-div">
                            <span className="p-inputgroup-addon" style={{ height: '37px' }}>
                                <RadioButton name="rb1" value={elt} checked={radioValue1 === elt} onChange={(e) => handleRadioValues(e.value, props.questionCount)} />
                            </span>
                            <InputText placeholder={'option' + elt} onChange={(event) => props.handleOptionChange(props.questionCount, elt, event)} className="p-inputtext-sm" />
                            {![1, 2].includes(elt) && <Button icon="pi pi-times" className="p-button-danger add-option" onClick={() => rmvField(elt, props.questionCount)} />}

                        </div>
                    
                </div>
            )
        })
        return arr
    }

    const revealOptions = (id) => {
        let optionsDiv = document.getElementsByClassName('options-list')
        Array.from(optionsDiv).forEach(elt => {
            elt.style.display = 'none'
        });
        let optionStyle = document.getElementById('option' + id)
        if (optionStyle != null) optionStyle.style.display = 'block'

        let imageStyle = document.getElementById('image' + id)
        if (imageStyle != null) imageStyle.style.display = 'block'

        let questDiv = document.getElementsByClassName('edit-quests')
        Array.from(questDiv).forEach(elt => {
            elt.style.display = 'inline'
        })
        document.getElementById('edit-quest' + id).style.display = 'none'
    }

    const onHide = (x, y) => {
        setShowQuestModal(false)
        if (x != undefined) {
            props.handleQuestionImage(props.questionCount, x)
        }
        setPicture(x)
        setPictureRef(y)
    }
    const setReveal = () => {
        setShowQuestModal(true)

    }
    const deleteImage = () => {
        setPicture(null)
        props.deleteQuestionImage(props.questionCount)

        pictureRef.delete().then(() => {
            console.log('fileDeleted')
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div key={props.questionKey}>
            {showQuestModaln && <UploadImage eventId={props.eventId} hide={onHide} />}
            {picture != null && <div className=' options-list' id={'image' + props.questionKey}><Avatar className="p-overlay-badge" image={picture} size="xlarge">
                <i className="pi pi-times" onClick={() => deleteImage()}></i>
            </Avatar></div>}
            <div className="p-inputgroup questions-input">
                <Button icon="pi pi-image" className="p-button-secondary" style={{ height: '37px' }} onClick={() => setReveal()} />
                <InputText id={'Question ' + props.questionKey} placeholder={'Question ' + props.questionKey} onChange={(event) => props.handleQuestions(props.questionKey, event)} className="p-inputtext-sm p-d-block " />
                <Button icon="pi pi-pencil" className="p-button-success" style={{ display: 'none', height: '37px' }} onClick={() => revealOptions(props.questionKey)} className='edit-quests' id={'edit-quest' + props.questionKey} />
                <Button icon="pi pi-times" className="p-button-danger" style={{ height: '37px' }} onClick={() => props.rmvQuestion(props.questionCount, props.questionKey)} />
            </div>
            <small id="username2-help" className="p-error" id={`inv-quest${props.questionKey}`} style={{ display: 'none' }}>Please add your question.</small>
            <small id="username2-help" className="p-error" id={`inv-option${props.questionKey}`} style={{ display: 'none' }}>Please add atleast 2 options.</small>
            <small id="username2-help" className="p-error" id={`inv-answ${props.questionKey}`} style={{ display: 'none' }}>Please select an answer.</small>

            <br />
            <div className={'hide-options options-list'} id={'option' + props.questionKey}>
                {displayElts()}

                <div className='add-icon'>
                    <FontAwesomeIcon icon="plus-square" color='gray' size='2x' onClick={() => addField()} className='add-option' />
                </div>
            </div>
            <div>
            </div>
        </div >

    )
}
export default Questions