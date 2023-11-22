import React from "react";
import { Link } from "react-router-dom";
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
      <nav className="bg-white p-5 border-b-2 border-gray-200 shadow-md font-body">
        <div className="container mx-auto flex justify-between items-center">
          <div className="transition transform hover:rotate-3 hover:scale-110 hover:text-glow">
            <Link to={"/"} className="flex items-center">
              <img
                src="book.svg"
                alt="book"
                className="w-16 h-16"
                title="TechBookStore"
              />
              <span className="text-black text-3xl font-semibold">
                TechBookStore
              </span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-9 text-base  font-semibold font-body">
            {isLoggedIn && (
              <Link
                to={"/search"}
                className="text-black hover:text-gray-500 transition duration-300 "
              >
                Search
              </Link>
            )}
            <Link
              to="/about"
              className="text-black hover:text-gray-500 transition duration-300"
            >
              About
            </Link>
         
          </div>
          <div className="flex space-x-9 text-lg font-regular font-serif font-body">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="bg-white hover:bg-slate-300 w-20 text-center text-black rounded-lg"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="bg-blue-500 text-white hover:bg-blue-700 w-20 text-center rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 text-white hover:bg-blue-700 w-20 text-center rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white hover:bg-blue-700 w-20 text-center rounded-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
