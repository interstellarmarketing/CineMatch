import { configureStore } from "@reduxjs/toolkit"

//reducers
import moviesReducer from "./moviesSlice"

const appStore = configureStore({
    reducer:{
        // Add reducers here
        movies: moviesReducer,
    }
})

export default appStore;