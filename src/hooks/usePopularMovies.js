import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';

const usePopularMovies = () => {
    
    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS);
        const jsonData = await data.json();

        console.log(jsonData.results);

    }

    useEffect(() => {
        getPopularMovies();
    },[])

}

export default usePopularMovies;