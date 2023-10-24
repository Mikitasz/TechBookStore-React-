import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import upImg from "../assets/upImg.svg";
import downImg from "../assets/downImg.svg";
import { isUserLoggedIn } from "../services/IsAuth";
const Navbar = () => {
  const isLoggedIn = isUserLoggedIn();
  return (
    <header>
      <nav className="bg-white p-5">
        <div className="container  mx-auto flex justify-between items-center">
          {/* Left side (Logo and Company Name) */}
          <div className="transition transform hover:scale-110 ">
            <Link to={"/"} className="flex items-center">
              <img src="book.svg " alt="book" className="w-16 h-16" />
              <span className="text-black text-2xl font-regular">
                TechBookStore{" "}
              </span>
            </Link>
          </div>
          <div class="hidden md:flex space-x-9 text-base font-serif font-semibold">
            <Link to={"/"} className="text-black hover:text-gray-500">
              Home
            </Link>
            <Link to="#" className="text-black hover:text-gray-500">
              About
            </Link>
            <Link to="#" className="text-black hover:text-gray-500">
              Contact
            </Link>
          </div>
          <div class="flex space-x-9 text-lg font-regular font-serif">
            {isLoggedIn ? (
              <Link
                to="#"
                className="bg-white  hover:bg-slate-300 w-20 text-center text-black  rounded-bl-lg rounded-tr-lg relative "
              >
                Log Out
              </Link>
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
      <div class="pointer-events-none absolute top-[-50px] right-[-70px] ">
        <img src={upImg} alt="upimage" />
      </div>

      <div class="pointer-events-none absolute bottom-[-120px] left-0 ">
        <img src={downImg} alt="downimage" />
      </div>
    </header>
  );
};

export default Navbar;
