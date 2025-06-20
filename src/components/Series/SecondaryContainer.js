import { useSelector } from "react-redux";
import SeriesList from "./SeriesList";
import MainShimmer from "../Shimmer/MainShimmer";
import { useEffect, useState } from "react";

const SecondaryContainer = () => {
    
    const [loading, setLoading] = useState(true);
    const series = useSelector((store => store.series));
    useEffect(() => {
      if (series?.trendingSeries){
        setLoading(false);
      }
    }, [series]);
  
    if (loading){
      return(
        <MainShimmer />
      )
    }
  return (
    <div className="md:bg-black">
      <div className="pt-20 md:-mt-80 md:mx-10 relative z-40">
        <SeriesList title={"Trending Series"} series={series?.trendingSeries}/>
        <SeriesList title={"Top Rated Series"} series={series?.topRatedSeries}/>
        {/* Optionally add Popular Series if you want */}
        {/* <SeriesList title={"Popular Series"} series={series?.popularSeries}/> */}
      </div>
  </div>
  
  )
}

export default SecondaryContainer