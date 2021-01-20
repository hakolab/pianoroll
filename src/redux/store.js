import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PURGE,
    REGISTER,
    PERSIST,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {rootReducer} from './rootReducer'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH,REHYDRATE,PAUSE,PURGE,REGISTER,PERSIST]
        }
    })
})

export let persistor = persistStore(store)