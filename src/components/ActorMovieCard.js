import { IMG_CDN_URL } from "../utils/constants";



const ActorMovieCard = ({movie}) => {
  return (
    <div className="w-64 p-4"> 
        <img
            alt ="movies"
            src = {`${IMG_CDN_URL}${movie.poster_path}`} 
            className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-out"
        />
        <h1 className="text-white">{movie.title}</h1>
    </div>
  )
}

export default ActorMovieCard;