import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RegisterSvg from "../assets/signUp.svg";
import axios from "axios";
import OAuth from "./OAuth";
import VerifyUserModal from "./VerifyUserModal";
import { IoIosMail } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    surname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [information, setInformation] = useState(null);
  const [closeInformation, setCloseInformation] = useState(false);
  const [warning, setWarning] = useState(null);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
        setLoading(false);
      }, 3000);
    }

    if (warning !== null) {
      setTimeout(() => {
        setWarning(null);
      }, 3000);
    }
  }, [error, warning]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);
      const res = await axios.post("/api/users/signup", {
        headers: { "Content-Type": "application/json" },
        formData,
      });
      setLoading(false);

      if (res.status !== 201) {
        setError(true);
        setErrorMessage(res.data.message);
      }

      const data = await res.data;
      setInformation(data);
      setCloseInformation(true);
      setOpenModal(true);
      setFormData({ username: "", surname: "", email: "", password: "" });

      return data;
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-md p-2 my-8">
        <div className="flex items-center justify-center flex-col mt-5">
          <img
            src={RegisterSvg}
            className="shadow-lg drop-shadow-lg h-40 w-40 bg-emerald-400 p-5 rounded-full"
            alt="login"
          />
          <h1 className="text-3xl font-semibold text-slate-600 my-8">
            Sign Up
          </h1>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex  justify-between flex-col md:flex-row gap-2  ">
            <div className="relative">
              <input
                type="text"
                id="username"
                className="block px-2.5 pb-2.5 pt-4 w-full md:w-52 text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                placeholder=" "
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Username
              </label>
            </div>
            <div className="relative ">
              <input
                type="text"
                id="surname"
                className="block px-2.5 pb-2.5 pt-4 w-full md:w-52  text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                placeholder=" "
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
              <label
                htmlFor="surname"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Surname
              </label>
            </div>
          </div>

          <div className="flex  flex-col gap-2">
            <div className="relative">
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

            <div className="relative">
              <input
                type="password"
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
          </div>

          <button className="bg-emerald-600 rounded-md p-2 text-white hover:bg-emerald-700 hover:translate-y-1 duration-150 ease-in">
            {loading ? (
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

                <p>Loading</p>
              </div>
            ) : (
              <>Sign Up</>
            )}
          </button>
        </form>

        <div className="text-xs my-2 flex justify-end pr-2 gap-2">
          Have An Account?
          <Link
            to="/sign-in"
            className="text-blue-600 underline hover:text-blue-700"
          >
            Sing In
          </Link>
        </div>

        {closeInformation && (
          <div className="bg-sky-800 rounded-md flex flex-col  p-4">
            <div className="flex justify-end -mt-2 -mr-2">
              <button
                className="text-gray-50 hover:text-red-500"
                onClick={() => {
                  setCloseInformation(!closeInformation);
                  setInformation(null);
                }}
              >
                <IoCloseCircleSharp />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <IoIosMail className="text-gray-50" />
              <p className="text-wrap text-xs text-gray-50">
                {information.message}
              </p>
            </div>
          </div>
        )}

        {warning && (
          <div className="bg-orange-500 text-white rounded-md gap-2 p-3 flex items-center">
            <IoIosWarning />
            <p className="text-xs font-semibold">{warning}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500 text-white rounded-md p-4">
            <p className="text-md font-semibold">{errorMessage}</p>
          </div>
        )}

        <div className="flex  items-center gap-2 mt-2">
          <span className="border border-slate-400 flex-1  w-full"></span>
          <p className="text-slate-800 text-sm">Or</p>
          <span className="border border-slate-400 w-full flex-1"></span>
        </div>
        <OAuth />
      </div>

      <VerifyUserModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        information={information}
        closeInformation={closeInformation}
        setCloseInformation={setCloseInformation}
        setErrorStatus={setError}
        setErrorStatusMessage={setErrorMessage}
        setWarning={setWarning}
      />
    </>
  );
};

export default SignUp;
