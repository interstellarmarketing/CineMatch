//components
import Nav from "./Nav"

//Authentication
import { addUser, removeUser } from "../utils/redux/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";

//icons
import { FaUserNinja } from "react-icons/fa";
import { LOGO } from "../utils/constants";

//React
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
    const user = useSelector(store => store.user);
    const toggleGPT = useSelector(store => store.gemini.toggleState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
           if (user) {
             const {uid,email,displayName} = user;
             dispatch(addUser({uid: uid, email: email, displayName: displayName}));
             // Navigate only if the user is not already on a specific path
            if (window.location.pathname === "/login" || window.location.pathname === "/") {
                navigate("/browse");
            }
            else if (toggleGPT && window.location.pathname === "/login") {
                navigate("/gptsearch");
            }

           } else {
             dispatch(removeUser());
             navigate("/");
           }
         });
     
         return () => unsubscribe();
       }, []);


       const handleSignOut = () => {
        signOut(auth).then(() => {
          navigate("/login");
        }).catch((error) => {
          navigate("/error");
        });
      }


  return (
    <div className="">
        <div className="hidden absolute z-30 md:flex justify-between pl-16 pr-28 py-1 shadow-sm w-full bg-gradient-to-b from-black bg-opacity-0">
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
                    {user && <p className=" text-lg flex items-center gap-1 text-white font-semibold">
                        <span><FaUserNinja /></span>{user.displayName}
                    </p>}

                    {
                        user ? 
                            <>
                                <button onClick={handleSignOut} className="cursor-pointer flex items-center bg-sky-400 text-sm p-2 px-4 text-black font-semibold rounded-sm ">
                                    Sign Out
                                </button>
                            </> 
                            :
                            <>
                                <Link to="/login">
                                    <button className="cursor-pointer flex items-center bg-sky-400 text-sm p-2 px-4 text-black font-semibold rounded-sm ">
                                        Sign In
                                    </button>
                                </Link>
                            </>
                    }
                    
                </div>
        </div>

        </div>

        <div className="flex absolute md:hidden bg-gray-900 z-30 w-full">
            <div>
                <img 
                    src={LOGO}
                    alt="flimnest-logo"
                    className="w-44" 
                />
            </div>
        </div>
        
        
    </div>
  )
}

export default Header