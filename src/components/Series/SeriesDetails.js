import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GOOGLE_URL, IMDB_URL, IMG_CDN_URL, NETWORK_LOGO, PROD_LOGO, SERIES_BANNER } from "../../utils/constants";
import { TbActivity } from "react-icons/tb";
import starRating from "../../utils/starRating";
import CastList from "./CastList";
import { useEffect, useRef, useState } from "react";

//icons
import { FaGlobe } from "react-icons/fa";
import { LiaImdb } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { IoPlayOutline } from "react-icons/io5";
import { MdBookmarkAdd } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import genreIcons from "../../utils/genreIcons";
import useSeriesDetails from "../../hooks/Series/useSeriesDetails";
import useTVCastDetails from "../../hooks/Series/useTVCastDetails";
import SeriesTrailer from "./SeriesTrailer";
import DetailsShimmer from "../Shimmer/DetailsShimmer";

const SeriesDetails = () => {
    const { movId } = useParams();

    const [loading, setLoading] = useState(true);

    const trailerRef = useRef(null);

    const scrollToTrailer = () => {
      if (trailerRef.current) {
        trailerRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the trailer section smoothly
      }
    };
  
  
    useEffect(() => {
      window.scrollTo(0, 0);

      // Simulate a 1-second delay before showing the movie details
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer); // Clean up the timer on component unmount
    },[]);

    
    

    useSeriesDetails(movId);
    useTVCastDetails(movId);

    const movieDetails = useSelector((store) => store.details.seriesDetails);

    if (!movieDetails) return;


    if (loading) {
      return <DetailsShimmer />;
    }

    

    

    return (
      <div className="bg-gray-900 pt-20 ">

        <div className=" flex max-md:flex-col justify-between md:m-10 md:mx-28">
          <div className="flex flex-col md:hidden text-white">
            <h1 className="text-3xl font-bold text-center">{movieDetails.original_name}</h1>
            <p className="text-lg text-center pt-1">{movieDetails.tagline}</p>
          </div>

          <div className="flex flex-col gap-5 md:w-5/12 max-md:items-center max-md:mt-3">
              <div className="max-md:flex max-md:justify-center" >
                <img 
                  src={movieDetails.poster_path ? IMG_CDN_URL +  movieDetails.poster_path : SERIES_BANNER} 
                  alt="" 
                  className="w-[300px] md:w-[350px] rounded-sm "
                />
              </div>

              
              <div className="flex text-lg w-[250px] items-center justify-center md:w-[350px]">
                <button className="flex items-center justify-center text-lg font-semibold bg-white text-black w-3/6 border border-black p-2 mr-1">Watchlist<span className="ml-2 text-2xl"><MdBookmarkAdd /></span></button>
                <button className="flex items-center justify-center text-lg font-semibold bg-white text-black w-3/6 border border-black p-2 ml-1">Like<span className="ml-2 text-2xl"><AiFillHeart /></span></button>
              </div>
          </div>

          <div className="text-white md:w-7/12">
            <div className="hidden md:flex md:flex-col">
              <h1 className="text-5xl font-bold text-center">{movieDetails.original_name}</h1>
              <p className="text-lg text-center pt-2">{movieDetails.tagline}</p>
            </div>
            
            <div className=" my-3 flex justify-between max-md:mx-3 max-md:flex-col max-md:items-center">
                <div className="flex items-center gap-2 text-xl">
                    {starRating(movieDetails.vote_average)}
                    <span className="font-bold">
                      {movieDetails.vote_average.toString().slice(0, 3)}/10
                    </span>
                </div>

                <div className="flex items-center gap-2 text-xl font-semibold">
                  <p className="text-white"> {new Date(movieDetails.first_air_date).getFullYear()}</p>
                  <p><TbActivity /></p>
                  <p className="text-white"> {new Date(movieDetails.last_air_date).getFullYear()}</p>
                  {/* <p className="text-white">{Math.floor(movieDetails.runtime/60)}<span>h</span> {movieDetails.runtime % 60}<span>m</span></p> */}
                </div>
            </div>

            <div className="my-2 mt-4 max-md:mx-2">
              <div className="flex justify-center flex-wrap gap-2">
                {movieDetails.genres.map((genre) => (
                  <div key={genre.id} className="flex items-center justify-center gap-1 text-white border border-white text-lg px-2 py-1 rounded-sm">
                    <span className="text-2xl max-md:text-lg"> {genreIcons(genre.name)}</span>
                    <span className="max-md:text-sm">{genre.name}</span>
                    </div>
                ))}
              </div>
            </div>

            <div className="max-md:mx-3">
              <h1 className="text-2xl font-bold">Overview</h1>
              <p className="text-lg pt-2">{movieDetails.overview}</p>
            </div>

            <div className="max-md:mx-3">
              <h1 className="text-2xl font-bold pt-2 ">Network</h1>
              <div className="flex max-md:flex-col max-md:items-center md:h-[100px] my-3">
                <div className="flex items-center justify-center md:w-3/6 rounded-sm bg-white">
                  <img
                      src={movieDetails.networks[0].logo_path ? IMG_CDN_URL + movieDetails.networks[0].logo_path : NETWORK_LOGO}
                      className="p-4 h-full hover:scale-150 transition-transform duration-300 ease-out"
                  />
                </div>
                <div className=" flex justify-center items-center md:w-3/6 px-4 md:border-l-2 md:border-white ml-2">
                  <h1 className="text-white font-bold text-3xl">{movieDetails.networks[0].name}</h1>
                </div>
              </div>
              
            </div>


            <div className="border-t-[1px] border-b-[1px] my-4 border-white max-md:mx-3">
              <h1 className="text-lg md:text-2xl pt-2 font-semibold">Intrigued by <span className="font-bold">{movieDetails.original_name}</span>? Let’s dive into its world!</h1>
              <div className="">
                <div className="hidden md:flex items-center md:justify-between">
                  <div className="">
                    <Link to={movieDetails.homepage} target="_blank">
                      <button className="flex gap-1 items-center justify-center text-2xl max-md:text-lg text-white font-bold p-2 mt-2 ">Website<span><FaGlobe/></span></button>
                    </Link>
                  </div>

                  <div className="">
                    <Link to={GOOGLE_URL + encodeURIComponent(movieDetails.original_name)} target="_blank">
                      <button className="text-white font-bold mt-2 text-4xl max-md:text-xl md:pl-9 "><FcGoogle/></button>
                    </Link>
                  </div>

                  <div className="">
                    <Link to={IMDB_URL +movieDetails.imdb_id} target="_blank">
                      <button className="text-white font-bold mt-2 text-6xl max-md:text-3xl "><LiaImdb /></button>
                    </Link>
                  </div>

                  <div className="">
                    <button onClick={scrollToTrailer} className="flex gap-1 items-center justify-center text-2xl text-white font-bold p-2 mt-2 ">Trailer<span className="text-3xl"><IoPlayOutline /></span></button>
                  </div>

                  <div className="">
                    <button className="flex gap-1 items-center justify-center text-2xl text-white font-bold p-2 mt-2 ">Netflix</button>
                  </div>

                </div>

                <div className="flex flex-col md:hidden"> 

                  <div className="flex gap-3 items-center justify-center">

                    <div className="">
                      <Link to={GOOGLE_URL + encodeURIComponent(movieDetails.title)} target="_blank">
                        <button className="flex text-white items-center font-bold mt-2 text-4xl md:pl-9 "><FcGoogle/></button>
                      </Link>
                    </div>

                    <div className="">
                      <Link to={movieDetails.homepage} target="_blank">
                        <button className="flex gap-1 items-center justify-center text-2xl text-white font-bold p-2 mt-2 ">Website<span><FaGlobe/></span></button>
                      </Link>
                    </div>

                    <div className="">
                      <Link to={IMDB_URL +movieDetails.imdb_id} target="_blank">
                        <button className="flex items-centertext-white font-bold mt-2 text-6xl  "><LiaImdb /></button>
                      </Link>
                    </div>
                  </div>

                  <div className="flex justify-center items-center">
                    <div className="">
                      
                      <button onClick={scrollToTrailer} className="flex gap-1 items-center justify-center text-2xl text-white font-bold p-2 mt-2 ">Trailer<span className="text-3xl"><IoPlayOutline /></span></button>
                    
                    </div>

                    <div className="">
                      <button className="flex gap-1 items-center justify-center text-2xl text-white font-bold p-2 mt-2 ">Netflix</button>
                    </div>
                  </div>
                  
                </div>
                
              </div>
              
            </div>

          </div>
        </div>

        <div className="md:my-10 mx-3 md:mx-28">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Top Cast</h1>
          <CastList/>
        </div>

        <div className="mx-3 md:mx-28" ref={trailerRef}>
          <h1 className="text-3xl font-bold text-white">Trailer</h1>
            <SeriesTrailer movieId={movieDetails.id} />
          
          </div>

          

        </div>
    )
  }

export default SeriesDetails;

// {/* <div>
//                 <img
//                   src={IMG_CDN_URL + movieDetails.production_companies[0].logo_path}
//                 />
//               </div> */}