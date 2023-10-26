import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import upImg from "../assets/upImg.svg";
import downImg from "../assets/downImg.svg";
import { isUserLoggedIn } from "../services/IsAuth";
import Cookies from "js-cookie";
import { logoutUser } from "../services/API/LogOutApi";
const Navbar = () => {
  const isLoggedIn = isUserLoggedIn();

  const handleLogoutClick = async () => {
    try {
      await logoutUser();

      Cookies.remove("token");

      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header>
      <nav className="bg-white p-5">
        <div className="container  mx-auto flex justify-between items-center">
          <div className="transition transform hover:scale-110 ">
            <Link to={"/"} className="flex items-center">
              <img src="book.svg " alt="book" className="w-16 h-16" />
              <span className="text-black text-2xl font-regular">
                TechBookStore{" "}
              </span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-9 text-base font-serif font-semibold">
            {isLoggedIn ? (
              <>
                <Link to={"/"} className="text-black hover:text-gray-500">
                  Home
                </Link>
              </>
            ) : (
              <></> 
            )}

            <Link to="#" className="text-black hover:text-gray-500">
              About
            </Link>
            <Link to="#" className="text-black hover:text-gray-500">
              Contact
            </Link>
          </div>
          <div className="flex space-x-9 text-lg font-regular font-serif">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogoutClick}
                  to="#"
                  className="bg-white  hover:bg-slate-300 w-20 text-center text-black  rounded-bl-lg rounded-tr-lg relative "
                >
                  Log Out
                </button>
                <Link
                  to="/profile"
                  className="bg-white  hover:bg-slate-300 w-20 text-center text-black  rounded-bl-lg rounded-tr-lg relative "
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white  hover:bg-slate-300 w-20 text-center text-black  rounded-bl-lg rounded-tr-lg relative "
                >
                  Log In
                </Link>
                <Link
                  Link
                  to="/signup"
                  className="bg-white hover:bg-slate-300 w-20 text-center text-black  rounded-bl-lg rounded-tr-lg relative"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="pointer-events-none absolute top-[-50px] right-[-70px] z-1" >
        <img src={upImg} alt="upimage" />
      </div>

      <div className="pointer-events-none absolute bottom-[-120px] left-0 z-1" >
        <img src={downImg} alt="downimage" />
      </div>
    </header>
  );
};

export default Navbar;
