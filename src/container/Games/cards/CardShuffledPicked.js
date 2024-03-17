import React, { useState, useEffect } from "react";
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

const CardShuffledPicked = ({ callbackCardShuffledPicked }) => {
  const playingCard = [
    { card1: aBlack },
    { card2: aClubs },
    { card3: aHeart },
    { card4: clubs2 },
    { card5: clubs3 },
    { card6: clubs4 },
    { card7: clubs7 },
    { card8: diamond2 },
    { card9: diamond5 },
    { card10: diamond9 },
    { card11: diamond10 },
    { card12: heart3 },
    { card13: heart4 },
    { card14: heart8 },
    { card15: heart9 },
    { card16: jBlack },
    { card17: kHeart },
    { card18: qBlack },
    { card19: qHeart },
    { card20: spade5 },
    { card21: spade7 },
  ];

  const [cards, setCards] = useState(playingCard);

  useEffect(() => {
    // Shuffle the cards array
    const shuffled = [...playingCard].sort(() => Math.random() - 0.5);
    let result = Object.keys(shuffled[3])[0];
    if (result === "card2") {
      callbackCardShuffledPicked("win");
    } else if (result === "card3") {
      callbackCardShuffledPicked("win");
    } else {
      callbackCardShuffledPicked("lose");
    }
    console.log("result", result);
    setCards(shuffled);
  }, []);

  return (
    <div className="flickity-container-card-picked">
      <div className="hand-card-picked">
        {cards.map((cardObject, index) => {
          const cardKey = Object.keys(cardObject)[0]; // Extracting the key
          const card = cardObject[cardKey]; // Extracting the card image
          return (
            <div key={index} className={`card-picked card-picked-${index}`}>
              <img src={card} alt={`card${index}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardShuffledPicked;
