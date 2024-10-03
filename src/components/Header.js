//components
import Nav from "./Nav"

//icons
import { MdDarkMode, MdLightMode  } from "react-icons/md";

const Header = () => {
  return (
    <div className="flex justify-between pl-5 pr-10 py-1 border-b-2 shadow-sm ">
        <div>
            <img 
                src="https://i.ibb.co/xgWPhvW/flimnest-logo.png"
                alt="flimnest-logo"
                className="w-48" 
            />
        </div>
        <div className="flex justify-between items-center">
            <Nav />
            <div className="ml-4 text-xl cursor-pointer flex items-center">
                <MdDarkMode />      
            </div>
        </div>
        
    </div>
  )
}

export default Header