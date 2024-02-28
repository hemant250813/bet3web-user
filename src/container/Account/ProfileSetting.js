import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header, HumburgerHeader } from "../../component/layout";
import GameTitle from "../Games/GameTitle";
import { updateProfile, userDetail } from "../../redux/action";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import validateEditProfile from "../../validation/user/editProfile";
import {
  Loader,
  LoaderMain,
  LoaderButton,
} from "../../component/commonComponent";
import { notifyWarning } from "../../utils/helper";

const ProfileSetting = ({ navbar }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    address: "",
    state: "",
    zipCode: "",
    city: "",
    country: "",
  });
  const [error, setError] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginTimeOut, setLoginTimeOut] = useState(0);
  const user_detail = useSelector((state) => state?.UserDetail?.userDetails);
  console.log("user_detail", user_detail);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(userDetail());
  }, []);

  useEffect(() => {
    setForm({
      firstName: user_detail?.data?.firstName,
      lastName: user_detail?.data?.lastName,
      email: user_detail?.data?.email,
      mobileNo: user_detail?.data?.mobileNo,
      address: user_detail?.data?.address,
      state: user_detail?.data?.state,
      zipCode: user_detail?.data?.zipCode,
      city: user_detail?.data?.city,
      country: user_detail?.data?.country,
    });
  }, []);

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
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      mobileNo: form.mobileNo?.toString(),
      address: form.address,
      state: form.state,
      zipCode: form.zipCode,
      city: form.city,
      country: form.country,
    };

    dispatch(
      updateProfile({
        payload,
        callback: async (data) => {
          if (data) {
            // if (data?.meta?.code !== 400) {
            //   navigate("/login");
            // }

            setIsSubmit(false);
            setLoading(false);
          }
        },
      })
    );
  };

  const handleClick = () => {
    const { errors, isValid } = validateEditProfile(form);
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
        <GameTitle title="Profile Setting" route="profile_setting" />
      </section>

      <section className="justify-center items-center min-h-screen bg-black relative flex-grow p-6 md:p-8 lg:p-32 overflow-hidden">
        <form className="bg-[#01162f] p-12 rounded shadow-md text-centerw-full mx-auto border border-gray-400">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <div className="flex relative items-center gap-1">
                <label
                  htmlFor="firstName"
                  className="block text-[#BFC9CA] mb-2"
                >
                  First Name
                </label>
                <span className="text-red-700">*</span>
              </div>
              <div className="flex">
                <input
                  type="text"
                  name="firstName"
                  value={form?.firstName}
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  className="border p-5 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                  // style={{ height: "3rem" }}
                />
              </div>
              {error?.firstName && (
                <div className="text-rose-600 font-serif text-left mb-4">
                  {error?.firstName}
                </div>
              )}
            </div>
            <div className="mb-4">
              <div className="flex relative items-center gap-1">
                <label htmlFor="lastName" className="block text-[#BFC9CA] mb-2">
                  Last Name
                </label>
                <span className="text-red-700">*</span>
              </div>
              <div className="flex">
                <input
                  type="text"
                  name="lastName"
                  value={form?.lastName}
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  className="border p-5 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                />
              </div>
              {error?.lastName && (
                <div className="text-rose-600 font-serif text-left mb-4">
                  {error?.lastName}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <div className="flex relative items-center gap-1">
                <label htmlFor="amount" className="block text-[#BFC9CA] mb-2">
                  E-mail Address
                </label>
              </div>
              <div className="flex">
                <input
                  type="text"
                  name="email"
                  value={form?.email}
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
                <label htmlFor="mobileNo" className="block text-[#BFC9CA] mb-2">
                  Mobile Number
                </label>
              </div>
              <div className="flex">
                <input
                  type="text"
                  name="mobileNo"
                  value={form?.mobileNo}
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  className="border p-5 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                  // style={{ height: "3rem" }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <div className="flex relative items-center gap-1">
                <label htmlFor="address" className="block text-[#BFC9CA] mb-2">
                  Address
                </label>
              </div>
              <div className="flex">
                <input
                  type="text"
                  name="address"
                  value={form?.address}
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
                <label htmlFor="state" className="block text-[#BFC9CA] mb-2">
                  State
                </label>
              </div>
              <div className="flex">
                <input
                  type="text"
                  name="state"
                  value={form?.state}
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  className="border p-5 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                  // style={{ height: "3rem" }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="mb-4">
              <div className="flex relative items-center gap-1">
                <label htmlFor="zipCode" className="block text-[#BFC9CA] mb-2">
                  Zip Code
                </label>
              </div>
              <div className="flex">
                <input
                  type="text"
                  name="zipCode"
                  value={form?.zipCode}
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
                <label htmlFor="city" className="block text-[#BFC9CA] mb-2">
                  City
                </label>
              </div>
              <div className="flex">
                <input
                  type="text"
                  name="city"
                  value={form?.city}
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
                <label htmlFor="country" className="block text-[#BFC9CA] mb-2">
                  Country
                </label>
              </div>
              <div className="flex">
                <input
                  type="text"
                  name="country"
                  value={form?.country}
                  onChange={(e) => {
                    changeHandler(e);
                  }}
                  className="border p-5 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                  // style={{ height: "3rem" }}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={(e) => handleClick(e)}
              className="w-full bg-[#E3BC3F] text-black py-2 px-4 rounded-md h-16 flex justify-center"
              disabled={isSubmit}
            >
              {isSubmit ? (
                <LoaderButton />
              ) : (
                <>
                  <span className="mt-2 font-bold text-2xl">Submit</span>
                  {/* Add your button icon here if needed */}
                </>
              )}
            </button>
            {/* <button
                  type="button"
                  className="w-full bg-[#E3BC3F] text-black py-2 px-4 rounded-md h-16"
                  onClick={() => handleClick()}
                >
                  Submit
                </button> */}
          </div>
        </form>
      </section>
    </>
  );
};
export default ProfileSetting;
