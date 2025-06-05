import { IMG_CDN_URL, MOVIE_BANNER } from "../utils/constants";
import FavoriteButton from "./FavoriteButton";

const MovieCard = ({poster_path, movie}) => {
  return (
    <div className="w-36 md:w-64 pr-2 md:pr-4 relative"> 
        <img
            alt="movies"
            src={poster_path ? `${IMG_CDN_URL}${poster_path}` : MOVIE_BANNER} 
            className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-out"
        />
        <FavoriteButton media={movie} />
    </div>
  )
}

export default MovieCard;