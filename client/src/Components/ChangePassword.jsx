import { IoMdEyeOff } from "react-icons/io";
const ChangePassword = () => {
  return (
    <div className="mx-auto max-w-md mt-24 p-4">
      <div className="flex items-center justify-center flex-col my-6">
        <h3 className="text-3xl font-bold text-slate-700">Password Reset</h3>
        <p className="text-sm text-slate-600">
          {" "}
          Password must contain at least 6 characters
        </p>
      </div>
      <form className="flex gap-4 flex-col flex-1">
        <div className="relative ">
          <input
            type="text"
            id="otp"
            className="block px-2.5 pb-2.5 pt-4 w-full  text-sm
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            New Password
          </label>
        </div>

        <div className="relative ">
          <div className="relative">
            <div className="absolute inset-y-0 end-0 flex items-center pr-3.5 pointer-events-none">
            
              <IoMdEyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="otp"
              className="block px-2.5 pb-2.5 pt-4 w-full  text-sm pr-10
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
          </div>

          <label
            htmlFor="email"
            className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            New Password Confirm
          </label>
        </div>

        <button className="bg-emerald-600 hover:opacity-80 p-2 text-sm text-white rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
