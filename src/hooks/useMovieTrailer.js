import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../utils/redux/moviesSlice";
import { API_OPTIONS, VIDEO_URL, VIDEO_URL_END } from "../utils/constants";
import { useEffect } from "react";


const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async (movieId) => {
    const data = await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US", API_OPTIONS);
    const json = await data.json();
          
    // console.log(json);
    const filterData = json.results.filter(video => video.type === 'Trailer' && video.name === 'Official Trailer');
    const trailer = filterData.length ? filterData[0] : json.results[0];

    dispatch(addMovieTrailer(trailer));
  }

  useEffect(() => {
    getMovieVideos(movieId);
  }, [])
}

export default useMovieTrailer;