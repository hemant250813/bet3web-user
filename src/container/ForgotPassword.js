import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header, HumburgerHeader } from "../component/layout";
import GameTitle from "./Games/GameTitle";
import { forgotPassword } from "../redux/action";
import HeaderBackground from "../assets/images/headerBackground.jpg";
import validateForgotPassword from "../validation/user/forgotPassword";
import { Loader } from "../component/commonComponent";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });
  const [error, setError] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginTimeOut, setLoginTimeOut] = useState(0);

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
      email: form.email,
    };
    dispatch(
      forgotPassword({
        payload,
        callback: async (data) => {
          if (data) {
            console.log("forgotPassword", data);
            setIsSubmit(false);
            setLoading(false);
            navigate("/reset_password", {
              state: { otp: data?.data, email: form.email },
            });
          }
        },
      })
    );
  };

  const handleClick = () => {
    const { errors, isValid } = validateForgotPassword(form);
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <section
            className="relative flex-grow p-4 md:p-8 lg:p-12"
            style={{
              backgroundImage: `url(${HeaderBackground})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "400px",
              display: "flex", // Add these styles
              justifyContent: "center", // to center horizontally
              alignItems: "center", // and vertically
            }}
          >
            {/* Mobile Header with Hamburger Icon */}
            {hideHeader ? <HumburgerHeader /> : <Header isVerifyMail={false} />}
            <GameTitle title="Account Recovery" route="forgot_password" />
          </section>
          <section className="justify-center items-center h-screen bg-black relative flex-grow p-6 md:p-8 lg:p-12 overflow-hidden">
            <form className="bg-[#01162f] p-6 rounded shadow-md text-center max-w-md mx-auto border border-gray-400">
              <h2 className="mb-4 text-left text-[#F2F3F4]">
                To recover your account please provide your email or username to
                find your account.
              </h2>

              <div className={`${error?.email ? "" : "mb-8"} text-left`}>
                <div className="mt-4 flex relative items-center gap-1">
                  <label for="email" className="block text-[#BFC9CA] mb-2">
                    Email or Username
                  </label>
                  <span className="text-red-700">*</span>
                </div>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form?.email}
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  className="w-full px-3  border rounded-md input-border"
                />
              </div>
              {error?.email && (
                <div className="text-rose-600 font-serif text-left mb-4">
                  {error?.email}
                </div>
              )}
              <button
                type="button"
                className="w-full bg-[#E3BC3F] text-black py-2 px-4 rounded-md"
                onClick={() => handleClick()}
                disabled={isSubmit}
              >
                Submit
              </button>
            </form>
          </section>
        </>
      )}
    </>
  );
};
export default ForgotPassword;
