import { IoMdEyeOff } from "react-icons/io";
import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
const ChangePassword = () => {
  const { id, token } = useParams();

  const [password, setPassword] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });
  // const [newPassword, setNewPassword] = useState("")
  // const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [newPasswordType, setNewPasswordType] = useState(false);
  const [newPasswordConfirmType, setNewPasswordConfirmType] = useState(false);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await axios.get(`/api/reset-password/${id}/token/${token}`);
        const data = await res.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUrl();
  }, [id, token]);

  const handleChangePassword = (e) => {
    const { name, value } = e.target;

    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/reset-password/${id}/token/${token}`, {
        newPassword: password.newPassword,
        newPasswordConfirm: password.newPasswordConfirm,
      });
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error, "change password");
    }
  };

  return (
    <div className="mx-auto max-w-md mt-24 p-4">
      <div className="flex items-center justify-center flex-col my-6">
        <h3 className="text-3xl font-bold text-slate-700">Password Reset</h3>
        <p className="text-sm text-slate-600">
          {" "}
          Password must contain at least 6 characters
        </p>
      </div>
      <form className="flex gap-4 flex-col flex-1 " onSubmit={handleSubmit}>
        <div className="relative ">
          <div className="relative">
            <button
              type="button"
              onClick={() => setNewPasswordType(!newPasswordType)}
              className="absolute inset-y-0 end-0 flex items-center pr-3.5 pointer-events-auto"
            >
              {newPasswordType ? (
                <FaEye className="w-5 h-5 text-gray-800 dark:text-gray-400" />
              ) : (
                <IoMdEyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
            <input
              type={newPasswordType ? "text" : "password"}
              id="newPassword"
              className="flex px-2.5 pb-2.5 pt-4 w-full  text-sm pr-10
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              name="newPassword"
              value={password.newPassword}
              onChange={handleChangePassword}
            />
          </div>

          <label
            htmlFor="email"
            className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            New Password
          </label>
        </div>

        <div className="relative ">
          <div className="relative">
            <button
              type="button"
              onClick={() => setNewPasswordConfirmType(!newPasswordConfirmType)}
              className="absolute inset-y-0 end-0 flex items-center pr-3.5 pointer-events-auto"
            >
              {newPasswordConfirmType ? (
                <FaEye className="w-5 h-5 text-gray-800 dark:text-gray-400" />
              ) : (
                <IoMdEyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
            <input
              type={newPasswordConfirmType ? "text" : "password"}
              id="newPasswordConfirm"
              className="block px-2.5 pb-2.5 pt-4 w-full  text-sm pr-10
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
              name="newPasswordConfirm"
              value={password.newPasswordConfirm}
              onChange={handleChangePassword}
            />
          </div>

          <label
            htmlFor="email"
            className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            New Password Confirm
          </label>
        </div>

        <button
          type="submit"
          className="bg-emerald-600 hover:opacity-80 p-2 text-sm text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;