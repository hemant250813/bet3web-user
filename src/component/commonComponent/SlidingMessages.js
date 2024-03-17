import React, { useState, useEffect } from "react";

const SlidingMessage = ({ question }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "Card 1",
      content: "This is the content of card 1.",
    },
    {
      title: "Card 2",
      content: "This is the content of card 2.",
    },
    {
      title: "Card 3",
      content: "This is the content of card 3.",
    },
    {
      title: "Card 4",
      content: "This is the content of card 4.",
    },
    {
      title: "Card 5",
      content: "This is the content of card 5.",
    },
    {
      title: "Card 6",
      content: "This is the content of card 6.",
    },
  ];


  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex === Math.ceil(cards.length / 2) - 1 ? 0 : prevIndex + 1));
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.ceil(cards.length / 2) - 1 : prevIndex - 1));
  };

  return (
    <div className="relative">
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={prevCard}
        className="text-white bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
      >
        &lt;
      </button>
      <button
        onClick={nextCard}
        className="text-white bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
      >
        &gt;
      </button>
    </div>
    <div className="overflow-hidden relative">
      <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 50}%)` }}>
        {cards.map((card, index) => (
          <div key={index} className="w-1/2 px-2">
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
              <p>{card.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default SlidingMessage;
