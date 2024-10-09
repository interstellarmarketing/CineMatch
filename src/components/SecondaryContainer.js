import { useSelector } from "react-redux";
import MovieList from "./MovieList"

const SecondaryContainer = () => {
    const movies = useSelector((store => store.movies));

  return (
    <div>
        <MovieList title={"Popular Movies"} movies={movies?.popularMovies}/>
    </div>
  )
}

export default SecondaryContainer