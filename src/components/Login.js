import { useRef, useState } from "react";
import { COVER_IMAGE } from "../utils/constants"
import { validateEmail, validateFullName, validatePassword } from "../utils/validateForms";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/redux/userSlice";

const Login = () => {

  const [isSignUp, setIsSignUp] = useState(false)
  const [emailErrMsg, setEmailErrMsg] = useState(null);
  const [passwordErrMsg, setPasswordErrMsg] = useState(null);
  const [fullNameErrMsg, setFullNameErrMsg] = useState(null);

  const dispatch = useDispatch();


  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const toggleSignUpForm = () => {
    setIsSignUp(!isSignUp)
  }

  const handleButtonClick = () => {
    // validate email and password
    const emailErr = validateEmail(email.current.value);
    setEmailErrMsg(emailErr);

    const passwordErr = validatePassword(password.current.value);
    setPasswordErrMsg(passwordErr);

    const fullNameErr = isSignUp && validateFullName(fullName.current.value)
    setFullNameErrMsg(fullNameErr);

    // if (emailErr ===null || passwordErr === null || fullNameErr === null) return; // if error end the code here


    // procede if no errors to sign up or sign in
    if(isSignUp){
      //Sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value,fullName.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            const {uid,email,displayName} = auth.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName})); 
          }).catch((error) => {
            
          });
        })

        .catch((error) => {
          const errorCode = error.code; 
          const errorMessage = error.message;
          setPasswordErrMsg(errorCode+" "+errorMessage)
        });

    }else{
      //signin logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setPasswordErrMsg(errorCode+" "+errorMessage)
      });
      
    }

  }

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
      <div className="absolute top-0 bottom-0 left-0 right-0 w-4/12 mx-auto my-36 text-white ">
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

            <button className="bg-sky-400 p-2 m-2 mt-4 rounded-md text-black" onClick={handleButtonClick}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </button> 

            <p className="m-2 text-gray-300">{isSignUp ? "Already Registered?" : "New to Filmnest?"} <span 
                  className="cursor-pointer font-bold text-white" onClick={toggleSignUpForm}>{isSignUp ? "Sign In" : "Sign Up"}
                </span>
            </p>
        </form>
      </div>
    </div>
    
  )
}

export default Login