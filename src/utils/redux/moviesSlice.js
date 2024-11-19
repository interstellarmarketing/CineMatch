import { createSlice } from '@reduxjs/toolkit'

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movieTrailer: null,
        popularMovies: null,
        trendingMovies: null,
        tamilMovies: null,
        bollywoodMovies: null,
        actorMovies: null,
        teluguMovies: null,
        malayalamMovies: null,
        
    },
    reducers: {
        addMovieTrailer: (state, action) => {
            state.movieTrailer = action.payload
        },
        addTamilMovies: (state, action) => {
            state.tamilMovies = action.payload
        },
        addBollyWoodMovies: (state, action) => {
            state.bollywoodMovies = action.payload
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload
        },
        addTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload 
        },
        addTeluguMovies: (state, action) => {
            state.teluguMovies = action.payload
        },
        addMalayalamMovies: (state, action) => {
            state.malayalamMovies = action.payload
        },        
        addActorMovies: (state, action) => {
            state.actorMovies = action.payload
        }
    }
})

export const { addMovieTrailer, addPopularMovies, addMalayalamMovies, addTrendingMovies,  addUpcomingMovies,addTamilMovies, addTeluguMovies, addBollyWoodMovies, addActorMovies} = moviesSlice.actions
export default moviesSlice.reducer
