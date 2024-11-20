//components
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"
import GeminiSearch from "./GeminiSearch";
import Login from "./Login";

//custom hooks
import usePopularMovies from "../hooks/usePopularMovies"
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useTamilMovies from "../hooks/useTamilMovies";
import useBollyWoodMovies from "../hooks/useBollyWoodMovies";
import usePopularInIndia from "../hooks/useTeluguMovies";
import useMalayalamMovies from "../hooks/useMalayalamMovies";

//redux
import { useSelector } from "react-redux";


const Browse = () => {

    useUpcomingMovies();
    useTrendingMovies();
    usePopularMovies();
    useTamilMovies();
    useBollyWoodMovies();
    usePopularInIndia();
    useMalayalamMovies();
        
  return (
    <div>
      <MainContainer />
      <SecondaryContainer />  
    </div>
  )
}

export default Browse