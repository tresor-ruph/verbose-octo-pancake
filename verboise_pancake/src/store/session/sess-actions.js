import * as  actionTypes from './sess-types'

export const test = (sessId, user = {}) => {
    console.log('i am in action')
    console.log(sessId)
    console.log(user)
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