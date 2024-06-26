import Otp from "../assets/otp.svg";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateVerify } from "../redux/userSlice";
import ErrorMessage from "../utils/ErrorMessage";
import { MdError } from "react-icons/md";
import {Helmet} from "react-helmet"
const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp !== "") {
      dispatch(updateVerify({ id, otp: otp }));
    } else {
      setErrorMessage("opt is required");
    }
  };

  useEffect(() => {
    if (user?._id === undefined) {
      setErrorStatus(true);
      return;
    }

    if (user?.verified) {
      navigate("/");
    }
  });

  if (errorStatus) {
    return <div className="flex  items-center justify-center my-10">
    <MdError/>
    <p className="text-3xl font-bold text-red-700 ">Something Went Wrong</p>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Verify Otp</title>
        <meta name="description" content="Verify Otp" />
      </Helmet>

      <div className="mx-auto max-w-md mt-24">
        <div className="flex flex-col items-center justify-center ">
          <img
            src={Otp}
            className="shadow-lg drop-shadow-lg h-40 w-40 bg-emerald-400 p-5 rounded-full"
            alt="verify-otp"
          />
          <div className="flex flex-col items-center my-8">
            <h1 className="font-semibold text-2xl">
              Two Factor Authentication
            </h1>
            <p className="text-sm text-slate-600 tracking-widest text-center">
              6-digit verification code has been sent to your email. Check your
              email.
            </p>
          </div>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="relative ">
            <input
              type="text"
              id="otp"
              className="block px-2.5 pb-2.5 pt-4 w-full  text-sm
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              value={otp.trim()}
              onChange={(e) => setOtp(e.target.value)}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Two Factor Authentication
            </label>
          </div>
          <button
            type="submit"
            className="bg-emerald-600 text-white p-2 rounded-md"
          >
            Send Verify
          </button>
        </form>

        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    </>
  );
};

export default VerifyOtp;
