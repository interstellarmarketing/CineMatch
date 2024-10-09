//components
import { FaUserNinja } from "react-icons/fa";
import { LOGO } from "../utils/constants";
import Nav from "./Nav"
import { Link } from "react-router-dom";

const Header = () => {
    const signIn = false;
  return (
    <div className="absolute z-30 flex justify-between pl-16 pr-28 py-1 shadow-sm w-full bg-gradient-to-b from-black bg-opacity-0">
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
                {signIn && <p className=" text-lg flex items-center gap-1 text-white font-semibold">
                    <span><FaUserNinja /></span>Sankar
                </p>}
                <Link to="/login">
                <button className="cursor-pointer flex items-center bg-sky-400 text-sm p-2 px-4 text-black font-semibold rounded-sm ">
                    {signIn ? <>Sign Out </>: <>Sign In</>}
                </button>
                </Link>
            </div>
        </div>
        
    </div>
  )
}

export default Header