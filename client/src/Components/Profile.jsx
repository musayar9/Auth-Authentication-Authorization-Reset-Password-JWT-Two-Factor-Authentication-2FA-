import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../redux/userSlice";
import ErrorMessage from "../utils/ErrorMessage";
import { Helmet } from "react-helmet";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
const Profile = () => {
  const { user, userStatus } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");
  const [information, setInformation] = useState("");
  const [formData, setFormData] = useState({
    username: user?.username,
    surname: user?.surname,
    email: user?.email,
    password: user?.password,
    profilePicture: user.profilePicture,
  });

  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);

  const imageRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user?.response?.data?.statusCode == 400) {
      setErrorMessage(user?.response?.data?.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }, [user]);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadImage = uploadBytesResumable(storageRef, image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const loading = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(loading));
      },
      (error) => {
        setImageError(true), setErrorMessage(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(user?._id));
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: user?._id, formData }));
    setInformation("User successfully updated");
    setTimeout(() => {
      setInformation(null);
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Profile" />
      </Helmet>

      <div className="relative">
        <div className=" bg-emerald-600 p-8   w-full ">
          <div className="flex items-center justify-center">
            <form className="flex flex-col gap-4  absolute top-5 p-1">
              <input
                type="file"
                ref={imageRef}
                hidden
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <img
                className="border border-zinc-200 shadow-md p-1 rounded-full h-24 w-24 self-center object-cover"
                src={formData.profilePicture}
                onClick={() => imageRef.current.click()}
                alt="profile"
              />

              <p className="text-sm self-center -mt-3">
                {imageError ? (
                  <span className="text-red-700">
                    Error uploading image (file size must be less than 2 MB)
                  </span>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
                ) : imagePercent === 100 ? (
                  <span className="text-green-700">
                    Image uploaded successfully
                  </span>
                ) : (
                  ""
                )}
              </p>
            </form>
          </div>
        </div>

        <div className="mx-auto max-w-md p-2">
          <div className="flex items-center justify-center flex-col mt-12">
            <h1 className="text-3xl font-semibold text-slate-600 my-8">
              Profile
            </h1>
          </div>

          <form className="flex flex-col gap-2" onSubmit={handleUpdateUser}>
            <div className="flex  justify-between flex-col md:flex-row gap-2">
              <div className="relative ">
                <input
                  type="text"
                  id="username"
                  className="flex px-2.5 pb-2.5 pt-4 w-full md:w-52  text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  name="username"
                  defaultValue={user?.username}
                  onChange={handleChange}
                />
                <label
                  htmlFor="username"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Username
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="surname"
                  className="flex px-2.5 pb-2.5 pt-4 w-full md:w-52  text-sm 
  text-gray-900 bg-transparent rounded-md border-1 border-gray-300 appearance-none dark:text-white
  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  name="surname"
                  defaultValue={user?.surname}
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
                  defaultValue={user?.email}
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

            <button
              type="submit"
              className="bg-emerald-600 rounded-md p-2 text-white hover:bg-emerald-700 hover:translate-y-1 duration-150 ease-in"
            >
              <>Update</>
            </button>
          </form>

          <div className="flex justify-end my-2">
            <button
              onClick={handleDeleteUser}
              className="text-red-600 hover:opacity-75 hover:underline"
            >
              Delete Account
            </button>
          </div>

          {userStatus === "loading" && (
            <div className="text-orange-400 rounded-md p-2 ">
              <p className="text-white text-2xl"> User is delete...</p>
            </div>
          )}
          {userStatus === "failed" && (
            <ErrorMessage message={"something went wrong"} />
          )}

          {errorMessage && <ErrorMessage message={errorMessage} />}
          {information && (
            <div className="text-emerald-700 ">
              <p>{information}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
