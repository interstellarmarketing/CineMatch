import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//icons
import { SiGooglegemini } from "react-icons/si";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { toggleGPTSearch } from "../utils/redux/geminiSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { addUser } from "../utils/redux/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(store => store.user);
  const toggleGPT = useSelector(store => store.gemini.toggleState);
  const handleGeminiSearch = () => {
      dispatch(toggleGPTSearch());
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
       if (user) {
         const {uid,email,displayName} = user;
         dispatch(addUser({uid: uid, email: email, displayName: displayName}));
         // Navigate only if the user is not already on a specific path
         if (toggleGPT) {
          navigate("/gptsearch");
        }
      }
     });
 
     return () => unsubscribe();
   }, []);
  

  return (
    <div className="bg-gray-800" >
        <div className="relative flex ">
          <img src="https://utfs.io/f/0Gl64F1LqW8ASxldPqUfmCFVWPrR6B3Dn9yoKa2jLgY0Sexd  " className="w-full h-screen object-cover" alt="Home Page" />
        </div>

        <div className="absolute inset-0 -top-24 flex flex-col items-center justify-center text-white">
          <h1 className="text-xl md:text-4xl text-center font-bold">Discover Hidden Gems and Blockbusters Made for You!</h1>
          <div className="flex max-md:flex-col gap-3 items-center justify-center pt-3 text-black font-semibold">
            <Link to={ user ? "/gptsearch" : "/login"} onClick={handleGeminiSearch} className="flex justify-center items-center gap-1 text-xl bg-white py-2 px-4 hover:bg-sky-400  hover:text-black rounded-sm"><span className='text-xl'><SiGooglegemini /></span><span>Gemini Search</span></Link>  
            <Link to="/browse" className=" flex items-centert text-xl text-white py-2 px-4 hover:bg-white hover:text-sky-400 rounded-sm">Browse<span className="text-3xl"><MdKeyboardDoubleArrowRight /></span></Link>  
          </div>

        </div>
        
    </div>
  )
}

export default Body;