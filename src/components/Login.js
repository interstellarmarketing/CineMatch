import { useRef, useState } from "react";
import { COVER_IMAGE } from "../utils/constants"
import { validateEmail, validateFullName, validatePassword } from "../utils/validateForms";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState(null);
  const [passwordErrMsg, setPasswordErrMsg] = useState(null);
  const [fullNameErrMsg, setFullNameErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const toggleSignUpForm = () => {
    setIsSignUp(!isSignUp);
    // Clear error messages when toggling
    setEmailErrMsg(null);
    setPasswordErrMsg(null);
    setFullNameErrMsg(null);
  };

  const handleButtonClick = async () => {
    // Clear previous error messages
    setEmailErrMsg(null);
    setPasswordErrMsg(null);
    setFullNameErrMsg(null);

    // Validate inputs
    const emailErr = validateEmail(email.current.value);
    const passwordErr = validatePassword(password.current.value);
    const fullNameErr = isSignUp ? validateFullName(fullName.current.value) : null;

    if (emailErr) setEmailErrMsg(emailErr);
    if (passwordErr) setPasswordErrMsg(passwordErr);
    if (fullNameErr) setFullNameErrMsg(fullNameErr);

    if (emailErr || passwordErr || (isSignUp && fullNameErr)) return;

    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign up logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: fullName.current.value,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        });

        const { uid, email: userEmail, displayName } = auth.currentUser;
        dispatch(addUser({ uid, email: userEmail, displayName }));
      } else {
        // Sign in logic
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        
        const { uid, email: userEmail, displayName } = userCredential.user;
        dispatch(addUser({ uid, email: userEmail, displayName }));
      }
      
      navigate('/browse');
    } catch (error) {
      console.error("Authentication error:", error);
      setPasswordErrMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Background Image */}
      <div className="w-full h-screen">
        <img 
          src={COVER_IMAGE}
          alt="Netflix Cover"
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Login Form */}
      <div className="absolute top-0 bottom-0 left-0 right-0 mx-2 md:w-4/12 md:mx-auto my-36 text-white rounded-sm">
        <form className="w-full flex p-6 sm:p-12 flex-col bg-black bg-opacity-65" onSubmit={(event) => event.preventDefault()}>
            <h1 className="font-bold text-3xl m-2 mb-4">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h1>

            {isSignUp && 
              <input 
                ref={fullName}
                type="text" 
                placeholder="Full Name"
                className="p-2 m-2 text-black bg-gray-300 rounded-md "/>}
            
            {isSignUp && <p className="text-red-500 font-semibold m-2 mt-1">{fullNameErrMsg}</p>}

            <input
              ref={email} 
              type="text" 
              placeholder="Email" 
              className="p-2 m-2 mt-1 text-black bg-gray-300 rounded-md"
            />
            <p className="text-red-500 font-semibold m-2 mt-1">{emailErrMsg}</p>

            <input 
              ref={password}
              type="password" 
              placeholder="Password"  
              className="p-2 m-2 mt-1 text-black bg-gray-300 rounded-md" 
            />
            <p className="text-red-500 font-semibold m-2">{passwordErrMsg}</p>

            <button 
              className={`bg-sky-400 p-2 m-2 mt-4 rounded-md text-black ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={handleButtonClick}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : (isSignUp ? "Sign Up" : "Sign In")}
            </button> 

            <p className="m-2 text-gray-300">
              {isSignUp ? "Already Registered?" : "New to CineMatch?"} 
              <span 
                className="cursor-pointer font-bold text-white" 
                onClick={toggleSignUpForm}
              >
                {isSignUp ? " Sign In" : " Sign Up"}
              </span>
            </p>
        </form>
      </div>
    </div>
  );
};

export default Login;