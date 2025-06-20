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

const MinimalistLuxuryHeader = () => {
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
    <header className="fixed w-full z-50 transition-all duration-700 ease-out">
      {/* Minimalist Luxury Mobile Header */}
      <div className={`
        md:hidden w-full px-6 py-4
        ${isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
        }
        transition-all duration-700 ease-out
      `}>
        <div className="flex items-center justify-between">
          {/* Premium Logo Treatment */}
          <div className="relative group">
            <img 
              src={LOGO} 
              alt="cinematch-logo" 
              className="w-28 h-auto transition-all duration-500 group-hover:opacity-80" 
              loading="eager"
            />
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full"></div>
          </div>

          {/* Minimalist Action Buttons */}
          <div className="flex items-center gap-6">
            <button 
              onClick={handleGeminiSearch}
              className="
                relative text-white/90 hover:text-cyan-400 transition-all duration-300
                after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300
                hover:after:w-full
              "
              aria-label="AI Search"
            >
              <SiGooglegemini className="w-6 h-6" />
            </button>
            
            <button 
              onClick={handleSearch}
              className="
                relative text-white/90 hover:text-cyan-400 transition-all duration-300
                after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300
                hover:after:w-full
              "
              aria-label="Search"
            >
              <IoSearch className="w-6 h-6" />
            </button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                relative text-white/90 hover:text-cyan-400 transition-all duration-300
                after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300
                hover:after:w-full
              "
              aria-label="Menu"
            >
              <IoMdOptions className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Minimalist Luxury Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 w-full h-full bg-black/98 backdrop-blur-2xl z-50 
          transform transition-all duration-700 ease-out
          ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          md:hidden
        `}
      >
        <div className="flex flex-col h-full pt-28 px-8">
          <button
            className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaRegCircleXmark className="w-7 h-7" />
          </button>

          {/* Premium User Info */}
          <div className="mb-12">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <FaUserNinja className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-light text-white tracking-wide">{user.displayName}</h2>
                  <p className="text-sm text-white/60 tracking-wider uppercase">Premium Member</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <FaUserNinja className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-light text-white tracking-wide">Guest</h2>
                  <p className="text-sm text-white/60 tracking-wider uppercase">Sign in for premium features</p>
                </div>
              </div>
            )}
          </div>

          {/* Minimalist Navigation */}
          <nav className="flex flex-col gap-6">
            <Link 
              className="
                text-xl font-light text-white/80 hover:text-white transition-all duration-300
                relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300
                hover:after:w-full py-2
              " 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {user && (
              <Link 
                className="
                  text-xl font-light text-white/80 hover:text-white transition-all duration-300
                  relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300
                  hover:after:w-full py-2
                " 
                to="/mylists" 
                onClick={() => setIsMenuOpen(false)}
              >
                My Lists
              </Link>
            )}
          </nav>

          {/* Premium Sign Out Button */}
          <div className="mt-auto mb-12">
            {user ? (
              <button
                onClick={handleSignOut}
                className="
                  w-full py-4 text-lg font-light text-white/90 hover:text-white
                  border border-white/20 hover:border-white/40 transition-all duration-300
                  relative overflow-hidden group
                "
              >
                <span className="relative z-10">Sign Out</span>
                <div className="absolute inset-0 bg-white/5 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            ) : (
              <Link to="/login" className="block">
                <button className="
                  w-full py-4 text-lg font-light text-white/90 hover:text-white
                  border border-white/20 hover:border-white/40 transition-all duration-300
                  relative overflow-hidden group
                ">
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-white/5 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MinimalistLuxuryHeader; 