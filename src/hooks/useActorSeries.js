import { useDispatch } from "react-redux";
import { API_OPTIONS} from "../utils/constants";
import { useEffect } from "react";
import { addActorSeries } from "../utils/redux/seriesSlice";


const useActorSeries = (castId) => {
  const dispatch = useDispatch();

  const getActorSeries = async (castId) => {
    const data = await fetch("https://api.themoviedb.org/3/person/"+castId+"/tv_credits?language=en-US", API_OPTIONS);
    const json = await data.json();

    dispatch(addActorSeries(json));
  }

  useEffect(() => {
    getActorSeries(castId);
  }, [])
}

export default useActorSeries;