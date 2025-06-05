import { IMG_CDN_URL, SERIES_BANNER } from "../../utils/constants";
import FavoriteButton from "../FavoriteButton";

const SeriesCard = ({poster_path, series}) => {
  // Ensure the series object has the correct media_type
  const seriesWithType = {
    ...series,
    media_type: 'tv'
  };

  return (
    <div className="w-36 md:w-64 pr-2 md:pr-4 relative"> 
        <img
            alt="series"
            src={poster_path ? `${IMG_CDN_URL}${poster_path}` : SERIES_BANNER} 
            className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-out"
        />
        <FavoriteButton media={seriesWithType} />
    </div>
  )
}

export default SeriesCard;