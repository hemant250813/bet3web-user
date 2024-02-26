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

const Transactions = ({ navbar }) => {
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
              <HumburgerHeader />
            ) : (
              <Header isVerifyMail={false} navbar={navbar} />
            )}
            <GameTitle title="Transactions" route="transactions" />
          </section>

          <section className="justify-center items-center min-h-screen bg-black relative flex-grow p-6 md:p-8 lg:p-12 overflow-hidden">
            <div className="flex justify-center items-center">
              <div
                className={` w-full md:w-auto`}
              >
                <div className="flex justify-between flex-wrap">
                  <div className="mb-4 text-left w-full md:w-auto md:flex-grow md:mr-4">
                    <div className="mt-4 relative items-center gap-1">
                      <label
                        htmlFor="confirm_password"
                        className="block text-[#BFC9CA] mb-2"
                      >
                        Transaction Number
                      </label>
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Amount"
                        name="amount"
                        value={form?.amount}
                        onChange={(e) => {
                          changeHandler(e);
                        }}
                        className="border p-3 md:p-5 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full md:w-auto"
                      />
                    </div>
                  </div>

                  <div className="mb-4 text-left w-full md:w-auto md:flex-grow md:mr-4">
                    <div className="mt-4 items-center gap-1">
                      <label
                        htmlFor="confirm_password"
                        className="block text-[#BFC9CA] mb-2"
                      >
                        Type
                      </label>
                    </div>
                    <div className="flex text-white">
                      <select
                        name="language"
                        id="language"
                        className="border border-[gray] rounded-md input-border focus:outline-none bg-[#0A0629] p-3 md:p-5 w-full md:w-auto"
                      >
                        <option className="text-xl" value="javascript">
                          All
                        </option>
                        <option className="text-xl" value="python">
                          Plus
                        </option>
                        <option className="text-xl" value="c++">
                          Minus
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4 text-left w-full md:w-auto md:flex-grow md:mr-4">
                    <div className="mt-4 relative items-center gap-1">
                      <label
                        htmlFor="confirm_password"
                        className="block text-[#BFC9CA] mb-2"
                      >
                        Remark
                      </label>
                    </div>
                    <div className="flex text-white">
                      <select
                        name="language"
                        id="language"
                        className="border border-[gray] rounded-md input-border focus:outline-none bg-[#0A0629] p-3 md:p-5 w-full md:w-auto"
                      >
                        <option className="text-xl" value="javascript">
                          Any
                        </option>
                        <option className="text-xl" value="python">
                          Invest
                        </option>
                        <option className="text-xl" value="c++">
                          Invest Back
                        </option>
                        <option className="text-xl" value="java">
                          Register Bonus
                        </option>
                        <option className="text-xl" value="java">
                          Win Bonus
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4 w-full md:w-auto md:flex-grow md:mr-4 mt-4 md:mt-0">
                    <div className="flex">
                      <button
                        type="button"
                        className={`bg-[#E3BC3F] text-black p-3 md:p-5 rounded-md w-52 ${
                          windowWidth <= 425 ? "" : "mt-12"
                        }`}
                        onClick={() => handleClick()}
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto mt-4">
                  <table className="table-auto rounded-md">
                    {/* <!-- Your table content here --> */}
                    <thead className={`bg-[#E3BC3F] text-black`}>
                      <tr>
                        <th className={`py-4 lg:px-16 sm:px-4`}>Trx</th>
                        <th className={`py-4 lg:px-16 sm:px-4`}>
                          Date
                        </th>
                        <th className={`py-4 lg:px-16 sm:px-4`}>Amount</th>
                        <th className={`py-4 lg:px-16 sm:px-4`}>Post Balance</th>
                        <th className={`py-4 lg:px-16 sm:px-4`}>Detail</th>
                      </tr>
                    </thead>
                    <tbody className=" text-[#BFC9CA]">
                      <tr className="bg-cyan-950">
                        <td className={`py-4 lg:px-16 sm:px-4`}>Data 1</td>
                        <td className={`py-4 lg:px-16 sm:px-4`}>Data 2</td>
                        <td className={`py-4 lg:px-16 sm:px-4`}><span className="flex text-red-600"><p className="px-2">-</p><p className="">Data 3</p></span></td>
                        <td className={`py-4 lg:px-16 sm:px-4`}>Data 4</td>
                        <td className={`py-4 lg:px-16 sm:px-4`}>Data 5</td>
                      </tr>

                      <tr className="bg-[#202438]">
                        <td className={`py-4 lg:px-16 sm:px-4`}>Data 1</td>
                        <td className={`py-4 lg:px-16 sm:px-4`}>Data 2</td>
                        <td className={`py-4 lg:px-16 sm:px-4`}><span className="flex text-green-400"><p className="px-2">+</p><p className="">Data 3</p></span></td>
                        <td className={`py-4 lg:px-16 sm:px-4`}>Data 1</td>
                        <td className={`py-4 lg:px-16 sm:px-4`}>Data 5</td>
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
export default Transactions;
