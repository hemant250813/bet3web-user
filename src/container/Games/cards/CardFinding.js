import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, HumburgerHeader, Footer } from "../../../component/layout";
import GameTitle from "../GameTitle";
import CardShuffledGrid from "./CardShuffledGrid";
import CardShuffled from "./CardShuffled";
import CardShuffledPicked from "./CardShuffledPicked";
import validateAmount from "../../../validation/user/amount";
import aClubs from "../../../assets/images/games/card/aClubs.png";
import aHeart from "../../../assets/images/games/card/aHeart.png";
import HeaderBackground from "../../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../../utils/helper";

const CardFinding = ({ navbar }) => {
  const [form, setForm] = useState({
    amount: "",
  });
  const [isCardShuffledGrid, setCardShuffledGrid] = useState(true);
  const [isCardShuffled, setCardShuffled] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [cardGrid, setCardGrid] = useState("");
  const [cardGap, setCardGap] = useState("");
  const [cardPadding, setCardPadding] = useState("");

  const [tabViews, setTabViews] = useState([
    { route: "card1", isActive: false },
    { route: `card2`, isActive: false },
  ]);
  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (windowWidth <= 768) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }

    if (isAuth && userData) {
      navigate("/card_finding");
    } else {
      navigate("/");
    }
    if (windowWidth === 2560) {
      setCardGrid("grid-cols-7");
      setCardGap("gap-4");
      setCardPadding("p-0");
    } else if (windowWidth === 1440) {
      setCardGrid("grid-cols-7");
      setCardGap("gap-1");
      setCardPadding("p-12");
    } else if (windowWidth === 1024) {
      setCardGrid("grid-cols-6");
      setCardGap("gap-1");
      setCardPadding("p-12");
    } else if (windowWidth === 768) {
      setCardGrid("grid-cols-5");
      setCardGap("gap-1");
      setCardPadding("p-1");
    } else if (windowWidth === 425) {
      setCardGrid("grid-cols-3");
      setCardGap("gap-1");
      setCardPadding("p-7");
    } else if (windowWidth === 375) {
      setCardGrid("grid-cols-3");
      setCardGap("gap-1");
      setCardPadding("p-8");
    } else if (windowWidth === 320) {
      setCardGrid("grid-cols-3");
      setCardGap("gap-1");
      setCardPadding("p-1");
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
    setCardShuffledGrid(true);
    setCardShuffled(true);
  };

  const changeHandler = (e) => {
    setCardShuffledGrid(true);
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
    setCardShuffled(false);
  };

  const handleClick = () => {
    const { errors, isValid } = validateAmount(form);
    if (isValid) {
      setCardShuffledGrid(false);
      setTimeout(generateRandomBoolean, 6000); // 40 seconds delay
    } else {
      setError(errors);
    }
  };

  const callbackCardShuffledPicked = () => {
    setForm((prevState) => ({
      ...prevState,
      ["amount"]: "",
    }));
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
          <HumburgerHeader setLoading={setLoading} />
        ) : (
          <Header
            isVerifyMail={false}
            setLoading={setLoading}
            navbar={navbar}
          />
        )}
        <GameTitle title="Play Card Finding" route="rock_paper_scissors" />
      </section>

      <section
        className={`bg-black relative flex-grow p-12 md:p-8 lg:p-12 overflow-hidden`}
      >
        <div
          className={`grid justify-items-stretch gap-8 ${
            windowWidth === 320
              ? "grid-cols-1"
              : windowWidth === 1440
              ? "grid-cols-1"
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
            className="relative group mx-auto border border-gray-400 p-2"
            style={{
              height: windowWidth === 1024 ? "700px" : "700px",
              width:
                windowWidth === 1024
                  ? "800px"
                  : windowWidth === 768
                  ? "500px"
                  : windowWidth === 425
                  ? "300px"
                  : windowWidth === 375
                  ? "300px"
                  : windowWidth === 320
                  ? "250px"
                  : "1000px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              perspective: "1000px",
              transformStyle: "preserve-3d", // Add this property for 3D effect
            }}
          >
            {isCardShuffledGrid ? (
              <CardShuffledGrid
                gridCol={cardGrid}
                gap={cardGap}
                padding={cardPadding}
              />
            ) : isCardShuffled ? (
              <CardShuffled />
            ) : (
              <CardShuffledPicked onClick={callbackCardShuffledPicked} />
            )}
          </div>

          {/* Card 2 */}
          <div
            className="relative group mx-auto border border-gray-400 p-2"
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
            <div
              className={`flex items-center justify-center relative gap-8 ${
                windowWidth === 320
                  ? "p-2"
                  : windowWidth === 375
                  ? "p-4"
                  : windowWidth === 425
                  ? "p-8"
                  : windowWidth === 1024
                  ? "p-8"
                  : windowWidth === 1440
                  ? "p-16"
                  : windowWidth === 768
                  ? "p-8"
                  : windowWidth === 2560
                  ? "p-4"
                  : "p-20"
              }`}
            >
              <span
                onClick={(e) => {
                  tabSwitch(e, "card1");
                }}
                className={`${tabViews[0].isActive && "border p-2"}`}
              >
                <img src={aClubs} alt="aClubs" />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "card2");
                }}
                className={`${tabViews[1].isActive && "border p-2"}`}
              >
                <img src={aHeart} alt="aHeart" />
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
export default CardFinding;
