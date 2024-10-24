import { createSlice } from "@reduxjs/toolkit";

const geminiSlice = createSlice({
    name: "gemini",
    initialState: {
        toggleState: false,
        searchResultMoviesNames: null,
        searchResultMovies: null,
    },
    reducers: {
        toggleGPTSearch: (state) => {
            state.toggleState = !state.toggleState;
        },

        addSearchResultMovies: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.searchResultMoviesNames = movieNames;
            state.searchResultMovies = movieResults
        },
    },
});


export const { toggleGPTSearch, addSearchResultMovies } = geminiSlice.actions;
export default geminiSlice.reducer;
