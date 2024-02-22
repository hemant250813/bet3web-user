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

const NewTicket = ({ navbar }) => {
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
            <GameTitle title="Open Ticket" route="ticket/new" />
          </section>

          <section className="justify-center items-center min-h-screen bg-black relative flex-grow p-6 md:p-8 lg:p-32 overflow-hidden">
            <form className="bg-[#01162f] p-12 rounded shadow-md text-centerw-full mx-auto border border-gray-400">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <div className="flex relative items-center gap-1">
                    <label
                      htmlFor="amount"
                      className="block text-[#BFC9CA] mb-2"
                    >
                      Subject
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
                    <label
                      htmlFor="select_gateway"
                      className="block text-[#BFC9CA] mb-2"
                    >
                      Priority
                    </label>
                    <span className="text-red-700">*</span>
                  </div>
                  <div>
                    <select
                      name="gateway"
                      id="select_gateway"
                      className="border border-[gray] rounded-md input-border focus:outline-none bg-[#0A0629] w-full p-5 text-white"
                    >
                      <option className="text-xl" value="phonepe">
                        High
                      </option>
                      <option className="text-xl" value="gpay">
                        Medium
                      </option>
                      <option className="text-xl" value="paytm">
                        Low
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex relative items-center gap-1">
                  <label
                    htmlFor="message"
                    className="block text-[#BFC9CA] mb-2"
                  >
                    Message
                  </label>
                  <span className="text-red-700">*</span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Enter your message here..."
                  className="border p-2 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full resize-none"
                ></textarea>
              </div>

              {/* New attachment input and button */}
              <div className="mb-4">
                <div className="flex relative items-center gap-1">
                  <label
                    htmlFor="attachment"
                    className="block text-[#BFC9CA] mb-2"
                  >
                    Attachment
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="file"
                    id="attachment"
                    name="attachment"
                    className="border p-2 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                  />
                  <button
                    type="button"
                    onClick={addAttachment}
                    className="ml-2 bg-[#E3BC3F] text-white py-2 px-8 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Attachments list */}
              {attachments.map((attachment) => (
                <div key={attachment.id} className="mb-4">
                  <div className="flex relative items-center gap-1">
                    <label
                      htmlFor={`attachment_${attachment.id}`}
                      className="block text-[#BFC9CA] mb-2"
                    >
                      Attachment
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="file"
                      id={`attachment_${attachment.id}`}
                      name={`attachment_${attachment.id}`}
                      className="border p-2 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeAttachment(attachment.id)}
                      className="ml-2 bg-red-600 text-white py-2 px-8 rounded-md"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}

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
export default NewTicket;
