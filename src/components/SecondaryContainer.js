import { useSelector } from "react-redux";
import MovieList from "./MovieList"

const SecondaryContainer = () => {
    const movies = useSelector((store => store.movies));

  return (
    <div className="bg-gray-900 md:bg-black">
      <div className="pt-20 md:-mt-80 md:mx-10 relative z-40">
        <MovieList title={"Trending Movies"} movies={movies?.trendingMovies}/>
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
        <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies}/>
        <MovieList title={"Popular Movies"} movies={movies?.popularMovies}/>
      </div>
  </div>
  
  )
}

export default SecondaryContainer