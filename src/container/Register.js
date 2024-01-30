import React, { useState, useEffect } from "react";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineGlobal,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/images/login/login.jpg";
import RegisterImage from "../assets/images/register/register.jpg";
import Logo from "../assets/images/logo.png";

const Register = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to update the window dimensions
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    // Add an event listener to update dimensions when the window is resized
    window.addEventListener("resize", updateWindowDimensions);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, [windowWidth, windowHeight]);
  
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover relative"
      style={{ backgroundImage: `url(${RegisterImage})` }}
    >
      {/* right half with background image */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-black p-4 mx-auto">
        <div className="text-center mb-4">
          <img
            src={Logo}
            alt="Logo"
            height={30}
            width={130}
            className="mx-auto cursor-pointer"
            onClick={()=>navigate("/")}
          />
          <p className="text-white text-5xl pb-2 leading-tight">
            Welcome to BET3WEB
          </p>
          <p className="text-white">
            Sit iste delectus iure animi facere. Est veritatis illo officia.
          </p>
        </div>

        {/* First Row: Username and Email */}
        <div className="grid gap-4 xl:grid-cols-2 mx-auto">
          {/* Username */}
          <div className={`flex flex-col ${windowWidth === 425 ? "ml-5":windowWidth === 1024 ? "ml-14":""}`}>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[#b5b5b5] pb-2"
            >
              Username <span className="text-red-700">*</span>
            </label>
            <div className="flex relative items-center">
              <div className="bg-[#E3BC3F] rounded-l-sm p-3 h-full flex items-center">
                <AiOutlineUser style={{ height: "1.6rem", width: "1.5rem" }} />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                className="p-3 pl-10 input-border text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div className={`flex flex-col ${windowWidth > 1440 ? "ml-24" : windowWidth === 425 ? "ml-5":windowWidth === 1024 ? "ml-14":""}`}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#b5b5b5] pb-2 "
            >
              Email <span className="text-red-700">*</span>
            </label>
            <div className="flex relative items-center">
              <div className="bg-[#E3BC3F] rounded-l-sm p-3 h-full flex items-center">
                <AiOutlineMail style={{ height: "1.6rem", width: "1.5rem" }} />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="p-3 pl-10 input-border text-white"
              />
            </div>
          </div>
        </div>

        {/* Second Row: Country and Mobile */}
        <div className="grid gap-4 xl:grid-cols-2 mx-auto">
          {/* Country */}
          <div className={`flex flex-col ${windowWidth === 425 ? "ml-5":windowWidth === 1024 ? "ml-14":""}`}>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-[#b5b5b5] pb-2 pt-4"
            >
              Country <span className="text-red-700">*</span>
            </label>
            <div className="flex relative items-center">
              <div className="bg-[#E3BC3F] rounded-l-sm p-3 h-full flex items-center">
                <AiOutlineGlobal
                  style={{ height: "1.6rem", width: "1.5rem" }}
                />
              </div>
              <input
                type="text"
                id="country"
                name="country"
                className="p-3 pl-10 input-border text-white"
              />
            </div>
          </div>

          {/* Mobile */}
          <div className={`flex flex-col ${windowWidth > 1440 ? "ml-24" : windowWidth === 425 ? "ml-5":windowWidth === 1024 ? "ml-14":""}`}>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-[#b5b5b5] pb-2 pt-4"
            >
              Mobile <span className="text-red-700">*</span>
            </label>
            <div className="flex relative items-center">
              <div className="bg-[#E3BC3F] rounded-l-sm p-3 h-full flex items-center">
                <p
                  className="items-center justify-center"
                  style={{ height: "1.6rem", width: "1.5rem" }}
                >
                  {" "}
                  +971
                </p>
              </div>
              <input
                type="text"
                id="mobile"
                name="mobile"
                className="p-3 pl-10 input-border text-white"
              />
            </div>
          </div>
        </div>

        {/* Third Row: Password and Confirm Password */}
        <div className="grid gap-4 xl:grid-cols-2 mx-auto">
          {/* Password */}
          <div className={`flex flex-col ${windowWidth === 425 ? "ml-5":windowWidth === 1024 ? "ml-14":""}`}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#b5b5b5] pb-2 pt-4"
            >
              Password <span className="text-red-700">*</span>
            </label>
            <div className="flex relative items-center">
              <div className="bg-[#E3BC3F] rounded-l-sm p-3 h-full flex items-center">
                <AiOutlineLock style={{ height: "1.6rem", width: "1.5rem" }} />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className="p-3 pl-10 input-border text-white"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className={`flex flex-col ${windowWidth > 1440 ? "ml-24" : windowWidth === 425 ? "ml-5":windowWidth === 1024 ? "ml-14":""}`}>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#b5b5b5] pb-2 pt-4"
            >
              Confirm Password <span className="text-red-700">*</span>
            </label>
            <div className="flex relative items-center">
              <div className="bg-[#E3BC3F] rounded-l-sm p-3 h-full flex items-center">
                <AiOutlineLock style={{ height: "1.6rem", width: "1.5rem" }} />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="p-3 pl-10 input-border text-white"
              />
            </div>
          </div>
        </div>

        {/* Forth Row: Register */}
        <div className="grid gap-4 mx-auto">
          <button
            type="submit"
            className={`mt-4 p-2 bg-[#E3BC3F] text-black rounded-md ${windowWidth === 1024 ? "ml-16 w-80":"w-full"} uppercase`}
          >
            Register Now
          </button>
        </div>

        {/* Other form elements and button */}
        <div className="flex justify-between pt-4">
          <span className="flex">
            <p className="text-white">Already have an account?</p>
            <p
              onClick={() => navigate("/login")}
              className="text-[#E3BC3F] cursor-pointer"
            >
              {" "}
              Login
            </p>
          </span>
          <p onClick={()=>navigate("/forgot_password")} className="text-[#E3BC3F] cursor-pointer">Forgot password?</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
