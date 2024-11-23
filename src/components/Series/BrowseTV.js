//components
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"

//custom hooks
import useTrendingSeries from "../../hooks/Series/useTrendingSeries"
import useTopRatedSeries from "../../hooks/Series/useTopRatedSeries";
import usePopularSeries from "../../hooks/Series/usePopularSeries";
import useTamilSeries from "../../hooks/Series/useTamilSeries";
import { useEffect } from "react";
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
  useTamilSeries('ta');
  useTamilSeries('hi');
  useTamilSeries('ml');
  useTamilSeries('te');
    // useUpcomingMovies();


    // useTamilMovies();
    // useBollyWoodMovies();
    // usePopularInIndia();
    // useMalayalamMovies();
    useEffect(() => {
      window.scrollTo(0, 0); // Scrolls to the top of the page
    }, []);
  
  return (
    <div>
      <MainContainer />
      <SecondaryContainer />  
    </div>
  )
}

export default BrowseTV