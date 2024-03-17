import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "../../assets/images/profile/profile.jpeg";
import { getLocalStorageItem, notifyWarning } from "../../utils/helper";

const QuestionSlider = ({ question, navbar }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [clearIntervalSlide, setClearIntervalSlide] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));

  console.log("question", question);
  const navigate = useNavigate();

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
    };
  }, [windowWidth, windowHeight]);

  const slideInterval = () => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 3000); // Change 5000 to your desired interval in milliseconds

    setClearIntervalSlide(interval);
  };

  const slideIntervalStop = () => {
    clearInterval(clearIntervalSlide);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      currentSlide === 0
        ? Math.ceil(question?.length / 2) - 1
        : currentSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide(
      currentSlide === Math.ceil(question?.length / 2) - 1
        ? 0
        : currentSlide + 1
    );
  };

  const handleSlideTo = (index) => {
    setCurrentSlide(index);
  };

  const playQuestion = () => {
    if (isAuth && userData) {
      navigate("/question");
    } else {
      notifyWarning("Please login to play.");
    }
  };

  const renderCardPairs = () => {
    const startIndex = currentSlide * 2;
    const endIndex = Math.min(startIndex + 2, question?.length);
    const cardPairs = question?.slice(startIndex, endIndex);

    return cardPairs?.map((item, index) => (
      <div
        onMouseEnter={(e) => {
          e.preventDefault();
          slideIntervalStop();
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          slideInterval();
        }}
        key={index}
        className={`grid grid-cols-1 justify-center text-white items-center w-full h-full rounded-2xl bg-[#3F93F9] ${
          windowWidth <= 325 ? "pb-2" : "pb-12"
        } `}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "100px",
        }}
      >
        <span
          className={`flex relative ${windowWidth <= 425 ? "pt-2" : "pt-2"}`}
        >
          {" "}
          <p
            className={`text-[#121212] flex-wrap ${
              windowWidth <= 425 ? "pt-1 text-2xl font-bold" : "pt-2 text-6xl"
            } `}
          >
            *
          </p>
          <p
            className={`${
              windowWidth <= 425 ? "pt-2 ml-2 font-bold" : "text-3xl pt-2 ml-2"
            } `}
          >
            {item?.question}
          </p>
        </span>

        <div className={`flex ${windowWidth <= 425 ? "text-xl" : ""} `}>
          <p
            className={`mx-8 ${windowWidth <= 425 ? "text-xl" : "text-3xl"}`}
          >{`Odd`} {item?.odd1}</p>
          <p
            className={`mx-8 ${windowWidth <= 425 ? "text-xl" : "text-3xl"}`}
          >{`Odd`} {item?.odd2}</p>
          <p
            className={`mx-8 ${windowWidth <= 425 ? "text-xl" : "text-3xl"}`}
          >{`Odd`} {item?.odd3}</p>
        </div>
        <div className={`flex ${windowWidth <= 425 ? "text-xl" : ""} `}>
          <span
            className={` flex relative ${windowWidth <= 425 ? "p-1" : "p-8"}`}
          >
            <p
              className={`text-[#121212] ${
                windowWidth <= 425
                  ? "text-5xl pt-2 font-bold"
                  : " font-bold text-5xl"
              }`}
            >
              .
            </p>
            <p
              className={`${
                windowWidth <= 425
                  ? "text-sm pt-8 pl-2 "
                  : "pt-5 pl-2 font-bold text-2xl "
              }`}
            >
              {item?.option1}
            </p>
          </span>
          <span
            className={` flex relative ${windowWidth <= 425 ? "p-4" : "p-8"}`}
          >
            <p
              className={`text-[#121212] ${
                windowWidth <= 425
                  ? "text-5xl pt-2 font-bold"
                  : "font-bold text-5xl"
              }`}
              pt-5
            >
              .
            </p>
            <p
              className={`${
                windowWidth <= 425
                  ? "text-sm pt-8 pl-2 font-bold"
                  : "pt-5 pl-2 font-bold text-2xl "
              }`}
            >
              {item?.option2}
            </p>
          </span>
          <span
            className={` flex relative ${windowWidth <= 425 ? "p-4" : "p-8"}`}
          >
            <p
              className={`text-[#121212] ${
                windowWidth <= 425
                  ? "text-5xl pt-2 font-bold"
                  : "font-bold text-5xl"
              }`}
            >
              .
            </p>
            <p
              className={`${
                windowWidth <= 425
                  ? "text-sm pt-8 pl-2 font-bold"
                  : "pt-5 pl-2  font-bold text-2xl "
              }`}
            >
              {item?.option3}
            </p>
          </span>
        </div>
        <div className="flex mb-4 text-3xl p-2">
          <img
            onMouseEnter={(e) => {
              e.preventDefault();
              setImageIndex(index);
              // slideIntervalStop();
            }}
            onMouseLeave={(e) => {
              e.preventDefault();
              setImageIndex(999);
            }}
            src={item?.image1}
            alt="Profile"
            className={`rounded-full ${
              imageIndex === index
                ? windowWidth <= 400
                  ? "w-10 h-10 mx-4 transition-transform duration-700 transform hover:-translate-y-4"
                  : windowWidth <= 425
                  ? "w-12 h-12 mx-2 transition-transform duration-700 transform hover:-translate-y-4"
                  : "w-28 h-28 mx-14 transition-transform duration-700 transform hover:-translate-y-4"
                : windowWidth <= 400
                ? "w-16 h-16 mx-8 transition-transform duration-700 transform hover:-translate-y-4"
                : windowWidth <= 425
                ? "w-20 h-20 mx-4 transition-transform duration-700 transform hover:-translate-y-4"
                : "w-24 h-24 mx-10 transition-transform duration-700 transform hover:-translate-y-4"
            }`}
          />
          <img
            onMouseEnter={(e) => {
              e.preventDefault();
              setImageIndex(index);
              // slideIntervalStop();
            }}
            onMouseLeave={(e) => {
              e.preventDefault();
              setImageIndex(999);
            }}
            src={item?.image2}
            alt="Profile"
            className={` rounded-full ${
              imageIndex === index
                ? windowWidth <= 400
                  ? "w-10 h-10 mx-4 transition-transform duration-700 transform hover:-translate-y-4"
                  : windowWidth <= 425
                  ? "w-12 h-12 mx-2 transition-transform duration-700 transform hover:-translate-y-4"
                  : "w-28 h-28 mx-14 transition-transform duration-700 transform hover:-translate-y-4"
                : windowWidth <= 400
                ? "w-16 h-16 mx-8 transition-transform duration-700 transform hover:-translate-y-4"
                : windowWidth <= 425
                ? "w-20 h-20 mx-4 transition-transform duration-700 transform hover:-translate-y-4"
                : "w-24 h-24 mx-10 transition-transform duration-700 transform hover:-translate-y-4"
            }`}
          />
          <img
            onMouseEnter={(e) => {
              e.preventDefault();
              setImageIndex(index);
              // slideIntervalStop();
            }}
            onMouseLeave={(e) => {
              e.preventDefault();
              setImageIndex(999);
            }}
            src={item?.image3}
            alt="Profile"
            className={`rounded-full  ${
              imageIndex === index
                ? windowWidth <= 400
                  ? "w-10 h-10 mx-4 transition-transform duration-700 transform hover:-translate-y-4"
                  : windowWidth <= 425
                  ? "w-12 h-12 mx-4 transition-transform duration-700 transform hover:-translate-y-4"
                  : "w-28 h-28 mx-14 transition-transform duration-700 transform hover:-translate-y-4"
                : windowWidth <= 400
                ? "w-16 h-16 mx-8 transition-transform duration-700 transform hover:-translate-y-4"
                : windowWidth <= 425
                ? "w-20 h-20 mx-8 transition-transform duration-700 transform hover:-translate-y-4"
                : "w-24 h-24 mx-10 transition-transform duration-700 transform hover:-translate-y-4"
            }`}
          />
        </div>
        <div className="flex">
          <button
            onClick={(e) => {
              playQuestion();
            }}
            onMouseEnter={(e) => {
              e.preventDefault();
              // slideIntervalStop();
            }}
            className="bg-[#121212] py-2 px-4 rounded-2xl hover:text-[#3F93F9] font-bold"
          >
            Play Now
          </button>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    slideInterval();
    return () => clearInterval(clearIntervalSlide);
  }, [currentSlide]);

  return (
    <div
      id="default-carousel"
      className="w-full"
      data-carousel="slide"
      style={{}}
    >
      {/* Carousel wrapper */}
      <div
        className={`relative ${
          windowWidth <= 425 ? "h-96" : "h-[500px]"
        } w-full overflow-hidden rounded-lg mb-20`}
      >
        {/* Render each carousel item */}
        {question !== null &&
          [...Array(Math.ceil(question?.length / 2))].map((_, index) => (
            <div
              key={index}
              className={`duration-700 ease-in-out flex gap-8 mb-2 w-full${
                currentSlide === index ? "" : "hidden"
              }`}
              data-carousel-item
            >
              {renderCardPairs()}
            </div>
          ))}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {question !== null &&
          [...Array(Math.ceil(question?.length / 2))].map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-[#3F93F9]" : "bg-white"
              }`}
              aria-current={currentSlide === index ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleSlideTo(index)}
              data-carousel-slide-to={index}
            />
          ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrevSlide}
        data-carousel-prev
      >
        {/* Previous button content */}
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNextSlide}
        data-carousel-next
      >
        {/* Next button content */}
      </button>
    </div>
  );
};

export default QuestionSlider;
