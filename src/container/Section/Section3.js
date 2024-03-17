import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import headandtail from "../../assets/images/games/headandtail.png";
import rockpaperscissors from "../../assets/images/games/rockpaperscissors.jpg";
import spinwheel from "../../assets/images/games/spinwheel.jpg";
import numberguessing from "../../assets/images/games/numberguessing.jpg";
import dicerolling from "../../assets/images/games/dicerolling.jpg";
import cardfinding from "../../assets/images/games/cardfinding.jpg";
import numberslot from "../../assets/images/games/numberslot.jpg";
import poolnumber from "../../assets/images/games/poolnumber.jpg";
import roulette from "../../assets/images/games/roulette.jpg";
import casinodice from "../../assets/images/games/casinodice.jpg";
import keno from "../../assets/images/games/keno.png";
import blackjack from "../../assets/images/games/blackjack.jpg";
import questionAndAnswer from "../../assets/images/games/question/questionAndAnswer.png";
import Account from "../../container/Account";
import { Loader, LoaderMain } from "../../component/commonComponent";
import {
  removeLocalStorageItem,
  getLocalStorageItem,
  clearLocalStorage,
  WarningToast,
} from "../../utils/helper";
const Section3 = ({ games, isDashboard, loading, setLoading, userDetails }) => {
  const [loginTimeOut, setLoginTimeOut] = useState(0);
  const [tabViews, setTabViews] = useState([
    { card: "card1", isActive: false },
    { card: `card2`, isActive: false },
    { card: `card3`, isActive: false },
    { card: "card4", isActive: false },
    { card: `card5`, isActive: false },
    { card: `card6`, isActive: false },
    { card: "card7", isActive: false },
    { card: `card8`, isActive: false },
    { card: `card9`, isActive: false },
    { card: "card10", isActive: false },
    { card: `card11`, isActive: false },
    { card: `card12`, isActive: false },
    { card: `card13`, isActive: false },
  ]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const navigate = useNavigate();
  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));

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
      clearTimeout(loginTimeOut);
    };
  }, [windowWidth, windowHeight]);

  const afterLoadingDispatch = (route) => {
    console.log("afterLoadingDispatch", route);
    navigate(`/${route}`);
  };

  const tabSwitch = (e, tab, type) => {
    e.preventDefault();
    if (type === "enter") {
      const filterTabList = tabViews.map((el) =>
        el.card === tab ? { ...el, isActive: true } : { ...el, isActive: false }
      );
      setTabViews(filterTabList);
    } else {
      const filterTabList = tabViews.map((el) =>
        el.card === tab
          ? { ...el, isActive: false }
          : { ...el, isActive: false }
      );
      setTabViews(filterTabList);
    }
  };

  const playGame = (route) => {
    clearTimeout(loginTimeOut);
    if (isAuth && userData) {
      setLoading(true);
      let timeout = setTimeout(() => {
        console.log("kkkkkkkkkkkk");
        afterLoadingDispatch(route);
      }, 2000);
      setLoginTimeOut(timeout);
    } else {
      navigate(`/`);
      clearLocalStorage();
      removeLocalStorageItem("user");
      removeLocalStorageItem("userData");
      removeLocalStorageItem("token");
      WarningToast("Please login.");
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section
          className={`bg-black relative flex-grow p-4 md:p-8 lg:p-12 overflow-hidden`}
        >
          {games && (
            <div className="text-white text-center text-4xl mt-8 mb-12 font-bold">
              <p>Our Awesome Games</p>
            </div>
          )}

          {isDashboard && <Account userDetails={userDetails} />}
          <div
            className={`${
              games ? "" : windowWidth <= 320 ? "" : "p-28"
            } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8`}
          >
            {/* Card 1 */}
            <div
              onClick={() => playGame("head_tail")}
              className={`relative group ${
                tabViews[0]?.isActive ? "" : "hover:opacity-60"
              }  hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${headandtail})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card1", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card1", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff]  px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Head and Tail
              </button>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => playGame("rock_paper_scissors")}
              className={`relative group ${
                tabViews[1]?.isActive ? "" : "hover:opacity-60"
              } hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${rockpaperscissors})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card2", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card2", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff]  px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Rock Paper and Scissors
              </button>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => playGame("spin_wheel")}
              className={`relative group ${
                tabViews[2]?.isActive ? "" : "hover:opacity-60"
              } hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${spinwheel})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card3", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card3", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff] px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Spin Wheel
              </button>
            </div>

            {/* Card 4 */}
            <div
              onClick={() => playGame("number_guess")}
              className={`relative group ${
                tabViews[3]?.isActive ? "" : "hover:opacity-60"
              } hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${numberguessing})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card4", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card4", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff] px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Guess Number
              </button>
            </div>

            {/* Card 5 */}
            <div
              onClick={() => playGame("question")}
              className={`relative group ${
                tabViews[4]?.isActive ? "" : "hover:opacity-60"
              } hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${questionAndAnswer})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card5", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card5", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff] px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Question and Answer
              </button>
            </div>

            {/* Card 6 */}
            <div
              onClick={() => playGame("dice_rolling")}
              className={`relative group ${
                tabViews[5]?.isActive ? "" : "hover:opacity-60"
              } hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${dicerolling})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card6", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card6", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff] px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Play Dice Rolling
              </button>
            </div>

            {/* Card 7 */}
            <div
              onClick={() => playGame("card_finding")}
              className={`relative group ${
                tabViews[6]?.isActive ? "" : "hover:opacity-60"
              } hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${cardfinding})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card7", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card7", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff] px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Play Card Finding
              </button>
            </div>

            {/* Card 8 */}
            <div
              onClick={() => playGame("number_slot")}
              className={`relative group ${
                tabViews[7]?.isActive ? "" : "hover:opacity-60"
              } hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${numberslot})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card8", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card8", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff] px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Play Number Slot
              </button>
            </div>

            {/* Card 9 */}
            <div
              onClick={() => playGame("number_pool")}
              className={`relative group ${
                tabViews[8]?.isActive ? "" : "hover:opacity-60"
              } hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${poolnumber})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card9", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card9", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff] px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Play Pool Number
              </button>
            </div>

            {/* Card 10 */}
            <div
              className={`relative group ${
                tabViews[9]?.isActive ? "" : "hover:opacity-60"
              } hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${roulette})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card10", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card10", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff] px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Roulette
              </button>
            </div>

            {/* Card 11 */}
            <div
              onClick={() => playGame("ludo")}
              className={`relative group ${
                tabViews[10]?.isActive ? "" : "hover:opacity-60"
              } hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${casinodice})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card11", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card11", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff] px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Ludo
              </button>
            </div>

            {/* Card 12 */}
            <div
              onClick={() => playGame("keno")}
              className={`relative group ${
                tabViews[11]?.isActive ? "" : "hover:opacity-60"
              } hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${keno})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card12", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card12", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff] px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Keno
              </button>
            </div>

            {/* Card 13 */}
            <div
              onClick={() => playGame("black_jack")}
              className={`relative group ${
                tabViews[12]?.isActive ? "" : "hover:opacity-60"
              } hover:bg-[#3F93F9] w-full rounded-b-3xl rounded-t-3xl transition-transform duration-700 transform hover:-translate-y-4`}
              style={{
                backgroundImage: `url(${blackjack})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "280px",
              }}
            >
              {/* Button at center bottom */}
              <button
                onMouseEnter={(e) => tabSwitch(e, "card13", "enter")}
                onMouseLeave={(e) => tabSwitch(e, "card13", "leave")}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#3F93F9] text-[#fff]  px-8 py-9 rounded-b-3xl cursor-pointer w-full text-2xl"
              >
                Black And jack
              </button>
            </div>
            {/* Repeat similar structure for more cards */}
          </div>
        </section>
      )}
    </>
  );
};

export default Section3;
