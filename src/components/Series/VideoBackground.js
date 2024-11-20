//custom hooks
import useSeriesTrailer from '../../hooks/Series/useSeriesTrailer';
import useSeriesDetails from '../../hooks/Series/useSeriesDetails';

//redux
import { useSelector } from 'react-redux'
import { IMG_CDN_ORG_URL, IMG_CDN_URL } from '../../utils/constants';
import { FaPlay } from 'react-icons/fa';
import { LuInfo } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const VideoBackground = ({movieId}) => {
  
  useSeriesTrailer(movieId);
  useSeriesDetails(movieId);

  const trailer = useSelector(store => store.series?.seriesTrailer); //subscribe to the store
  const details = useSelector(store => store.details?.seriesDetails); //subscribe

  console.log(details)

  
  return (
    <div>
      <div className="hidden md:flex w-full h-screen">
        <iframe   
          className="hidden md:flex w-full aspect-video absolute -top-14 "
          src= {"https://www.youtube.com/embed/"+trailer?.key+"?rel=0&showinfo=0&autoplay=1&mute=1&controls=0&loop=1"} 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          
        >
        </iframe>
      </div>

      <div className='hidden w-full h-screen items-center '>
          <img 
            src={IMG_CDN_URL+details?.backdrop_path} 
            alt={details?.title} 
            className="mt-32 w-96 h-56 p-3 object-cover rounded-md"
          />

          <div>
            <h1 className='text-3xl pb-3 text-white font-bold'>{details?.title}</h1>
          </div>
          <div className='flex gap-3 items-center'>
            <button className='flex items-center gap-1 px-11 bg-white text-lg text-black py-4 font-bold rounded-md hover:bg-opacity-75 border border-black'>
              <FaPlay /> Play
            </button>

            <Link to={'/movies/'+movieId} >
              <button className='flex items-center gap-1 px-6 bg-gray-300 text-lg text-white py-4 font-bold rounded-md bg-opacity-30 hover:bg-opacity-45 border border-black'>
                <LuInfo /> More info
              </button>
          </Link>
        </div> 
      </div>

    </div>
    
  )
}

export default VideoBackground