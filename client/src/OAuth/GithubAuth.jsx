import { FaGithub } from "react-icons/fa";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { githubAuth } from "../redux/userSlice";
import { useState } from "react";
const GithubAuth = () => {
  const authGithub = getAuth(app);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const handleClick = async () => {
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      let displayName;
      const resultsFromGithub = await signInWithPopup(authGithub, provider);
      if (resultsFromGithub.user.displayName === null) {
        displayName = resultsFromGithub._tokenResponse.displayName;
      } else {
        displayName = resultsFromGithub.user.displayName;
      }

      const userName = displayName.split(" ");
      const data = {
        username: userName[0],
        surname: userName[1],
        email: resultsFromGithub.user.email,
        profilePicture: resultsFromGithub.user.photoURL,
      };
      console.log(resultsFromGithub);

      await dispatch(githubAuth(data));
    } catch (error) {
      setError(true);
      setErrorMessage(error);
    }
  };
  console.log(errorMessage)

  return (
    <>
      <button
        onClick={handleClick}
        className="group  
      hover:bg-gray-400 duration-200 ease-linear flex-1 border md:w-full border-slate-400  gap-2 flex items-center justify-center rounded-md p-2"
      >
        <FaGithub size={30} />
        <span className="text-slate-600 font-semibold group-hover:text-gray-50">
          Github
        </span>
      </button>

      {error && (
        <div className="bg-red-500 text-white rounded-md p-4">
          <p className="text-md font-semibold">{errorMessage}</p>
        </div>
      )}
    </>
  );
};

export default GithubAuth;
