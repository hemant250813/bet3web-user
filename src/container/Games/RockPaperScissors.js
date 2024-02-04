import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../component/layout";
import { Header, HumburgerHeader } from "../../component/layout";
import GameTitle from "./GameTitle";
import Rock from "../../assets/images/games/rockPaperScissors/rock.png";
import Paper from "../../assets/images/games/rockPaperScissors/paper.png";
import Scissors from "../../assets/images/games/rockPaperScissors/scissors.png";
import validateAmount from "../../validation/user/amount";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../utils/helper";

const RockPaperScissors = () => {
  const images = [Rock, Paper, Scissors];
  const [form, setForm] = useState({
    amount: "",
  });
  const [error, setError] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [hideHeader, setHideHeader] = useState(false);
  console.log("isPaused", isPaused);
  const [tabViews, setTabViews] = useState([
    { route: "rock", isActive: false },
    { route: `paper`, isActive: false },
    { route: `scissor`, isActive: false },
  ]);

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && userData) {
      navigate("/rock_paper_scissors");
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

  const tabSwitch = (e, tab) => {
    e.preventDefault();
    const filterTabList = tabViews.map((el) =>
      el.route === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);
    setIsPaused(true);

    if (tab === "rock") {
      setCurrentImageIndex(0);
    } else if (tab === "paper") {
      setCurrentImageIndex(1);
    } else {
      setCurrentImageIndex(2);
    }
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

  useEffect(() => {
    let intervalId;

    const handleAnimation = () => {
      if (!isPaused) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    };

    intervalId = setInterval(handleAnimation, 500); // Change the duration as needed (2000ms = 2 seconds)

    return () => clearInterval(intervalId);
  }, [isPaused, images.length]);

  const generateRandomBoolean = () => {
    setIsPaused(true);
  };

  const handleClick = () => {
    const { errors, isValid } = validateAmount(form);
    if (isValid) {
      setIsPaused(false);
      setTimeout(generateRandomBoolean, 6000); // 40 seconds delay
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
        {hideHeader ? <HumburgerHeader /> : <Header isVerifyMail={false} />}
        <GameTitle
          title="Play Rock Paper scissors"
          route="rock_paper_scissors"
        />
      </section>

      <section
        className={`bg-black relative flex-grow p-12 md:p-8 lg:p-12 overflow-hidden`}
      >
        <div
          className={`grid justify-items-stretch grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8`}
        >
          {/* Card 1 */}
          <div
            className="relative group mx-auto border border-gray-400 p-4"
            style={{
              height: "700px",
              width: "700px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              perspective: "1000px",
            }}
          >
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* Card 2 */}
          <div
            className="relative group mx-auto border border-gray-400 p-4"
            style={{
              height: "700px",
              width: "700px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column", // Display children in a column
              justifyContent: "center",
              alignItems: "center",
              perspective: "1000px",
            }}
          >
            <div className="flex flex-col items-center justify-center p-3">
              <span className="flex items-center justify-center">
                <p className="text-5xl text-white">Current Balance :</p>
                <p className="text-5xl text-[#E3BC3F]"> 10.50 USD</p>
              </span>
              <div className="flex flex-col items-center w-11/12 mt-3">
                <div className="flex w-9/12">
                  <input
                    type="text"
                    placeholder="Amount"
                    name="amount"
                    value={form?.amount}
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    className="border p-2 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                    style={{ height: "2rem" }}
                  />
                  <span
                    className="bg-[#E3BC3F] text-black flex items-center px-2 rounded-r-sm outline-none"
                    style={{ height: "2rem" }}
                  >
                    USD
                  </span>
                </div>
                <div className="text-rose-600 font-serif mt-1">
                  {error?.amount}
                </div>
              </div>
              <span className="text-[#adb5bd] mt-3">
                Minimum : 1.00 USD | Maximum : 100.00 USD | Win Amount 150.00 %
              </span>
            </div>
            <div></div>
            <div className="flex items-center justify-center relative p-20">
              <span
                onClick={(e) => {
                  tabSwitch(e, "rock");
                }}
                className={`${tabViews[0].isActive && "border p-2"}`}
              >
                <img src={Rock} alt="head" />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "paper");
                }}
                className={`${tabViews[1].isActive && "border p-2"}`}
              >
                <img src={Paper} alt="tail" />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "scissor");
                }}
                className={`${tabViews[2].isActive && "border p-2"}`}
              >
                <img src={Scissors} alt="scissors" />
              </span>
            </div>
            <div className="flex flex-col items-center justify-center w-11/12 p-2">
              <button
                onClick={() => handleClick()}
                className="bg-[#E3BC3F] p-4 w-9/12"
              >
                Play Now
              </button>
              <span className="text-white">Game Instruction</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default RockPaperScissors;
