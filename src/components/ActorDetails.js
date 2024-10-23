import React, { useEffect, useState } from 'react'
import { IMG_CDN_URL } from '../utils/constants'
import { useParams } from 'react-router-dom';

const ActorDetails = () => {
    const { castId } = useParams();
    // useActorDetails(castId);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
  
        // Simulate a 1-second delay before showing the movie details
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1000);
    }
    )
    

  return (
    <div className='bg-gray-900 pt-20'>
        <div>
        <div className="flex flex-col gap-5 w-5/12">
              <div className="" >
                <img 
                  src={IMG_CDN_URL } 
                  alt="" 
                  className="w-[350px] rounded-sm "
                />
              </div>

              
              {/* <div className="flex text-lg w-[350px]">
                <button className="flex items-center justify-center text-lg font-semibold bg-white text-black w-3/6 border border-black p-2 mr-1">Watchlist<span className="ml-2 text-2xl"><MdBookmarkAdd /></span></button>
                <button className="flex items-center justify-center text-lg font-semibold bg-white text-black w-3/6 border border-black p-2 ml-1">Like<span className="ml-2 text-2xl"><AiFillHeart /></span></button>
              </div> */}
          </div>
        </div>

    </div>
  )
}

export default ActorDetails