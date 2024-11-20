//icons
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleGPTSearch } from "../utils/redux/geminiSlice";

const Nav = () => {
    const dispatch = useDispatch();

    const toggleGPT = useSelector(store => store.gemini.toggleState);
    console.log(toggleGPT);

    const handleGeminiSearch = () => {
        dispatch(toggleGPTSearch());
    }
    
  return (
    <div className="flex justify-between items-center gap-10 text-white">
        <div className="cursor-pointer ">

        <button className='flex justify-center items-center gap-1 text-sm font-semibold p-2 m-4 text-white border border-white hover:bg-white hover:text-black rounded-sm'
            onClick={handleGeminiSearch}
        >
          {toggleGPT ? (<><span className='text-lg'><IoMdHome  /></span> Home Page</>) : (<><span className='text-lg'><IoSearch /></span> GPT Search</>)}
        </button>
                
        </div>
        <div className="cursor-pointer">
            Categories
        </div>

        <div className="cursor-pointer">
            TV Shows
        </div>

        <div className="cursor-pointer">
            Anime
        </div>

        <div className="cursor-pointer">
            About
        </div>
    </div>
  )
}

export default Nav;