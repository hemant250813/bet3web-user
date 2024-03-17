import React, { useState, useEffect, useRef, memo } from "react";

const slotChoices = ["8", "4", "2", "6", "5", "7", "1", "3", "9"];

const NumberSlot = ({
  isPaused,
  setIsPaused,
  randomValue,
  widthSlot,
  heightSlot,
  paddingSlot,
  marginSlot,
  fontSizeTitle,
  letterSpacingTitle,
  marginTitle,
  callbackCardShuffledPicked,
  threeDigitNumber,
}) => {
  const [content, setContent] = useState(slotChoices);
  const [pick1, setPick1] = useState("1");
  const [pick2, setPick2] = useState("6");
  const [pick3, setPick3] = useState("5");
  const [jackpot, setJackpot] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [bgColor, setBgColor] = useState("rgb(255, 254, 253)");

  const reelSpin = useRef(
    new Audio(
      "https://raw.githubusercontent.com/SixStringsCoder/slot_machine/master/src/components/App/audio/reel_spin.mp3"
    )
  );
  const winningSFX = useRef(
    new Audio(
      "https://raw.githubusercontent.com/SixStringsCoder/slot_machine/master/src/components/App/audio/winner.mp3"
    )
  );

  console.log("isResult", isResult);
  useEffect(() => {
    if (isResult) {
      let hundred = hundredPercentReturn(
        pick1 + pick2 + pick3,
        threeDigitNumber
      );
      if (hundred) {
        callbackCardShuffledPicked("win", jackpot, 100);
      } else {
        let twentyFive = twentyFivePercentReturn(
          pick1 + pick2 + pick3,
          threeDigitNumber
        );
        if (twentyFive) {
          callbackCardShuffledPicked("win", jackpot, 25);
        } else {
          if ("777" === pick1 + pick2 + pick3) {
            callbackCardShuffledPicked("win", jackpot, 2);
          } else if (threeDigitNumber === pick1 + pick2 + pick3) {
            callbackCardShuffledPicked("win", jackpot, 150);
          } else {
            callbackCardShuffledPicked("lose", jackpot, 0);
          }
        }
      }
      // console.log("result", pick1 + pick2 + pick3);
      // console.log("threeDigitNumber", threeDigitNumber);

      setIsResult(false);
      console.log({ pick1: pick1, pick2: pick2, pick3: pick3 });
    }
  }, [isResult]);

  const hundredPercentReturn = (randomNumber, pickedNumber) => {
    let splitNumber = pickedNumber?.split("");
    if (randomNumber.indexOf(splitNumber[0]) !== -1) {
      return true;
    } else if (randomNumber.indexOf(splitNumber[1]) !== -1) {
      return true;
    } else if (randomNumber.indexOf(splitNumber[2]) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const twentyFivePercentReturn = (randomNumber, pickedNumber) => {
    let splitNumber = pickedNumber?.split("");

    let twoDigit1 = splitNumber[0] + splitNumber[1];
    let twoDigit2 = splitNumber[1] + splitNumber[2];

    if (randomNumber.indexOf(twoDigit1) !== -1) {
      return true;
    } else if (randomNumber.indexOf(twoDigit2) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    reelSpin.current.volume = 0.15;
    reelSpin.current.loop = true;
  }, []);

  useEffect(() => {
    if (isPaused) {
      startSpinCycle(randomValue);
    }

    if (pick1 === "7" && pick2 === "7" && pick3 === "7") {
      setJackpot(true);
      winSFX();
      startColorShow();
    }
  }, [isPaused, randomValue]);

  const stopSFX = () => {
    const reelStop = new Audio(
      "https://raw.githubusercontent.com/SixStringsCoder/slot_machine/master/src/components/App/audio/crash.mp3"
    );
    reelStop.volume = 0.19;
    reelStop.play();
  };

  const spinSFX = () => {
    reelSpin.current.currentTime = 0;
    reelSpin.current.play();
  };

  const winSFX = () => {
    winningSFX.current.currentTime = 0;
    winningSFX.current.play();
    setIsPaused(false);
  };

  const randomColor = () => Math.floor(Math.random() * 256);

  const startColorShow = () => {
    let count = 0;
    const colorShow = setInterval(() => {
      if (count === 105) {
        clearInterval(colorShow);
        endColorShow();
      } else {
        count += 1;
        setBgColor(`rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`);
      }
    }, 100);
  };

  const endColorShow = () => {
    setJackpot(false);
  };

  const spinReelCycle = (amountOfSpins, setPick) => {
    const arr = content;
    let counter = 0;
    let index = 0;

    const spinReelOnce = () => {
      if (counter === amountOfSpins) {
        stopSFX();
        clearInterval(reelspin);
      } else {
        setPick(arr[index]);
        counter += 1;
        index < arr.length - 1 ? (index += 1) : (index = 0);
      }
    };

    const reelspin = setInterval(spinReelOnce, 100);
  };

  const spinReel1Cycle = (amountOfSpins) => {
    spinReelCycle(amountOfSpins, setPick1);
  };

  const spinReel2Cycle = (amountOfSpins) => {
    spinReelCycle(amountOfSpins, setPick2);
  };

  const spinReel3Cycle = (amountOfSpins) => {
    const arr = content;
    let counter = 0;
    let index = 0;

    const spinReelOnce = () => {
      if (counter === amountOfSpins) {
        clearInterval(reelspin);
        stopSFX();
        reelSpin.current.pause();
        setIsResult(true);
        // if (pick1 === pick2 && pick2 === pick3) {
        //   setJackpot(true);
        //   winSFX();
        //   startColorShow();
        // }
      } else {
        setPick3(arr[index]);
        counter += 1;
        index < arr.length - 1 ? (index += 1) : (index = 0);
      }
    };

    const reelspin = setInterval(spinReelOnce, 100);
  };

  const randomNumber = () => Math.floor(Math.random() * 20) + 10;

  const startSpinCycle = (thisAmount) => {
    spinReel1Cycle(thisAmount);
    spinReel2Cycle(thisAmount + randomNumber());
    spinReel3Cycle(thisAmount + 12 + randomNumber());

    reelSpin.current.volume = 0.3;
    spinSFX();

    if (!winningSFX.current.ended) {
      winningSFX.current.pause();
      spinSFX();
    }
  };

  return (
    <main
      style={
        jackpot
          ? {
              backgroundColor: bgColor,
              //  height: "200px", width: "200px"
            }
          : {
              backgroundImage: "radial-gradient(yellow, green)",
              // height: "200px",
              // width: "200px",
            }
      }
    >
      <header>
        {/* <h1 id="title">{jackpot ? "JACKPOT!" : "Lost Wages"}</h1> */}
        <h1
          style={{
            fontSize: fontSizeTitle,
            fontWeight: "bold",
            color: "#d60000",
            textShadow: "0 0 13px white",
            letterSpacing: letterSpacingTitle,
            fontFamily: '"Satisfy", cursive',
            margin: marginTitle,
          }}
          id="title"
        >
          {jackpot ? "JACKPOT!" : "Lost Wages"}
        </h1>
      </header>
      <section
        style={{
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="spindle"
      >
        <Slot
          result={pick1}
          widthSlot={widthSlot}
          heightSlot={heightSlot}
          paddingSlot={paddingSlot}
          marginSlot={marginSlot}
          fontSizeTitle={fontSizeTitle}
          letterSpacingTitle={letterSpacingTitle}
          marginTitle={marginTitle}
        />
        <Slot
          result={pick2}
          widthSlot={widthSlot}
          heightSlot={heightSlot}
          paddingSlot={paddingSlot}
          marginSlot={marginSlot}
          fontSizeTitle={fontSizeTitle}
          letterSpacingTitle={letterSpacingTitle}
          marginTitle={marginTitle}
        />
        <Slot
          result={pick3}
          widthSlot={widthSlot}
          heightSlot={heightSlot}
          paddingSlot={paddingSlot}
          marginSlot={marginSlot}
          fontSizeTitle={fontSizeTitle}
          letterSpacingTitle={letterSpacingTitle}
          marginTitle={marginTitle}
        />
      </section>
      {/* <SpinButton spinAmount={startSpinCycle} /> */}
    </main>
  );
};

const Slot = memo(
  ({ result, widthSlot, heightSlot, paddingSlot, marginSlot }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: widthSlot,
          height: heightSlot,
          padding: paddingSlot,
          border: "1px solid gray",
          boxShadow:
            "inset 2px -10px 8px -10px black, inset 1px 11px 8px -10px black",
          margin: marginSlot,
          background: "white",
        }}
        className="slot-object"
      >
        <p className="reel-obj">{result}</p>
      </div>
    );
  }
);

// const SpinButton = ({ spinAmount }) => {
//   const handleSpin = () => {
//     const thisAmount = Math.floor(Math.random() * 36) + 20;
//     spinAmount(thisAmount);
//   };

//   return (
//     <div id="spinBtnContainer">
//       <button type="submit" id="spinnerBtn" onClick={handleSpin}>
//         Spin
//       </button>
//     </div>
//   );
// };

export default NumberSlot;
