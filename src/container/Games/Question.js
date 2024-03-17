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
import { LoaderMain, LoaderButton } from "../../component/commonComponent";

const Question = ({ navbar }) => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
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
  console.log("question", question);
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
      console.log("selectedOptions", selectedOptions);
      setIsSubmit(true);
      let formData = selectedOptions
        ?.map((data) => {
          if (data?.optionIndex !== null) {
            return {
              userId: user_detail?.data?.id,
              question: data?.question,
              answer: data?.option,
              option1: data?.option1,
              option2: data?.option2,
              option3: data?.option3,
              odd1: data?.odd1,
              odd2: data?.odd2,
              odd3: data?.odd3,
              amount: form?.amount,
              questionSlug: data?.question?.split(" ")?.join(""),
              isDeclared: false,
            };
          }
        })
        ?.filter((ele) => ele?.answer !== null);

      dispatch(
        questionResult({
          formData,
          callback: (data) => {
            if (data) {
              setIsSubmit(false);
              setSelectedOptions(
                Array(question?.length).fill({ option: null, question: null })
              );
              dispatch(getQuestion());
              dispatch(userDetail());
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

  const handleOptionClick = (
    index,
    optionIndex,
    question,
    option,
    option1,
    option2,
    option3,
    odd1,
    odd2,
    odd3
  ) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = {
      optionIndex:
        updatedSelectedOptions[index]?.optionIndex === optionIndex
          ? null
          : optionIndex,
      question: question,
      option: option,
      option1: option1,
      option2: option2,
      option3: option3,
      odd1: odd1,
      odd2: odd2,
      odd3: odd3,
    };

    setSelectedOptions(updatedSelectedOptions);
  };

  return (
    <>
      {loading ? (
        <LoaderMain />
      ) : (
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
            className={`bg-black relative flex-grow p-12 md:p-8 lg:p-12`}
          >
            <form
              onSubmit={(e) => onSubmit(e)}
              className={`grid justify-items-stretch gap-8 `}
            >
              <div className="flex flex-col items-center justify-center p-3">
                <span className="flex items-center justify-center">
                  <p
                    className={`mr-2 ${
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
                    }  text-[#3F93F9]`}
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
                      className="bg-[#3F93F9] text-[#fff] flex items-center px-2 rounded-r-sm outline-none"
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
              <div className="overflow-y-auto">
                {question?.map((que, index) => (
                  <div
                    key={index}
                    className="relative group mx-auto p-4 text-white "
                  >
                    {/* header */}
                    <div className="grid grid-cols-2 justify-around p-2">
                      <button className="flex mx-3 text-2xl text-left">
                        <p className="font-bold px-2 text-5xl text-[#3F93F9]">
                          *
                        </p>
                        {que.question}
                      </button>
                      {/* <button className="mx-3 text-2xl text-right">
                        odd {que?.odd}
                      </button> */}
                    </div>
                    {/* option */}
                    <div className="grid sm:grid-cols-1 xl:grid-cols-3  justify-around p-2 ">
                      {["option1", "option2", "option3"].map(
                        (option, optionIndex) => (
                          <button
                            key={optionIndex}
                            className={`mx-3 p-4 text-xl rounded-md hover:opacity-80 sm:mb-3 ${
                              selectedOptions[index]?.optionIndex ===
                              optionIndex
                                ? "bg-gray-800 text-white"
                                : "bg-[#3F93F9] text-[#fff]"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleOptionClick(
                                index,
                                optionIndex,
                                que.question,
                                que[option],
                                que.option1,
                                que.option2,
                                que.option3,
                                que.odd1,
                                que.odd2,
                                que.odd3
                              );
                            }}
                          >
                            {que[option]}
                          </button>
                        )
                      )}
                    </div>
                    <div className="grid sm:grid-cols-1 xl:grid-cols-3  justify-center items-center p-2 mt-4">
                      <span className="flex">
                        <img
                          src={que?.image1}
                          alt={`Profile${index}`}
                          className={`sm:mb-5 sm:ml-72 md:ml-96 xl:ml-56 rounded-full w-28 h-28 transition-transform duration-700 transform hover:-translate-y-4`}
                        />
                        <p className={` rounded-full text-xl font-bold`}>
                          Odd {que?.odd1}
                        </p>
                      </span>
                      <span className="flex">
                        {" "}
                        <img
                          src={que?.image2}
                          alt={`Profile${index}`}
                          className={`sm:mb-5 sm:ml-72 md:ml-96 xl:ml-56 rounded-full w-28 h-28 transition-transform duration-700 transform hover:-translate-y-4`}
                        />
                        <p className={` rounded-full text-xl font-bold`}>
                          Odd {que?.odd2}
                        </p>
                      </span>
                      <span className="flex">
                        {" "}
                        <img
                          src={que?.image3}
                          alt={`Profile${index}`}
                          className={`sm:mb-5 sm:ml-72 md:ml-96 xl:ml-56 rounded-full w-28 h-28 transition-transform duration-700 transform hover:-translate-y-4`}
                        />
                        <p className={` rounded-full text-xl font-bold`}>
                          Odd {que?.odd3}
                        </p>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative group mx-auto p-4 text-white w-96">
                <button
                  type="submit"
                  disabled={isSubmit}
                  className="w-96 bg-[#3F93F9] hover:opacity-80 py-2 px-4 rounded-md h-16 text-[#fff] text-2xl font-bold flex justify-center"
                >
                  {isSubmit ? (
                    <LoaderButton />
                  ) : (
                    <>
                      <span className="mt-2 font-bold text-2xl">Submit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
          <Footer />
        </div>
      )}
    </>
  );
};
export default Question;
