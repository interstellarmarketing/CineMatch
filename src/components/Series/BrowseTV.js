//components
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"

//custom hooks
import useTrendingSeries from "../../hooks/Series/useTrendingSeries"
import useTopRatedSeries from "../../hooks/Series/useTopRatedSeries";
import usePopularSeries from "../../hooks/Series/usePopularSeries";
import { useEffect } from "react";

const BrowseTV = () => {
  usePopularSeries();
  useTrendingSeries();
  useTopRatedSeries();
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