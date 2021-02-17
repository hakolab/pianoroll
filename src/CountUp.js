import React, { useContext } from 'react'
import { Store } from './store'

const CountUp = () => {
    const {state, dispatch} = useContext(Store)  

    return (
        <div>
            count : {state.count}
            {console.log(state)}
            <div>
                <button onClick={() => dispatch({ type : 'increment' })}>increment</button>
                <button onClick={() => dispatch({ type : 'decrement' })}>decrement</button>
            </div>
        </div>
    )
}

export default CountUp