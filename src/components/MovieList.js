import { Link } from "react-router-dom";
import MovieCard from "./MovieCard"

const MovieList = ({title,movies}) => {

    if(!movies) return;

  return (
    <div className="px-12 py-3 text-white">
        <h1 className="text-3xl py-4 font-semibold">
            {title}
        </h1>
        <div className="flex overflow-x-scroll scrollbar-hide ">
            <div className="flex scroll-smooth">
                {movies.map(movie => (
                    <Link to={'/movies/'+movie.id} >
                        <MovieCard key={movie.id} poster_path={movie.poster_path}/>
                    </Link>
                ))} 
            </div>
        </div>
        
    </div>
  )
}

export default MovieList;