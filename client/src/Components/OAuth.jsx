import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
const OAuth = () => {
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
