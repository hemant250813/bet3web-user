import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Sidebar,
  BottomNavbar,
  Footer,
} from "../../component/layout/index";
import { getLocalStorageItem, notifyWarning } from "../../utils/helper";
import Deposit from "../Modal/Deposit";
import Withdrawal from "../Modal/Withdraw";
import { authDetail, getUser, userStatus } from "../../../redux/action";

const User = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [copied, setCopied] = useState(false);
  const [passwordIndex, setPasswordIndex] = useState(999);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isDepositModal, setIsDepositModal] = useState(false);
  const [isWithdrawalModal, setIsWithdrawalModal] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin_detail = useSelector((state) => state?.AuthDetail?.authDetails);
  const users = useSelector((state) => state?.GetUser?.user);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const init = () => {
    dispatch(authDetail());
    dispatch(getUser());
  };

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
    if (getLocalStorageItem("token") && getLocalStorageItem("user")) {
      navigate("/user");
    } else {
      navigate("/");
    }
  }, []);

  const toggleTooltip = (id) => {
    setIsTooltipOpen(!isTooltipOpen);
    // setActiveTooltip(id === activeTooltip ? null : id);
  };

  const onClickDeposit = (e, user) => {
    e.preventDefault();
    setIsDepositModal(true);
    setUserDetail(user);
  };

  const onClickActivateDeActivateStatus = (e, user) => {
    e.preventDefault();
    let status = user?.status === "1" ? "0" : "1";
    const formPayload = {
      userId: user?._id,
      status: status,
    };

    dispatch(
      userStatus({
        formPayload,
        callback: (data) => {
          if (data) {
            setUserList(data);
          }
        },
      })
    );
  };

  const onClickWithdraw = (e, user) => {
    e.preventDefault();
    setIsWithdrawalModal(true);
    setUserDetail(user);
  };

   //for Copy text to clipboard
   const handleTextCopy = (textToCopy) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => setCopied(true))
        .catch((error) => console.error("Error copying text:", error));

      setTimeout(() => setCopied(false), 1500);
    } else {
      // Handle the case when clipboard API is not available

      notifyWarning("Copy feature not available in private browsing", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <div className="flex h-screen">
      {windowWidth >= 768 && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title="User" />
        <main
          className="flex-1 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#4fd1c5] scrollbar-track-[#93C5FD] bg-indigo-600 p-4"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-900 ">
                <tr className="text-center">
                  <th className="px-6 py-3  text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3  text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3  text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    Deposit
                  </th>
                  <th className="px-6 py-3  text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    Withdrawal
                  </th>
                  <th className="px-6 py-3  text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    Password
                  </th>
                  <th className="px-6 py-3  text-xl font-medium text-indigo-600 uppercase tracking-wider">
                    Action
                  </th>
                  {/* Add more table headers as needed */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userList?.data?.length > 0 ? (
                  userList?.data?.map((user, index) => (
                    <tr key={index} className="bg-[#4fd1c5] text-center">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user?.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user?.balance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => onClickDeposit(e, user)}
                          className="bg-[#008000] hover:bg-indigo-600 text-black font-bold py-2 px-4 rounded-full"
                        >
                          deposit
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => onClickWithdraw(e, user)}
                          className="bg-[#ff0000] hover:bg-indigo-600 text-black font-bold py-2 px-4 rounded-full"
                        >
                          withdraw
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          onMouseEnter={() => {
                            toggleTooltip();
                          }}
                          onMouseLeave={() => {
                            toggleTooltip();
                            setCopied(false);
                          }}
                          className="relative inline-block"
                        >
                          {isTooltipOpen && (
                            <div
                              id="tooltip-animation"
                              role="tooltip"
                              style={{
                                position: "absolute",
                                top: "-45px",
                              }}
                              className="z-10 inline-block px-4 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 border-x-4 border-t-4 border-indigo-600"
                            >
                              {index === passwordIndex
                                ? "copied"
                                : user?.passwordText}
                              <div
                                className="tooltip-arrow"
                                data-popper-arrow
                              ></div>
                            </div>
                          )}
                          <p
                            onClick={() => {
                              setCopied(true);
                              setPasswordIndex(index);
                              handleTextCopy(user?.passwordText)
                            }}
                            className="text-black font-medium text-sm text-center cursor-pointer"
                          >
                            "*****"
                          </p>
                        </div>
                      </td>
                      <td className="flex px-6 py-4 justify-center whitespace-nowrap">
                        {" "}
                        <label className="inline-flex items-center cursor-pointer mr-2">
                          <input
                            type="checkbox"
                            value={user?.status === "1" ? true : false}
                            className="sr-only peer"
                            onChange={(e) =>
                              onClickActivateDeActivateStatus(e, user)
                            }
                            checked={user?.status === "1"}
                          />
                          <div className="relative w-11 h-6 bg-gray-900 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-indigo-600 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                        </label>
                        <span className="mr-2">|</span>
                        <span
                          onClick={() => {
                            navigate(`/report/${user?._id}`);
                          }}
                          className="cursor-pointer"
                        >
                          R
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-[#4fd1c5] text-center">
                    <td colSpan={6} className="px-6 py-4 whitespace-nowrap">
                      no data found
                    </td>
                  </tr>
                )}
                {/* Add more table rows as needed */}
              </tbody>
            </table>
          </div>
        </main>
        {/* Bottom navbar */}
        {windowWidth < 768 ? <BottomNavbar /> : <Footer />}
      </div>

      {isDepositModal && (
        <Deposit
          adminBalance={admin_detail?.balance}
          userBalance={userDetail?.balance}
          userDetail={userDetail}
          init={init}
          isDepositModal={isDepositModal}
          setIsDepositModal={setIsDepositModal}
        />
      )}

      {isWithdrawalModal && (
        <Withdrawal
          adminBalance={admin_detail?.balance}
          userBalance={userDetail?.balance}
          userDetail={userDetail}
          init={init}
          isWithdrawalModal={isWithdrawalModal}
          setIsWithdrawalModal={setIsWithdrawalModal}
        />
      )}
    </div>
  );
};

export default User;
