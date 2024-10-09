//components
import MainComponent from "./MainComponent"
import SecondaryComponent from "./SecondaryComponent"

//custom hooks
import usePopularMovies from "../hooks/usePopularMovies"
const Browse = () => {
    usePopularMovies();
    
  return (
    <div>
        <MainComponent />
        <SecondaryComponent />
    </div>
  )
}

export default Browse