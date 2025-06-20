import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { addUser, removeUser } from '../../utils/redux/userSlice';
import { toggleGPTSearch } from '../../utils/redux/geminiSlice';
import { LOGO } from '../../utils/constants';

// Icons
import { FaUserNinja } from 'react-icons/fa';
import { SiGooglegemini } from "react-icons/si";
import { IoMdOptions } from "react-icons/io";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const DarkPremiumHeader = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        if (window.location.pathname === '/login' || window.location.pathname === '/') {
          navigate('/gptsearch');
        }
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    setIsMenuOpen(false);
    signOut(auth).then(() => navigate('/login')).catch(() => navigate('/error'));
  };

  const handleGeminiSearch = () => {
    dispatch(toggleGPTSearch());
    navigate(user ? "/gptsearch" : "/login");
  };

  const handleSearch = () => navigate("/search");
  const handleMyLists = () => navigate("/mylists");

  return (
    <header className="fixed w-full z-50 transition-all duration-500 ease-out">
      {/* Dark Premium Mobile Header */}
      <div className={`
        md:hidden w-full px-4 py-3
        ${isScrolled 
          ? 'bg-gradient-to-b from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-b border-amber-500/30 shadow-2xl' 
          : 'bg-transparent'
        }
        transition-all duration-500 ease-out
      `}>
        <div className="flex items-center justify-between">
          {/* Premium Logo with Gold Accent */}
          <div className="relative group">
            <img 
              src={LOGO} 
              alt="cinematch-logo" 
              className="w-32 h-auto transition-all duration-300 group-hover:scale-105" 
              loading="eager"
            />
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 via-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Premium Action Buttons with Gradient Backgrounds */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleGeminiSearch}
              className="
                w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                border border-cyan-400/30 backdrop-blur-sm
                flex items-center justify-center text-cyan-300 hover:text-cyan-100
                transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25
                hover:border-cyan-400/50
              "
              aria-label="AI Search"
            >
              <SiGooglegemini className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleSearch}
              className="
                w-11 h-11 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20
                border border-amber-400/30 backdrop-blur-sm
                flex items-center justify-center text-amber-300 hover:text-amber-100
                transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/25
                hover:border-amber-400/50
              "
              aria-label="Search"
            >
              <IoSearch className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                w-11 h-11 rounded-full bg-gradient-to-br from-gray-500/20 to-gray-600/20
                border border-gray-400/30 backdrop-blur-sm
                flex items-center justify-center text-gray-300 hover:text-gray-100
                transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25
                hover:border-gray-400/50
              "
              aria-label="Menu"
            >
              <IoMdOptions className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Dark Premium Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black z-50 
          transform transition-all duration-500 ease-out
          ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          md:hidden
        `}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-pink-600/20 border border-red-400/30 flex items-center justify-center text-red-300 hover:text-red-100 transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaRegCircleXmark className="w-5 h-5" />
          </button>

          {/* Premium User Info with Gold Accent */}
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-amber-500/20">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-cyan-400 to-blue-500 flex items-center justify-center p-0.5">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <FaUserNinja className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{user.displayName}</h2>
                  <p className="text-sm text-amber-400 font-medium">Premium Member</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <FaUserNinja className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Guest</h2>
                  <p className="text-sm text-gray-400">Sign in for premium features</p>
                </div>
              </div>
            )}
          </div>

          {/* Premium Navigation with Gradient Borders */}
          <nav className="flex flex-col gap-4">
            <Link 
              className="
                p-4 rounded-xl bg-gradient-to-r from-gray-800/30 to-gray-700/30 
                border border-cyan-500/20 text-white hover:border-cyan-400/40
                transition-all duration-300 flex items-center justify-between
                hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50
              " 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-medium">Home</span>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            </Link>
            
            {user && (
              <Link 
                className="
                  p-4 rounded-xl bg-gradient-to-r from-gray-800/30 to-gray-700/30 
                  border border-amber-500/20 text-white hover:border-amber-400/40
                  transition-all duration-300 flex items-center justify-between
                  hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50
                " 
                to="/mylists" 
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-medium">My Lists</span>
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"></div>
              </Link>
            )}
          </nav>

          {/* Premium Sign Out Button with Gradient */}
          <div className="mt-auto mb-8">
            {user ? (
              <button
                onClick={handleSignOut}
                className="
                  w-full p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-600/20 
                  border border-red-400/30 text-white font-semibold 
                  hover:from-red-500/30 hover:to-pink-600/30 hover:border-red-400/50
                  transition-all duration-300
                "
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login" className="block">
                <button className="
                  w-full p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 
                  border border-cyan-400/30 text-white font-semibold 
                  hover:from-cyan-500/30 hover:to-blue-600/30 hover:border-cyan-400/50
                  transition-all duration-300
                ">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DarkPremiumHeader; 