import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header, HumburgerHeader } from "../../component/layout";
import GameTitle from "../Games/GameTitle";
import { resetPassword } from "../../redux/action";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import validateResetPassword from "../../validation/user/resetPassword";
import { Loader } from "../../component/commonComponent";
import { notifyWarning } from "../../utils/helper";

const Deposit = ({ navbar }) => {
  const [form, setForm] = useState({
    password: "",
    confirm_password: "",
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
  const location = useLocation();

  useEffect(() => {
    if (windowWidth <= 768) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }

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
    if (form.password === form.confirm_password) {
      let payload = {
        email: location.state?.email,
        password: form.password,
        otp: location.state?.otp,
      };

      dispatch(
        resetPassword({
          payload,
          callback: async (data) => {
            if (data) {
              if (data?.meta?.code !== 400) {
                navigate("/login");
              }

              setIsSubmit(false);
              setLoading(false);
            }
          },
        })
      );
    } else {
      setIsSubmit(false);
      setLoading(false);
      notifyWarning("Password and confirm password do not match.");
    }
  };

  const handleClick = () => {
    const { errors, isValid } = validateResetPassword(form);
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
            {hideHeader ? (
              <HumburgerHeader setLoading={setLoading} />
            ) : (
              <Header
                isVerifyMail={false}
                setLoading={setLoading}
                navbar={navbar}
              />
            )}
            <GameTitle title="Deposit Methods" route="reset_password" />
          </section>

          <section className="justify-center items-center h-screen bg-black relative flex-grow p-6 md:p-8 lg:p-12 overflow-hidden">
            <form className="bg-[#01162f] p-6 rounded shadow-md text-center max-w-md mx-auto border border-gray-400">
              <div className="mt-4 flex relative items-center gap-1">
                <label
                  htmlFor="confirm_password"
                  className="block text-[#BFC9CA] mb-2"
                >
                  Select Gateway
                </label>
                <span className="text-red-700">*</span>
              </div>
              <div className="mb-4">
                <div className="w-full border-none text-white">
                  <select
                    name="language"
                    id="language"
                    className="border border-[gray] rounded-md input-border focus:outline-none bg-[#0A0629] w-full h-14"
                  >
                    <option className="text-xl" value="javascript">PhonePe</option>
                    <option className="text-xl" value="python">Gpay</option>
                    <option className="text-xl" value="c++">Paytm</option>
                    <option className="text-xl" value="java">Apple Pay</option>
                  </select>
                </div>
              </div>
              {error?.password && (
                <div className="text-rose-600 font-serif text-left mb-4">
                  {error?.password}
                </div>
              )}

              <div className="mb-4 text-left">
                <div className="mt-4 flex relative items-center gap-1">
                  <label
                    htmlFor="confirm_password"
                    className="block text-[#BFC9CA] mb-2"
                  >
                    Amount
                  </label>
                  <span className="text-red-700">*</span>
                </div>

                {/* <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={form?.confirm_password}
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  className="w-full px-3 py-2 border rounded-md input-border text-white"
                /> */}
                <div className="flex w-full">
                  <input
                    type="text"
                    placeholder="Amount"
                    name="amount"
                    value={form?.amount}
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    className="border p-2 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                    style={{ height: "3rem" }}
                  />
                  <span
                    className="bg-[#E3BC3F] text-black flex items-center px-2 rounded-r-sm outline-none"
                    style={{ height: "3rem" }}
                  >
                    USD
                  </span>
                </div>
              </div>
              {error?.confirm_password && (
                <div className="text-rose-600 font-serif text-left mb-4">
                  {error?.confirm_password}
                </div>
              )}
              <button
                type="button"
                className="w-full bg-[#E3BC3F] text-black py-2 px-4 rounded-md h-16"
                onClick={() => handleClick()}
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
export default Deposit;
