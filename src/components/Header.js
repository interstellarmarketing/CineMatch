//components
import { FaUserNinja } from "react-icons/fa";
import { LOGO } from "../utils/constants";
import Nav from "./Nav"
import { Link, useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";

const Header = () => {
    const user = useSelector(store => store.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
           if (user) {
             const {uid,email,displayName} = user;
             dispatch(addUser({uid: uid, email: email, displayName: displayName}));
             navigate("/browse");
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
  )
}

export default Header