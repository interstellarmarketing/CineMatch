//components
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"

//custom hooks
import useTrendingSeries from "../../hooks/Series/useTrendingSeries"
// import useUpcomingMovies from "../../hooks/useUpcomingMovies";
// import useTrendingMovies from "../../hooks/useTrendingMovies";
// import useTamilMovies from "../../hooks/useTamilMovies";
// import useBollyWoodMovies from "../../hooks/useBollyWoodMovies";
// import usePopularInIndia from "../../hooks/useTeluguMovies";
// import useMalayalamMovies from "../../hooks/useMalayalamMovies";


const BrowseTV = () => {

  useTrendingSeries();
    // useUpcomingMovies();
    // useTrendingMovies();
    // usePopularMovies();
    // useTamilMovies();
    // useBollyWoodMovies();
    // usePopularInIndia();
    // useMalayalamMovies();
        
  return (
    <div>
      <MainContainer />
      <SecondaryContainer />  
    </div>
  )
}

export default BrowseTV