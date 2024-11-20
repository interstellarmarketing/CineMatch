import { useDispatch } from "react-redux";
import { API_OPTIONS} from "../utils/constants";
import { useEffect } from "react";
import { addSeriesDetails } from "../../utils/redux/detailsSlice";


const useSeriesDetails = (movId) => {
  const dispatch = useDispatch();

  const getSeriesDetails = async (movId) => {
    const data = await fetch("https://api.themoviedb.org/3/tv/"+movId+"?language=en-US", API_OPTIONS);
    const json = await data.json();

    dispatch(addSeriesDetails(json));
  }

  useEffect(() => {
    getSeriesDetails(movId);
  }, [])
}

export default useSeriesDetails;