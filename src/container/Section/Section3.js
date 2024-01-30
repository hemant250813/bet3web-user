import React from "react";
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

const Section3 = ({ games }) => {
  const navigate = useNavigate();
  return (
    <section
      className={`bg-black relative flex-grow p-4 md:p-8 lg:p-12 overflow-hidden`}
    >
      {games && (
        <div className="text-white text-center text-2xl mt-8 mb-12 font-bold">
          <p>Our Awesome Games</p>
        </div>
      )}
      <div
        className={`${
          games ? "" : "p-28"
        } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}
      >
        {/* Card 1 */}
        <div
          onClick={() => navigate("/head_tail")}
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
          onClick={() => navigate("/rock_paper_scissors")}
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
          onClick={() => navigate("/spin_wheel")}
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
          onClick={() => navigate("/number_guess")}
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
          onClick={() => navigate("/dice_rolling")}
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

        {/* Card 6 */}
        <div
          onClick={() => navigate("/card_finding")}
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

        {/* Card 7 */}
        <div
          onClick={() => navigate("/number_slot")}
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

        {/* Card 8 */}
        <div
          onClick={() => navigate("/number_pool")}
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

        {/* Card 9 */}
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

        {/* Card 10 */}
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

        {/* Card 11 */}
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

        {/* Card 12 */}
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
  );
};

export default Section3;
