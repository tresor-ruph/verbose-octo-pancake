import {useState} from 'react'
import {Button} from 'react-bootstrap'

const Name = ({handlePsuedo, joinEvent}) => {


return (
    <div>

       <div> <input type='text' onChange = {(event) => handlePsuedo(event)} placeholder ='enter user name'/></div>

       <Button onclick= {() => joinEvent(true)} >JOIN NOW</Button>
    </div>
)

}

export default Name