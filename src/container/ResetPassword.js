import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, HumburgerHeader } from "../component/layout";
import GameTitle from "./Games/GameTitle";
import validateAmount from "../validation/user/amount";
import HeaderBackground from "../assets/images/headerBackground.jpg";

const HeadTail = () => {
  const [form, setForm] = useState({
    amount: "",
  });
  const [error, setError] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [tabViews, setTabViews] = useState([
    { route: "head", isActive: false },
    { route: `tail`, isActive: false },
  ]);
  const navigate = useNavigate();

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

  const handleToggleRotation = () => {
    setRotationAngle(180);
    setIsRotating((prevIsRotating) => !prevIsRotating);
  };

  const tabSwitch = (e, tab) => {
    e.preventDefault();
    const filterTabList = tabViews.map((el) =>
      el.route === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);

    if (tab === "head") {
      setRotationAngle(0);
    } else {
      setRotationAngle(180);
    }
    setIsRotating(false);
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

  const generateRandomBoolean = () => {
    const randomBoolean = Math.random() < 0.5; // true or false with 50% probability
    setIsRotating(false);
    if (randomBoolean) {
      if (tabViews[0].isActive) {
        setRotationAngle(0);
      } else {
        setRotationAngle(180);
      }
    } else {
      if (tabViews[0].isActive) {
        setRotationAngle(180);
      } else {
        setRotationAngle(0);
      }
    }
  };

  const handleClick = () => {
    const { errors, isValid } = validateAmount(form);
    if (isValid) {
      setIsRotating(true);
      setTimeout(generateRandomBoolean, 4000); // 40 seconds delay
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
        {hideHeader ? <HumburgerHeader /> : <Header />}
        <GameTitle title="Reset Password" route="reset_password" />
      </section>

      <section class="justify-center items-center h-screen bg-black relative flex-grow p-6 md:p-8 lg:p-12 overflow-hidden">
        <form class="bg-[#01162f] p-6 rounded shadow-md text-center max-w-md mx-auto border border-gray-400">
          <h2 class="mb-4 text-[#F2F3F4]">
            Reset Password
          </h2>

          <div class="mb-4 text-left">
            <div className="mt-4 flex relative items-center gap-1">
              <label for="email" class="block text-[#BFC9CA] mb-2">
                New Password
              </label>
              <span className="text-red-700">*</span>
            </div>

            <input
              type="email"
              id="email"
              name="email"
              class="w-full px-3 py-2 border rounded-md input-border"
            />
          </div>

          <div class="mb-4 text-left">
            <div className="mt-4 flex relative items-center gap-1">
              <label for="email" class="block text-[#BFC9CA] mb-2">
                Confirm Password
              </label>
              <span className="text-red-700">*</span>
            </div>

            <input
              type="email"
              id="email"
              name="email"
              class="w-full px-3 py-2 border rounded-md input-border"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-[#E3BC3F] text-black py-2 px-4 rounded-md"
            onClick={() => navigate("/verify_email")}
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};
export default HeadTail;
