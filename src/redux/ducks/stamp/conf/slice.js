import { createSlice } from '@reduxjs/toolkit'

const initialConf = {
  width: {
    value: 150,
    step: 1,
    max: 150,
  },
  height: {
    value: 150,
    step: 1,
    max: 150,
  },
}

export const stampConfSlice = createSlice({
    name: 'stampConf',
    initialState: initialConf,
    reducers: {
        changeWidth: (state, action) => {
            state.width.value = action.payload
        },
        changeHeight: (state, action) => {
            state.height.value = action.payload
        },
    },
})

export const { changeWidth, changeHeight } = stampConfSlice.actions

export default stampConfSlice.reducer