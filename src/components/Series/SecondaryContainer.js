import { useSelector } from "react-redux";
import SeriesList from "./SeriesList";

const SecondaryContainer = () => {
    const series = useSelector((store => store.series));
    console.log(series?.trendingSeries)
  return (
    <div className="bg-gray-900 md:bg-black">
      <div className="pt-20 md:-mt-80 md:mx-10 relative z-40">
        <SeriesList title={"Trending Series"} series={series?.trendingSeries}/>
        <SeriesList title={"Top Rated Series"} series={series?.topRatedSeries}/>
        {/* <MovieList title={"Tamil Movies"} movies={movies?.tamilMovies}/>
        <MovieList title={"Bollywood Movies"} movies={movies?.bollywoodMovies}/>
        <MovieList title={"Telugu Movies"} movies={movies?.teluguMovies}/>
        <MovieList title={"Malayalam Movies"} movies={movies?.malayalamMovies}/>
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
        <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies}/>
        <MovieList title={"Popular Hollywood"} movies={movies?.popularMovies}/> */}
      </div>
  </div>
  
  )
}

export default SecondaryContainer