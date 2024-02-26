import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Sidebar,
  BottomNavbar,
  Footer,
} from "../../component/layout/index";
import { getLocalStorageItem, notifyWarning } from "../../utils/helper";
import { GAME } from "../../utils/constants";
import {
  getQuestionDropdown,
  authDetail,
  result,
  getResult,
} from "../../../redux/action";
import { Loader, LoaderMain } from "../../../component/commonComponent";

const Result = () => {
  const [form, setForm] = useState({
    question: "",
    answer: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [loading, setLoading] = useState(false);
  const [innerLoading, setInnerLoading] = useState(false);
  const [questionDropdown, setQuestionDropdown] = useState([]);
  const [option, setOption] = useState([]);
  const [error, setError] = useState({});

  const admin_detail = useSelector((state) => state?.AuthDetail?.authDetails);
  const question_dropdown = useSelector(
    (state) => state?.QuestionDropdown?.questionDropdown
  );
  const result_data = useSelector((state) => state?.GetResult?.result);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    let data = question_dropdown?.map((itm) => ({
      label: itm.question,
      value: itm.questionSlug,
    }));
    setQuestionDropdown(data);

    if (data?.length > 0) {
      setForm((prevState) => ({
        ...prevState,
        ["question"]: data[0]?.value,
      }));

      setForm((prevState) => ({
        ...prevState,
        ["answer"]: question_dropdown[0]?.option1,
      }));
    }
  }, [question_dropdown]);

  useEffect(() => {
    let optionList = [];
    let options = question_dropdown?.filter(
      (option) => option?.questionSlug === form?.question
    );

    if (options?.length > 0) {
      optionList?.push({
        label: options[0]?.option1,
        value: options[0]?.option1,
      });
      optionList?.push({
        label: options[0]?.option2,
        value: options[0]?.option2,
      });
      optionList?.push({
        label: options[0]?.option3,
        value: options[0]?.option3,
      });

      setOption(optionList);
    }
  }, [form?.question]);

  useEffect(() => {
    dispatch(getResult({ search: "" }));
    dispatch(authDetail());
    dispatch(getQuestionDropdown());
    if (getLocalStorageItem("token") && getLocalStorageItem("user")) {
      navigate("/result");
    } else {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formPayload = {
      question: form?.question,
      answer: form?.answer,
    };

    if (question_dropdown?.length > 0) {
      dispatch(
        result({
          formPayload,
          callback: (data) => {
            if (data) {
              dispatch(getQuestionDropdown());
              dispatch(getResult());
            }
          },
        })
      );
    }
  };

  // Function to perform the actual search
  const performSearch = (term) => {
    // Call your API or perform any other action here
    dispatch(getResult({ search: term }));
  };

  // Function to debounce the search
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Debounced version of the performSearch function
  const debouncedSearch = debounce(performSearch, 1000); // Adjust delay as needed

  // Handler for input change
  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <>
      {" "}
      {loading ? (
        <LoaderMain />
      ) : (
        <div className="flex h-screen">
          {windowWidth > 768 && <Sidebar />}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar
              title="Results"
              setLoading={setLoading}
              admin_detail={admin_detail}
            />
            <main
              className="flex-1 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#4fd1c5] scrollbar-track-[#93C5FD] bg-[#E3BC3F] p-4 border-4 border-[#4fd1c5]"
              style={{ maxHeight: "calc(100vh - 120px)" }}
            >
              {/* Game Filter buttons */}
              <div className="relative justify-between grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 border-8 border-[#7E8D8D] p-6 w-full">
                <h1
                  style={{
                    position: "absolute",
                    top: windowWidth === 320 ? "-20px" : "-17px",
                    left: windowWidth === 320 ? "30%" : "50%",
                  }}
                  className="text-center bg-[#7E8D8D] px-4 text-xl font-bold text-[#E3BC3F]"
                >
                  Question
                </h1>
                <select
                  name="question"
                  id="question"
                  className="bg-gray-900 text-[#E3BC3F] cursor-pointer font-bold py-2 px-4 rounded"
                  options={questionDropdown}
                  issearchable={"true"}
                  value={form?.question || ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    setForm((prevState) => ({
                      ...prevState,
                      ["question"]: value,
                    }));
                    setError((prevState) => ({
                      ...prevState,
                      ["question"]: "",
                    }));
                  }}
                  data-live-search="true"
                >
                  {questionDropdown?.length > 0 ? (
                    <option disabled>Please Select</option>
                  ) : (
                    <option disabled>All result has been declared</option>
                  )}
                  {questionDropdown &&
                    questionDropdown?.map((option, index) => (
                      <option
                        key={index}
                        data-token={option.label}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                </select>

                <select
                  name="answer"
                  id="answer"
                  className="bg-gray-900 text-[#E3BC3F] cursor-pointer font-bold py-2 px-4 rounded"
                  options={questionDropdown}
                  issearchable={"true"}
                  value={form?.answer || ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    setForm((prevState) => ({
                      ...prevState,
                      ["answer"]: value,
                    }));
                    setError((prevState) => ({
                      ...prevState,
                      ["answer"]: "",
                    }));
                  }}
                  data-live-search="true"
                >
                  {questionDropdown?.length > 0 && (
                    <option disabled>Please Select</option>
                  )}
                  {option &&
                    option?.map((option, index) => (
                      <option
                        key={index}
                        data-token={option.label}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                </select>
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  className="bg-[#008000] hover:bg-[#4fd1c5] text-black font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
              <div className="w-full">
                <div className="max-w-lg mx-auto p-2 float-left w-full">
                  <div className="flex">
                    <div className="relative w-full">
                      <input
                        type="search"
                        id="search-dropdown"
                        className=" block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg  border border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="absolute top-0 end-0 p-3 text-sm font-medium h-full text-[#E3BC3F] bg-gray-900 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                        <span className="sr-only">Search</span>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                  <>
                    <thead className="bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                          Declared By
                        </th>
                        <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                          Question
                        </th>
                        <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                          Result
                        </th>
                        <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                          Action
                        </th>
                        {/* Add more table headers as needed */}
                      </tr>
                    </thead>
                    <tbody
                      className={`${
                        loading ? "" : "bg-white divide-y divide-gray-200"
                      } overflow-x-auto`}
                    >
                      {loading ? (
                        <tr className="w-full">
                          <td
                            colSpan={8}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {" "}
                            <Loader />
                          </td>
                        </tr>
                      ) : result_data?.length > 0 ? (
                        result_data?.map((transaction, index) => (
                          <tr
                            key={index}
                            className={`${
                              (index + 1) % 2 === 0
                                ? "bg-[#4fd1c5]"
                                : "bg-[#7E8D8D]"
                            }  `}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-xl  p-2">
                                {" "}
                                {moment(transaction?.createdAt).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              admin
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              {transaction?.question}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              {transaction?.answer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              rollback
                            </td>
                            {/* Add more table data cells as needed */}
                          </tr>
                        ))
                      ) : (
                        <tr className="bg-[#4fd1c5] text-center text-xl">
                          <td
                            colSpan={8}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            no data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </>
                </table>
              </div>
            </main>
            {/* Bottom navbar */}
            {windowWidth <= 768 ? <BottomNavbar /> : <Footer />}
          </div>
        </div>
      )}
    </>
  );
};

export default Result;
