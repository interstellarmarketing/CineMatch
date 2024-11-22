import { IMG_CDN_ORG_URL, SERIES_BANNER } from "../../utils/constants";



const ActorSeriesCard = ({movie}) => {
  return (
    <div className="w-56 p-4"> 
        <img
            alt ="movies"
            src={movie.poster_path ? `${IMG_CDN_ORG_URL}${movie.poster_path}` : SERIES_BANNER}
            className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-out"
        />
        <h1 className="text-white text-center">{movie.name}</h1>
    </div>
  )
}

export default ActorSeriesCard;