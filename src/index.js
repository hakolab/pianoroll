import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Store'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)


/* ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<p>loading...</p>} persistor={persistor}>
            <App />            
        </PersistGate>
    </Provider>,
    document.getElementById('root')
) */