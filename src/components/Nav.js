import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleGPTSearch } from "../utils/redux/geminiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { AI_SEARCH_LOGO } from "../utils/constants";

const Nav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
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

    const handleCategories = () => {
        navigate("/categories");
    };

    const handleTVPage = () => {
        navigate("/shows");
    };

    const handleBrowsePage = () => {
        navigate("/browse");
    };

    const handleSearch = () => {
        navigate("/search");
    };

    // Helper function to check if the current path is active
    const isActive = (path) => location.pathname === path;

    // Active tab styling
    const activeStyles = "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white hover:text-black";

    return (
        <nav className="hidden md:flex items-center gap-6 text-white">
            {location.pathname !== "/gptsearch" && user && (
                <button 
                    onClick={handleGeminiSearch}
                    className="focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-sm"
                >
                    <img 
                        src={AI_SEARCH_LOGO}
                        alt="AI Search"
                        className="w-32 lg:w-44"
                    />
                </button>
            )}
            
            <div className="flex items-center gap-4">
                <button
                    onClick={handleHomePage}
                    className={`min-h-[44px] px-4 rounded-sm transition-all duration-300 ${
                        isActive("/") ? activeStyles : "text-white hover:text-sky-400"
                    }`}
                >
                    Home
                </button>

                {/* Hidden navigation tabs
                <button
                    onClick={handleCategories}
                    className={`min-h-[44px] px-4 rounded-sm transition-all duration-300 ${
                        isActive("/categories") ? activeStyles : "text-white hover:text-sky-400"
                    }`}
                >
                    Categories
                </button>

                <button
                    onClick={handleTVPage}
                    className={`min-h-[44px] px-4 rounded-sm transition-all duration-300 ${
                        isActive("/shows") ? activeStyles : "text-white hover:text-sky-400"
                    }`}
                >
                    TV Shows
                </button>

                <button
                    onClick={handleBrowsePage}
                    className={`min-h-[44px] px-4 rounded-sm transition-all duration-300 ${
                        isActive("/browse") ? activeStyles : "text-white hover:text-sky-400"
                    }`}
                >
                    Movies
                </button>
                */}

                <button
                    onClick={handleSearch}
                    className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-sm transition-all duration-300 ${
                        isActive("/search") ? activeStyles : "text-white hover:text-sky-400"
                    }`}
                    aria-label="Search"
                >
                    <IoSearch className="text-xl" />
                </button>
            </div>
        </nav>
    );
};

export default Nav;
