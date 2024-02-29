import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux"
const Navbar = () => {
const {user} = useSelector((state)=>state.user)
 
  return (
    <nav className="bg-white dark:bg-gray-900   z-20 top-0 start-0  border-b border-gray-300 dark:border-gray-600 shadow ">
      <div className="max-w-6xl flex flex-wrap items-center justify-between mx-auto p-3">
        <h2 className="text-lg md:text-xl font-bold text-slate-600 ">
          Auth <span className="text-emerald-500 font-bold">OTP</span>
        </h2>
        <div className="flex gap-2 font-semibold text-md ">
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

          {user && user.verified && (
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
        <div className="font-semibold text-sm md:text-md bg-white px-4 py-2 border border-gray-300 rounded-sm shadow-md ">
          {/* <button className="px-2   rounded-md">
            <Link className="">Register</Link>
          </button> */}

          {user && user?.verified ? (
            <>
              <button>
                <NavLink
                  to="/sign-in"
                  className={({ isActive }) => {
                    return isActive
                      ? "text-teal-600    "
                      : "text-[#334155] hover:text-teal-600 ";
                  }}
                >
                  Sign Out
                </NavLink>
              </button>
            </>
          ) : (
            <>
              <button>
                <NavLink
                  to="/sign-in"
                  className={({ isActive }) => {
                    return isActive
                      ? "text-teal-600    "
                      : "text-[#334155] hover:text-teal-600 ";
                  }}
                >
                  Sign İn
                </NavLink>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
