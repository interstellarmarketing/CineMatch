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

const GlassmorphismHeader = () => {
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
          navigate('/');
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
      {/* Glassmorphism Mobile Header */}
      <div className={`
        md:hidden w-full px-4 py-3
        ${isScrolled 
          ? 'bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl' 
          : 'bg-transparent'
        }
        transition-all duration-500 ease-out
      `}>
        <div className="flex items-center justify-between">
          {/* Logo with glow effect */}
          <div className="relative group">
            <img 
              src={LOGO} 
              alt="cinematch-logo" 
              className="w-32 h-auto transition-all duration-300 group-hover:scale-105" 
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Floating action buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleGeminiSearch}
              className="
                w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                flex items-center justify-center text-white hover:text-cyan-300
                transition-all duration-300 hover:scale-110 hover:bg-white/20
                hover:shadow-lg hover:shadow-cyan-500/25
              "
              aria-label="AI Search"
            >
              <SiGooglegemini className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleSearch}
              className="
                w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                flex items-center justify-center text-white hover:text-cyan-300
                transition-all duration-300 hover:scale-110 hover:bg-white/20
                hover:shadow-lg hover:shadow-cyan-500/25
              "
              aria-label="Search"
            >
              <IoSearch className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                flex items-center justify-center text-white hover:text-cyan-300
                transition-all duration-300 hover:scale-110 hover:bg-white/20
                hover:shadow-lg hover:shadow-cyan-500/25
              "
              aria-label="Menu"
            >
              <IoMdOptions className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Glassmorphism Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 w-full h-full bg-black/80 backdrop-blur-2xl z-50 
          transform transition-all duration-500 ease-out
          ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          md:hidden
        `}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:text-cyan-300 transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaRegCircleXmark className="w-5 h-5" />
          </button>

          {/* User info with glassmorphism */}
          <div className="mb-8 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            {user ? (
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <FaUserNinja className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{user.displayName}</p>
                  <p className="text-sm text-white/70">Premium Member</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <FaUserNinja className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Guest</p>
                  <p className="text-sm text-white/70">Sign in for premium features</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation with glassmorphism cards */}
          <nav className="flex flex-col gap-3">
            <Link 
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-between" 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg font-medium">Home</span>
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            </Link>
            
            {user && (
              <Link 
                className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-between" 
                to="/mylists" 
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-lg font-medium">My Lists</span>
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              </Link>
            )}
          </nav>

          {/* Sign out button with glassmorphism */}
          <div className="mt-auto mb-8">
            {user ? (
              <button
                onClick={handleSignOut}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-500/30 text-white font-semibold hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login" className="block">
                <button className="w-full p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 text-white font-semibold hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300">
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

export default GlassmorphismHeader; 