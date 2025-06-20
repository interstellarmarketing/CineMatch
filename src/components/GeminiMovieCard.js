import { IMG_CDN_URL, MOVIE_BANNER } from "../utils/constants";
import FavoriteButton from "./FavoriteButton";
import WatchlistButton from "./WatchlistButton";

const GeminiMovieCard = ({ movie }) => {
  const isMovie = movie.media_type === 'movie' || !!movie.title;
  const rating = movie.vote_average?.toFixed(1);
  return (
    <div className="relative aspect-[2/3] w-full max-w-[180px] rounded-xl overflow-hidden shadow-md">
      <img
        alt={isMovie ? "movie" : "tv"}
        src={movie.poster_path ? `${IMG_CDN_URL}${movie.poster_path}` : MOVIE_BANNER}
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
        loading="lazy"
        srcSet={movie.poster_path ? `${IMG_CDN_URL}${movie.poster_path} 1x, ${IMG_CDN_URL.replace('/w500','/w780')}${movie.poster_path} 2x` : undefined}
      />
      {/* Type Badge */}
      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
        {isMovie ? 'Movie' : 'TV'}
      </div>
      {/* Bottom Overlay Bar with Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-4 rounded-b-xl flex items-center justify-between" style={{background: 'linear-gradient(to top, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.0) 100%)'}}>
        <span className="text-yellow-400 text-xs font-bold px-3">⭐ {rating}</span>
        <div className="pr-0.0">
          <WatchlistButton media={movie} size="2xs" />
        </div>
      </div>
      {/* Favorite Button */}
      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton media={movie} size="2xs" />
      </div>
    </div>
  );
};

export default GeminiMovieCard;