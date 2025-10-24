import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants"
import { useDispatch } from "react-redux";
import { addTrendingMovies } from "../utils/redux/moviesSlice";


const useTrendingMovies = () => {
    const dispatch = useDispatch();

    const getTrendingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US&region=US', API_OPTIONS);
        const jsonData = await data.json();

        dispatch(addTrendingMovies(jsonData.results));

    }

    useEffect(() => {
        getTrendingMovies();
    },[])

}

export default useTrendingMovies;    