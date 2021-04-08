import * as actionTypes from './sess-types'
import ls from 'local-storage'

const INITIAL_STATE = {
    sessionId: undefined,
    userId: undefined,
    user: {
        username: "",
        email: "",
        isLogged: false,
    }
}

const SessionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN:

            ls.set('token', JSON.stringify(action.payload.sessionId))
            return {
                ...state,
                sessionId: action.payload.sessionId,
                userId: action.payload.userId,
                user: action.payload.user
            }

        case actionTypes.LOG_OUT:    
            ls.remove('token')          
            return {
                ...state,
                sessionId: "",
                userId: "",
                user: {
                    username: "",
                    email: "",
                    isLogged: false,
                }
            }
        default:
            return state
    }
}

export default SessionReducer