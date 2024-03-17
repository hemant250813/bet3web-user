import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Sidebar,
  BottomNavbar,
  Footer,
} from "../../component/layout/index";
import { getLocalStorageItem } from "../../utils/helper";
import { Accept, Reject, ImagePreview } from "../../../container/Modal";
import {
  getReport,
  authDetail,
  getBankTransaction,
  acceptRejectRequest,
} from "../../../redux/action";
import { GAME } from "../../utils/constants";
import { Loader, LoaderMain } from "../../../component/commonComponent";

const Transaction = () => {
  let { id } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [loginTimeOut, setLoginTimeOut] = useState(0);
  const [loading, setLoading] = useState(false);
  const [innerLoading, setInnerLoading] = useState(false);
  const [innerLoadingDeposit, setInnerLoadingDeposit] = useState(false);
  const [innerLoadingWithdrawal, setInnerLoadingWithdrawal] = useState(false);
  const [acceptOpenModal, setAcceptOpenModal] = useState(false);
  const [rejectOpenModal, setRejectOpenModal] = useState(false);
  const [imagePreviewOpenModal, setImagePreviewOpenModal] = useState(false);
  const [bankTransactionID, setBankTransactionID] = useState("");
  const [clearIntervalLoading, setClearIntervalLoading] = useState(0);
  const [statusType, setStatusType] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const admin_detail = useSelector((state) => state?.AuthDetail?.authDetails);
  const get_bank_transaction = useSelector(
    (state) => state?.GetBankTransaction?.bankTransaction
  );
  
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
      clearTimeout(loginTimeOut);
      clearInterval(clearIntervalLoading);
    };
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    dispatch(authDetail());
    init();
    if (getLocalStorageItem("token") && getLocalStorageItem("user")) {
      navigate(`/bank-transaction`);
    } else {
      navigate("/");
    }
  }, []);

  const init = (e) => {
    dispatch(getBankTransaction());
  };

  const requestedAccepted = () => {
    if (statusType === "deposit") {
      setInnerLoadingDeposit(true);
    } else {
      setInnerLoadingWithdrawal(true);
    }
    // setInnerLoading(true);
    setLoading(true);
    let formPayload = {
      id: bankTransactionID,
      requestType: "accepted",
    };
    dispatch(
      acceptRejectRequest({
        data: formPayload,
        callback: (data) => {
          if (data) {
            let clearLoading = setTimeout(() => {
              // setInnerLoading(false); // Finish loading
              if (statusType === "deposit") {
                setInnerLoadingDeposit(false);
              } else {
                setInnerLoadingWithdrawal(false);
              }
              setLoading(false);
              setAcceptOpenModal(false);
              init();
            }, 2000); // Adjust the timeout as needed
            setClearIntervalLoading(clearLoading);
          }
        },
      })
    );
  };

  return (
    <>
      {loading ? (
        <LoaderMain />
      ) : (
        <div className="flex h-screen">
          {windowWidth >= 768 && <Sidebar />}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar
              title="Transaction Request"
              setLoading={setLoading}
              admin_detail={admin_detail}
            />
            <main
              className="flex-1 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#4fd1c5] scrollbar-track-[#93C5FD] bg-[#E3BC3F] p-4 border-4 border-[#4fd1c5]"
              style={{ maxHeight: "calc(100vh - 120px)" }}
            >
              <div className="overflow-x-auto w-full">
                <p className="font-bold text-2xl">Deposit</p>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-900 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        From
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Remark
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Status
                      </th>
                      {/* Add more table headers as needed */}
                    </tr>
                  </thead>
                  <tbody
                    className={`${
                      loading ? "" : "bg-white divide-y divide-gray-200"
                    } `}
                  >
                    {innerLoadingDeposit ? (
                      <tr className="w-full">
                        <td colSpan={8} className="px-6 py-4 whitespace-nowrap">
                          {" "}
                          <Loader />
                        </td>
                      </tr>
                    ) : get_bank_transaction?.bankDepositTransactionModified
                        ?.length > 0 ? (
                      get_bank_transaction?.bankDepositTransactionModified?.map(
                        (transaction, index) => (
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
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              {transaction?.layerId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              {transaction?.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              {transaction?.remark}
                            </td>
                            <td
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setImageUrl(transaction?.image);
                                setImagePreviewOpenModal(true);
                              }}
                              className="px-6 py-4 whitespace-nowrap text-xl"
                            >
                              <img
                                src={transaction?.image}
                                alt="logo"
                                className="w-48 h-24 rounded-lg cursor-pointer"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              {transaction?.transactionId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl flex">
                              {transaction?.status === "pending" && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setAcceptOpenModal(true);
                                      setBankTransactionID(transaction?._id);
                                      setStatusType("deposit");
                                    }}
                                    className="mx-4 py-1 px-4 bg-gray-900 text-white rounded-lg border-4 border-green-400 mt-6"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setRejectOpenModal(true);
                                      setBankTransactionID(transaction?._id);
                                      setStatusType("deposit");
                                    }}
                                    className="py-1 px-4 bg-gray-900 text-white border-4 rounded-lg border-red-500 mt-6"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </td>
                            {/* Add more table data cells as needed */}
                          </tr>
                        )
                      )
                    ) : (
                      <tr className="bg-[#4fd1c5] text-center text-xl">
                        <td colSpan={8} className="px-6 py-4 whitespace-nowrap">
                          no data found
                        </td>
                      </tr>
                    )}

                    {}
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto w-full">
                <p className="font-bold text-2xl">Withdrawal</p>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-900 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        From
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Account Name
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Account Number
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Bank Name
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Account Type
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        IFSC Code
                      </th>
                      <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                        Status
                      </th>
                      {/* Add more table headers as needed */}
                    </tr>
                  </thead>
                  <tbody
                    className={`${
                      loading ? "" : "bg-white divide-y divide-gray-200"
                    } `}
                  >
                    {innerLoadingWithdrawal ? (
                      <tr className="w-full">
                        <td
                          colSpan={10}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {" "}
                          <Loader />
                        </td>
                      </tr>
                    ) : get_bank_transaction?.bankWithdrawalTransactionModified
                        ?.length > 0 ? (
                      get_bank_transaction?.bankWithdrawalTransactionModified?.map(
                        (transaction, index) => (
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
                              {transaction?.layerId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              {transaction?.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              {transaction?.accountName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              {transaction?.accountNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              {transaction?.bankName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              {transaction?.accountType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                              {transaction?.ifscCode}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xl flex">
                              {transaction?.status === "pending" && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setAcceptOpenModal(true);
                                      setBankTransactionID(transaction?._id);
                                      setStatusType("withdrawal");
                                    }}
                                    className="mx-4 py-1 px-4 bg-gray-900 text-white rounded-lg border-4 border-green-400"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setRejectOpenModal(true);
                                      setBankTransactionID(transaction?._id);
                                      setStatusType("withdrawal");
                                    }}
                                    className="py-1 px-4 bg-gray-900 text-white border-4 rounded-lg border-red-500"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </td>
                            {/* Add more table data cells as needed */}
                          </tr>
                        )
                      )
                    ) : (
                      <tr className="bg-[#4fd1c5] text-center text-xl">
                        <td
                          colSpan={10}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          no data found
                        </td>
                      </tr>
                    )}

                    {}
                  </tbody>
                </table>
              </div>
            </main>

            {/* Bottom navbar */}
            {windowWidth < 768 ? <BottomNavbar /> : <Footer />}
          </div>
        </div>
      )}
      {acceptOpenModal && (
        <Accept
          showModal={acceptOpenModal}
          closeModal={setAcceptOpenModal}
          loading={loading}
          setLoading={setLoading}
          requestedAccepted={requestedAccepted}
        />
      )}
      {rejectOpenModal && (
        <Reject
          openModal={rejectOpenModal}
          closeModal={setRejectOpenModal}
          bankTransactionID={bankTransactionID}
          init={init}
          setInnerLoadingDeposit={setInnerLoadingDeposit}
          setInnerLoadingWithdrawal={setInnerLoadingWithdrawal}
          statusType={statusType}
        />
      )}
      {imagePreviewOpenModal && (
        <ImagePreview
          openModal={imagePreviewOpenModal}
          closeModal={setImagePreviewOpenModal}
          image={imageUrl}
        />
      )}
    </>
  );
};

export default Transaction;
