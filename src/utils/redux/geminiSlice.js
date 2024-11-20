import { createSlice } from "@reduxjs/toolkit";

const geminiSlice = createSlice({
    name: "gemini",
    initialState: {
        toggleState: false,
        toggleGemini:false,
        searchResultMoviesNames: null,
        searchResultMovies: null,
    },
    reducers: {
        toggleGPTSearch: (state) => {
            state.toggleState = !state.toggleState;
        },
        toggleGeminiSearch: (state) => {
            state.toggleGemini = !state.toggleGemini;
        },

        addSearchResultMovies: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.searchResultMoviesNames = movieNames;
            state.searchResultMovies = movieResults
        },
    },
});


export const { toggleGPTSearch, addSearchResultMovies, toggleGeminiSearch } = geminiSlice.actions;
export default geminiSlice.reducer;
