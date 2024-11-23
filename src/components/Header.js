import React, { useEffect, useState } from 'react';
import Nav from './Nav';

// Authentication
import { addUser, removeUser } from '../utils/redux/userSlice';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';

// Icons
import { FaUserNinja } from 'react-icons/fa';
import { AI_SEARCH_LOGO, LOGO } from '../utils/constants';
import { SiGooglegemini } from "react-icons/si";
import { IoMdOptions } from "react-icons/io";
import { FaRegCircleXmark } from "react-icons/fa6";

// React Router
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toggleGPTSearch } from '../utils/redux/geminiSlice';

const Header = () => {
  const user = useSelector((store) => store.user);
  const toggleGPT = useSelector((store) => store.gemini.toggleState);
  const toggleGemini = useSelector((store) => store.gemini.toggleGemini);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current path

  // State to track the scroll position
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Trigger when scrolled more than 50px
      } else {
        setIsScrolled(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        if (toggleGPT && window.location.pathname === '/login') {
          navigate('/gptsearch');
        } else if (window.location.pathname === '/login' || window.location.pathname === '/') {
          navigate('/browse');
        }
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    setIsMenuOpen(false);
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        navigate('/error');
      });
  };

  const handleGeminiSearch = () => {
    dispatch(toggleGPTSearch());
    if (user) {
        navigate("/gptsearch");
    } else {
        navigate("/login");
    }
};


  // Helper function to determine active link
  const isActive = (path) => (location.pathname === path ? 'text-sky-500 font-bold' : 'text-black');

  return (
    <div>
      {/* Desktop Header */}
      <div
        className={`hidden fixed z-50 md:flex justify-between pl-16 pr-28 py-1 w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-gradient-to-b from-gray-900 to-sky-900 bg-opacity-85'
            : 'bg-gradient-to-b from-transparent to-transparent bg-opacity-0'
        }`}
      >
        <div>
          <img src={LOGO} alt="flimnest-logo" className="w-48" />
        </div>
        <div className="flex gap-10 items-center">
          <Nav />
          <div className="flex gap-10 w-77 items-center">
            {user ? (
              <p className="text-lg flex items-center gap-1 text-white font-semibold">
                <span>
                  <FaUserNinja />
                </span>
                {user.displayName || "User"}
              </p>
            ) : (
              <p className="text-lg flex items-center gap-1 text-white font-semibold">
                <span>
                  <FaUserNinja />
                </span>
                Guest
              </p>
            )}
            {user ? (
              <>
                <button
                  onClick={handleSignOut}
                  className="cursor-pointer flex items-center bg-sky-400 text-sm p-2 px-4 text-black font-semibold rounded-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="cursor-pointer flex items-center bg-sky-400 text-sm p-2 px-4 text-black font-semibold rounded-sm">
                    Sign In
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={`flex fixed justify-between md:hidden from-gray-900 to-sky-900 bg-opacity-85 z-50 w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-gradient-to-b rom-gray-900 to-sky-900 bg-opacity-85 shadow-sm'
            : 'bg-gradient-to-b from-transparent to-transparent bg-opacity-0'
        }`}
      >
        <div className='flex gap-[100px] justify-between items-center'>
          <div className=''>
            <img src={LOGO} alt="flimnest-logo" className="w-40" />
          </div>
          <div className='flex items-center gap-4'>
            <div className='text-white text text-4xl' onClick={handleGeminiSearch}>
              <SiGooglegemini/>
            </div>
            <div className='text-white text text-4xl' onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <IoMdOptions />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-2/4 h-full bg-white z-50 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col pt-[80px] h-full space-y-1">
          <button
            className='absolute top-0 right-0 p-3 m-3 mr-5'
            onClick={() => setIsMenuOpen(false)}
          >
            <FaRegCircleXmark className='w-8 h-8 p-1 text-black ' />
          </button>
          {user ? (
            <div className='px-4 text-xl flex text-blue-500 items-center'>
              <span className='px-1'><FaUserNinja /></span>
              <span className='px-1 font-bold flex items-center justify-center'>{user.displayName}</span>
            </div>
          ) : (
            <div className='px-4 text-lg flex items-center'>
              <span className='px-1'><FaUserNinja /></span>
              <span className='px-1 font-bold flex items-center justify-center'>Guest</span>
            </div>
          )}
          <Link className={`px-4 pt-3 text-lg font-semibold ${isActive('/')}`} to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link className={`px-4 pt-3 text-lg font-semibold ${isActive('/categories')}`} to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link>
          <Link className={`px-4 pt-3 text-lg font-semibold ${isActive('/shows')}`} to="/shows" onClick={() => setIsMenuOpen(false)}>TV Shows</Link>
          <Link className={`px-4 pt-3 text-lg font-semibold ${isActive('/anime')}`} to="/anime" onClick={() => setIsMenuOpen(false)}>Anime</Link>
          <Link className={`px-4 pt-3 text-lg font-semibold ${isActive('/about')}`} to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          {location.pathname !== "/gptsearch" && <>
                <div className="cursor-pointer bg-black px-4" onClick={handleGeminiSearch}>
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
            </div>
            </>
            }
          <div className='px-4 pt-56'>
            {user ? (
                  <>
                    <button
                      onClick={handleSignOut}
                      className="cursor-pointer flex items-center bg-sky-400 text-sm p-2 px-4 text-black font-semibold rounded-sm"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <button className="cursor-pointer flex items-center bg-sky-400 text-sm p-2 px-4 text-black font-semibold rounded-sm">
                        Sign In
                      </button>
                    </Link>
                  </>
                )}
                <div className='pt-3'>
                  <h1 className='text-lg font-semibold text-gray-500'>Movies are Soul.</h1>
                  <h1 className='text-lg font-semibold text-gray-500'>© {new Date().getFullYear()} Flimnest.</h1>
                </div>
                
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Header;
