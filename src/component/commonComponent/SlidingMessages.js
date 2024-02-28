import React, { useState, useEffect } from "react"; // Import your Tailwind CSS styles here
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../redux/action";

const SlidingMessage = ({ message }) => {
  const [questionArray, setQuestionArray] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const question = useSelector((state) => state?.GetQuestion?.question);

  console.log("questionArray", questionArray);
  useEffect(() => {
    dispatch(getQuestion());
  }, []);

  useEffect(() => {
    let questionModified = question?.map((ques) => ques?.question);
    questionModified?.push("Play Q & A Game Now")
    setQuestionArray(questionModified);
  }, [question]);

  return (
    <div className="flex">
      {questionArray?.map((ques, index) => {
        return (
          <div
            key={index}
            className="moving-message-container z-10 cursor-pointer"
          >
            <div
              onClick={() => navigate(`/question`)}
              className={`moving-message ${ques === "Play Q & A Game Now" ? "text-[#3F93F9] text-4xl font-bold":"text-white text-2xl" }`}
            >
              {ques}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SlidingMessage;
