import { createSlice } from '@reduxjs/toolkit'

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movieTrailer: null,
        popularMovies: null,
        nowPlayingMovies: null,
        trendingMovies: null,
        tamilMovies: null,
        actorMovies: null,
        
    },
    reducers: {
        addMovieTrailer: (state, action) => {
            state.movieTrailer = action.payload
        },
        addTamilMovies: (state, action) => {
            state.tamilMovies = action.payload
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload
        },
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload
        },
        addTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload 
        },
        
        addActorMovies: (state, action) => {
            state.actorMovies = action.payload
        }
    }
})

export const { addMovieTrailer, addPopularMovies, addNowPlayingMovies, addTrendingMovies, addUpcomingMovies,addTamilMovies, addActorMovies} = moviesSlice.actions
export default moviesSlice.reducer
