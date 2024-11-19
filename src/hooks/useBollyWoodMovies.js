import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants"
import { useDispatch } from "react-redux";
import { addBollyWoodMovies } from "../utils/redux/moviesSlice";


const useBollyWoodMovies = () => {
    const dispatch = useDispatch();

    const getBollyWoodMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&with_original_language=hi', API_OPTIONS);
        const jsonData = await data.json();

        dispatch(addBollyWoodMovies(jsonData.results));

    }

    useEffect(() => {
        getBollyWoodMovies();
    },[])

}

export default useBollyWoodMovies;    