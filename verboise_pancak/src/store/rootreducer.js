import { combineReducers } from 'redux'
import SessionReducer  from './session/sess-reducer'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['SessionReducer']
}

const rootReducer = combineReducers({
    SessionReducer,
})

export default persistReducer(persistConfig,rootReducer)