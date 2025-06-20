import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//icons
import { SiGooglegemini } from "react-icons/si";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { toggleGPTSearch } from "../utils/redux/geminiSlice";
import { useEffect } from "react";
import frogNetflix from '../assets/images/frog-netflix.png';

const Body = () => {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)
  const handleGeminiSearch = () => {
      dispatch(toggleGPTSearch());
  }


  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center relative overflow-x-hidden">
      <div className="flex flex-col items-center justify-center text-white z-10 relative -mt-16">
        {/* Hero spotlight effect behind the image */}
        <div className="hero-spotlight"></div>
        <figure className="hero-img homepage mb-12 z-10">
          <img
            src={frogNetflix}
            alt="Frog in a suit watching Netflix"
            loading="lazy"
            className="w-full h-full object-cover block"
          />
        </figure>
        <h1 className="hero-heading max-w-5xl">Too Stupid to Choose a Show? Let AI Do It.</h1>
        <div className="flex max-md:flex-col gap-3 items-center justify-center pt-20 text-black font-semibold">
          <Link 
            to={user ? "/gptsearch" : "/login"} 
            onClick={handleGeminiSearch} 
            className="flex justify-center items-center gap-2 text-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 hover:from-blue-600 hover:to-purple-700 rounded-lg cta-glow font-bold shadow-lg"
          >
            <span className='text-2xl'><SiGooglegemini /></span>
            <span>Feed Me Content</span>
          </Link>  
        </div>
      </div>
    </div>
  )
}

export default Body;