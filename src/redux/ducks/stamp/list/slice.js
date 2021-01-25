import { createSlice } from '@reduxjs/toolkit'

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
                width: action.payload.width.value,
            }
            state.list.push(data)
        },
    },
})

export const { add } = stampListSlice.actions

export default stampListSlice.reducer