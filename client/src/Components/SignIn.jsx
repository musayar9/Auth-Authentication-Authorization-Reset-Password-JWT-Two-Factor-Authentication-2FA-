import { Link } from "react-router-dom";
import loginSvg from "../assets/login.svg";

const SignIn = () => {
  return (
    <div className="mx-auto max-w-md p-2 mt-12 ">
      <div className="flex items-center justify-center flex-col">
        <img
          src={loginSvg}
          className="shadow-lg drop-shadow-lg h-40 w-40 bg-emerald-400 p-5 rounded-full"
          alt="login"
        />
        <h1 className="text-3xl font-semibold my-8 text-slate-600">Sign In</h1>
      </div>

      <form className="flex flex-col gap-2">
        <div className="relative ">
          <input
            type="text"
            id="email"
            className="block px-2.5 pb-2.5 pt-4 w-full  text-sm
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            E-mail
          </label>
        </div>

        <div className="relative ">
          <input
            type="password"
            id="password"
            className="block px-2.5 pb-2.5 pt-4 w-full  text-sm
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Password
          </label>
        </div>
      </form>

      <div className="flex justify-between my-2">
        <Link
          to="/reset-password"
          className=" text-xs text-blue-600 pl-2 underline hover:text-blue-700 "
        >
          Forgot Password?
        </Link>
        <p className="text-xs text-slate-500">
          Do You Have An Account?{" "}
          <Link to="/sign-up" className="text-blue-600 underline pr-2">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
