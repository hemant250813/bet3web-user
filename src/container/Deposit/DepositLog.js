import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Header, HumburgerHeader } from "../../component/layout";
import GameTitle from "../Games/GameTitle";
import { getDeposit } from "../../redux/action";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import { Loader } from "../../component/commonComponent";

const DepositLog = ({ navbar }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);

  const deposit = useSelector((state) => state?.GetDeposit?.deposit);
  const loading = useSelector((state) => state?.GetDeposit?.loading);

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
    dispatch(getDeposit());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
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
              <HumburgerHeader />
            ) : (
              <Header isVerifyMail={false} navbar={navbar} />
            )}
            <GameTitle title="Deposit History" route="deposit/log" />
          </section>

          <section className="justify-center items-center h-screen bg-black relative flex-grow p-6 md:p-8 lg:p-12 overflow-hidden">
            <div className="flex justify-center items-center">
              <div className={`${windowWidth <= 375 ? "px-1" : "px-16"}`}>
                <input
                  type="text"
                  placeholder="Search"
                  className="rounded-full border px-4 py-2 mb-4 bg-cyan-950 text-[#BFC9CA] focus:border-[#E3BC3F]"
                />
                <div className="overflow-x-auto">
                  <table className={`table-auto rounded-md`}>
                    {/* <!-- Your table content here --> */}
                    <thead className={`bg-[#E3BC3F] text-black`}>
                      <tr>
                        <th className={`py-4 lg:px-16 sm:px-4`}>SL</th>
                        <th className={`py-4 lg:px-16 sm:px-4`}>
                          Transaction Number
                        </th>
                        <th className={`py-4 lg:px-16 sm:px-4`}>
                          Deposit Amount
                        </th>
                        <th className={`py-4 lg:px-16 sm:px-4`}>
                          Deposit Date
                        </th>
                        <th className={`py-4 lg:px-16 sm:px-4`}>Remarks</th>
                        <th className={`py-4 lg:px-16 sm:px-4`}>
                          Current Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-cyan-950 text-[#BFC9CA]">
                      {deposit?.map((deposit, index) => {
                        return (
                          <tr key={index}>
                            <td className={`py-4 lg:px-16 sm:px-4`}>
                              {index + 1}
                            </td>
                            <td className={`py-4 lg:px-16 sm:px-4`}>
                              {deposit?.transactionId}
                            </td>
                            <td className={`py-4 lg:px-16 sm:px-4`}>
                              {deposit?.amount}
                            </td>
                            <td className={`py-4 lg:px-16 sm:px-4`}>
                              {moment(deposit?.createdAt).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            </td>
                            <td className={`py-4 lg:px-16 sm:px-4`}>
                              {deposit?.remark}
                            </td>
                            <td className={`py-4 lg:px-16 sm:px-4`}>
                              {deposit?.status}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default DepositLog;
