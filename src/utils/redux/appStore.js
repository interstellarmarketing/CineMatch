import { configureStore } from "@reduxjs/toolkit"

//reducers
import moviesReducer from "./moviesSlice"
import userReducer from "./userSlice"
import detailsReducer from "./detailsSlice"
import imagesReducer from "./imagesSlice"
import seriesReducer from "./seriesSlice"
import geminiReducer from "./geminiSlice"
import langConfigReducer from "./langConfigSlice"

const appStore = configureStore({
    reducer:{
        // Add reducers here
        user: userReducer,
        movies: moviesReducer,
        details: detailsReducer,
        images: imagesReducer,
        series: seriesReducer,
        gemini: geminiReducer,
        lang: langConfigReducer,
    }
})

export default appStore;