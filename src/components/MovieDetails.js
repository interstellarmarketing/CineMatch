import { useParams } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import { useSelector } from "react-redux";
import { IMG_CDN_ORG_URL, IMG_CDN_URL } from "../utils/constants";
import { TbActivity } from "react-icons/tb";
import starRating from "../utils/starRating";
import { MdBookmarkAdd } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import genreIcons from "../utils/genreIcons";
import CastList from "./CastList";
import useCastDetails from "../hooks/useCastDetatils";
import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { LiaImdb } from "react-icons/lia";
import { IoPlayOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const MovieDetails = () => {
    const { movId } = useParams();

    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      window.scrollTo(0, 0);

      // Simulate a 1-second delay before showing the movie details
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer); // Clean up the timer on component unmount
    },[]);

    
    

    useMovieDetails(movId);
    useCastDetails(movId);

    const movieDetails = useSelector((store) => store.details.movieDetails);
    
    console.log(movieDetails);

    if (!movieDetails) return;


    if (loading) {
      return (
        <div className="bg-gray-900 pt-20 text-white text-center text-3xl w-full h-screen">
          Loading...
        </div>
      );
    }

    

    return (
      <div className="bg-gray-900 pt-20">

        <div className=" flex justify-between m-10 mx-28">
          <div className="flex flex-col gap-5 w-5/12">
              <div className="" >
                <img 
                  src={IMG_CDN_URL +  movieDetails.poster_path} 
                  alt="" 
                  className="w-[350px] rounded-sm "
                />
              </div>

              
              <div className="flex text-lg w-[350px]">
                <button className="flex items-center justify-center text-lg font-semibold bg-white text-black w-3/6 border border-black p-2 mr-1">Watchlist<span className="ml-2 text-2xl"><MdBookmarkAdd /></span></button>
                <button className="flex items-center justify-center text-lg font-semibold bg-white text-black w-3/6 border border-black p-2 ml-1">Like<span className="ml-2 text-2xl"><AiFillHeart /></span></button>
              </div>
          </div>

          <div className="text-white w-7/12">
            <h1 className="text-5xl font-bold text-center">{movieDetails.title}</h1>
            <p className="text-lg text-center pt-2">{movieDetails.tagline}</p>

            <div className="my-3 flex justify-between">
                <div className="flex items-center gap-2 text-xl">
                    {starRating(movieDetails.vote_average)}
                    <span className="font-bold">
                      {movieDetails.vote_average.toString().slice(0, 3)}/10
                    </span>
                </div>

                <div className="flex items-center gap-2 text-xl font-semibold">
                  <p className="text-white"> {new Date(movieDetails.release_date).getFullYear()}</p>
                  <p><TbActivity /></p>
                  <p className="text-white">{Math.floor(movieDetails.runtime/60)}<span>h</span> {movieDetails.runtime % 60}<span>m</span></p>
                </div>

            </div>

            <div className="my-2 mt-4">
              <div className="flex justify-center flex-wrap gap-2">
                {movieDetails.genres.map((genre) => (
                  <div key={genre.id} className="flex items-center justify-center gap-1 text-white border border-white text-lg px-2 py-1 rounded-sm">
                    <span className="text-2xl"> {genreIcons(genre.name)}</span>
                    <span>{genre.name}</span>
                    </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Overview</h1>
              <p className="text-lg pt-2">{movieDetails.overview}</p>
            </div>

            <div className="border-t-[1px] border-b-[1px] mt-1 border-white">
              <h1 className="text-2xl pt-2 font-semibold">Intrigued by <span className="font-bold">{movieDetails.title}</span>? Let’s dive into its world!</h1>
              <div className="flex items-center justify-between">
                <div className="">
                  <button className="flex gap-1 items-center justify-center text-2xl text-white font-bold p-2 mt-2 ">Website<span><FaGlobe/></span></button>
                </div>

                <div className="">
                  <button className="text-white font-bold mt-2 text-4xl pl-9 "><FcGoogle/></button>
                </div>

                <div className="">
                  <button className="text-white font-bold mt-2 text-6xl "><LiaImdb /></button>
                </div>

                <div className="">
                  <button className="flex gap-1 items-center justify-center text-2xl text-white font-bold p-2 mt-2 ">Trailer<span className="text-3xl"><IoPlayOutline /></span></button>
                </div>

                <div className="">
                  <button className="flex gap-1 items-center justify-center text-2xl text-white font-bold p-2 mt-2 ">Netflix</button>
                </div>

              </div>
              
            </div>

            <div className="">
              <h1 className="text-2xl font-bold pt-2 ">Production Company</h1>
              <div className="flex h-[100px] mt-2">
                <div className="flex items-center justify-center w-3/6 rounded-sm bg-white">
                  <img
                      src={movieDetails.production_companies[0] ? IMG_CDN_URL + movieDetails.production_companies[0].logo_path : null}
                      className="p-4 h-full hover:scale-150 transition-transform duration-300 ease-out"
                  />
                </div>
                <div className=" flex justify-center items-center w-3/6 px-4 border-l-2 border-white ml-2">
                  <h1 className="text-white font-bold text-3xl">{movieDetails.production_companies[0].name}</h1>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <div className="mx-28">
          <h1 className="text-3xl font-bold text-white">Top Cast</h1>
          <CastList/>
        </div>
          

      </div>
    )
  }

export default MovieDetails;

// {/* <div>
//                 <img
//                   src={IMG_CDN_URL + movieDetails.production_companies[0].logo_path}
//                 />
//               </div> */}