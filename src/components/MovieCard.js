import { IMG_CDN_URL, MOVIE_BANNER } from "../utils/constants";
import FavoriteButton from "./FavoriteButton";
import WatchlistButton from "./WatchlistButton";

const MovieCard = ({poster_path, movie}) => {
  const year = (movie.release_date || movie.first_air_date)?.split('-')[0];
  const rating = movie.vote_average?.toFixed(1);
  const isMovie = movie.media_type === 'movie' || !!movie.title;
  return (
    <div className="relative aspect-[2/3] w-full max-w-[180px] rounded-xl overflow-hidden shadow-md">
      <img
        alt={isMovie ? "movie" : "tv"}
        src={poster_path ? `${IMG_CDN_URL}${poster_path}` : MOVIE_BANNER}
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
        loading="lazy"
        srcSet={poster_path ? `${IMG_CDN_URL}${poster_path} 1x, ${IMG_CDN_URL.replace('/w500','/w780')}${poster_path} 2x` : undefined}
      />
      {/* Type Badge */}
      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
        {isMovie ? 'Movie' : 'TV'}
      </div>
      {/* Bottom Overlay with Rating and Watchlist */}
      <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-1 rounded flex items-center justify-between z-10">
        <span>⭐ {rating}</span>
        <div className="pr-0">
          <WatchlistButton media={movie} size="sm" />
        </div>
      </div>
      {/* Favorite Button */}
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton media={movie} size="sm" />
      </div>
    </div>
  );
};

export default MovieCard;