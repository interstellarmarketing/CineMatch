import { useDispatch } from "react-redux";
import { API_OPTIONS} from "../utils/constants";
import { useEffect } from "react";
import { addActorImages } from "../utils/redux/imagesSlice";


const useActorImages = (castId) => {
  const dispatch = useDispatch();

  const getActorImages = async (castId) => {
    const data = await fetch("https://api.themoviedb.org/3/person/"+castId+"?language=en-US", API_OPTIONS);
    const json = await data.json();

    dispatch(addActorImages(json));
  }

  useEffect(() => {
    getActorImages(castId);
  }, [])
}

export default useActorImages;