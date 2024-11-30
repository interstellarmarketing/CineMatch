import { IMG_CDN_URL, MOVIE_BANNER } from "../utils/constants";



const MovieCard = ({poster_path}) => {
  return (
    <div className="w-36 md:w-64 pr-2 md:pr-4"> 
        <img
            alt ="movies"
            src = {poster_path ? `${IMG_CDN_URL}${poster_path}` : MOVIE_BANNER} 
            className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-out"
        />
        
    </div>
  )
}

export default MovieCard;