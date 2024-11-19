import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants"
import { useDispatch } from "react-redux";
import { addTamilMovies } from "../utils/redux/moviesSlice";


const useTamilMovies = () => {
    const dispatch = useDispatch();

    const getTamilMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&with_original_language=ta', API_OPTIONS);
        const jsonData = await data.json();

        dispatch(addTamilMovies(jsonData.results));

    }

    useEffect(() => {
        getTamilMovies();
    },[])

}

export default useTamilMovies;    