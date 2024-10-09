import { configureStore } from "@reduxjs/toolkit"

//reducers
import moviesReducer from "./moviesSlice"
import userReducer from "./userSlice"
import detailsReducer from "./detailsSlice"

const appStore = configureStore({
    reducer:{
        // Add reducers here
        user: userReducer,
        movies: moviesReducer,
        details: detailsReducer,
    }
})

export default appStore;