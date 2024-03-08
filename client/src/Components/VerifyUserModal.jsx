import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
const VerifyUserModal = ({
  openModal,
  setOpenModal,
  information,
  setCloseInformation,
  closeInformation,
  setErrorStatus,
  setErrorStatusMessage,
  setWarning,
}) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClose = async () => {
    try {
      const res = await axios.delete(
        `/api/users/deleteVerifyUser/${information.status._id}`
      );
      const data = await res.data;
      setOpenModal(false);
      setCloseInformation(!closeInformation);
      setWarning(data.message);
    } catch (error) {
      setErrorStatus(true);
      setErrorStatusMessage(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(false);
      const res = await axios.put(`/api/users/verifyUserOtp/`, { otp });
      const data = res.data;
      setLoading(false);
      setOpenModal(false);
      setCloseInformation(false);
      console.log(res);
      if (data.verifyAccount) {
        navigate(`/sign-in`);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.response.data.message);
    }
  };



  return (
    <Modal show={openModal} onClose={handleClose}>
      <Modal.Header>Verify User</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            A verification code has been sent to your email.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                htmlFor="text"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter Your Otp Code
              </label>
            </div>

            <button
              type="submit"
              className="bg-emerald-600 hover:opacity-80 text-gray-50 text-sm rounded-md py-2"
            >
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
                <>Send Code</>
              )}
            </button>
          </form>

          {error && (
            <div className="bg-red-600 text-white rounded-md p-4">
              <p className="text-md font-semibold">{errorMessage}</p>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="" color="gray" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

VerifyUserModal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  information: PropTypes.object,
  setCloseInformation: PropTypes.func,
  closeInformation: PropTypes.bool,
  setErrorStatus: PropTypes.func,
  setErrorStatusMessage: PropTypes.func,
  setWarning: PropTypes.func,
};

export default VerifyUserModal;
