import { IMG_CDN_URL, MOVIE_BANNER } from "../utils/constants";
import { getServiceIcon, formatServiceName, redirectToStreamingService } from "../utils/streamingServices";
import { Link } from "react-router-dom";

// Priority list for ad-free, popular streaming services
const STREAMING_PRIORITY = [
  'Netflix',
  'Amazon Prime Video',
  'Disney Plus',
  'HBO Max',
  'Apple TV Plus',
  'Paramount Plus',
  'Peacock',
  'Hulu',
  'Crunchyroll',
  'Funimation'
];

const isAdFree = (service) => {
  // You can expand this logic if you have more info about ad-supported tiers
  return [
    'Netflix',
    'Amazon Prime Video',
    'Disney Plus',
    'HBO Max',
    'Apple TV Plus',
    'Paramount Plus',
    'Crunchyroll',
    'Funimation'
  ].includes(service.name);
};

const pickBestStreamingOption = (options = []) => {
  // Prefer ad-free, then by priority
  const adFree = options.filter(isAdFree);
  for (const name of STREAMING_PRIORITY) {
    const found = adFree.find(opt => opt.name === name);
    if (found) return found;
  }
  // If no ad-free, pick first in priority
  for (const name of STREAMING_PRIORITY) {
    const found = options.find(opt => opt.name === name);
    if (found) return found;
  }
  // Fallback: first available
  return options[0] || null;
};

const MyListCard = ({ item }) => {
  const isMovie = item.media_type === 'movie' || !!item.title;
  const rating = item.vote_average?.toFixed(1);
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);
  // Assume item.streamingOptions is an array of {name, type}
  const bestOption = pickBestStreamingOption(item.streamingOptions || []);
  const serviceIcon = bestOption ? getServiceIcon(bestOption.name) : null;
  const serviceName = bestOption ? formatServiceName(bestOption.name) : null;
  const detailsPath = isMovie ? `/movies/${item.id}` : `/series/${item.id}`;

  return (
    <Link to={detailsPath} className="block group">
      <div className="flex bg-gray-900 rounded-2xl shadow-lg overflow-hidden min-h-[120px] h-[140px] w-full transition-transform duration-150 group-hover:scale-[1.02] cursor-pointer">
        {/* Poster */}
        <div className="flex-shrink-0 w-24 h-36 relative bg-black flex items-center justify-center rounded-md overflow-hidden">
          <img
            src={item.poster_path ? `${IMG_CDN_URL}${item.poster_path}` : MOVIE_BANNER}
            alt={item.title || item.name}
            className="w-full h-full object-contain"
          />
          {/* Type Badge */}
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
            {isMovie ? 'Movie' : 'TV'}
          </div>
        </div>
        {/* Details */}
        <div className="flex flex-col justify-between flex-1 p-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white truncate max-w-[90%]">{item.title || item.name}</h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-300 mt-1">
              {year && <span>{year}</span>}
              {rating && <span className="flex items-center gap-1">IMDb <span className="text-yellow-400 font-bold">{rating}</span></span>}
            </div>
            {item.overview && (
              <p className="text-xs text-gray-400 mt-1 line-clamp-1">{item.overview}</p>
            )}
          </div>
          {/* Watch Now Button */}
          {bestOption && (
            <button
              className="mt-2 flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium py-1 px-4 rounded transition-colors text-xs shadow"
              onClick={e => { e.preventDefault(); redirectToStreamingService(bestOption.name, item.title || item.name); }}
            >
              {serviceIcon && <span className="text-base">{serviceIcon}</span>}
              WATCH NOW
              {serviceName && <span className="ml-1 text-[10px] text-white/80">({serviceName})</span>}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MyListCard; 