import { combineReducers } from 'redux'
import SessionReducer  from './session/sess-reducer'
import EventReducer from './event/event-reducer'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['SessionReducer','EventReducer']
}

const rootReducer = combineReducers({
    SessionReducer,EventReducer
})

export default persistReducer(persistConfig,rootReducer)