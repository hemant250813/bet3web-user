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

const ChangePassword = ({ navbar }) => {
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
  const [attachments, setAttachments] = useState([]);

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

  const addAttachment = () => {
    setAttachments([...attachments, { id: attachments.length }]);
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id));
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
            <GameTitle title="Change Password" route="change_password" />
          </section>

          <section className="justify-center items-center min-h-screen bg-black relative flex-grow p-6 md:p-8 lg:p-32 overflow-hidden">
            <form className="bg-[#01162f] p-12 rounded shadow-md text-centerw-full mx-auto border border-gray-400">
              <div className="mb-4">
                <div className="flex relative items-center gap-1">
                  <label htmlFor="amount" className="block text-[#BFC9CA] mb-2">
                    Current Password
                  </label>
                  <span className="text-red-700">*</span>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    name="amount"
                    value={form?.amount}
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    className="border p-5 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                    // style={{ height: "3rem" }}
                  />
                </div>
              </div>

              <div className="mb-4">
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
                      changeHandler(e);
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
                      changeHandler(e);
                    }}
                    className="border p-5 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                    // style={{ height: "3rem" }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <button
                  type="button"
                  className="w-full bg-[#E3BC3F] text-black py-2 px-4 rounded-md h-16"
                  onClick={() => handleClick()}
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
};
export default ChangePassword;
