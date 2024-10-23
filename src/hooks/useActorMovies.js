import { useDispatch } from "react-redux";
import { API_OPTIONS} from "../utils/constants";
import { useEffect } from "react";
import { addCastMovies } from "../utils/redux/moviesSlice";


const useActorMovies = (castId) => {
  const dispatch = useDispatch();

  const getActorMovies = async (castId) => {
    const data = await fetch("https://api.themoviedb.org/3/person/"+castId+"/movie_credits?language=en-US", API_OPTIONS);
    const json = await data.json();

    dispatch(addCastMovies(json));
  }

  useEffect(() => {
    getActorMovies(castId);
  }, [])
}

export default useActorMovies;