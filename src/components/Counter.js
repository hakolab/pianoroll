import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    decrement,
    increment,
    incrementByAmount,
} from '../redux/ducks/counter/slice'
import * as counterSelectors from '../redux/ducks/counter/selectors'

export function Counter(){
    const count = useSelector(counterSelectors.selectCount)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState('2')

    return (
        <div>
            <button onClick={() => dispatch(increment())}>
                +
            </button>
            <span>{count}</span>
            <button onClick={() => dispatch(decrement())}>
                -
            </button>
            <div>
                <input value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                    />
                <button onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>Add amount</button>
            </div>
        </div>
    )
}