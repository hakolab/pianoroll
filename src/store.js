import React, { useReducer } from 'react'
import { reducer } from './Reducer'

const initialState = {count: 0, person: [{name: 'taro', age: 30}, {name: 'hanako', age: 30}]}

const Store = React.createContext()

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>
}

export { Store, Provider }