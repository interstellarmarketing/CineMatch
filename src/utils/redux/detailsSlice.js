import { createSlice } from "@reduxjs/toolkit"

const detailsSlice = createSlice({
    name: 'details',
    initialState: {
        movieDetails: null,
        castDetails: null,
        actorDetails: null,
        seriesDetails: null,
        tvCastDetails: null,
        
    },
    reducers: {
        addMovieDetails: (state, action) => {
            state.movieDetails = action.payload
        },

        addCastDetails: (state, action) => {
            state.castDetails = action.payload
        },
        addTVCastDetails: (state, action) => {
            state.tvCastDetails = action.payload
        },

        addActorDetails: (state, action) => {
            state.actorDetails = action.payload
        },

        addSeriesDetails: (state, action) => {
            state.seriesDetails = action.payload
        }
    }
})

export const { addMovieDetails,addCastDetails, addActorDetails, addSeriesDetails, addTVCastDetails } = detailsSlice.actions
export default detailsSlice.reducer