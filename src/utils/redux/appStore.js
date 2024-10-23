import { configureStore } from "@reduxjs/toolkit"

//reducers
import moviesReducer from "./moviesSlice"
import userReducer from "./userSlice"
import detailsReducer from "./detailsSlice"
import imagesReducer from "./imagesSlice"
import seriesReducer from "./seriesSlice"

const appStore = configureStore({
    reducer:{
        // Add reducers here
        user: userReducer,
        movies: moviesReducer,
        details: detailsReducer,
        images: imagesReducer,
        series: seriesReducer,
    }
})

export default appStore;