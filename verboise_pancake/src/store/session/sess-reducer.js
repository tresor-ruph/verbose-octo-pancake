import * as actionTypes from './sess-types'
import ls from 'local-storage'

const INITIAL_STATE = {
    sessionId: undefined,
    user: {
        username: "",
        isLogged: false,
    }
}

const SessionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
        
             ls.set('token', JSON.stringify(action.payload.sessionId))
            console.log(action.payload)
            return {
                ...state,
                sessionId: action.payload.sessionId,
                user: action.payload.user
            }
        case actionTypes.LOG_OUT:
            return {}
        default:
            return state
    }
}

export default SessionReducer