import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineGlobal,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import RegisterImage from "../assets/images/register/register.jpg";
import Logo from "../assets/images/logo.png";
import validateRegistraion from "../validation/user/registration";
import { notifyWarning } from "../utils/helper";
import { registration } from "../redux/action";
import { Loader } from "../component/commonComponent";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    country: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginTimeOut, setLoginTimeOut] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const changeHandler = (e) => {
    if (e.target) {
      const value = e.target.value;
      const { name } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const afterLoadingDispatch = () => {
    let payload = {
      username: form.username,
      email: form.email,
      country: form.country,
      mobile: form.mobile,
      password: form.password,
    };

    dispatch(
      registration({
        payload,
        callback: async (data) => {
          if (data) {
            setIsSubmit(false);
            setLoading(false);
            navigate("/verify_email", { state: form.email });
          }
        },
      })
    );
  };

  const onSubmit = () => {
    const { errors, isValid } = validateRegistraion(form);
    if (isValid) {
      if (form.password === form.confirm_password) {
        setIsSubmit(true);
        setLoading(true);
        let timeout = setTimeout(() => {
          afterLoadingDispatch();
        }, 2000);
        setLoginTimeOut(timeout);
      } else {
        notifyWarning("Password and confirm password do not match.");
      }
    } else {
      setError(errors);
      setIsSubmit(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                onClick={() => navigate("/")}
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
              <div
                className={`flex flex-col ${
                  windowWidth === 425
                    ? "ml-5"
                    : windowWidth === 1024
                    ? "ml-14"
                    : ""
                }`}
              >
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white pb-2"
                >
                  Username <span className="text-red-700">*</span>
                </label>
                <div className="flex relative items-center">
                  <div className="bg-[#3F93F9] rounded-l-sm p-3 h-full flex items-center">
                    <AiOutlineUser
                      style={{ height: "1.6rem", width: "1.5rem" }}
                    />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    className="p-3 pl-10 input-border text-white"
                  />
                </div>
                {error?.username && (
                  <div className="text-rose-600 font-serif mt-1">
                    {error?.username}
                  </div>
                )}
              </div>

              {/* Email */}
              <div
                className={`flex flex-col ${
                  windowWidth > 1440
                    ? "ml-24"
                    : windowWidth === 425
                    ? "ml-5"
                    : windowWidth === 1024
                    ? "ml-14"
                    : ""
                }`}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white pb-2"
                >
                  Email <span className="text-red-700">*</span>
                </label>
                <div className="flex relative items-center">
                  <div className="bg-[#3F93F9] rounded-l-sm p-3 h-full flex items-center">
                    <AiOutlineMail
                      style={{ height: "1.6rem", width: "1.5rem" }}
                    />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    className="p-3 pl-10 input-border text-white"
                  />
                </div>
                {error?.email && (
                  <div className="text-rose-600 font-serif mt-1">
                    {error?.email}
                  </div>
                )}
              </div>
            </div>

            {/* Second Row: Country and Mobile */}
            <div className="grid gap-4 xl:grid-cols-2 mx-auto">
              {/* Country */}
              <div
                className={`flex flex-col ${
                  windowWidth === 425
                    ? "ml-5"
                    : windowWidth === 1024
                    ? "ml-14"
                    : ""
                }`}
              >
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-white pb-2 pt-4"
                >
                  Country <span className="text-red-700">*</span>
                </label>
                <div className="flex relative items-center">
                  <div className="bg-[#3F93F9] rounded-l-sm p-3 h-full flex items-center">
                    <AiOutlineGlobal
                      style={{ height: "1.6rem", width: "1.5rem" }}
                    />
                  </div>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    className="p-3 pl-10 input-border text-white"
                  />
                </div>
                {error?.country && (
                  <div className="text-rose-600 font-serif mt-1">
                    {error?.country}
                  </div>
                )}
              </div>

              {/* Mobile */}
              <div
                className={`flex flex-col ${
                  windowWidth > 1440
                    ? "ml-24"
                    : windowWidth === 425
                    ? "ml-5"
                    : windowWidth === 1024
                    ? "ml-14"
                    : ""
                }`}
              >
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-white pb-2 pt-4"
                >
                  Mobile <span className="text-red-700">*</span>
                </label>
                <div className="flex relative items-center">
                  <div className="bg-[#3F93F9] rounded-l-sm p-3 h-full flex items-center">
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
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    className="p-3 pl-10 input-border text-white"
                  />
                </div>
                {error?.mobile && (
                  <div className="text-rose-600 font-serif mt-1">
                    {error?.mobile}
                  </div>
                )}
              </div>
            </div>

            {/* Third Row: Password and Confirm Password */}
            <div className="grid gap-4 xl:grid-cols-2 mx-auto">
              {/* Password */}
              <div
                className={`flex flex-col ${
                  windowWidth === 425
                    ? "ml-5"
                    : windowWidth === 1024
                    ? "ml-14"
                    : ""
                }`}
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white pb-2 pt-4"
                >
                  Password <span className="text-red-700">*</span>
                </label>
                <div className="flex relative items-center">
                  <div className="bg-[#3F93F9] rounded-l-sm p-3 h-full flex items-center">
                    <AiOutlineLock
                      style={{ height: "1.6rem", width: "1.5rem" }}
                    />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    className="p-3 pl-10 input-border text-white"
                  />
                </div>
                {error?.password && (
                  <div className="text-rose-600 font-serif mt-1">
                    {error?.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div
                className={`flex flex-col ${
                  windowWidth > 1440
                    ? "ml-24"
                    : windowWidth === 425
                    ? "ml-5"
                    : windowWidth === 1024
                    ? "ml-14"
                    : ""
                }`}
              >
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-white pb-2 pt-4"
                >
                  Confirm Password <span className="text-red-700">*</span>
                </label>
                <div className="flex relative items-center">
                  <div className="bg-[#3F93F9] rounded-l-sm p-3 h-full flex items-center">
                    <AiOutlineLock
                      style={{ height: "1.6rem", width: "1.5rem" }}
                    />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirm_password"
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    className="p-3 pl-10 input-border text-white"
                  />
                </div>
                {error?.confirm_password && (
                  <div className="text-rose-600 font-serif mt-1">
                    {error?.confirm_password}
                  </div>
                )}
              </div>
            </div>

            {/* Forth Row: Register */}
            <div className="grid gap-4 mx-auto">
              <button
                type="submit"
                onClick={() => onSubmit()}
                className={`mt-4 p-2 bg-[#3F93F9] text-white font-bold rounded-md ${
                  isSubmit ? "register-button" : ""
                } ${windowWidth === 1024 ? "ml-16 w-80" : "w-full"} uppercase`}
                disabled={isSubmit}
              >
                Register Now
              </button>
            </div>

            {/* Other form elements and button */}
            <div className="flex justify-between pt-4">
              <span className="flex">
                <p className="text-white mr-1">Already have an account?</p>
                <p
                  onClick={() => navigate("/login")}
                  className="text-[#3F93F9] cursor-pointer"
                >
                  {" "}
                  Login
                </p>
              </span>
              <p
                onClick={() => navigate("/forgot_password")}
                className="text-[#3F93F9] cursor-pointer"
              >
                Forgot password?
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
