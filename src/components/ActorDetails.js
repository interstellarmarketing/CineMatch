import { useEffect, useState } from 'react';
import { ACTOR_BANNER, IMG_CDN_URL } from '../utils/constants'
import { useParams } from 'react-router-dom';
import useActorDetails from '../hooks/useActorDetails';
import useActorImages from '../hooks/useActorImages';
import useActorMovies from '../hooks/useActorMovies';
import { useSelector } from 'react-redux';
import calculateAge from '../utils/calculateAge';
import { MdCake } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdMale, IoMdFemale  } from "react-icons/io";
import ActorImagesList from './ActorImagesList';
import ActorMovieList from './ActorMovieList';
import useActorSeries from '../hooks/useActorSeries';
import DetailsShimmer from './Shimmer/DetailsShimmer';
import ActorSeriesList from './Series/ActorSeriesList';

const ActorDetails = () => {
    const { castId } = useParams();
    useActorDetails(castId);
    useActorImages(castId);
    useActorMovies(castId);
    useActorSeries(castId);

    const actor = useSelector((store) => store.details.actorDetails);
    const images = useSelector((store) => store.images.actorImages);
    const movies = useSelector((store) => store.movies.actorMovies);
    const series = useSelector((store) => store.series.actorSeries);
    console.log(series);

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
        return <DetailsShimmer />;
    }

  return (
    <div className='bg-gray-900 pt-20'>
        <div className='flex max-md:flex-col justify-between md:m-10 mx-3 md:mx-28'>
            <div className='flex flex-col gap-5 md:w-5/12'>
                <div className='flex flex-col text-white md:hidden'>
                    <h1 className="text-5xl font-bold text-center">{actor.name}</h1>
                    <p className="text-lg text-center pt-2">Also known as <span className='font-semibold'>{actor.also_known_as[0]}</span></p>
                </div>

                <div className="flex flex-col">
                    <div className="max-md:flex max-md:justify-center" >
                        <img 
                        src={actor.profile_path ? IMG_CDN_URL + actor.profile_path : ACTOR_BANNER} 
                        alt="" 
                        className="w-[300px] md:w-[350px] rounded-sm "
                        />
                    </div>

                
                {/* <div className="flex text-lg w-[350px]">
                    <button className="flex items-center justify-center text-lg font-semibold bg-white text-black w-3/6 border border-black p-2 mr-1">Watchlist<span className="ml-2 text-2xl"><MdBookmarkAdd /></span></button>
                    <button className="flex items-center justify-center text-lg font-semibold bg-white text-black w-3/6 border border-black p-2 ml-1">Like<span className="ml-2 text-2xl"><AiFillHeart /></span></button>
                </div> */}
                </div>

            </div>
            


            <div className="text-white mx-3 md:w-7/12">
                <div className='flex flex-col max-md:hidden'>
                    <h1 className="text-5xl font-bold text-center">{actor.name}</h1>
                    <p className="text-lg text-center pt-2">Also known as <span className='font-semibold'>{actor.also_known_as[0]}</span></p>
                </div>
                

                <div className='flex max-md:flex-col justify-center items-center md:justify-between text-xl my-2'>
                    <div className='flex items-center gap-1 md:gap-2'>
                        <h3 className='flex items-center gap-[2px] md:gap-1'><MdCake /> {formattedBirthday}</h3>
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
                    <h3 className='text-2xl font-bold'>Biography</h3>
                    <p className='text-lg pt-2'>{actor.biography}</p>
                </div>

                <div>
                    <h3 className='text-2xl font-bold'>Known For</h3>
                    <p className='text-lg pt-2'>{actor.known_for_department}</p>
                </div>
            </div>
           
        </div>

        <div className='mx-6 md:m-10 md:mx-28'>
            <h3 className='text-2xl font-bold text-white'>Images</h3>
            <ActorImagesList images={images} />
        </div>

        <div className='mx-6 md:m-10 md:mx-28'> 
            <h3 className='text-xl font-semibold text-white'>Movies</h3>
            <ActorMovieList movies={movies} />
        </div>


         
        <div className='mx-6 md:m-10 md:mx-28'> 
            <h3 className='text-xl font-semibold text-white'>Series</h3>
            <ActorSeriesList movies={series} />
        </div>


    </div>
  )
}

export default ActorDetails