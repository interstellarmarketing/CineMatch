import { createSlice } from '@reduxjs/toolkit'

const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        actorSeries: null,
        trendingSeries: null,
        topRatedSeries: null,
        seriesTrailer: null,
        popularSeries: null,
        tamilSeries: null,
        hindiSeries: null,
        malayalamSeries: null,
        teluguSeries: null
        
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

        addPopularSeries: (state, action) => {
            state.popularSeries = action.payload
        },
        addTamilSeries: (state, action) => {
            state.tamilSeries = action.payload
        },
        addHindiSeries: (state, action) => {
            state.hindiSeries = action.payload
        },
        addMalayalamSeries: (state, action) => {
            state.malayalamSeries = action.payload
        },
        addTeluguSeries: (state, action) => {
            state.teluguSeries = action.payload
        }
    }
})

export const { addActorSeries, addTrendingSeries, addTopRatedSeries, addSeriesTrailer, addPopularSeries, addTamilSeries, addHindiSeries, addMalayalamSeries, addTeluguSeries} = seriesSlice.actions
export default seriesSlice.reducer
