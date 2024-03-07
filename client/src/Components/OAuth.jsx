import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

import { useDispatch, useSelector } from "react-redux";
import { githubAuth } from "../redux/userSlice";

const OAuth = () => {
  const authGithub = getAuth(app);
const {user} = useSelector((state)=>state.user)


  const dispatch = useDispatch();
  const handleClick = async () => {
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGithub = await signInWithPopup(authGithub, provider);
      const displayName = resultsFromGithub.user.displayName;

      const userName = displayName.split(" ");
      const data = ({
        username: userName[0],
        surname: userName[1],
        email: resultsFromGithub.user.email,
      });

      await dispatch(githubAuth(data));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="mt-4 flex  items-center justify-center gap-4 flex-row md:flex-col">
      <button
        className="group  
      hover:bg-gray-400 duration-200 ease-linear flex-1 border md:w-full border-slate-400  gap-2 flex items-center justify-center rounded-md p-2"
      >
        <FcGoogle size={30} />
        <span className="text-slate-600 font-semibold group-hover:text-gray-50">
          Google
        </span>
      </button>
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
    </div>
  );
};

export default OAuth;
