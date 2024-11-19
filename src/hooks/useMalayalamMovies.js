import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants"
import { useDispatch } from "react-redux";
import { addMalayalamMovies } from "../utils/redux/moviesSlice";


const useMalayalamMovies = () => {
    const dispatch = useDispatch();

    const getMalayalamMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&with_original_language=ta', API_OPTIONS);
        const jsonData = await data.json();

        dispatch(addMalayalamMovies(jsonData.results));

    }

    useEffect(() => {
        getMalayalamMovies();
    },[])

}

export default useMalayalamMovies;    