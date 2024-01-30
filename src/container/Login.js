import React, { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/images/login/login.jpg";
import Logo from "../assets/images/logo.png";

const Login = () => {
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
console.log("windowWidth login",windowWidth);
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover relative"
      style={{ backgroundImage: `url(${LoginImage})` }}
    >
      {/* Your login form content goes here */}
      <div
        className={`absolute left-0 bg-black p-8 rounded shadow-md h-full ${
          windowWidth <= 768 ? "w-full" : windowWidth === 1024 ? "w-3/4" : windowWidth === 2560 ? "w-1/3" : windowWidth === 1440 ? "w-1/2" : "w-1/3"
        }`}
      >
        <div className="text-center mb-4 mt-60">
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

        <div className="flex relative items-center gap-1">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-[#b5b5b5] pb-2"
          >
            Username
          </label>
          <span className="text-red-700">*</span>
        </div>
        <div className="flex relative items-center">
          <div className="bg-[#E3BC3F] rounded-l-sm p-3 h-full flex items-center">
            <AiOutlineUser
              className=""
              style={{ height: "1.6rem", width: "1.5rem" }}
            />
          </div>
          <input
            type="text"
            id="username"
            name="username"
            className=" p-3 pl-10 w-full input-border text-white"
            // placeholder="Enter your username"
          />
        </div>

        <div className="mt-4 flex relative items-center gap-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#b5b5b5] pb-2"
          >
            Password
          </label>
          <span className="text-red-700">*</span>
        </div>
        <div className="flex relative items-center pb-4">
          <div className="bg-[#E3BC3F] rounded-l-sm p-3 h-full flex items-center">
            <AiOutlineLock
              className=""
              style={{ height: "1.6rem", width: "1.5rem" }}
            />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            className=" p-3 pl-10 w-full input-border text-white"
            // placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="mt-4 p-2 bg-[#E3BC3F] text-black rounded-md w-full uppercase"
        >
          Login Now
        </button>
        <div className="flex justify-between pt-4">
          <span className="flex">
            <p className="text-white">Haven't an account?</p>
            <p
              onClick={() => navigate("/register")}
              className="text-[#E3BC3F] cursor-pointer"
            >
              {" "}
              Create an account
            </p>
          </span>

          <p  onClick={()=>navigate("/forgot_password")} className="text-[#E3BC3F] cursor-pointer">Forget password?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
