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

const WithdrawLog = ({ navbar }) => {
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
              <HumburgerHeader />
            ) : (
              <Header isVerifyMail={false} navbar={navbar} />
            )}
            <GameTitle title="Withdraw Log" route="withdraw/log" />
          </section>

          <section className="justify-center items-center h-screen bg-black relative flex-grow p-6 md:p-8 lg:p-12 overflow-hidden">
            <div className="flex justify-center items-center">
              <div class={`${windowWidth <= 375 ? "px-1" : "px-16"}`}>
                <input
                  type="text"
                  placeholder="Search"
                  className="rounded-full border px-4 py-2 mb-4 bg-cyan-950 text-[#BFC9CA] focus:border-[#E3BC3F]"
                />
                <div className="overflow-x-auto">
                  <table class={`table-auto rounded-md`}>
                    {/* <!-- Your table content here --> */}
                    <thead className={`bg-[#E3BC3F] text-black`}>
                      <tr>
                        <th class={`py-4 lg:px-16 sm:px-4`}>
                          Gateway <p>|</p>Transaction
                        </th>
                        <th class={`py-4 lg:px-16 sm:px-4`}>Initiated</th>
                        <th class={`py-4 lg:px-16 sm:px-4`}>Amount</th>
                        <th class={`py-4 lg:px-16 sm:px-4`}>Conversion</th>
                        <th class={`py-4 lg:px-16 sm:px-4`}>Status</th>
                        <th class={`py-4 lg:px-16 sm:px-4`}>Details</th>
                      </tr>
                    </thead>
                    <tbody className="bg-cyan-950 text-[#BFC9CA]">
                      <tr>
                        <td class={`py-4 lg:px-16 sm:px-4`}>Data 1</td>
                        <td class={`py-4 lg:px-16 sm:px-4`}>Data 2</td>
                        <td class={`py-4 lg:px-16 sm:px-4`}>Data 3</td>
                        <td class={`py-4 lg:px-16 sm:px-4`}>Data 1</td>
                        <td class={`py-4 lg:px-16 sm:px-4`}>Data 2</td>
                        <td class={`py-4 lg:px-16 sm:px-4`}>Data 3</td>
                      </tr>
                      {/* <!-- More rows --> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default WithdrawLog;
