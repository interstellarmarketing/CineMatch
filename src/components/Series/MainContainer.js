//components
import VideoTitle from "./VideoTitle"
import VideoBackground from "./VideoBackground"

//react
import { useSelector } from "react-redux"


const MainContainer = () => {
    const series = useSelector((store => store.series?.trendingSeries));

    if(!series) return; // this is a guard clause 

    const randomIndex = Math.floor(Math.random() * 20);
    const mainSeries = series[randomIndex];

    const{name, overview,id} = mainSeries;


  return (
    <div className="bg-black">
        <VideoTitle title={name} overview={overview} movieId={id}/>
        <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer