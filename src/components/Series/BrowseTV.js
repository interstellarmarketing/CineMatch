//components
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"

//custom hooks
import useTrendingSeries from "../../hooks/Series/useTrendingSeries"
import useTopRatedSeries from "../../hooks/Series/useTopRatedSeries";
import usePopularSeries from "../../hooks/Series/usePopularSeries";
import useTamilSeries from "../../hooks/Series/useTamilSeries";
// import useUpcomingMovies from "../../hooks/useUpcomingMovies";
// import useTrendingMovies from "../../hooks/useTrendingMovies";
// import useTamilMovies from "../../hooks/useTamilMovies";
// import useBollyWoodMovies from "../../hooks/useBollyWoodMovies";
// import usePopularInIndia from "../../hooks/useTeluguMovies";
// import useMalayalamMovies from "../../hooks/useMalayalamMovies";


const BrowseTV = () => {

  usePopularSeries();
  useTrendingSeries();
  useTopRatedSeries();
  useTamilSeries();
    // useUpcomingMovies();


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