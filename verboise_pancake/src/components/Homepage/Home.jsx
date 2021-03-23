import React from 'react'
import {useSelector} from 'react-redux'

const HomePage = () => {
    const {user} = useSelector(state=>state.SessionReducer)    
console.log(user)
    return (<div>
        <p>{user.userName}</p>
    </div>)
}

export default HomePage