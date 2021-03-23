import * as actionTypes from './sess-types'

const INITIAL_STATE = {
    sessionId: undefined,
    user: {
        username: "",
    }
}

const SessionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
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