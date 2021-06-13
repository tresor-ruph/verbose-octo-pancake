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
    }
}

export const update = (username, picture) => {
    return {
        type: actionTypes.UPDATE_USER,
        payload: {
            username: username,
            picture: picture
        }
    }
}