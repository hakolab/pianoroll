import { combineReducers } from 'redux'
import counterReducer from './ducks/counter/slice'
import stampListReducer from './ducks/stamp/list/slice'
import stampConfReducer from './ducks/stamp/conf/slice'

export const rootReducer = combineReducers({
    counter: counterReducer,
    stampList: stampListReducer,
    stampConf: stampConfReducer,
})