import { useDispatch } from "react-redux";
import { API_OPTIONS} from "../../utils/constants";
import { useEffect } from "react";
import { addSeriesTrailer } from "../../utils/redux/seriesSlice";


const useSeriesTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getSeriesTrailer = async (movieId) => {
    const data = await fetch("https://api.themoviedb.org/3/tv/"+movieId+"/videos?language=en-US", API_OPTIONS);
    const json = await data.json();
 
    const filterData = json.results.filter(video => video.type === 'Trailer' && video.name === 'Official Trailer');
    const trailer = filterData.length ? filterData[0] : json.results[0];

    dispatch(addSeriesTrailer(trailer));
  }

  useEffect(() => {
    getSeriesTrailer(movieId);
  }, [])
}

export default useSeriesTrailer;