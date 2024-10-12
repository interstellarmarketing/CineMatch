import { useDispatch } from "react-redux";
import { API_OPTIONS} from "../utils/constants";
import { useEffect } from "react";
import { addCastDetails, addMovieDetails } from "../utils/redux/detailsSlice";


const useCastDetails = (movId) => {
  const dispatch = useDispatch();

  const getCastDetails = async (movId) => {
    const data = await fetch("https://api.themoviedb.org/3/movie/"+movId+"/credits?language=en-US", API_OPTIONS);
    const json = await data.json();

    const actingCast = json.cast.filter(member => member.known_for_department === 'Acting').slice(0,15);
    console.log(actingCast);

    dispatch(addCastDetails(actingCast));
  }

  useEffect(() => {
    getCastDetails(movId);
  }, [])
}

export default useCastDetails;