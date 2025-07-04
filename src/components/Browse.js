//components
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"
import MainShimmer from "./Shimmer/MainShimmer"

//custom hooks
import usePopularMovies from "../hooks/usePopularMovies"
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import { useEffect, useState } from "react";

const Browse = () => {
  const [loading, setLoading] = useState(true);
  useUpcomingMovies();
  useTrendingMovies();
  usePopularMovies();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate a 1-second delay before showing the movie details
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  },[]);
  if (loading){
    return <MainShimmer />
  }
  return (
    <div>
      <MainContainer />
      <SecondaryContainer />  
    </div>
  )
}

export default Browse