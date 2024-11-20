//icons
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleGPTSearch } from "../utils/redux/geminiSlice";
import { useNavigate } from "react-router-dom";


const Nav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleGPT = useSelector(store => store.gemini.toggleState);
    const user = useSelector(store => store.user);

    const handleGeminiSearch = () => {
        dispatch(toggleGPTSearch());
        if (user) {
            navigate("/gptsearch");
        }else {
            navigate("/login");
        }
    }

    const handleHomePage = () => {
        dispatch(toggleGPTSearch());
        navigate("/");
    }

    const handleAboutPage = () => {
        navigate("/about");
    }

    const handleAnimePage = () => {
        navigate("/anime");
    }

    const handleTVPage = () => {
        navigate("/shows");
    }

  return (
    <div className="flex justify-between items-center gap-10 text-white">
        <div className="cursor-pointer ">
        {user && (
            toggleGPT ? (
                <button
                    className="flex w-[120px] justify-center items-center gap-1 text-sm font-semibold p-2 m-4 text-white border border-white hover:bg-white hover:text-black rounded-sm"
                    onClick={handleHomePage}
                >
                <span className="text-lg"><IoMdHome /></span> Home Page
                </button>
            ) : (
                <button
                    className="flex w-[120px] justify-center items-center gap-1 text-sm font-semibold p-2 m-4 text-white border border-white hover:bg-white hover:text-black rounded-sm"
                    onClick={handleGeminiSearch}
                >
                <span className="text-lg"><IoSearch /></span> Gemini
                </button>
            )
        )}

        
                
        </div>
        <div className="cursor-pointer">
            Categories
        </div>

        <div className="cursor-pointer" onClick={handleTVPage}>
            TV Shows
        </div>

        <div className="cursor-pointer" onClick={handleAnimePage}>
            Anime
        </div>

        <div className="cursor-pointer" onClick={handleAboutPage}>
            About
        </div>
    </div>
  )
}

export default Nav;