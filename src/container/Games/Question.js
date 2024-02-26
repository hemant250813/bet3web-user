import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../component/layout";
import { Header, HumburgerHeader } from "../../component/layout";
import GameTitle from "./GameTitle";
import validateQuestion from "../../validation/game/question";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import { getLocalStorageItem } from "../../utils/helper";
import {
  userDetail,
  getQuestion,
  getSetting,
  questionResult,
} from "../../redux/action";

const Question = ({ navbar }) => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);

  const user_detail = useSelector((state) => state?.UserDetail?.userDetails);

  const [form, setForm] = useState({
    amount: "",
    balance: user_detail?.data?.balance,
  });
  const question = useSelector((state) => state?.GetQuestion?.question);
  const setting = useSelector((state) => state?.GetSetting?.setting);

  const [selectedOptions, setSelectedOptions] = useState(
    Array(question?.length).fill({ option: null, question: null })
  );

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSetting({ game: "rock_paper_scissors" }));
    dispatch(userDetail());
    dispatch(getQuestion());
  }, []);

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      ["balance"]: user_detail?.data?.balance,
    }));
  }, [user_detail]);

  useEffect(() => {
    if (windowWidth <= 768) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }

    if (isAuth && userData) {
      navigate("/question");
    } else {
      navigate("/");
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

  const changeHandler = (e) => {
    if (e.target) {
      const value = e.target.value;
      const { name } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const resetHandler = (e) => {
    setForm((prevState) => ({
      ...prevState,
      ["amount"]: "",
    }));
    setForm((prevState) => ({
      ...prevState,
      ["balance"]: form?.balance - form?.amount,
    }));
    dispatch(userDetail());
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateQuestion(form, setting);

    if (isValid) {
      let formData = selectedOptions
        ?.map((data) => {
          if (data?.optionIndex !== null) {
            return {
              userId: user_detail?.data?.id,
              question: data?.question,
              answer: data?.option,
              odd: data?.odd,
              amount: form?.amount,
              questionSlug: data?.question?.split(" ")?.join(""),
              isDeclared: false,
            };
          } else {
            return null; // or undefined
          }
        })
        ?.filter((ele) => ele !== null);

      dispatch(
        questionResult({
          formData,
          callback: (data) => {
            if (data) {
              setSelectedOptions( Array(question?.length).fill({ option: null, question: null }));
              dispatch(getQuestion());
            }
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  const handleClick = () => {
    const { errors, isValid } = validateQuestion(form);
    if (isValid) {
    } else {
      setError(errors);
    }
  };

  const handleOptionClick = (index, optionIndex, question, option, odd) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = {
      optionIndex:
        updatedSelectedOptions[index]?.optionIndex === optionIndex
          ? null
          : optionIndex,
      question: question,
      option: option,
      odd: odd,
    };

    setSelectedOptions(updatedSelectedOptions);
  };

  return (
    <div>
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
        {hideHeader ? (
          <HumburgerHeader setLoading={setLoading} />
        ) : (
          <Header
            isVerifyMail={false}
            setLoading={setLoading}
            navbar={navbar}
          />
        )}
        <GameTitle title="Question And Answer" route="question" />
      </section>

      <section
        className={`bg-black relative flex-grow p-12 md:p-8 lg:p-12 overflow-hidden h-screen`}
      >
        <form
          onSubmit={(e) => onSubmit(e)}
          className={`grid justify-items-stretch gap-8`}
        >
          <div className="flex flex-col items-center justify-center p-3">
            <span className="flex items-center justify-center">
              <p
                className={`${
                  windowWidth === 320
                    ? "text-xs"
                    : windowWidth === 375
                    ? "text-sm"
                    : windowWidth === 425
                    ? "text-base"
                    : windowWidth === 768
                    ? "text-3xl"
                    : windowWidth === 1024
                    ? "text-5xl"
                    : windowWidth === 1440
                    ? "text-3xl"
                    : "text-4xl"
                }  text-white`}
              >
                Current Balance :
              </p>
              <p
                className={`${
                  windowWidth === 320
                    ? "text-xs"
                    : windowWidth === 375
                    ? "text-sm"
                    : windowWidth === 425
                    ? "text-base"
                    : windowWidth === 768
                    ? "text-3xl"
                    : windowWidth === 1024
                    ? "text-5xl"
                    : windowWidth === 1440
                    ? "text-3xl"
                    : "text-4xl"
                }  text-[#E3BC3F]`}
              >
                {" "}
                {form?.balance?.toFixed(2)} USD
              </p>
            </span>
            <div className="flex flex-col items-center w-1/3 mt-3">
              <div className="flex w-9/12">
                <input
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  value={form?.amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    const { name } = e.target;
                    let finalAmount = user_detail?.data?.balance - value;

                    if (value <= user_detail?.data?.balance) {
                      setForm((prevState) => ({
                        ...prevState,
                        [name]: value,
                      }));

                      setForm((prevState) => ({
                        ...prevState,
                        ["balance"]: finalAmount,
                      }));
                    }

                    setError((prevState) => ({
                      ...prevState,
                      [name]: "",
                    }));
                  }}
                  className="border p-2 focus:outline-none focus:border-blue-500 bg-[#020C25] text-white w-full"
                  style={{ height: "2rem" }}
                />
                <span
                  className="bg-[#E3BC3F] text-black flex items-center px-2 rounded-r-sm outline-none"
                  style={{ height: "2rem" }}
                >
                  USD
                </span>
              </div>
              <div className="text-rose-600 font-serif mt-1">
                {error?.amount}
              </div>
            </div>
            <span className="text-[#adb5bd] mt-3">
              Minimum : {setting?.min?.toFixed(2)} USD | Maximum :{" "}
              {setting?.max?.toFixed(2)} USD | Win Amount 150.00 %
            </span>
          </div>

          {/* Card 1 */}
          {question?.map((que, index) => (
            <div key={index} className="relative group mx-auto p-4 text-white">
              {/* header */}
              <div className="grid grid-cols-2 justify-around p-2">
                <button className="mx-3">{que.question}</button>
                <button className="mx-3">odd {index}</button>
              </div>
              {/* option */}
              <div className="grid grid-cols-3 justify-around p-2 ">
                {["option1", "option2", "option3"].map(
                  (option, optionIndex) => (
                    <button
                      key={optionIndex}
                      className={`mx-3 p-2 rounded-md ${
                        selectedOptions[index]?.optionIndex === optionIndex
                          ? "bg-gray-800 text-white"
                          : "bg-[#E3BC3F] text-black"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOptionClick(
                          index,
                          optionIndex,
                          que.question,
                          que[option],
                          que.odd
                        );
                      }}
                    >
                      {que[option]}
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
          <div className="relative group mx-auto p-4 text-white">
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-[#4fd1c5] hover:text-black py-2 px-4 rounded-md h-16 text-[#E3BC3F] text-3xl font-bold border-4 border-[#4fd1c5]"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </div>
  );
};
export default Question;
