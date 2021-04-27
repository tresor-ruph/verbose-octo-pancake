import React, { useState, useEffect } from 'react'

const Questions = (props) => {
    const [count, setCount] = useState(2)
    const [inputField, setInputField] = useState([1, 2])

    useEffect(() => {

    }, [])


    const addField = () => {
        if (inputField.length >= 6) {
            console.log('reached max options')
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
                <div key={elt} ><input type='text' placeholder={elt} onChange={(event) =>props.handleOptionChange(props.questionCount,elt,event)} />
                    <button className='btn-primary' onClick={() => rmvField(elt, props.questionCount)}>remove option</button><br />
                </div>
            )
        })
        return arr
    }

    return (
        <div key={props.questionKey}>
            <input type='text' placeholder='question' onChange={(event) => props.handleQuestions(props.questionKey, event)} />


            <br />
            {displayElts()}
            <button className='btn-primary' onClick={() => addField()}>add option</button><br />
            <button className='btn-primary' onClick={() => props.rmvQuestion(props.questionCount,props.questionKey)}>delete question</button><br />


        </div>

    )
}
export default Questions