import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Header, HumburgerHeader } from "../component/layout";
import { Section3 } from "../container/Section";
import GameTitle from "./Games/GameTitle";
import HeaderBackground from "../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../utils/helper";
import { Loader } from "../component/commonComponent";

const Game = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [loading, setLoading] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && userData) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
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
            {hideHeader ? <HumburgerHeader /> : <Header isVerifyMail={false} loading ={loading} setLoading={setLoading}/>}
            {/* Centered div */}
            {/* Centered div */}
            <GameTitle title="Dashboard" route="dashboard" />
          </section>
          <Section3 games={false} isDashboard={true} loading ={loading} setLoading={setLoading}/>
        </>
      )}
    </>
  );
};
export default Game;
