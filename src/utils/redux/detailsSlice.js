import { createSlice } from "@reduxjs/toolkit"

const detailsSlice = createSlice({
    name: 'details',
    initialState: {
        movieDetails: null,
        castDetails: null,
        
    },
    reducers: {
        addMovieDetails: (state, action) => {
            state.movieDetails = action.payload
        },

        addCastDetails: (state, action) => {
            state.castDetails = action.payload
        },

        addActorDetails: (state, action) => {
            state.actorDetails = action.payload
        },
        
    }
})

export const { addMovieDetails,addCastDetails, addActorDetails } = detailsSlice.actions
export default detailsSlice.reducer