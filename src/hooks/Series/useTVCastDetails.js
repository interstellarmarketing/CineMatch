import { useDispatch } from "react-redux";
import { API_OPTIONS} from "../../utils/constants";
import { useEffect } from "react";
import { addTVCastDetails } from "../../utils/redux/detailsSlice";


const useTVCastDetails = (movId) => {
  const dispatch = useDispatch();

  const getTVCastDetails = async (movId) => {
    const data = await fetch("https://api.themoviedb.org/3/tv/"+movId+"/credits?language=en-US", API_OPTIONS);
    const json = await data.json();

    const actingCast = json.cast.filter(member => member.known_for_department === 'Acting').slice(0,15);
    console.log(actingCast);

    dispatch(addTVCastDetails(actingCast));
  }

  useEffect(() => {
    getTVCastDetails(movId);
  }, [])
}

export default useTVCastDetails;