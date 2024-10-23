import { useEffect, useState } from 'react';
import { IMG_CDN_URL } from '../utils/constants'
import { useParams } from 'react-router-dom';
import useActorDetails from '../hooks/useActorDetails';
import useActorImages from '../hooks/useActorImages';
import { useSelector } from 'react-redux';
import calculateAge from '../utils/calculateAge';
import { MdCake } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdMale, IoMdFemale  } from "react-icons/io";
import ActorImagesList from './ActorImagesList';

const ActorDetails = () => {
    const { castId } = useParams();
    useActorDetails(castId);
    useActorImages(castId);

    const actor = useSelector((store) => store.details.actorDetails);
    const images = useSelector((store) => store.images.actorImages);
    console.log(images);
    const [loading, setLoading] = useState(true);

    let formattedBirthday, age;

    if(actor && actor.birthday){
        [formattedBirthday, age] = calculateAge(actor.birthday);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
  
        // Simulate a 1-second delay before showing the movie details
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1000);

        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
    )
    

    if(!actor) return;

    if (loading) {
        return (
          <div className="bg-gray-900 pt-20 text-white text-center text-3xl w-full h-screen">
            Loading...
          </div>
        );
    }

  return (
    <div className='bg-gray-900 pt-20'>
        <div className='flex justify-between m-10 mx-28'>
            <div className="flex flex-col gap-5 w-5/12">
                <div className="" >
                    <img 
                    src={IMG_CDN_URL + actor.profile_path} 
                    alt="" 
                    className="w-[350px] rounded-sm "
                    />
                </div>

                
                {/* <div className="flex text-lg w-[350px]">
                    <button className="flex items-center justify-center text-lg font-semibold bg-white text-black w-3/6 border border-black p-2 mr-1">Watchlist<span className="ml-2 text-2xl"><MdBookmarkAdd /></span></button>
                    <button className="flex items-center justify-center text-lg font-semibold bg-white text-black w-3/6 border border-black p-2 ml-1">Like<span className="ml-2 text-2xl"><AiFillHeart /></span></button>
                </div> */}
            </div>

            <div className="text-white w-7/12">
                <h1 className="text-5xl font-bold text-center">{actor.name}</h1>
                <p className="text-lg text-center pt-2">Also known as <span className='font-semibold'>{actor.also_known_as[0]}</span></p>

                <div className='flex justify-between text-xl my-2'>
                    <div className='flex items-center gap-2'>
                        <h3 className='flex items-center gap-1'><MdCake /> {formattedBirthday}</h3>
                        <p>|</p>
                        {actor.deathday ? <h3> Deceded </h3> : <h3><span className='font-bold'>{age}</span> Years</h3>}  
                        <p>|</p>
                        {actor.gender === 1 ? <h3><IoMdFemale /></h3> :<h3><IoMdMale /></h3>}
                
                    </div>
                    <div>
                        <h3 className='flex items-center gap-1'><IoLocationSharp />{actor.place_of_birth}</h3>
                    </div>
                </div>

                <div className='my-3'>
                    <h3 className='text-xl font-semibold'>Biography</h3>
                    <p className='text-lg'>{actor.biography}</p>
                </div>

                <div>
                    <h3 className='text-xl font-semibold'>Known For</h3>
                    <p className='text-lg'>{actor.known_for_department}</p>
                </div>
            </div>
           
        </div>

        <div>
            <h3 className='text-xl font-semibold text-white'>Images</h3>
            <ActorImagesList images={images} />
        </div>

    </div>
  )
}

export default ActorDetails