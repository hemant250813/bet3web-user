import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import aBlack from "../../assets/images/games/card/aBlack.png";
import aClubs from "../../assets/images/games/card/aClubs.png";
import aHeart from "../../assets/images/games/card/aHeart.png";
import clubs2 from "../../assets/images/games/card/clubs2.png";

const Carousel = ({ get_bank_slider }) => {
  const playingCard = [aBlack, aClubs, aHeart, clubs2];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlideIntervals, setNextSlideIntervals] = useState(0);
  const [count, setCount] = useState(0);
  const totalSlides = get_bank_slider?.length;
  console.log("get_bank_slider", get_bank_slider);
  useEffect(() => {
    let nextSlideInterval = setInterval(() => {
      if (get_bank_slider?.length > 1) {
        goToNextSlide();
      }
    }, 2000);
    setNextSlideIntervals(nextSlideInterval);

    // Clean up the event listener when the component unmounts
    return () => {
      clearInterval(nextSlideInterval);
    };
  }, [count]);

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {get_bank_slider?.map((card, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out ${
              index === currentSlide ? "" : "hidden"
            }`}
            data-carousel-item
          >
            <img
              src={card?.image}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              alt="..."
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-2">
        {get_bank_slider?.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentSlide ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
      <button
        onMouseEnter={() => clearInterval(nextSlideIntervals)}
        onMouseLeave={() => setCount(count + 1)}
        type="button"
        onClick={goToPreviousSlide}
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none text-white"
        data-carousel-prev
      >
        <FaChevronLeft size={30} />
      </button>
      <button
        onMouseEnter={() => clearInterval(nextSlideIntervals)}
        onMouseLeave={() => setCount(count + 1)}
        type="button"
        onClick={goToNextSlide}
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none text-white"
        data-carousel-next
      >
        <FaChevronRight size={30} />
      </button>
    </div>
  );
};

export default Carousel;
