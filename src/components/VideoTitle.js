//icons
import { FaPlay } from "react-icons/fa";
import { LuInfo } from "react-icons/lu";

const VideoTitle = ({title,overview}) => {
  return (
    <div>
      <h1 className='text-6xl font-bold '>{title}</h1>
      <p className='py-4 w-1/2'>{overview}</p>

      <div className='flex gap-5 items-center'>
        <button className='flex items-center gap-1 px-16 bg-white text-xl text-black py-4 font-bold rounded-md hover:bg-opacity-75'>
          <FaPlay /> Play
        </button>
        <button className='flex items-center gap-1 px-11 bg-gray-300 text-xl text-white py-4 font-bold rounded-md bg-opacity-30 hover:bg-opacity-45'>
          <LuInfo /> More info
        </button>
      </div> 
    </div>
  )
}

export default VideoTitle;