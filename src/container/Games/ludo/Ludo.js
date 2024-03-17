import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header, HumburgerHeader } from "../../../component/layout";
import GameTitle from "../../Games/GameTitle";
import { resetPassword } from "../../../redux/action";
import HeaderBackground from "../../../assets/images/headerBackground.jpg";
import validateResetPassword from "../../../validation/user/resetPassword";
import { Loader } from "../../../component/commonComponent";
import { notifyWarning, getLocalStorageItem } from "../../../utils/helper";

const Ludo = ({ navbar }) => {
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

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (windowWidth <= 768) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }

    if (isAuth && userData) {
      navigate("/ludo");
    } else {
      navigate("/");
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

  const handleClick = () => {
    const { errors, isValid } = validateResetPassword(form);
    if (isValid) {
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
              <HumburgerHeader />
            ) : (
              <Header isVerifyMail={false} navbar={navbar} />
            )}
            <GameTitle title="Ludo" route="ludo" />
          </section>

          <section className="justify-center items-center min-h-screen bg-black relative flex-grow p-6 md:p-8 lg:p-32 overflow-hidden">
            <form className="bg-[#01162f] p-12 rounded shadow-md text-centerw-full mx-auto border border-gray-400 flex items-center justify-center">
              <div className="grid relative items-center justify-center grid-cols-4 gap-4 text-white text-7xl">
                <span className="p-5 border-2 border-[#E3BC3F] rounded-lg">0</span>
                <span className="p-5 border-2 border-[#E3BC3F] rounded-lg">0</span>
                <span className="p-5 border-2 border-[#E3BC3F] rounded-lg">0</span>
                <span className="p-5 border-2 border-[#E3BC3F] rounded-lg">0</span>
              </div>

              {/* <div className="mb-4">
                <div className="flex relative items-center gap-1">
                  <label htmlFor="amount" className="block text-[#BFC9CA] mb-2">
                    Password
                  </label>
                  <span className="text-red-700">*</span>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    name="amount"
                    value={form?.amount}
                    onChange={(e) => {
                      // changeHandler(e);
                    }}
                    className="border p-5 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                    // style={{ height: "3rem" }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex relative items-center gap-1">
                  <label htmlFor="amount" className="block text-[#BFC9CA] mb-2">
                    Confirm Password
                  </label>
                  <span className="text-red-700">*</span>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    name="amount"
                    value={form?.amount}
                    onChange={(e) => {
                      // changeHandler(e);
                    }}
                    className="border p-5 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                    // style={{ height: "3rem" }}
                  />
                </div>
              </div> */}

              {/* <div className="mb-4">
                <button
                  type="button"
                  className="w-full bg-[#E3BC3F] text-black py-2 px-4 rounded-md h-16"
                  onClick={() => handleClick()}
                >
                  Submit
                </button>
              </div> */}
            </form>
          </section>
        </>
      )}
    </>
  );
};
export default Ludo;
