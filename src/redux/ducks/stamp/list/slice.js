import { createSlice } from '@reduxjs/toolkit'

/*
duck/
    ├── *actions.js //createSlice() によって自動生成
    ├── index.js
    ├── *operations.js
    ├── *reducers.js　//createSlice()内で定義
    ├── *selectors.js
    ├── tests.js
    ├── *types.js　//createSlice() によって自動生成
    ├── utils.js

duck/
    ├── index.js
    ├── *operations.js
    ├── *slice.js
    ├── *selectors.js
*/

export const stampListSlice = createSlice({
    name: 'stampList',
    initialState: {
        list: [{x: 259, y: 160}],
    },
    reducers: {
        add: (state, action) => {
            let data = {
                x: action.payload.x,
                y:action.payload.y,
            }
            state.list.push(data)
        },
    },
})

export const { add } = stampListSlice.actions

export default stampListSlice.reducer