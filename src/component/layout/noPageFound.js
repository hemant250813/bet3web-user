import React from "react";
import { useNavigate } from "react-router-dom";
import pageNotFound from "../../assets/images/pageNotFound.png";
import { getLocalStorageItem } from "../../utils/helper";

const NoPageFound = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(getLocalStorageItem("user"));
  console.log("userData", userData);

  const redirect = () => {
    if (userData?.type === 2) {
      navigate("/");
    } else {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw", // Use viewport width
        height: "100vh", // Use viewport height
        backgroundImage: `url(${pageNotFound})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <button
          onClick={() => redirect()}
          className="absolute top-5 left-10 flex items-center space-x-2 border border-[gray] text-[#3F93F9] px-8 py-4 rounded-md focus:outline-none focus:border-yellow-700 focus:ring focus:ring-[#E3BC3F] z-50 text-2xl font-bold blink-animation"
        >
          <p>Back</p>
        </button>
      </div>
    </div>
  );
};

export default NoPageFound;
