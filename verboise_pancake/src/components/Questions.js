import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './question.scss'
const Questions = (props) => {
    const [count, setCount] = useState(2)
    const [inputField, setInputField] = useState([1, 2])

    const addField = () => {
        if (inputField.length >= 6) {
            return
        }
        inputField.push(count + 1)
        setCount(prev => prev + 1)
    }

    const rmvField = (x,y) => {
        let newArr = []
        newArr = inputField.filter(elt => elt != x)
        props.removeFieldArray(x, y)
        setInputField(newArr)
    }

    const displayElts = () => {
        let arr = []
        Array.from(inputField).forEach(elt => {
            arr.push(
                <div key={elt} ><input type='text' className='ques-opt' placeholder={'option'+elt} onChange={(event) =>props.handleOptionChange(props.questionCount,elt,event)} />
                { ![1,2].includes(elt)  &&  <FontAwesomeIcon onClick={() => rmvField(elt, props.questionCount)} icon='minus-square' color='red' />}
                </div>
            )
        })
        return arr
    }

    const revealOptions = (id) => {
        let optionsDiv = document.getElementsByClassName('options-list')
        Array.from(optionsDiv).forEach(elt => {
            elt.style.display ='none'
          });
        document.getElementById('option'+id).style.display = 'block'
        let questDiv = document.getElementsByClassName('edit-quests')
        Array.from(questDiv).forEach(elt => {
          elt.style.display='inline'
        })
    }
    
    return (
        <div key={props.questionKey}>
            <input type='text' className = 'new-quest' placeholder={'Question '+props.questionKey} onChange={(event) => props.handleQuestions(props.questionKey, event)} />
            <FontAwesomeIcon onClick={() => revealOptions(props.questionKey)} icon='pencil-alt' color='blue' size='sm'  style ={{display:'none', marginRight: '10px'}} className='edit-quests' id={'edit-quest'+props.questionKey} />     
            <FontAwesomeIcon onClick={() => props.rmvQuestion(props.questionCount, props.questionKey)} icon='trash-alt' color='red' size='sm' />
            <br />
            <div className={'hide-options options-list'} id={'option'+props.questionKey}>
            {displayElts()}
           
            <div className='add-icon'>
            <FontAwesomeIcon icon="plus-square"  color='green' size='lg' onClick={() => addField()}  />
            </div>
            </div>
        </div>

    )
}
export default Questions