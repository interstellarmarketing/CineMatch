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
      <div className="flex flex-col gap-4">
        <div className="text-white text-lg">
          Found {filteredMovies.length} results
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2 w-full justify-center">
          {filteredMovies.map((movie) => {
            const isMovie = movie.media_type === 'movie';
            const linkTo = isMovie ? `/movies/${movie.id}` : `/shows/${movie.id}`;
            return (
              <Link 
                to={linkTo} 
                key={movie.id} 
                className="flex justify-center"
              >
                <GeminiMovieCard movie={movie} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GeminiMovieSuggestions;