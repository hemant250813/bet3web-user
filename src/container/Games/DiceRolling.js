import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, HumburgerHeader, Footer } from "../../component/layout";
import GameTitle from "./GameTitle";
import Dice1 from "../../assets/images/games/dice/dice1.png";
import Dice2 from "../../assets/images/games/dice/dice2.png";
import Dice3 from "../../assets/images/games/dice/dice3.png";
import Dice4 from "../../assets/images/games/dice/dice4.png";
import Dice5 from "../../assets/images/games/dice/dice5.png";
import Dice6 from "../../assets/images/games/dice/dice6.png";
import validateAmount from "../../validation/user/amount";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../utils/helper";

const DiceRolling = ({navbar}) => {
  const [form, setForm] = useState({
    amount: "",
  });
  const [error, setError] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [loading, setLoading] = useState(false);

  var paused = true;
  var initialRolling = false;

  const [tabViews, setTabViews] = useState([
    { dice: "dice1", isActive: false },
    { dice: `dice2`, isActive: false },
    { dice: `dice3`, isActive: false },
    { dice: "dice4", isActive: false },
    { dice: `dice5`, isActive: false },
    { dice: `dice6`, isActive: false },
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
      navigate("/dice_rolling");
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

  useEffect(() => {
    initDice();
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
  const initDice = () => {
    var elDiceOne = document.getElementById("dice1");
    var diceOne = Math.floor(Math.random() * 6 + 1);

    for (var i = 1; i <= 6; i++) {
      elDiceOne?.classList.remove("show-" + i);
      if (diceOne === i) {
        elDiceOne?.classList.add("show-" + i);
      }
    }

    if (!initialRolling) {
      setTimeout(initDice, 1000); // Continue the animation if not paused
    }
  };

  const tabSwitch = (e, tab) => {
    e.preventDefault();
    const filterTabList = tabViews.map((el) =>
      el.dice === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);

    initialRolling = true;
  };

  const handleClick = () => {
    const { errors, isValid } = validateAmount(form);
    if (isValid) {
      paused = !paused;
      if (!paused) {
        rollDice(); // Resume the animation if unpaused
      }

      setTimeout(() => {
        paused = true;
      }, 5000);
    } else {
      setError(errors);
    }
  };

  const rollDice = () => {
    var elDiceOne = document.getElementById("dice1");
    var diceOne = Math.floor(Math.random() * 6 + 1);

    for (var i = 1; i <= 6; i++) {
      elDiceOne.classList.remove("show-" + i);
      if (diceOne === i) {
        elDiceOne.classList.add("show-" + i);
      }
    }

    // right side dice number
    // left side "diceOne" number
    // 5->4
    // 1->1
    // 2->5
    // 3->6
    // 6->2
    // 4->3
    if (!paused) {
      setTimeout(rollDice, 1000); // Continue the animation if not paused
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
        {hideHeader ? <HumburgerHeader setLoading={setLoading}/> : <Header isVerifyMail={false}  setLoading={setLoading} navbar={navbar}/>}
        <GameTitle title="Play Dice Rolling" route="dice_rolling" />
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
            <div
              style={{
                position: "absolute",
                display: "inline-block",
                top: windowWidth === 425 ? "110px":windowWidth === 375 ? "110px":windowWidth === 320 ? "70px":windowWidth === 1024 ? "260px":"260px",
                left: windowWidth === 425 ? "-40px":windowWidth === 375 ? "-40px":windowWidth === 320 ? "-70px":windowWidth === 1024 ? "205px":"155px",
                // If the 'left' property is important, you can include it like this:
                // left: '155px !important',
              }}
              className=""
            >
              <div id="dice1" className="dice dice-one">
                <div id="dice-one-side-one" className="side one">
                  <div className="dot one-1"></div>
                </div>
                <div id="dice-one-side-two" className="side two">
                  <div className="dot two-1"></div>
                  <div className="dot two-2"></div>
                </div>
                <div id="dice-one-side-three" className="side three">
                  <div className="dot three-1"></div>
                  <div className="dot three-2"></div>
                  <div className="dot three-3"></div>
                </div>
                <div id="dice-one-side-four" className="side four">
                  <div className="dot four-1"></div>
                  <div className="dot four-2"></div>
                  <div className="dot four-3"></div>
                  <div className="dot four-4"></div>
                </div>
                <div id="dice-one-side-five" className="side five">
                  <div className="dot five-1"></div>
                  <div className="dot five-2"></div>
                  <div className="dot five-3"></div>
                  <div className="dot five-4"></div>
                  <div className="dot five-5"></div>
                </div>
                <div id="dice-one-side-six" className="side six">
                  <div className="dot six-1"></div>
                  <div className="dot six-2"></div>
                  <div className="dot six-3"></div>
                  <div className="dot six-4"></div>
                  <div className="dot six-5"></div>
                  <div className="dot six-6"></div>
                </div>
              </div>
            </div>
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
                <p className={`${
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
                  }  text-white`}>Current Balance :</p>
                <p className={`${
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
                  }  text-[#E3BC3F]`}> 10.50 USD</p>
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
            <div className={`flex items-center justify-center relative ${
                windowWidth === 320
                  ? "p-2"
                  : windowWidth === 375
                  ? "p-4"
                  : windowWidth === 425
                  ? "p-8"
                  : windowWidth === 1024
                  ? "p-16"
                  : windowWidth === 1440
                  ? "p-16"
                  : "p-20"
              }`}>
              <span
                onClick={(e) => {
                  tabSwitch(e, "dice1");
                }}
                className={`${tabViews[0].isActive && "border p-2"}`}
              >
                <img src={Dice1} alt="dice1" />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "dice2");
                }}
                className={`${tabViews[1].isActive && "border p-2"}`}
              >
                <img src={Dice2} alt="dice2" />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "dice3");
                }}
                className={`${tabViews[2].isActive && "border p-2"}`}
              >
                <img src={Dice3} alt="dice3" />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "dice4");
                }}
                className={`${tabViews[3].isActive && "border p-2"}`}
              >
                <img src={Dice4} alt="dice4" />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "dice5");
                }}
                className={`${tabViews[4].isActive && "border p-2"}`}
              >
                <img src={Dice5} alt="dice5" />
              </span>
              <span
                onClick={(e) => {
                  tabSwitch(e, "dice6");
                }}
                className={`${tabViews[5].isActive && "border p-2"}`}
              >
                <img src={Dice6} alt="dice6" />
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
export default DiceRolling;
