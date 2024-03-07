import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/userSlice";
import { Dropdown, Avatar } from "flowbite-react";
// import { getAuth } from "firebase/auth";
// import { app } from "../firebase";
const Navbar = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const authGithub = getAuth(app);
  const handleSignOut = () => {
    dispatch(signOut(user._id));

    navigate("/sign-in");
    // authGithub.signOut().then(
    //   function () {
    //     console.log("Signout successful!");
    //   },
    //   function (error) {
    //     console.log("Signout failed", error);
    //   }
    // );
  };

  if (loading === "loading") {
    <p>logging out...</p>;
  }

  return (
    <nav className="bg-white dark:bg-gray-900   z-20 top-0 start-0  border-b border-gray-300 dark:border-gray-600 shadow ">
      <div className="max-w-6xl flex flex-wrap items-center justify-between mx-auto p-3">
        <h2 className="text-lg md:text-xl font-bold text-slate-600 ">
          Auth <span className="text-emerald-500 font-bold">OTP-JWT</span>
        </h2>
        <div className="flex gap-2 font-semibold text-md self-center pr-16 ">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? "text-teal-600  " : "text-[#334155] ";
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => {
              return isActive ? "text-teal-600  " : "text-[#334155] ";
            }}
          >
            About
          </NavLink>

          {user && user?.verified && (
            <NavLink
              to="/profile"
              className={({ isActive }) => {
                return isActive ? "text-teal-600   " : "text-[#334155] ";
              }}
            >
              Profile
            </NavLink>
          )}
        </div>
        <div className=" ">
          {/* <button className="px-2   rounded-md">
            <Link className="">Register</Link>
          </button> */}

          {user && user.verified ? (
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="user" rounded />}
              >
                <Dropdown.Header>
                  <span className="block text-sm text-blue-500">
                    @{user?.username} {user.surname}
                  </span>
                </Dropdown.Header>
                <Link to="/profile">
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
              </Dropdown>
            </>
          ) : (
            <>
              <button className="bg-emerald-500 px-4 py-1 text-white rounded-sm hover:scale-110 duration-150 ease-linear hover:bg-emerald-600 ">
                <Link to="/sign-in">Sign In</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
