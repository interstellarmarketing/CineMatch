import { IMG_CDN_URL, MOVIE_BANNER } from "../utils/constants";
import FavoriteButton from "./FavoriteButton";

const GeminiMovieCard = ({movie}) => {
  return (
    <div className="w-44 px-4 py-2 relative"> 
        <img
            alt="movies"
            src={movie.poster_path ? `${IMG_CDN_URL}${movie.poster_path}` : MOVIE_BANNER} 
            className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-out"
        />
        <FavoriteButton media={movie} />
        <h1 className="text-white text-center">{movie.title || movie.name}</h1>
    </div>
  )
}

export default GeminiMovieCard;