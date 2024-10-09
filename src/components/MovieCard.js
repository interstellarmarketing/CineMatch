import { IMG_CDN_URL } from "../utils/constants";



const MovieCard = ({poster_path}) => {
  return (
    <div className="w-64 pr-4"> 
        <img
            alt ="movies"
            src = {`${IMG_CDN_URL}${poster_path}`} 
            className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-out"
        />
        
    </div>
  )
}

export default MovieCard;