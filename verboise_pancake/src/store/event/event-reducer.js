import * as actionTypes from './event-types'

const INITIAL_STATE = {

    event: {
        title: "",
        eventType: "",
        code: "",
        defaultResultLayout: '',
        waitingTime: '',
        mode: '',
        question: [],
        options: [],
    }
}

const EventReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.NEW_EVENT:
            return {
                ...state,
                event: action.payload.event
            }
        default:
            return state
    }
}

export default EventReducer