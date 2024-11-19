//components
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"

//custom hooks
import usePopularMovies from "../hooks/usePopularMovies"
import useNowPlaying from "../hooks/useNowPlaying";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useTamilMovies from "../hooks/useTamilMovies";
const Browse = () => {

    useUpcomingMovies();
    useTrendingMovies();
    usePopularMovies();
    useNowPlaying();
    useTamilMovies();
    
  return (
    <div>
        <MainContainer />
        <SecondaryContainer/>
    </div>
  )
}

export default Browse