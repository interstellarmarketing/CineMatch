import { createSlice } from '@reduxjs/toolkit'

const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        actorSeries: null,
        trendingSeries: null,
        
    },
    reducers: {
        
        addActorSeries: (state, action) => {
            state.actorSeries = action.payload
        },

        addTrendingSeries: (state, action) => {
            state.trendingSeries = action.payload
        },
    }
})

export const { addActorSeries, addTrendingSeries} = seriesSlice.actions
export default seriesSlice.reducer
