import React, { useState, useEffect } from "react";
import Slot from "../NumberSlots/Slot";

const JSlots = ({ number, winnerNumber, onWin }) => {
  const allSlots = Array.from({ length: number }, (_, index) => index + 1);

  const playSlots = () => {
    // Implement logic to start the slots
  };

  return (
    <div className="fancy">
      {allSlots.map((slotNumber) => (
        <Slot
          key={slotNumber}
          number={slotNumber}
          winnerNumber={winnerNumber}
          onWin={onWin}
        />
      ))}
      <button id="playBtn" onClick={playSlots}>
        Play
      </button>
    </div>
  );
};

export default JSlots;
