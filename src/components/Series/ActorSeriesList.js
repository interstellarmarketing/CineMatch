import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Components
import ActorSeriesCard from './ActorSeriesCard';

const ActorSeriesList = ({ movies }) => {
  const data = movies?.cast || [];
  const actorMovies = data.filter(movie => movie.adult === false);
  const moviesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const seriesRef = useRef(null); // Create a ref for the series container

  // Calculate total pages
  const totalPages = Math.ceil(actorMovies.length / moviesPerPage);

  // Get the movies for the current page
  const currentMovies = actorMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      seriesRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to top of series div
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      seriesRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to top of series div
    }
  };

  if (actorMovies.length === 0) {
    return (
      <div className='md:px-12 md:py-3'>
        <h1 className='text-2xl text-white text-center mt-10'>
          No TV Shows found for this actor
        </h1>
      </div>
    );
  }
  return (
    <div className='md:px-12 md:py-3' ref={seriesRef}>
      <div className='flex flex-wrap items-center justify-center'>
        {currentMovies.map(movie => (
          <Link to={'/shows/' + movie.id} key={movie.id}>
            <ActorSeriesCard movie={movie} />
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ActorSeriesList;
