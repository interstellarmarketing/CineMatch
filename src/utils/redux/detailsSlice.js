import { createSlice } from "@reduxjs/toolkit"

const detailsSlice = createSlice({
    name: 'details',
    initialState: {
        movieDetails: null,
        
    },
    reducers: {
        addMovieDetails: (state, action) => {
            state.movieDetails = action.payload
        },
        
    }
})

export const { addMovieDetails } = detailsSlice.actions
export default detailsSlice.reducer