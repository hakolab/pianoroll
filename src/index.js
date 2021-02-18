import React, { Fragment, useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import { Box } from '@material-ui/core'
import VirtualizedList from './VirtualizedList'

const App = () => {

    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount(count + 1)
    }

    const beats = new Array(64).fill(null).map((_,i) =>i )

    const array = new Array(5).fill(1)

    return (
        <Fragment>
            <div>{count}</div>
            <button onClick={handleClick}>increment</button>
            <VirtualizedList />
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