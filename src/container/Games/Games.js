import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, HumburgerHeader } from "../../component/layout";
import { Section3 } from "../Section";
import GameTitle from "./GameTitle";
import HeaderBackground from "../../assets/images/headerBackground.jpg";

const Game = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);

  return (
    <>
      <section
        className="relative flex-grow p-4 md:p-8 lg:p-12"
        style={{
          backgroundImage: `url(${HeaderBackground})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "400px",
          display: "flex", // Add these styles
          justifyContent: "center", // to center horizontally
          alignItems: "center", // and vertically
        }}
      >
        {/* Mobile Header with Hamburger Icon */}
        {hideHeader ? <HumburgerHeader /> : <Header isVerifyMail={false}/>}
        {/* Centered div */}
        {/* Centered div */}
        <GameTitle title="Games" route="games" />
      </section>
      <Section3 games={false} />
    </>
  );
};
export default Game;
