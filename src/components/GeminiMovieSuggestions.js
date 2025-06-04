import { useSelector } from "react-redux";
import GeminiMovieCard from "./GeminiMovieCard";
import { Link } from "react-router-dom";

const GeminiMovieSuggestions = () => {
  const { searchResultMoviesNames, searchResultMovies } = useSelector((store) => store.gemini);
  console.log(searchResultMovies);

  

  if (!searchResultMoviesNames) return null; 

  // If searchResultMovies is not an array, return null
  if (!Array.isArray(searchResultMovies)) return null;

  // No language filtering; show all valid results
  const filteredMovies = searchResultMovies.filter((movie) => !!movie);

  return ( 
    <div className="md:mx-14 md:my-10">
      <div className='flex items-center justify-center p-2 flex-wrap bg-black bg-opacity-60'>
        {filteredMovies.map((movie) => {
          const isMovie = movie.media_type === 'movie';
          const linkTo = isMovie ? `/movies/${movie.id}` : `/shows/${movie.id}`;
          return (
            <Link to={linkTo} key={movie.id} className="relative">
              <GeminiMovieCard movie={movie} />
              <span className="absolute top-2 left-2 bg-sky-500 text-xs text-white px-2 py-1 rounded">
                {isMovie ? 'Movie' : 'TV Show'}
              </span>
            </Link>
          );
        })}
      </div>
        
      
    </div>
  )

// [
//   [
//     [],
//     [],
//     [],
//     [],
//     [],
//   ],
//   [
//     [],
//     [],
//     [],
//     [],
//     [],
//   ],
//   [
//     [],
//     [],
//     [],
//     [],
//     [],
//   ],
//   [
//     [],
//     [],
//     [],
//     [],
//     [],
//   ],

// ]
}

export default GeminiMovieSuggestions