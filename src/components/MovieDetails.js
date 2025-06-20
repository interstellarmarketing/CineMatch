import { Link, useParams } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import { useSelector } from "react-redux";
import { GOOGLE_URL, IMDB_URL, IMG_CDN_URL, MOVIE_BANNER, PROD_LOGO } from "../utils/constants";
import { TbActivity } from "react-icons/tb";
import starRating from "../utils/starRating";
import CastList from "./CastList";
import useCastDetails from "../hooks/useCastDetatils";
import { useEffect, useRef, useState } from "react";
import MovieTrailer from "./MovieTrailer";
import { useContext } from "react";
import { PreferencesContext } from "../App";
import { selectAllFavorites } from "../utils/redux/preferencesSlice";
import WhereToWatch from "./WhereToWatch";
import ShowMoreText from "./ShowMoreText";
import BackToSearchButton from "./BackToSearchButton";

//icons
import { FaGlobe } from "react-icons/fa";
import { LiaImdb } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { IoPlayOutline } from "react-icons/io5";
import { MdBookmarkAdd } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import genreIcons from "../utils/genreIcons";
import DetailsShimmer from "./Shimmer/DetailsShimmer";

const MovieDetails = () => {
    const { movId } = useParams();

    const [loading, setLoading] = useState(true);

    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const triggerPopup = (message) => {
      setPopupMessage(message);
      setShowPopup(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    };

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

    
    

    useMovieDetails(movId);
    useCastDetails(movId);

    const movieDetails = useSelector((store) => store.details.movieDetails);
    const favorites = useSelector(selectAllFavorites);
    const { toggleFavorite } = useContext(PreferencesContext);
    const favorited = movieDetails && favorites.some(item => item.id === movieDetails.id);

    if (!movieDetails) return <DetailsShimmer />;

    if (loading){
      return <DetailsShimmer />
    }

    return (
      <div className="pt-16 bg-black text-white">

      {showPopup && (
        <div
          className="popup-message fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-xl z-50"
        >
          {popupMessage}
        </div>
      )}

      {/* Main backdrop and movie info */}
      <div className="w-full">
        {/* Backdrop Image */}
        <div className="relative w-full md:h-[550px] h-auto">
          <img
            src={movieDetails.backdrop_path ? IMG_CDN_URL + movieDetails.backdrop_path : (movieDetails.poster_path ? IMG_CDN_URL + movieDetails.poster_path : MOVIE_BANNER)}
            alt={movieDetails.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          {/* Back Button */}
          <div className="absolute top-4 left-4 z-10">
            <BackToSearchButton />
          </div>
        </div>

        {/* Movie Details Section */}
        <div className="flex flex-col md:flex-row gap-8 md:m-10 m-4 md:mx-12">
          {/* Left side: Poster */}
          <div className="hidden md:block md:w-1/4">
            <img 
              src={movieDetails.poster_path ? IMG_CDN_URL +  movieDetails.poster_path : MOVIE_BANNER} 
              alt={movieDetails.title} 
              className="w-full rounded-xl shadow-lg"
            />
          </div>
          
          {/* Right side: Info */}
          <div className="md:w-3/4 flex flex-col">
            {/* Rating and other info */}
            <div className="flex items-center gap-4 text-lg mb-2">
              <span className="flex items-center gap-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" alt="IMDb" className="w-8 h-8" /> 
                <span className="font-bold text-yellow-400">{movieDetails.vote_average.toFixed(1)}</span>
                <span className="text-gray-400 text-sm">({movieDetails.vote_count.toLocaleString()})</span>
              </span>
              <span>•</span>
              <span className="font-semibold">{new Date(movieDetails.release_date).getFullYear()}</span>
              <span>•</span>
              <span className="font-semibold">{Math.floor(movieDetails.runtime/60)}h {movieDetails.runtime % 60}m</span>
            </div>

            {/* Title and Tagline */}
            <h1 className="text-4xl md:text-5xl font-bold">{movieDetails.title}</h1>
            
            {/* Overview */}
            <div className="my-4">
              <ShowMoreText text={movieDetails.overview} textSize="text-base" />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-start items-start gap-4 mb-6">
              <button
                onClick={() => toggleFavorite(movieDetails)}
                className="flex items-center gap-2 bg-pink-600/20 hover:bg-pink-600/40 text-pink-300 px-4 py-2 rounded-lg transition-colors w-full md:w-auto justify-center"
              >
                {favorited ? <AiFillHeart size={24}/> : <AiOutlineHeart size={24}/>} 
                <span className="font-semibold">{favorited ? 'Liked' : 'Like'}</span>
              </button>
              <button
                onClick={() => triggerPopup("This feature is coming soon!")}
                className="flex items-center gap-2 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-300 px-4 py-2 rounded-lg transition-colors w-full md:w-auto justify-center"
              >
                <MdBookmarkAdd size={24}/>
                <span className="font-semibold">Watchlist</span>
              </button>
            </div>

            {/* New Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-8 border-t border-gray-700 pt-6">
              {/* Genres */}
              <div className="flex flex-col">
                <span className="text-gray-400 font-semibold">GENRES</span>
                <span className="text-lg">{movieDetails.genres.map(g => g.name).join(', ')}</span>
              </div>
              {/* Runtime */}
              <div className="flex flex-col">
                <span className="text-gray-400 font-semibold">RUNTIME</span>
                <span className="text-lg">{Math.floor(movieDetails.runtime/60)}h {movieDetails.runtime % 60}m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cast and Trailer */}
      <div className="md:m-10 m-4 md:mx-12">
        <div className="my-10">
          <h2 className="text-3xl font-bold text-white mb-4">Top Cast</h2>
          <CastList/>
        </div>

        <div className="my-10" ref={trailerRef}>
          <h2 className="text-3xl font-bold text-white mb-4">Official Trailer</h2>
          <MovieTrailer movieId={movieDetails.id} />
        </div>
      </div>
    </div>
    )
  }

export default MovieDetails;