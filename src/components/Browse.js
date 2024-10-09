//components
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"

//custom hooks
import usePopularMovies from "../hooks/usePopularMovies"
import useNowPlaying from "../hooks/useNowPlaying";
const Browse = () => {

    usePopularMovies();
    useNowPlaying();
    
  return (
    <div>
        <MainContainer />
        <SecondaryContainer/>
    </div>
  )
}

export default Browse