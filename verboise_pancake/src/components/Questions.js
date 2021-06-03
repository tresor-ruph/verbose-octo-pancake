import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputText } from 'primereact/inputtext';
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";

import './question.scss'
const Questions = (props) => {
    const [count, setCount] = useState(2)
    const [inputField, setInputField] = useState([1, 2])
    const [radioValue1, setRadioValue1] = useState('');

    const handleRadioValues = (x, y) => {
        setRadioValue1(x)
        props.handleCorrectAnswer(y,x)
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
                    <div className="p-col-12 p-md-12">
                        <div className="p-inputgroup option-div">
                            <span className="p-inputgroup-addon">
                                <RadioButton name="rb1" value={elt} checked={radioValue1 === elt} onChange={(e) => handleRadioValues(e.value, props.questionCount)} />
                            </span>
                            <InputText placeholder={'option' + elt} onChange={(event) => props.handleOptionChange(props.questionCount, elt, event)} />
                            {![1, 2].includes(elt) && <Button icon="pi pi-times" className="p-button-danger add-option" onClick={() => rmvField(elt, props.questionCount)} />}

                        </div>
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
        document.getElementById('option' + id).style.display = 'block'
        let questDiv = document.getElementsByClassName('edit-quests')
        Array.from(questDiv).forEach(elt => {
            elt.style.display = 'inline'
        })
    }

    return (
        <div key={props.questionKey}>
            <div className="p-inputgroup questions-input">
              
                    <InputText id={'Question ' + props.questionKey} placeholder={'Question ' + props.questionKey} onChange={(event) => props.handleQuestions(props.questionKey, event)} />
                    <Button icon="pi pi-pencil" className="p-button-success" onClick={() => revealOptions(props.questionKey)} style={{ display: 'none' }} className='edit-quests' id={'edit-quest' + props.questionKey} />
                    <Button icon="pi pi-times" className="p-button-danger" onClick={() => props.rmvQuestion(props.questionCount, props.questionKey)} />



            </div>

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