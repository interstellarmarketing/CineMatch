import { IMG_CDN_URL } from "../utils/constants";



const MovieCard = ({poster_path}) => {
  return (
    <div className="w-72 pr-4"> 
        <img
            alt ="movies"
            src = {`${IMG_CDN_URL}${poster_path}`} 
        />
        
    </div>
  )
}

export default MovieCard;