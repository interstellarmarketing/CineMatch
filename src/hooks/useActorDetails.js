import { useDispatch } from "react-redux";
import { API_OPTIONS} from "../utils/constants";
import { useEffect } from "react";
import { addActorDetails } from "../utils/redux/detailsSlice";


const useActorDetails = (castId) => {
  const dispatch = useDispatch();

  const getActorDetails = async (castId) => {
    const data = await fetch("https://api.themoviedb.org/3/person/"+castId+"?language=en-US", API_OPTIONS);
    const json = await data.json();

    dispatch(addActorDetails(json));
  }

  useEffect(() => {
    getActorDetails(castId);
  }, [])
}

export default useActorDetails;