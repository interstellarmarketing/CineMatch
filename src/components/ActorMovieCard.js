import { IMG_CDN_URL, MOVIE_BANNER } from "../utils/constants";



const ActorMovieCard = ({movie}) => {
  return (
    <div className="w-56 p-4"> 
        <img
            alt ="movies"
            src={movie.poster_path ? `${IMG_CDN_URL}${movie.poster_path}` : MOVIE_BANNER}
            className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-out"
        />
        <h1 className="text-white text-center">{movie.title}</h1>
    </div>
  )
}

export default ActorMovieCard;