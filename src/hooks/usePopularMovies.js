//constants
import { API_OPTIONS } from '../utils/constants';


//requied hooks
import { useEffect } from 'react';

//redux
import { useDispatch } from 'react-redux';
import { addPopularMovies } from '../utils/redux/moviesSlice';


const usePopularMovies = () => {

    const dispatch = useDispatch();
    
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=3', API_OPTIONS);
        const jsonData = await data.json();
        
        dispatch(addPopularMovies(jsonData.results));

    }

    useEffect(() => {
        getPopularMovies();
    },[])

}

export default usePopularMovies;