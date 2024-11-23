import React, { useState, useEffect, useRef } from 'react';
import { GENRES, genreMap } from '../utils/genreIcons';
import { API_OPTIONS, IMG_CDN_URL, MOVIE_BANNER } from '../utils/constants';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [movies, setMovies] = useState([]); // State to store movies
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error
  const [page, setPage] = useState(1); // Track current page
  const [currentGenre, setCurrentGenre] = useState('Action'); // Default genre set to "Action"
  const observerRef = useRef(); // Ref for intersection observer

  const fetchMoviesByGenre = async (genre, pageNumber = 1) => {
    const genreId = genreMap[genre];
    if (!genreId) return;
  
    if (pageNumber === 1) setMovies([]); // Reset movies if fetching for a new genre
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreId}&page=${pageNumber}`,
        API_OPTIONS
      );
      const data = await response.json();
  
      // Filter out adult movies
      const nonAdultMovies = (data.results || []).filter((movie) => !movie.adult);
  
      setMovies((prevMovies) => [...prevMovies, ...nonAdultMovies]); // Append filtered movies
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (currentGenre) fetchMoviesByGenre(currentGenre, page);
  }, [currentGenre, page]);

  const handleGenreClick = (genre) => {
    if (genre !== currentGenre) {
      setCurrentGenre(genre);
      setPage(1); // Reset to the first page for a new genre
    }
  };

  // Set up the intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loading]);

  return (
    <div className='flex pt-20 p-6 justify-between w-full h-screen bg-gray-900 text-white'>
      <div className='w-2/12 border-r-2 h-full overflow-y-scroll scrollbar-hide'>
        <div>
          <h1 className='text-center font-bold text-xl'>Categories</h1>
        </div>
        <div className=''>
          {GENRES.map((category, index) => (
            <div
              key={index}
              className={`flex gap-2 items-center p-3 cursor-pointer ${
                currentGenre === category.genre
                  ? 'text-sky-400 font-bold border-l-4 border-sky-400'
                  : 'hover:text-sky-400'
              }`}
              onClick={() => handleGenreClick(category.genre)}
            >
              <div className='text-3xl'>{category.logo}</div>
              <div className='text xl'>
                <h1>{category.genre}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-10/12 h-full overflow-y-scroll scrollbar-hide'>
        <h1 className='text-center font-bold text-2xl'>{currentGenre+' Movies'}</h1>
        {loading && page === 1 && <p>Loading movies...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        <div className='grid grid-cols-4 gap-4 p-4'>
          {movies.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              <div className="w-[180px] md:w-60 p-1">
                <img
                  alt="movies"
                  src={movie.poster_path ? `${IMG_CDN_URL}${movie.poster_path}` : MOVIE_BANNER}
                  className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-out"
                />
                <h1 className="text-white text-center">{movie.title}</h1>
              </div>
            </Link>
          ))}
        </div>
        {loading && page > 1 && <p className='text-center'>Loading more movies...</p>}
        <div ref={observerRef} className='h-10'></div> {/* Intersection observer target */}
      </div>
    </div>
  );
};

export default Categories;
