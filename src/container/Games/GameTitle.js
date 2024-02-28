import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GameTitle = ({ title, route }) => {
  const [tabViews, setTabViews] = useState([
    { route: "home", isActive: false },
    { route: `${route}`, isActive: true },
  ]);

  const navigate = useNavigate();

  const tabSwitch = (e, tab) => {
    e.preventDefault();

    const filterTabList = tabViews.map((el) =>
      el.route === tab ? { ...el, isActive: true } : { ...el, isActive: false }
    );
    setTabViews(filterTabList);

    if (tab === "home") {
      navigate("/");
    } else {
      navigate(`/${route}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="flex flex-col md:flex-row gap-4">
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight whitespace-pre-line">
          {title}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex items-center">
          <span
            onClick={(e) => tabSwitch(e, "home")}
            className={`${
              tabViews[0].isActive ? "text-[#3F93F9]" : "text-white"
            } mr-2 cursor-pointer text-2xl`}
          >
            Home
          </span>
          <span className="mr-2 text-white">/</span>
          <span
            onClick={(e) => tabSwitch(e, "games")}
            className={`${
              tabViews[1].isActive ? "text-[#3F93F9]" : "text-white"
            } mr-2 cursor-pointer text-2xl`}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};
export default GameTitle;
