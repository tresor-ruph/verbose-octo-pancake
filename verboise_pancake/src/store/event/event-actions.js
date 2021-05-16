import * as  actionTypes from './event-types'

export const EventAction = ( event = {}) => {
   
    return {
        type: actionTypes.New_EVENT,
        payload: {
            event: event,
            
        }
    }
}

