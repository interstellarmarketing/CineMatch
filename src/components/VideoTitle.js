//icons
import { FaPlay } from "react-icons/fa";
import { LuInfo } from "react-icons/lu";
import { Link } from "react-router-dom";

const VideoTitle = ({title,overview,movieId}) => {
  return (
    <div>
      <div className=" hidden md:flex md:flex-col absolute -top-28 z-20 pt-64 px-20 text-white bg-gradient-to-r from-black bg-opacity-0 w-full aspect-video">
        <h1 className='text-6xl font-bold '>{title}</h1>
        <p className='py-4 w-1/2'>{overview}</p>

        
        <div className='flex gap-5 items-center'>
          <Link to={'/movies/'+movieId} >
            <button className='flex items-center gap-1 px-16 bg-white text-xl text-black cursor-pointer py-4 font-bold rounded-md hover:bg-opacity-75'>
              <FaPlay /> Play
            </button>
          </Link>

          <Link to={'/movies/'+movieId} >
            <button className='flex items-center gap-1 px-11 bg-gray-300 text-xl text-white py-4 font-bold rounded-md bg-opacity-30 hover:bg-opacity-45'>
              <LuInfo /> More info
            </button>
          </Link>
        </div> 
      </div>
    </div>
    
  )
}

export default VideoTitle;