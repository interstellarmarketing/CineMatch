import { createSlice } from "@reduxjs/toolkit";

const geminiSlice = createSlice({
    name: "gemini",
    initialState: {
        toggleState: false,
        toggleGemini: false,
        searchResultMoviesNames: null,
        searchResultMovies: null,
        isFromGPTSearch: false,
        searchQuery: null,
    },
    reducers: {
        toggleGPTSearch: (state) => {
            state.toggleState = !state.toggleState;
        },
        toggleGeminiSearch: (state) => {
            state.toggleGemini = !state.toggleGemini;
        },

        addSearchResultMovies: (state, action) => {
            const { movieNames, movieResults, searchQuery } = action.payload;
            state.searchResultMoviesNames = movieNames;
            state.searchResultMovies = movieResults;
            state.searchQuery = searchQuery;
            state.isFromGPTSearch = true;
            console.log('GeminiSlice: isFromGPTSearch set to true for query:', searchQuery);
        },

        clearSearchContext: (state) => {
            console.log('GeminiSlice: clearing search context, isFromGPTSearch was:', state.isFromGPTSearch);
            state.isFromGPTSearch = false;
            state.searchQuery = null;
        },
    },
});

export const { toggleGPTSearch, addSearchResultMovies, toggleGeminiSearch, clearSearchContext } = geminiSlice.actions;
export default geminiSlice.reducer;
