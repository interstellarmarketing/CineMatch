import { IMG_CDN_URL, SERIES_BANNER } from "../../utils/constants";
import FavoriteButton from "../FavoriteButton";
import WatchlistButton from "../WatchlistButton";

const SeriesCard = ({poster_path, series}) => {
  // Ensure the series object has the correct media_type
  const seriesWithType = {
    ...series,
    media_type: 'tv'
  };

  return (
    <div className="relative aspect-[2/3] w-full max-w-[180px] rounded-xl overflow-hidden shadow-md">
      <img
        alt="tv"
        src={poster_path ? `${IMG_CDN_URL}${poster_path}` : SERIES_BANNER}
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
        loading="lazy"
        srcSet={poster_path ? `${IMG_CDN_URL}${poster_path} 1x, ${IMG_CDN_URL.replace('/w500','/w780')}${poster_path} 2x` : undefined}
      />
      {/* Type Badge */}
      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
        TV
      </div>
      {/* Bottom Overlay with Rating and Watchlist */}
      <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-1 rounded flex items-center justify-between z-10">
        <span>⭐ {series.vote_average?.toFixed(1)}</span>
        <div className="pr-0">
          <WatchlistButton media={seriesWithType} size="sm" />
        </div>
      </div>
      {/* Favorite Button */}
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton media={seriesWithType} size="sm" />
      </div>
    </div>
  )
}

export default SeriesCard;