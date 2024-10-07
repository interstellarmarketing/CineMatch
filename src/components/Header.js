//components
import { FaUserNinja } from "react-icons/fa";
import { LOGO } from "../utils/constants";
import Nav from "./Nav"

//icons
import { MdDarkMode, MdLightMode  } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const Header = () => {
    const toggleGPT = false;
  return (
    <div className="absolute z-30 flex justify-between pl-16 pr-28 py-1 shadow-sm w-full bg-gradient-to-b from-black">
        <div>
            <img 
                src={LOGO}
                alt="flimnest-logo"
                className="w-48" 
            />
        </div>
        <div className="flex gap-10 items-center"> 
            <Nav />
           
            <div className="flex gap-10 w-77 items-center"> 
                <p className=" text-lg flex items-center gap-1 text-white font-semibold">
                    <span><FaUserNinja /></span>Sankar
                </p>
                <button className="cursor-pointer flex items-center bg-red-500 text-sm p-2 px-4 text-white font-semibold rounded-sm ">
                    Sign Out
                </button>
            </div>
        </div>
        
    </div>
  )
}

export default Header