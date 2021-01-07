import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createStore } from 'redux'


// state
let state_value = {
    conf: {
        width: {
            id: "width",
            step: 1,
            max: 50,
            value: 50,
        },
        height: {
            id: "height",
            step: 1,
            max: 50,
            value: 50,
        },
    },
}

// reducer
function reducer(state = state_value, action){
    switch(action.type){
        case "CHANGE":
            return changeReduce(state, action)
        default:
            return state
    }
}

// reduce action
function changeReduce(state, action){
    let newConf = {...state.conf}
    switch(action.event.target.id){
        case "width":
            newConf.width.value = action.value
            break
        case "height":
            newConf.height.value = action.value
            break
        default:
    }
    
    return {
        conf: newConf,
    }
}

// action creator
export function change(event, newValue){
    return {
        type: "CHANGE",
        event: event,
        value: newValue,
    }
}

//export let store = createStore(reducer)

// config for Redux persist
const persistConfig = {
    key: 'root',
    storage,
}

// persist reducer
const persistedReducer = persistReducer(persistConfig, reducer)

// store
export let store = createStore(persistedReducer)
export let persistor = persistStore(store)

export function purge(){
    persistor.purge()
}

export function pause(){
    persistor.pause()
}

export function flush(){
    persistor.flush()
}