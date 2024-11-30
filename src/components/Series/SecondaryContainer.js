import { useSelector } from "react-redux";
import SeriesList from "./SeriesList";
import MainShimmer from "../Shimmer/MainShimmer";
import { useEffect, useState } from "react";

const SecondaryContainer = () => {
    
    const [loading, setLoading] = useState(true);

    const series = useSelector((store => store.series));
    useEffect(() => {
      if (series?.trendingSeries){
        setLoading(false);
      }
    }, [series]);
  
    if (loading){
      return(
        <MainShimmer />
      )
    }
  return (
    <div className="bg-gray-900 md:bg-black">
      <div className="pt-20 md:-mt-80 md:mx-10 relative z-40">
        <SeriesList title={"Trending Series"} series={series?.trendingSeries}/>
        <SeriesList title={"Tamil Series"} series={series?.tamilSeries}/>
        <SeriesList title={"Bollywood Series"} series={series?.hindiSeries}/>
        <SeriesList title={"Telugu Series"} series={series?.teluguSeries}/>
        <SeriesList title={"Malayalam Series"} series={series?.malayalamSeries}/>
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