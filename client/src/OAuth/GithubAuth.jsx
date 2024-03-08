import { FaGithub } from "react-icons/fa";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { OAuthentication } from "../redux/userSlice";
import PropTypes from "prop-types";
const GithubAuth = ({ setError, setErrorMessage }) => {
  const authGithub = getAuth(app);


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


      await dispatch(OAuthentication(data));
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

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
    </>
  );
};
GithubAuth.propTypes = {
  setError: PropTypes.func,
  setErrorMessage: PropTypes.func,
};

export default GithubAuth;
