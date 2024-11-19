//components
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"

//custom hooks
import usePopularMovies from "../hooks/usePopularMovies"
import useNowPlaying from "../hooks/useNowPlaying";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useTamilMovies from "../hooks/useTamilMovies";
import useBollyWoodMovies from "../hooks/useBollyWoodMovies";
import usePopularInIndia from "../hooks/useTeluguMovies";

const Browse = () => {

    useUpcomingMovies();
    useTrendingMovies();
    usePopularMovies();
    useNowPlaying();
    useTamilMovies();
    useBollyWoodMovies();
    usePopularInIndia();
        
  return (
    <div>
        <MainContainer />
        <SecondaryContainer/>
    </div>
  )
}

export default Browse