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
import { getLocalStorageItem, WarningToast } from "../../utils/helper";
import { Loader } from "../../component/commonComponent";

const Section3 = ({ games, isDashboard, loading, setLoading, userDetails }) => {
  const [loginTimeOut, setLoginTimeOut] = useState(0);

  const navigate = useNavigate();
  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));

  useEffect(() => {
    // Clean up the event listener when the component unmounts
    return () => {
      clearTimeout(loginTimeOut);
    };
  }, []);

  const afterLoadingDispatch = (route) => {
    navigate(`/${route}`);
  };

  const playGame = (route) => {
    if (isAuth && userData) {
      setLoading(true);
      let timeout = setTimeout(() => {
        afterLoadingDispatch(route);
      }, 2000);
      setLoginTimeOut(timeout);
    } else {
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
            <div className="text-white text-center text-2xl mt-8 mb-12 font-bold">
              <p>Our Awesome Games</p>
            </div>
          )}
          {isDashboard && <Account userDetails={userDetails} />}
          <div
            className={`${
              games ? "" : "p-28"
            } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}
          >
            {/* Card 1 */}
            <div
              onClick={() => playGame("head_tail")}
              className="relative group"
              style={{
                backgroundImage: `url(${headandtail})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
              </button>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => playGame("rock_paper_scissors")}
              className="relative group"
              style={{
                backgroundImage: `url(${rockpaperscissors})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
              </button>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => playGame("spin_wheel")}
              className="relative group"
              style={{
                backgroundImage: `url(${spinwheel})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
              </button>
            </div>

            {/* Card 4 */}
            <div
              onClick={() => playGame("number_guess")}
              className="relative group"
              style={{
                backgroundImage: `url(${numberguessing})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
              </button>
            </div>

            {/* Card 5 */}
            <div
              onClick={() => playGame("question")}
              className="relative group"
              style={{
                backgroundImage: `url(${questionAndAnswer})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
              </button>
            </div>

            {/* Card 6 */}
            <div
              onClick={() => playGame("dice_rolling")}
              className="relative group"
              style={{
                backgroundImage: `url(${dicerolling})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
              </button>
            </div>

            {/* Card 7 */}
            <div
              onClick={() => playGame("card_finding")}
              className="relative group"
              style={{
                backgroundImage: `url(${cardfinding})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
              </button>
            </div>

            {/* Card 8 */}
            <div
              onClick={() => playGame("number_slot")}
              className="relative group"
              style={{
                backgroundImage: `url(${numberslot})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
              </button>
            </div>

            {/* Card 9 */}
            <div
              onClick={() => playGame("number_pool")}
              className="relative group"
              style={{
                backgroundImage: `url(${poolnumber})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
              </button>
            </div>

            {/* Card 10 */}
            <div
              className="relative group"
              style={{
                backgroundImage: `url(${roulette})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
              </button>
            </div>

            {/* Card 11 */}
            <div
              className="relative group"
              style={{
                backgroundImage: `url(${casinodice})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
              </button>
            </div>

            {/* Card 12 */}
            <div
              className="relative group"
              style={{
                backgroundImage: `url(${keno})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
              </button>
            </div>

            {/* Card 13 */}
            <div
              className="relative group"
              style={{
                backgroundImage: `url(${blackjack})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px",
              }}
            >
              {/* Button at center bottom */}
              <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#E3BC3F] text-black px-8 py-3 rounded-full cursor-pointer w-4/5">
                Play Now
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
