import { createSlice } from "@reduxjs/toolkit"

const imagesSlice = createSlice({
    name: 'images',
    initialState: {
        actorImages: null,
        
    },
    reducers: {
        addActorImages: (state, action) => {
            state.movieDetails = action.payload
        },
    }
})

export const { addActorImages} = imagesSlice.actions
export default imagesSlice.reducer