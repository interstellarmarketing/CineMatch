import { createSlice } from '@reduxjs/toolkit'

const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        actorSeries: null,
        trendingSeries: null,
        topRatedSeries: null,
        seriesTrailer: null
        
    },
    reducers: {
        
        addActorSeries: (state, action) => {
            state.actorSeries = action.payload
        },

        addTrendingSeries: (state, action) => {
            state.trendingSeries = action.payload
        },

        addTopRatedSeries: (state, action) => {
            state.topRatedSeries = action.payload
        },

        addSeriesTrailer: (state, action) => {
            state.seriesTrailer = action.payload
        },

        a
    }
})

export const { addActorSeries, addTrendingSeries, addTopRatedSeries, addSeriesTrailer} = seriesSlice.actions
export default seriesSlice.reducer
