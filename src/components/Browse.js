//components
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"

//custom hooks
import usePopularMovies from "../hooks/usePopularMovies"
const Browse = () => {
    usePopularMovies();
    
  return (
    <div>
        <MainContainer />
        <SecondaryContainer/>
    </div>
  )
}

export default Browse