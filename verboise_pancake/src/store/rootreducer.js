import { combineReducers } from 'redux'
import SessionReducer  from './session/sess-reducer'

const rootReducer = combineReducers({
    SessionReducer,
})

export default rootReducer