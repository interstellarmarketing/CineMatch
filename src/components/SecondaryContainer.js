import { useSelector } from "react-redux";
import MovieList from "./MovieList"
import { useEffect, useState } from "react";
import MainShimmer from "./Shimmer/MainShimmer";

const SecondaryContainer = () => {

  const [loading, setLoading] = useState(true);
  const movies = useSelector((store => store.movies));
  useEffect(() => {
    if (movies?.trendingMovies !== null){
      setLoading(false);
    }
  }, [movies]);

  if (loading){
    return(
      <MainShimmer />
    )
  }
  return (
    <div className="bg-gray-900 md:bg-black">
      <div className="pt-[40px] md:-mt-80 md:mx-10 relative z-40">
        <MovieList title={"Trending Movies"} movies={movies?.trendingMovies}/>
        <MovieList title={"Tamil Movies"} movies={movies?.tamilMovies}/>
        <MovieList title={"Bollywood Movies"} movies={movies?.bollywoodMovies}/>
        <MovieList title={"Telugu Movies"} movies={movies?.teluguMovies}/>
        <MovieList title={"Malayalam Movies"} movies={movies?.malayalamMovies}/>
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
        <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies}/>
        <MovieList title={"Popular Hollywood"} movies={movies?.popularMovies}/>
      </div>
  </div>
  
  )
}

export default SecondaryContainer