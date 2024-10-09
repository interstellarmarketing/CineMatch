import { useDispatch } from "react-redux";
import { API_OPTIONS} from "../utils/constants";
import { useEffect } from "react";
import { addMovieDetails } from "../utils/redux/detailsSlice";


const useMovieDetails = (movId) => {
  const dispatch = useDispatch();

  const getMovieDetails = async (movId) => {
    const data = await fetch("https://api.themoviedb.org/3/movie/"+movId+"?language=en-US", API_OPTIONS);
    const json = await data.json();

    dispatch(addMovieDetails(json));
  }

  useEffect(() => {
    getMovieDetails(movId);
  }, [])
}

export default useMovieDetails;