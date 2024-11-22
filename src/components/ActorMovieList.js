import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

//Components
import ActorMovieCard from './ActorMovieCard';

const ActorMovieList = ({ movies }) => {
  const data = movies?.cast || [];
  const actorMovies = data.filter((movie) => movie.adult === false);
  const moviesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Create a ref for the movies container
  const moviesContainerRef = useRef(null);

  // Calculate total pages
  const totalPages = Math.ceil(actorMovies.length / moviesPerPage);

  // Get the movies for the current page
  const currentMovies = actorMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  const scrollToTop = () => {
    moviesContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop(); // Scroll to the top of the movies div
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop(); // Scroll to the top of the movies div
    }
  };

  return (
    <div ref={moviesContainerRef} className="px-12 py-3">
      <div className="flex flex-wrap items-center justify-center">
        {currentMovies.map((movie) => (
          <Link to={'/movies/' + movie.id} key={movie.id}>
            <ActorMovieCard movie={movie} />
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ActorMovieList;
