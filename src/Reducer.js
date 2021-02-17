import React, { useReducer } from 'react'

const actionType = {
    increment: 'increment',
    decrement: 'decrement', 
    ageup: 'ageup'
}

const initialState = {count: 0, person: [{name: 'taro', age: 30}, {name: 'hanako', age: 30}]}

export function reducer(state, action){
    switch(action.type){
        case 'increment':
            return {...state, count: state.count + 1}
        case 'decrement':
            return {...state, count: state.count - 1}
        case 'ageup':            
            let person = state.person.slice()
            person[0] = {name: 'taro', age: state.person[0].age + 1}
            return {...state, person}
        default:
            throw new Error()
    }
}

const Reducer = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            Count: {state.count}
            {console.log(state)}
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: actionType.ageup})}>+</button>
        </>
    )
}

export default Reducer