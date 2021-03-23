import * as  actionTypes from './sess-types'

export const test = (sessId, user = {}) => {
   
    return {
        type: actionTypes.LOG_IN,
        payload: {
            sessionId: sessId,
            user: user
        }
    }
}

export const Logout = () => {
    return {
        type: actionTypes.LOG_OUT,
        payload: {
            sessionId: undefined,
            user: {}
        }
    }
}