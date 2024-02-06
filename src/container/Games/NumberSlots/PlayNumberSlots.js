import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, HumburgerHeader, Footer } from "../../../component/layout";
import GameTitle from "../GameTitle";
import Slot from "../NumberSlots/Slot";
import validateAmount from "../../../validation/user/amount";
import HeaderBackground from "../../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../../utils/helper";

const PlayNumberSlots = () => {
  const [form, setForm] = useState({
    amount: "",
  });
  const [error, setError] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [numbers, setNumbers] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  const [tabViews, setTabViews] = useState([
    { route: "rock", isActive: false },
    { route: `paper`, isActive: false },
    { route: `scissor`, isActive: false },
  ]);
  const [widthSlot, setWidthSlot] = useState("");
  const [heightSlot, setHeightSlot] = useState("");
  const [paddingSlot, setPaddingSlot] = useState("");
  const [marginSlot, setMarginSlot] = useState("");
  const [fontSizeTitle, setFontSizeTitle] = useState("");
  const [letterSpacingTitle, setLetterSpacingTitle] = useState("");
  const [marginTitle, setMarginTitle] = useState("");

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && userData) {
      navigate("/number_slot");
    } else {
      navigate("/");
    }

    if (windowWidth === 2560) {
      setWidthSlot("110px");
      setHeightSlot("100px");
      setPaddingSlot("20px 50px 25px");
      setMarginSlot("10px");

      setFontSizeTitle("7rem");
      setLetterSpacingTitle("3px");
      setMarginTitle("20px");
    } else if (windowWidth === 768) {
      setWidthSlot("110px");
      setHeightSlot("250px");
      setPaddingSlot("25px 80px 35px");
      setMarginSlot("15px");
      setFontSizeTitle("3rem");
      setLetterSpacingTitle("1px");
      setMarginTitle("10px");
    }else if (windowWidth === 425) {
      setWidthSlot("50px");
      setHeightSlot("100px");
      setPaddingSlot("10px 30px 15px");
      setMarginSlot("10px");
      setFontSizeTitle("3rem");
      setLetterSpacingTitle("1px");
      setMarginTitle("10px");
    }else if (windowWidth === 320) {
      setWidthSlot("50px");
      setHeightSlot("100px");
      setPaddingSlot("10px 30px 15px");
      setMarginSlot("8px");
      setFontSizeTitle("2rem");
      setLetterSpacingTitle("0px");
      setMarginTitle("15px");
    }else if (windowWidth === 1440) {
      setWidthSlot("110px");
      setHeightSlot("180px");
      setPaddingSlot("20px 60px 25px");
      setMarginSlot("10px");

      setFontSizeTitle("4rem");
      setLetterSpacingTitle("3px");
      setMarginTitle("20px");
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

  const tabSwitch = (e, tab) => {
    e.preventDefault();
    const filterTabList = tabViews.map((el) =>
      el.route === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);
  };

  // asdas
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 9) + 1;
  };

  const shuffleNumbers = () => {
    const shuffledNumbers = numbers.map((row) =>
      row.map(() => generateRandomNumber())
    );
    setNumbers(shuffledNumbers);
  };
  // asdas

  const handleClick = () => {
    const { errors, isValid } = validateAmount(form);
    if (isValid) {
      setIsPaused(true);
      const thisAmount = Math.floor(Math.random() * 36) + 20;
      setRandomNumber(thisAmount);
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
        <GameTitle title="Play Number Slot" route="number_slot" />
      </section>

      <section
        className={`bg-black relative flex-grow p-12 md:p-8 lg:p-12 overflow-hidden`}
      >
        <div
          className={`grid justify-items-stretch gap-8 ${
            windowWidth === 320
              ? "grid-cols-1"
              : windowWidth === 1440
              ? "grid-cols-2"
              : windowWidth === 1024
              ? "grid-cols-1"
              : windowWidth === 768
              ? "grid-cols-1"
              : windowWidth === 425
              ? "grid-cols-1"
              : windowWidth === 375
              ? "grid-cols-1"
              : "grid-cols-2"
          }`}
        >
          {/* Card 1 */}
          <div
            className="relative group mx-auto border border-gray-400 p-4"
            style={{
              height:
                windowWidth === 320
                  ? "250px"
                  : windowWidth === 375
                  ? "300px"
                  : windowWidth === 425
                  ? "300px"
                  : windowWidth === 768
                  ? "650px"
                  : windowWidth === 1024
                  ? "650px"
                  : windowWidth === 1440
                  ? "700px"
                  : "700px",
              width:
                windowWidth === 320
                  ? "250px"
                  : windowWidth === 375
                  ? "300px"
                  : windowWidth === 425
                  ? "300px"
                  : windowWidth === 768
                  ? "650px"
                  : windowWidth === 1024
                  ? "850px"
                  : windowWidth === 1440
                  ? "640px"
                  : "700px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              perspective: "1000px",
            }}
          >
            <Slot
              isPaused={isPaused}
              setIsPaused={setIsPaused}
              randomValue={randomNumber}
              widthSlot={widthSlot}
              heightSlot={heightSlot}
              paddingSlot={paddingSlot}
              marginSlot={marginSlot}
              fontSizeTitle={fontSizeTitle}
              letterSpacingTitle={letterSpacingTitle}
              marginTitle={marginTitle}
            />
          </div>

          {/* Card 2 */}
          <div
            className="relative group mx-auto border border-gray-400 p-4"
            style={{
              height: "700px",
              width:
                windowWidth === 320
                  ? "250px"
                  : windowWidth === 375
                  ? "300px"
                  : windowWidth === 425
                  ? "300px"
                  : windowWidth === 768
                  ? "650px"
                  : windowWidth === 1024
                  ? "850px"
                  : windowWidth === 1440
                  ? "650px"
                  : "700px",
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
                <p
                  className={`${
                    windowWidth === 320
                      ? "text-xs"
                      : windowWidth === 375
                      ? "text-sm"
                      : windowWidth === 425
                      ? "text-base"
                      : windowWidth === 768
                      ? "text-3xl"
                      : windowWidth === 1024
                      ? "text-5xl"
                      : windowWidth === 1440
                      ? "text-3xl"
                      : "text-5xl"
                  }  text-white`}
                >
                  Current Balance :
                </p>
                <p
                  className={`${
                    windowWidth === 320
                      ? "text-xs"
                      : windowWidth === 375
                      ? "text-sm"
                      : windowWidth === 425
                      ? "text-base"
                      : windowWidth === 768
                      ? "text-3xl"
                      : windowWidth === 1024
                      ? "text-5xl"
                      : windowWidth === 1440
                      ? "text-3xl"
                      : "text-5xl"
                  }  text-[#E3BC3F]`}
                >
                  {" "}
                  10.50 USD
                </p>
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
              <input
                type="text"
                placeholder="Number"
                className="border p-2 focus:outline-none focus:border-blue-500 h-full bg-[#020C25] text-white w-9/12"
              />
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
export default PlayNumberSlots;
