import { useSelector } from "react-redux";
import MovieList from "./MovieList"

const SecondaryContainer = () => {
    const movies = useSelector((store => store.movies));
    console.log(movies)

  return (
    <div className="bg-gray-900 md:bg-black">
      <div className="pt-20 md:-mt-80 md:mx-10 relative z-40">
        <MovieList title={"Trending Movies"} movies={movies?.trendingMovies}/>
        <MovieList title={"Tamil Movies"} movies={movies?.tamilMovies}/>
        <MovieList title={"Bollywood Movies"} movies={movies?.bollywoodMovies}/>
        <MovieList title={"Telugu Movies"} movies={movies?.teluguMovies}/>
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
        <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies}/>
        <MovieList title={"Popular Movies"} movies={movies?.popularMovies}/>
        
        <h1 className="text-white">Tamil Movies</h1>
      </div>
  </div>
  
  )
}

export default SecondaryContainer