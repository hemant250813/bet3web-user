import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Sidebar,
  BottomNavbar,
  Footer,
} from "../../component/layout/index";
import { getLocalStorageItem } from "../../utils/helper";
import { getReport } from "../../../redux/action";
import { GAME } from "../../utils/constants";

const Report = () => {
  let { id } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [depositFilterFlag, setDepositFilterFlag] = useState(false);
  const [withdrawalFilterFlag, setWithdrawalFilterFlag] = useState(false);
  const [winFilterFlag, setWinFilterFlag] = useState(false);
  const [loseFilterFlag, setLoseFilterFlag] = useState(false);
  const [selectGame, setSelectGame] = useState("head_tail");
  const [winGameFilterFlag, setWinGameFilterFlag] = useState(false);
  const [loseGameFilterFlag, setLoseGameFilterFlag] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const report = useSelector((state) => state?.GetReport?.report);
 
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
    init();
    if (getLocalStorageItem("token") && getLocalStorageItem("user")) {
      if (id !== undefined) {
        navigate(`/report/${id}`);
      } else {
        navigate(`/report`);
      }
    } else {
      navigate("/");
    }
  }, []);

  const init = (reset) => {
    let query = {
      deposit: false,
      withdrawl: false,
      win: false,
      lose: false,
      game: false,
      game_name: "",
    };

    console.log("reset",reset);
    if(reset === undefined){
      if (id !== undefined) {
        query.userId = id;
      }
    }
   
    dispatch(
      getReport({
        query,
      })
    );
  };

  const filter = (filter_by, value) => {
    let query = {};
    if (filter_by === "deposit") {
      query = { deposit: true };
    } else if (filter_by === "withdrawl") {
      query = { withdrawl: true };
    } else if (filter_by === "win") {
      query = { win: true };
    } else if (filter_by === "lose") {
      query = { lose: true };
    } else if (filter_by === "game") {
      if (value === "win") {
        query = { game: true, game_name: selectGame, win: true };
      } else if (value === "lose") {
        query = { game: true, game_name: selectGame, lose: true };
      }
    }

    if (id !== undefined) {
      query.userId = id;
    }

    dispatch(
      getReport({
        query,
      })
    );
  };

  return (
    <div className="flex h-screen">
      {windowWidth >= 768 && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title="Report" />
        <main
          className="flex-1 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#4fd1c5] scrollbar-track-[#93C5FD] bg-indigo-600 p-4"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          {/* Filter buttons */}
          <div className="relative justify-between grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 mb-4 gap-4 border-8 border-gray-900 p-4">
            <h1
              style={{
                position: "absolute",
                top: "-17px",
                left: "50%",
              }}
              className="text-center bg-indigo-600 px-4 text-xl font-bold text-[#4fd1c5]"
            >
              Filter
            </h1>
            <button
              onClick={() => {
                setDepositFilterFlag(true);
                filter("deposit");

                //other
                setWithdrawalFilterFlag(false);
                setWinFilterFlag(false);
                setLoseFilterFlag(false);
                setWinGameFilterFlag(false);
                setLoseGameFilterFlag(false);
              }}
              className={`  text-black font-bold py-2 px-4 rounded ${
                depositFilterFlag ? "bg-[#59AA79]" : "bg-[#008000]"
              }`}
            >
              Deposit
            </button>
            <button
              onClick={() => {
                setWithdrawalFilterFlag(true);
                filter("withdrawl");

                //other
                setDepositFilterFlag(false);
                setWinFilterFlag(false);
                setLoseFilterFlag(false);
                setWinGameFilterFlag(false);
                setLoseGameFilterFlag(false);
              }}
              className={`  text-black font-bold py-2 px-4 rounded ${
                withdrawalFilterFlag ? "bg-[#E15F67]" : "bg-[#ff0000]"
              }`}
            >
              Withdrawal
            </button>
            <button
              onClick={() => {
                setWinFilterFlag(true);
                filter("win");

                //other
                setDepositFilterFlag(false);
                setWithdrawalFilterFlag(false);
                setLoseFilterFlag(false);
                setWinGameFilterFlag(false);
                setLoseGameFilterFlag(false);
              }}
              className={`  text-black font-bold py-2 px-4 rounded ${
                winFilterFlag ? "bg-[#59AA79]" : "bg-[#008000]"
              }`}
            >
              Win
            </button>
            <button
              onClick={() => {
                setLoseFilterFlag(true);
                filter("lose");

                //other
                setDepositFilterFlag(false);
                setWithdrawalFilterFlag(false);
                setWinFilterFlag(false);
                setWinGameFilterFlag(false);
                setLoseGameFilterFlag(false);
              }}
              className={` text-black font-bold py-2 px-4 rounded ${
                loseFilterFlag ? "bg-[#E15F67]" : "bg-[#ff0000]"
              }`}
            >
              Lose
            </button>
            <button
              onClick={() => {
                setDepositFilterFlag(false);
                setWithdrawalFilterFlag(false);
                setWinFilterFlag(false);
                setLoseFilterFlag(false);
                init("reset");
              }}
              className={`bg-[#ABBCBC] hover:bg-[#4fd1c5] text-black font-bold py-2 px-4 rounded`}
            >
              Reset
            </button>
          </div>

          <div className="relative justify-between grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 mb-4 gap-4 border-8 border-gray-900 p-4">
            <h1
              style={{
                position: "absolute",
                top: "-17px",
                left: "50%",
              }}
              className="text-center bg-indigo-600 px-4 text-xl font-bold text-[#4fd1c5]"
            >
              Game Filter
            </h1>
            <select
              name="gateway"
              id="select_gateway"
              className="bg-gray-900 text-indigo-600 cursor-pointer font-bold py-2 px-4 rounded"
              // onChange={onChange}
              value={selectGame}
              onChange={(e) => setSelectGame(e.target.value)}
              data-live-search="true"
            >
              <option disabled>Please Select</option>
              {GAME &&
                GAME?.map((option, index) => (
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
              onClick={() => {
                setLoseGameFilterFlag(true);
                filter("game", "lose");

                //other
                setWinGameFilterFlag(false);
                setDepositFilterFlag(false);
                setWithdrawalFilterFlag(false);
                setWinFilterFlag(false);
                setLoseFilterFlag(false);
              }}
              className={` text-black font-bold py-2 px-4 rounded ${
                loseGameFilterFlag ? "bg-[#59AA79]" : "bg-[#008000]"
              }`}
            >
              Lose
            </button>
            <button
              onClick={() => {
                setWinGameFilterFlag(true);
                filter("game", "win");

                //other
                setLoseGameFilterFlag(false);
                setDepositFilterFlag(false);
                setWithdrawalFilterFlag(false);
                setWinFilterFlag(false);
                setLoseFilterFlag(false);
              }}
              className={` text-black font-bold py-2 px-4 rounded ${
                winGameFilterFlag ? "bg-[#E15F67]" : "bg-[#ff0000]"
              }`}
            >
              Win
            </button>
            <button
              onClick={() => {
                setWinGameFilterFlag(false);
                setLoseGameFilterFlag(false);
                init("reset");
              }}
              className="bg-[#ABBCBC] hover:bg-[#4fd1c5] text-black font-bold py-2 px-4 rounded"
            >
              Reset
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    CR
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    DR
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    Balance
                  </th>
                  {/* Add more table headers as needed */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {report?.data?.length > 0 ? (
                  report?.data?.map((transaction, index) => (
                    <tr
                      key={index}
                      className={`${
                        (index + 1) % 2 === 0 ? "bg-[#4fd1c5]" : "bg-[#7E8D8D]"
                      }  `}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction?.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction?.type === "win" ? (
                          <span className="p-2 bg-blue-500 rounded-lg">
                            P|L Market
                          </span>
                        ) : transaction?.type === "loss" ? (
                          <span className="p-2 bg-blue-500 rounded-lg">
                            P|L Market
                          </span>
                        ) : transaction?.type === "deposit" ? (
                          <span className="p-2 bg-red-500 rounded-lg">
                            D/W Point
                          </span>
                        ) : (
                          <span className="p-2 bg-red-500 rounded-lg">
                            D/W Point
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction?.from === null ? "" : transaction?.from}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction?.to === null ? "" : transaction?.to}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction?.desc}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction?.cr}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction?.dr}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction?.balance}
                      </td>
                      {/* Add more table data cells as needed */}
                    </tr>
                  ))
                ) : (
                  <tr className="bg-[#4fd1c5] text-center">
                    <td colSpan={8} className="px-6 py-4 whitespace-nowrap">
                      no data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
        {/* Bottom navbar */}
        {windowWidth < 768 ? <BottomNavbar /> : <Footer />}
      </div>
    </div>
  );
};

export default Report;
