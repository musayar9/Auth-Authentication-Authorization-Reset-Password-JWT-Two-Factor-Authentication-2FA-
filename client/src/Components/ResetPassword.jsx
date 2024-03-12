import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoInformationOutline } from "react-icons/io5";
import ErrorMessage from "../utils/ErrorMessage";
import {Helmet} from "react-helmet"
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        setError(false);
        setErrorMessage("");

        setIsLoading(false);
      }
    }, 4000);
  }, [error]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(false);
      const res = await axios.post(`/api/reset-password`, {
        headers: { "Content-Type": "application/json" },
        email,
      });
      setIsLoading(false);
      const data = res.data;
      setSendMessage(res.data.message);
      if (res.status !== 200) {
        setError(true);
        setIsLoading(false);
        setErrorMessage("Something went wrong");
      }

  
      return data;
    } catch (error) {
      setError(true);
      setErrorMessage(error.response.data.message, error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name="description" content="Reset Password" />
      </Helmet>

      <div className="mx-auto max-w-md mt-24 gap-4 p-4">
        {sendMessage && (
          <div className="bg-[#007bff] text-gray-50 p-2 rounded-md">
            <p className="flex  items-center justify-center ">
              {" "}
              <IoInformationOutline className="text-xl" />{" "}
              <span className="text-sm">{sendMessage}</span>
            </p>
          </div>
        )}
        <div className="flex flex-col items-center my-8 ">
          <h2 className="text-3xl font-bold text-slate-700">Password Reset</h2>
          <p className="mt-3 text-sm text-center text-slate-600">
            We need your email address so we can send you the password reset
            link.
          </p>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleResetPassword}>
          <div className="relative ">
            <input
              type="text"
              id="otp"
              className="block px-2.5 pb-2.5 pt-4 w-full  text-sm
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Enter Your Email
            </label>
          </div>

          <button
            type="submit"
            className="bg-emerald-600 hover:opacity-80 text-gray-50 text-sm rounded-md py-2"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div role="status">
                  <div>
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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

                <p className="text-xs">Email Sending</p>
              </div>
            ) : (
              <>Send Email</>
            )}
          </button>
        </form>

        <Link to="/sign-in">
          <button className="bg-slate-600 my-4 w-full hover:opacity-80 text-gray-50 rounded-md text-sm py-2">
            Return SignIn
          </button>
        </Link>

        <div className="text-center">
          <p className="text-slate-600 text-xs p-1">
            Remember to check your spam folder or unblock
            softwarebkm@outlook.com if you can not find the message.
          </p>
        </div>

        {error && <ErrorMessage message={errorMessage} />}
      </div>
    </>
  );
};

export default ResetPassword;
