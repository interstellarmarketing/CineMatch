import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GeminiMovieCard from './GeminiMovieCard';
import { IMG_CDN_URL } from '../utils/constants';
import { TMDB_API_KEY_V3 } from '../utils/API_KEYS';

const AlgoliaSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY_V3}&query=${encodeURIComponent(searchQuery)}&language=en-US&page=1&include_adult=false`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch from TMDB');
        }

        const data = await response.json();
        // Filter out non-movie and non-tv show results (like people)
        const transformedResults = data.results
          .filter(result => result.media_type === 'movie' || result.media_type === 'tv')
          .map(result => ({
            ...result,
            // For TV shows, use name instead of title
            title: result.media_type === 'tv' ? result.name : result.title,
            // For TV shows, use first_air_date instead of release_date
            release_date: result.media_type === 'tv' ? result.first_air_date : result.release_date,
            poster_path: result.poster_path ? `${IMG_CDN_URL}${result.poster_path}` : null,
          }));
        
        setSearchResults(transformedResults);
      } catch (error) {
        console.error('Error searching:', error);
        setError('Failed to search. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="relative z-40">
      <div className="flex flex-col items-center pt-20 px-4">
        <div className="w-full md:w-8/12 bg-black bg-opacity-65 p-2 md:p-6 flex flex-col md:flex-row justify-center items-center gap-3 rounded-md">
          <div className="w-full flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-3 md:p-2 px-4 w-full rounded-sm outline-none"
              placeholder="Search for movies and TV shows..."
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="w-full md:w-8/12 mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="loader"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 bg-black bg-opacity-60 p-4 rounded-md">
              {error}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="text-white text-lg">
                Found {searchResults.length} results for "{searchQuery}"
              </div>
              <div className="flex items-center justify-center p-2 flex-wrap bg-black bg-opacity-60 rounded-md gap-4">
                {searchResults.map((item) => (
                  <Link 
                    to={`/${item.media_type}/${item.id}`} 
                    key={`${item.media_type}-${item.id}`} 
                    className="relative transform transition-transform hover:scale-105"
                  >
                    <GeminiMovieCard movie={item} />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                      <div className="text-white text-sm font-semibold">{item.title}</div>
                      <div className="text-gray-300 text-xs">
                        {item.release_date?.split('-')[0]} • {item.vote_average?.toFixed(1)} ⭐
                        <span className="ml-2 px-1 py-0.5 bg-gray-700 rounded text-xs">
                          {item.media_type === 'tv' ? 'TV Show' : 'Movie'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : searchQuery ? (
            <div className="text-center text-white bg-black bg-opacity-60 p-4 rounded-md">
              No movies or TV shows found for "{searchQuery}"
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AlgoliaSearch; 