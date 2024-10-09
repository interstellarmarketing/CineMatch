import { createSlice } from '@reduxjs/toolkit'
import useNowPlaying from '../../hooks/useNowPlaying'
import { MdUpcoming } from 'react-icons/md'

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movieTrailer: null,
        popularMovies: null,
        nowPlayingMovies: null,
        trendingMovies: null,
        
    },
    reducers: {
        addMovieTrailer: (state, action) => {
            state.movieTrailer = action.payload
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
    }
})

export const { addMovieTrailer, addPopularMovies, addNowPlayingMovies } = moviesSlice.actions
export default moviesSlice.reducer
