import React, { Fragment, useState, useContext } from 'react'
import ReactDOM from 'react-dom'
//import App from './App'
import Test from './Test'
import { Store, Provider } from './store'
//import { store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Reducer from './Reducer'
import AgeUp from './AgeUp'
import CountUp from './CountUp'
import Grids from './Grids'
import Table from './Table'
import UseMemo from './Memo'
import Keys from './Keys'

const config = {
    gridWidth: 64,
    tileHeight: 88,
}

//const initialGrids = new Array(config.gridWidth).fill(null).map((_,i) => ({index: i, tiles: new Array(config.tileHeight).fill(null).map((_,i) => ({index: i, active: false}))}))

const App = () => {

    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount(count + 1)
    }

    const beats = new Array(64).fill(null).map((_,i) =>i )

    return (
        <Fragment>
            <div>{count}</div>
            <button onClick={handleClick}>increment</button>
            {beats.map(beat => {
                return <Keys />
            })}
            
        </Fragment>
    )
}


//console.log(store.getState)
ReactDOM.render(
    //<Provider store={store}>
            <App />
    ,//</Provider>,
    document.getElementById('root')
)