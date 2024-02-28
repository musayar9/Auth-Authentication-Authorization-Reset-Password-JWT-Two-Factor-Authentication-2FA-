import Home from "./Components/Home";
import Navbar from "./Components/Navbar"
import {Routes, Route} from "react-router-dom"
import Profile from "./Components/Profile";
import About from "./Components/About";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import VerifyOtp from "./Components/VerifyOtp";
import ResetPassword from "./Components/ResetPassword";

const App = () => {
  return (
    <>
      <Navbar />
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>

    </>
  );
}

export default App
