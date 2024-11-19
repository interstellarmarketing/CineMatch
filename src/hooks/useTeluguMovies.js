import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants"
import { useDispatch } from "react-redux";
import { addTeluguMovies } from "../utils/redux/moviesSlice";


const useTeluguMovies = () => {
    const dispatch = useDispatch();

    const getTeluguMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&with_original_language=te', API_OPTIONS);
        const jsonData = await data.json();

        dispatch(addTeluguMovies(jsonData.results));

    }

    useEffect(() => {
        getTeluguMovies();
    },[])

}

export default useTeluguMovies;    