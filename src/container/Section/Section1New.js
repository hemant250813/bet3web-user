import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { BsPersonAdd } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Header, HumburgerHeader, HeaderNew } from "../../component/layout";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../utils/helper";
import Logo from "../../assets/images/logo.png";
import {
  Loader,
  LoaderMain,
  SlidingMessages,
  QuestionSlider
} from "../../component/commonComponent";
import { getQuestionDisplay } from "../../redux/action";

const Section1New = ({ loading, setLoading, navbar }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [questionArray, setQuestionArray] = useState([]);
 

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));
  const question = useSelector((state) => state?.GetQuestionDisplay?.question);
console.log("question",question);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  useEffect(() => {
    dispatch(getQuestionDisplay());
  }, []);

  useEffect(() => {
    setQuestionArray(question);
  }, [question]);

  useEffect(() => {
    if (windowWidth <= 768) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }

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

  const handleLogin = () => {
    navigate("/login");
  };


  return (
    <>
      <section className="relative p-4 md:p-8 lg:p-12 bg-[#121212] w-full">
        {/* Mobile Header with Hamburger Icon */}
        {hideHeader ? (
          <HumburgerHeader loading={loading} setLoading={setLoading} />
        ) : (
          <HeaderNew
            isVerifyMail={true}
            loading={loading}
            setLoading={setLoading}
            navbar={navbar}
          />
        )}

        {/* Your main content goes here */}
        <div
          className={`relative  mt-40 flex flex-col ml-4 md:ml-8 lg:ml-12`}
        >
         <QuestionSlider question={questionArray}/>
        </div>
      </section>
    </>
  );
};

export default Section1New;
