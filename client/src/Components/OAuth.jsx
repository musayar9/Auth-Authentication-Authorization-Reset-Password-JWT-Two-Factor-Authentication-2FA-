import { FcGoogle } from "react-icons/fc";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";

import { useState } from "react";
import GithubAuth from "../OAuth/GithubAuth";
import { OAuthentication } from "../redux/userSlice";
const OAuth = () => {
  const authGoogle = getAuth(app);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(authGoogle, provider);
      console.log("googleAuth", resultsFromGoogle);
      const data = {
        username: resultsFromGoogle._tokenResponse.firstName,
        surname: resultsFromGoogle._tokenResponse.lastName,
        email: resultsFromGoogle.user.email,
        profilePicture: resultsFromGoogle.user.photoURL,
      };
      
      await dispatch(OAuthentication(data))
      

    } catch (error) {
      setError(true);
      setErrorMessage(error)
    }
  };

  return (
    <div className="mt-4 flex  items-center justify-center gap-4 flex-row md:flex-col">
      <button
        onClick={handleClick}
        className="group  
      hover:bg-gray-400 duration-200 ease-linear flex-1 border md:w-full border-slate-400  gap-2 flex items-center justify-center rounded-md p-2"
      >
        <FcGoogle size={30} />
        <span className="text-slate-600 font-semibold group-hover:text-gray-50">
          Google
        </span>
      </button>

      <GithubAuth />

      {error && (
        <div className="bg-red-500 text-white rounded-md p-4">
          <p className="text-md font-semibold">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default OAuth;
