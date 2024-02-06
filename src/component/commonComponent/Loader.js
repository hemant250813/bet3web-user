import React, { useState, useEffect } from "react";
import "../../loader.css";
import face1 from "../../assets/images/loader/61051cb37ad601627724979.jpg";
import face2 from "../../assets/images/loader/630600f0daf711661337840.jpg";
import face3 from "../../assets/images/loader/6306011c5afd11661337884.jpg";
import face4 from "../../assets/images/loader/blackjack-preview.png";
import face5 from "../../assets/images/loader/610521608fde21627726176.jpg";
import face6 from "../../assets/images/loader/thumb_63060112437731661337874.jpg";
import logo from "../../assets/images/logo.png";

const Loader = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

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

  return (
    <div className="relative">
      <div
        style={{
          position: "absolute",
          left:
            windowWidth === 2560
              ? "850px"
              : windowWidth === 1440
              ? "450px"
              : windowWidth === 1024
              ? "310px"
              : windowWidth === 768
              ? "230px"
              : windowWidth === 425
              ? "100px"
              : windowWidth === 375
              ? "80px"
              : windowWidth === 320
              ? "70px"
              : "790px",
          top:
            windowWidth === 2560
              ? "360px"
              : windowWidth === 1440
              ? "360px"
              : windowWidth === 1024
              ? "450px"
              : windowWidth === 768
              ? "450px"
              : windowWidth === 425
              ? "340px"
              : windowWidth === 375
              ? "390px"
              : windowWidth === 320
              ? "380px"
              : "130px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            perspective: "600px",
            backgroundColor: "black",
          }}
          // className="container"
        >
          <div className="cube">
            <div
              style={{
                backgroundImage: `url(${face1})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className="face"
            ></div>
            <div
              style={{
                backgroundImage: `url(${face2})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className="face"
            ></div>
            <div
              style={{
                backgroundImage: `url(${face3})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className="face"
            ></div>
            <div
              style={{
                backgroundImage: `url(${face4})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className="face"
            ></div>
            <div
              style={{
                backgroundImage: `url(${face5})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className="face"
            ></div>
            <div
              style={{
                backgroundImage: `url(${face6})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className="face"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
