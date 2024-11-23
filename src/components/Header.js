import React, { useEffect, useState } from 'react';
import Nav from './Nav';

// Authentication
import { addUser, removeUser } from '../utils/redux/userSlice';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';

// Icons
import { FaUserNinja } from 'react-icons/fa';
import { LOGO } from '../utils/constants';

// React
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const user = useSelector((store) => store.user);
  const toggleGPT = useSelector((store) => store.gemini.toggleState);
  const toggleGemini = useSelector((store) => store.gemini.toggleGemini);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to track the scroll position
  const [isScrolled, setIsScrolled] = useState(false);

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
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        navigate('/error');
      });
  };

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
            {user && (
              <p className="text-lg flex items-center gap-1 text-white font-semibold">
                <span>
                  <FaUserNinja />
                </span>
                {user.displayName}
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
        className={`flex absolute md:hidden bg-gray-900 z-30 w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-gradient-to-b from-black to-black bg-opacity-80 shadow-sm'
            : 'bg-gradient-to-b from-transparent to-transparent bg-opacity-0'
        }`}
      >
        <div>
          <img src={LOGO} alt="flimnest-logo" className="w-44" />
        </div>
      </div>
    </div>
  );
};

export default Header;
