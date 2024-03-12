import { Link, useNavigate } from "react-router-dom";
import loginSvg from "../assets/login.svg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/userSlice";
import OAuth from "./OAuth";
import ErrorMessage from "../utils/ErrorMessage";
import {Helmet} from "react-helmet"
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, userStatus } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signIn(formData));
  };

  useEffect(() => {
    if (user && user?.response?.data?.statusCode !== 400) {
      if (!user.verified) {
        navigate(`/verify-otp/${user?._id}`);
      } else {
        navigate("/");
      }
    } else {
      setErrorMessage(user?.response?.data?.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    }
  }, [user]);

  {
    userStatus === "failed" && <ErrorMessage message={errorMessage} />;
  }

  return (
    <>
      <Helmet>
        <title>Sing In</title>
        <meta name="description" content="Sing In" />
      </Helmet>

      <div className="mx-auto max-w-md p-2 my-8 ">
        <div className="flex items-center justify-center flex-col">
          <img
            src={loginSvg}
            className="shadow-lg drop-shadow-lg h-40 w-40 bg-emerald-400 p-5 rounded-full"
            alt="login"
          />
          <h1 className="text-3xl font-semibold my-8 text-slate-600">
            Sign In
          </h1>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="relative ">
            <input
              type="email"
              id="email"
              className="block px-2.5 pb-2.5 pt-4 w-full  text-sm
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              type={showPassword ? "text" : "password"}
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full  text-sm
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Password
            </label>
          </div>

          <div className="text-sm  flex items-center pl-2 gap-2">
            <input
              className="border border-slate-500 outline-none text-emerald-600 rounded-sm focus:border-emerald-500"
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <span className="text-slate-600">Show Password</span>
          </div>

          <button
            type="submit"
            className="bg-emerald-600 text-white p-2 hover:translate-y-1 rounded-md shadow-md"
          >
            {userStatus === "loading" ? (
              <div className="flex items-center justify-center gap-2">
                <div role="status">
                  <div>
                    <svg
                      aria-hidden="true"
                      className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>

                <p className="text-xs">Loading</p>
              </div>
            ) : (
              <>SignIn</>
            )}
          </button>
        </form>

        <div className="flex justify-between my-2">
          <Link
            to="/reset-password"
            className=" text-xs text-blue-600 pl-2 underline hover:text-blue-700 "
          >
            Forget Password?
          </Link>
          <p className="text-xs text-slate-500">
            Do You Have An Account?{" "}
            <Link to="/sign-up" className="text-blue-600 underline pr-2">
              Sign Up
            </Link>
          </p>
        </div>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <div className="flex  items-center gap-2 mt-2">
          <span className="border border-slate-400 flex-1  w-full"></span>
          <p className="text-slate-800 text-sm">Or</p>
          <span className="border border-slate-400 w-full flex-1"></span>
        </div>
        <OAuth />
      </div>
    </>
  );
};

export default SignIn;
