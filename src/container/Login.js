import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/images/login/login.jpg";
import Logo from "../assets/images/logo.png";
import validateLogin from "../validation/user/login";
import { login } from "../redux/action";
import { LoaderMain } from "../component/commonComponent";

const Login = () => {
  const [form, setForm] = useState({
    user: "",
    password: "",
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
      clearTimeout(loginTimeOut);
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
      user: form.user,
      password: form.password,
    };
    dispatch(
      login({
        payload,
        callback: async (data) => {
          if (data) {
            setIsSubmit(false);
            setLoading(false);
            if (data?.data?.type === 1) {
              navigate("/admin-dashboard");
            } else if (data?.data?.type === 2) {
              navigate("/dashboard");
            } else {
              navigate("/");
            }
            // navigate("/dashboard");
          }
        },
      })
    );
  };

  const onSubmit = () => {
    const { errors, isValid } = validateLogin(form);
    if (isValid) {
      setIsSubmit(true);
      setLoading(true);
      let timeout = setTimeout(() => {
        afterLoadingDispatch();
      }, 2000);
      setLoginTimeOut(timeout);
    } else {
      setError(errors);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <LoaderMain />
      ) : (
        <div
          className="min-h-screen flex items-center justify-center bg-cover relative"
          style={{ backgroundImage: `url(${LoginImage})` }}
        >
          {/* Your login form content goes here */}
          <div
            className={`absolute left-0 bg-black p-8 rounded shadow-md h-full ${
              windowWidth <= 768
                ? "w-full"
                : windowWidth === 1024
                ? "w-3/4"
                : windowWidth === 2560
                ? "w-1/3"
                : windowWidth === 1440
                ? "w-1/2"
                : "w-1/3"
            }`}
          >
            <div className="text-center mb-4 mt-60">
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
              <div className="bg-[#3F93F9] rounded-l-sm p-3 h-full flex items-center">
                <AiOutlineUser
                  className=""
                  style={{ height: "1.6rem", width: "1.5rem" }}
                />
              </div>
              <div className="flex flex-col w-full relative">
                <input
                  type="text"
                  id="user"
                  name="user"
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  className="p-3 pl-10 w-full input-border text-white"
                  // placeholder="Enter your username"
                />
              </div>
            </div>
            {error?.user && (
              <div className="text-rose-600 font-serif mt-1">{error?.user}</div>
            )}
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
              <div className="bg-[#3F93F9] rounded-l-sm p-3 h-full flex items-center">
                <AiOutlineLock
                  className=""
                  style={{ height: "1.6rem", width: "1.5rem" }}
                />
              </div>
              <div className="flex flex-col w-full relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  className="p-3 pl-10 w-full input-border text-white"
                  // placeholder="Enter your password"
                />
              </div>
            </div>
            {error?.password && (
              <div className="text-rose-600 font-serif mt-1">
                {error?.password}
              </div>
            )}
            <button
              type="submit"
              onClick={() => onSubmit()}
              className={`mt-4 p-2 bg-[#3F93F9] text-white font-bold rounded-md w-full uppercase text-2xl ${
                isSubmit ? "register-button" : ""
              }`}
              disabled={isSubmit}
            >
              Login Now
            </button>
            <div className="flex justify-between pt-4">
              <span className="flex">
                <p className="text-white">Haven't an account?</p>
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate("/register");
                  }}
                  className="text-[#3F93F9] cursor-pointer"
                >
                  {" "}
                  Create an account
                </p>
              </span>

              <p
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate("/forgot_password");
                }}
                className="text-[#3F93F9] cursor-pointer"
              >
                Forget password?
              </p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
