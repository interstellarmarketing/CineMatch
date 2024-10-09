import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../utils/redux/moviesSlice";
import { API_OPTIONS} from "../utils/constants";
import { useEffect } from "react";


const useMovieDetails = (movieId) => {
  const dispatch = useDispatch();

  const getMovieDetails = async (movieId) => {
    const data = await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/?language=en-US", API_OPTIONS);
    const json = await data.json();
          
    // console.log(json);

    dispatch(addMovieTrailer(trailer));
  }

  useEffect(() => {
    getMovieVideos(movieId);
  }, [])
}

export default useMovieTrailer;