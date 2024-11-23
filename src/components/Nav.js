import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleGPTSearch } from "../utils/redux/geminiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { AI_SEARCH_LOGO } from "../utils/constants";

const Nav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location (path)

    const toggleGPT = useSelector(store => store.gemini.toggleState);
    const user = useSelector(store => store.user);

    const handleGeminiSearch = () => {
        dispatch(toggleGPTSearch());
        if (user) {
            navigate("/gptsearch");
        } else {
            navigate("/login");
        }
    };

    const handleHomePage = () => {
        dispatch(toggleGPTSearch());
        navigate("/");
    };

    const handleAboutPage = () => {
        navigate("/about");
    };

    const handleAnimePage = () => {
        navigate("/anime");
    };

    const handleTVPage = () => {
        navigate("/shows");
    };

    const handleCategories = () => {
        navigate("/categories");
    };

    // Helper function to check if the current path is active
    const isActive = (path) => location.pathname === path;

    // Active tab styling
    const activeStyles = "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white hover:text-black";

    return (
        <div className="flex justify-between items-center gap-6 text-white">
            {location.pathname !== "/gptsearch" && <>
                <div className="cursor-pointer" onClick={handleGeminiSearch}>
                    {
                        user && <>
                            <div>
                                <img src={AI_SEARCH_LOGO}
                                    alt="Flimnest Logo"
                                    className="w-44"
                                />
                            </div>
                        </>
                    }
                
                {/* {user && (
                    toggleGPT ? (
                        <button
                            className={`flex w-[120px] justify-center items-center gap-1 text-sm font-semibold p-2 m-4 ${isActive("/") ? `${activeStyles}` : "text-white"} border border-white hover:bg-white hover:text-black rounded-sm transition-all ease-in-out duration-300`}
                            onClick={handleHomePage}
                        >
                            <span className="text-lg"><IoMdHome /></span> Home Page
                        </button>
                    ) : (
                        <button
                            className={`flex w-[120px] justify-center items-center gap-1 text-sm font-semibold p-2 m-4 ${isActive("/gptsearch") ? `${activeStyles}` : "text-white"} border border-white hover:bg-white hover:text-black rounded-sm transition-all ease-in-out duration-300`}
                            onClick={handleGeminiSearch}
                        >
                            <span className="text-lg"><IoSearch /></span> Gemini
                        </button>
                    )
                )} */}

            </div>
            </>
            }
                
            
            <div className={`cursor-pointer ${isActive("/") ? `${activeStyles}` : "text-white"} py-1 px-2 hover:text-sky-400 rounded-sm transition-all ease-in-out duration-300`} onClick={handleHomePage}>
                Home
            </div>

            <div className={`cursor-pointer ${isActive("/categories") ? `${activeStyles}` : "text-white"} py-1 px-2 hover:text-sky-400 rounded-sm transition-all ease-in-out duration-300`} onClick={handleCategories}>
                Categories
            </div>

            <div className={`cursor-pointer ${isActive("/shows") ? `${activeStyles}` : "text-white"} py-1 px-2 hover:text-sky-400 rounded-sm transition-all ease-in-out duration-300`} onClick={handleTVPage}>
                TV Shows
            </div>

            <div className={`cursor-pointer ${isActive("/anime") ? `${activeStyles}` : "text-white"} py-1 px-2 hover:text-sky-400 rounded-sm transition-all ease-in-out duration-300`} onClick={handleAnimePage}>
                Anime
            </div>

            <div className={`cursor-pointer ${isActive("/about") ? `${activeStyles}` : "text-white"} py-1 px-2 hover:text-sky-400 rounded-sm transition-all ease-in-out duration-300`} onClick={handleAboutPage}>
                About
            </div>
        </div>
    );
};

export default Nav;
