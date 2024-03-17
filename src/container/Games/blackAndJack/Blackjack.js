import React, { useState } from "react";

import aBlack from "../../../assets/images/games/card/aBlack.png";
import aClubs from "../../../assets/images/games/card/aClubs.png";
import aHeart from "../../../assets/images/games/card/aHeart.png";
import clubs2 from "../../../assets/images/games/card/clubs2.png";
import clubs3 from "../../../assets/images/games/card/clubs3.png";
import clubs4 from "../../../assets/images/games/card/clubs4.png";
import clubs7 from "../../../assets/images/games/card/clubs7.png";
import diamond2 from "../../../assets/images/games/card/diamond2.png";
import diamond5 from "../../../assets/images/games/card/diamond5.png";
import diamond9 from "../../../assets/images/games/card/diamond9.png";
import diamond10 from "../../../assets/images/games/card/diamond10.png";
import heart3 from "../../../assets/images/games/card/heart3.png";
import heart4 from "../../../assets/images/games/card/heart4.png";
import heart8 from "../../../assets/images/games/card/heart8.png";
import heart9 from "../../../assets/images/games/card/heart9.png";
import jBlack from "../../../assets/images/games/card/jBlack.png";
import kHeart from "../../../assets/images/games/card/kHeart.png";
import qBlack from "../../../assets/images/games/card/qBlack.png";
import qHeart from "../../../assets/images/games/card/qHeart.png";
import spade5 from "../../../assets/images/games/card/spade5.png";
import spade7 from "../../../assets/images/games/card/spade7.png";

const cards = [
  { name: aBlack, value: 1 },
  { name: aClubs, value: 1 },
  { name: aHeart, value: 1 },
  { name: clubs2, value: 2 },
  { name: clubs3, value: 3 },
  { name: clubs4, value: 4 },
  { name: clubs7, value: 7 },
  { name: diamond2, value: 2 },
  { name: diamond5, value: 5 },
  { name: diamond9, value: 9 },
  { name: diamond10, value: 10 },
  { name: heart3, value: 3 },
  { name: heart4, value: 4 },
  { name: heart8, value: 8 },
  { name: heart9, value: 9 },
  { name: jBlack, value: 10 },
  { name: kHeart, value: 10 },
  { name: qBlack, value: 10 },
  { name: qHeart, value: 10 },
  { name: spade5, value: 5 },
  { name: spade7, value: 7 },
];
function Blackjack() {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);

  const dealCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
  };

  const handleDeal = () => {
    const newPlayerCards = [...playerCards, dealCard()];
    const newDealerCards = [...dealerCards, dealCard()];
    setPlayerCards(newPlayerCards);
    setDealerCards(newDealerCards);
  };

  return (
    <div>
      <h1>Blackjack Game</h1>
      <button onClick={handleDeal}>Deal</button>
      <div>
        <h2>Player's Cards</h2>
        <div>
          {playerCards.map((card, index) => (
            <img key={index} src={card?.name} alt={card.name} />
          ))}
        </div>
      </div>
      <div>
        <h2>Dealer's Cards</h2>
        <div>
          {dealerCards.map((card, index) => (
            <img key={index} src={card?.name} alt={card.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blackjack;
