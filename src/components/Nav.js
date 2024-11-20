//icons
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
    const toggleGPT = false;
    const user = useSelector(store => store.user);
  return (
    <div className="flex justify-between items-center gap-10 text-white">
        <div className="cursor-pointer ">

            
                <Link to={ user ? "/gptsearch" : "/login"} className='flex justify-center items-center gap-1 text-sm font-semibold p-2 text-white border border-white hover:bg-white hover:text-black rounded-sm'
                
                >
                    {toggleGPT ? (<><span className='text-lg'><IoMdHome  /></span> Home Page</>) : (<><span className='text-lg'><IoSearch /></span> GPT Search</>)}
                </Link>
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