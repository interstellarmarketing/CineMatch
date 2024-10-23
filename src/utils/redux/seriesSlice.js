import { createSlice } from '@reduxjs/toolkit'

const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        actorSeries: null,
        
    },
    reducers: {
        addActorSeries: (state, action) => {
            state.actorSeries = action.payload
        }
    }
})

export const { addActorSeries} = seriesSlice.actions
export default seriesSlice.reducer
