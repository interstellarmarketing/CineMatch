//components
import VideoTitle from "./VideoTitle"
import VideoBackground from "./VideoBackground"
import { useSelector } from "react-redux"


const MainContainer = () => {
    const movies = useSelector((store => store.movies?.popularMovies));

    if(!movies) return; // this is a guard clause 

    const randomIndex = Math.floor(Math.random() * 20);
    const mainMovie = movies[randomIndex];

    const{title, overview,id} = mainMovie;


  return (
    <div className="bg-gray-900">
        <VideoTitle title={title} overview={overview} movieId={id}/>
        <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer