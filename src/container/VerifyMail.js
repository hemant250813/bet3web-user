import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header, HumburgerHeader } from "../component/layout";
import GameTitle from "./Games/GameTitle";
import validateAmount from "../validation/user/amount";
import HeaderBackground from "../assets/images/headerBackground.jpg";
import { resendOtp, otpVerify } from "../redux/action";

const HeadTail = () => {
  const [form, setForm] = useState({
    amount: "",
  });
  const [error, setError] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [tabViews, setTabViews] = useState([
    { route: "head", isActive: false },
    { route: `tail`, isActive: false },
  ]);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("location", location);
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

  const tabSwitch = (e, tab) => {
    e.preventDefault();
    const filterTabList = tabViews.map((el) =>
      el.route === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);
  };

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

  const handleClick = () => {
    const { errors, isValid } = validateAmount(form);
    if (isValid) {
      // 40 seconds delay
    } else {
      setError(errors);
    }
  };

  const OtpInput = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input box
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      const isOtpFilled = newOtp?.every((otp) => otp !== "");
      if (isOtpFilled) {
        let otp = newOtp?.join("");
        console.log("otp", otp);
        // let mobile_no = JSON.parse(getLocalStorageItem("email"));
        const formPayload = {
          email: location?.state,
          otp: otp,
        };

        dispatch(
          otpVerify({
            formPayload,
            callback: (data) => {
              if (data) {
                navigate("/login");
              }
            },
          })
        );
      }
    };

    const handleKeyDown = (index, e) => {
      // Move focus to the previous input box on backspace
      if (e.key === "Backspace" && index > 0 && otp[index] === "") {
        inputRefs.current[index - 1].focus();
      }

      // Allow only numeric input
      const isNumber = /^[0-9]$/;
      if (!isNumber.test(e.key)) {
        e.preventDefault();
      }
    };

    return (
      <>
        {/* Input box for each digit */}
        {otp?.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="bg-gray-800 border border-[#E3BC3F] text-white rounded-md w-12 h-12 text-center mx-1 mb-2 focus:border-[#E3BC3F] focus:outline-none"
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </>
      // <form>
      //   <div className="flex flex-wrap justify-center items-center">

      //   </div>
      // </form>
    );
  };

  const onClickResendOtp = () => {
    const formPayload = {
      email: location?.state,
    };
    dispatch(
      resendOtp({
        formPayload
      })
    );
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
        {hideHeader ? <HumburgerHeader /> : <Header isVerifyMail={false} />}
        <GameTitle title="Verify Email" route="forgot_password" />
      </section>

      <section className="justify-center items-center h-screen bg-black relative flex-grow p-6 md:p-8 lg:p-12 overflow-hidden">
        <form className="bg-[#01162f] p-6 rounded shadow-md text-center max-w-md mx-auto border border-gray-400">
          <h2 className="mb-4 text-white font-bold">Verify Email Address</h2>
          <hr className="my-3 text-gray-400" />
          <h2 className="mb-4 text-left text-[#F2F3F4]">
            A 6 digit verification code sent to your email address:[***]
          </h2>

          <div className="mb-4 text-left">
            <div className="mt-4 flex relative items-center gap-1">
              <label for="email" className="block text-[#BFC9CA] mb-2">
                Verification Code
              </label>
              <span className="text-red-700">*</span>
            </div>
            <OtpInput />
            {/* <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md input-border"
            /> */}
          </div>

          {/* <button
            type="submit"
            className="w-full bg-[#E3BC3F] text-black py-2 px-4 rounded-md mb-4"
          >
            Submit
          </button> */}
          <h2 className="mb-4 text-left text-[#F2F3F4]">
            Please check including your Junk/Spam Folde, if not found, you can{" "}
            <p
              onClick={() => onClickResendOtp()}
              className="text-[#E3BC3F] cursor-pointer"
            >
              Try to send again
            </p>
          </h2>
        </form>
      </section>
    </>
  );
};
export default HeadTail;
