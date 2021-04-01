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
            ls.set('userId', JSON.stringify(action.payload.userId))
            ls.set('username', JSON.stringify(action.payload.user.username))
            action.payload.user.email && ls.set('email', JSON.stringify(action.payload.user.email))
            ls.set('isLogged', JSON.stringify(action.payload.user.isLogged))

            return {
                ...state,
                sessionId: action.payload.sessionId,
                userId: action.payload.userId,
                user: action.payload.user
            }

        case actionTypes.LOG_OUT:

            ls.remove('username')
            ls.remove('userId')
            ls.remove('token')
            ls.set('isLogged', JSON.stringify(false))
            try {
                ls.remove('email')
            } catch (error) {

            }

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