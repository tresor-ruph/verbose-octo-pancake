import * as actionTypes from './sess-types'
import ls from 'local-storage'

const INITIAL_STATE = {
    sessionId: undefined,
    userId: undefined,
    user: {
        username: "",
        email:"",
        isLogged: false,
    }
}

const SessionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
        
             ls.set('token', JSON.stringify(action.payload.sessionId))
             ls.set('userId', JSON.stringify(action.payload.userId))
             ls.set('username', JSON.stringify(action.payload.user.username))
             ls.set('email', JSON.stringify(action.payload.user.email))
            console.log(action.payload)
            return {
                ...state,
                sessionId: action.payload.sessionId,
                userId:action.payload.userId,
                user: action.payload.user
                
            }
        case actionTypes.LOG_OUT:
            return {}
        default:
            return state
    }
}

export default SessionReducer