import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GOOGLE_URL, IMDB_URL, IMG_CDN_URL, NETWORK_LOGO, PROD_LOGO, SERIES_BANNER } from "../../utils/constants";
import { TbActivity } from "react-icons/tb";
import starRating from "../../utils/starRating";
import CastList from "./CastList";
import { useEffect, useRef, useState } from "react";
import usePreferences from "../../hooks/usePreferences";
import { useContext } from "react";
import { PreferencesContext } from "../../App";
import { selectAllFavorites } from "../../utils/redux/preferencesSlice";
import WhereToWatch from "../WhereToWatch";
import BackToSearchButton from "../BackToSearchButton";

//icons
import { FaGlobe } from "react-icons/fa";
import { LiaImdb } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { IoPlayOutline } from "react-icons/io5";
import { MdBookmarkAdd } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import genreIcons from "../../utils/genreIcons";
import useSeriesDetails from "../../hooks/Series/useSeriesDetails";
import useTVCastDetails from "../../hooks/Series/useTVCastDetails";
import SeriesTrailer from "./SeriesTrailer";
import DetailsShimmer from "../Shimmer/DetailsShimmer";
import ShowMoreText from "../ShowMoreText";

const SeriesDetails = () => {
    const { movId } = useParams();
    const favorites = useSelector(selectAllFavorites);
    const { toggleFavorite } = useContext(PreferencesContext);

    const [loading, setLoading] = useState(true);
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const triggerPopup = (message) => {
      setPopupMessage(message);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    };

    const trailerRef = useRef(null);
  
    useEffect(() => {
      window.scrollTo(0, 0);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    },[]);

    useSeriesDetails(movId);
    useTVCastDetails(movId);

    const seriesDetails = useSelector((store) => store.details.seriesDetails);

    if (!seriesDetails) return <DetailsShimmer />;

    const favorited = favorites.some(item => item.id === seriesDetails.id);

    if (loading) return <DetailsShimmer />;

    return (
      <div className="pt-16 bg-black text-white">
        {showPopup && (
          <div className="popup-message fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md z-50">
            {popupMessage}
          </div>
        )}
        
        {/* Main backdrop and series info */}
        <div className="w-full">
          {/* Backdrop Image */}
          <div className="relative w-full md:h-[550px] h-auto">
            <img
              src={seriesDetails.backdrop_path ? IMG_CDN_URL + seriesDetails.backdrop_path : (seriesDetails.poster_path ? IMG_CDN_URL + seriesDetails.poster_path : SERIES_BANNER)}
              alt={seriesDetails.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            {/* Back Button */}
            <div className="absolute top-4 left-4 z-10">
              <BackToSearchButton />
            </div>
          </div>

          {/* Series Details Section */}
          <div className="flex flex-col md:flex-row gap-8 md:m-10 m-4 md:mx-12">
            {/* Left side: Poster */}
            <div className="hidden md:block md:w-1/4">
              <img 
                src={seriesDetails.poster_path ? IMG_CDN_URL +  seriesDetails.poster_path : SERIES_BANNER} 
                alt={seriesDetails.name} 
                className="w-full rounded-xl shadow-lg"
              />
            </div>
            
            {/* Right side: Info */}
            <div className="md:w-3/4 flex flex-col">
              {/* Rating and other info */}
              <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-lg mb-2">
                <span className="flex items-center gap-1">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" alt="IMDb" className="w-8 h-8" /> 
                  <span className="font-bold text-yellow-400">{seriesDetails.vote_average.toFixed(1)}</span>
                   <span className="text-gray-400 text-sm">({seriesDetails.vote_count.toLocaleString()})</span>
                </span>
                <span>•</span>
                <span className="font-semibold">{new Date(seriesDetails.first_air_date).getFullYear()}</span>
              </div>

              {/* Title and Tagline */}
              <h1 className="text-4xl md:text-5xl font-bold">{seriesDetails.name}</h1>
              
              {/* Overview */}
              <div className="my-4">
                <ShowMoreText text={seriesDetails.overview} textSize="text-base"/>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-start items-start gap-4 mb-6">
                <button
                  onClick={() => toggleFavorite(seriesDetails)}
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
              
              <WhereToWatch mediaType="tv" mediaId={seriesDetails.id} title={seriesDetails.name} />

              {/* New Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-8 border-t border-gray-700 pt-6">
                  {/* Genres */}
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-semibold">GENRES</span>
                    <span className="text-lg">{seriesDetails.genres.map(g => g.name).join(', ')}</span>
                  </div>
                  {/* Seasons */}
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-semibold">SEASONS</span>
                    <span className="text-lg">{seriesDetails.number_of_seasons}</span>
                  </div>
                  {/* Episodes */}
                  <div className="flex flex-col">
                    <span className="text-gray-400 font-semibold">EPISODES</span>
                    <span className="text-lg">{seriesDetails.number_of_episodes}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:m-10 m-4 md:mx-12">
          <div className="my-10">
            <h2 className="text-3xl font-bold text-white mb-4">Top Cast</h2>
            <CastList/>
          </div>

          <div className="my-10" ref={trailerRef}>
            <h2 className="text-3xl font-bold text-white mb-4">Official Trailer</h2>
            <SeriesTrailer movieId={seriesDetails.id} />
          </div>
        </div>
      </div>
    )
}

export default SeriesDetails;