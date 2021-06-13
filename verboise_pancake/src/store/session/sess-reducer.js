import * as actionTypes from './sess-types'
import ls from 'local-storage'

const INITIAL_STATE = {
    sessionId: undefined,
    userId: undefined,
    user: {
        username: "",
        email: "",
        isLogged: false,
        picture: "",
        status:"",
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
                    picture: "",
                    status:""
                }
            }

        case actionTypes.UPDATE_USER:
            return {
                ...state,
                sessionId: state.user.sessionId,
                user: {
                    username: action.payload.username,
                    picture: action.payload.picture,
                    isLogged: true,
                }
            }

        default:
            return state
    }
}

export default SessionReducer