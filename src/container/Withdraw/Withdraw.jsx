import React, { useContext, useEffect, useState } from "react";
import { RiPencilLine, RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment";
import { MdEditNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Header, HumburgerHeader } from "../../component/layout";
import { Carousal } from "../../component/commonComponent";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import GameTitle from "../Games/GameTitle";
import { AddBank, EditBank, Delete } from "../Modal";
import { toast } from "react-toastify";
import { notifyWarning } from "../../utils/helper";
import { getBank, deleteBank, bankTransaction } from "../../redux/action";
import validateWithdrawal from "../../validation/bank/withdrawal";
import { TRANSACTION_TYPE } from "../../utils/constants";

const Withdraw = ({ navbar }) => {
  const [form, setForm] = useState({
    amount: "",
    account_type: "",
  });
  const [hideHeader, setHideHeader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [openBankModal, setOpenBankModal] = useState(false);
  const [openEditBankModal, setOpenEditBankModal] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [bankDetail, setBankDetail] = useState(null);
  const [deleteBankID, setDeleteBankID] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const bank = useSelector((state) => state?.GetBank?.bank);

  useEffect(() => {
    init();
  }, []);

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

  const init = (e) => {
    dispatch(getBank());
  };

  const betDeleted = () => {
    let form = {
      bank_id: deleteBankID,
    };
    setLoading(true);
    dispatch(
      deleteBank({
        form,
        callback: (data) => {
          if (data) {
            setLoading(false);
            setDeleteOpenModal(false);
            init();
          }
        },
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateWithdrawal(form);
    if (isValid) {
      console.log("form", form);
      // setLoading(true);
      let formPayload = {
        amount: form?.amount,
        bank_id: form?.account_type,
        transaction_type: TRANSACTION_TYPE?.WITHDRAWL,
      };
      dispatch(
        bankTransaction({
          data: formPayload,
          callback: (data) => {
            if (data) {
              setTimeout(() => {
                setLoading(false);
                setForm({
                  account_type: "",
                  amount: "",
                });
              }, 1000);
            }
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  const changeHandler = (e, name) => {
    if (e.target) {
      const { name, value } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setForm((prevState) => ({ ...prevState, [name]: value }));
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
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
          <HumburgerHeader setLoading={setLoading} />
        ) : (
          <Header
            isVerifyMail={false}
            setLoading={setLoading}
            navbar={navbar}
          />
        )}
        <GameTitle title="Withdraw Money" route="withdraw" />
      </section>

      <section
        style={{
          minHeight: "100vh", // Set min-height to cover full viewport height
        }}
        className="justify-center items-center bg-black relative flex-grow p-6 md:p-8 lg:p-12 overflow-hidden w-full"
      >
        <form className="w-full ">
          <div className="text-white rounded mt-2 p-4">
            <div className="w-full flex justify-between text-white">
              <p className="text-2xl">Bank Accounts</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenBankModal(true);
                }}
                className="bg-[#3F93F9] py-2 px-4 rounded-lg"
              >
                Add Bank Account
              </button>
            </div>

            <div className="max-w-full overflow-x-auto mt-3">
              <table className="mx-auto border-collapse w-full border border-gray-600 overflow-x-scroll">
                <thead>
                  <tr className="bg-gray-800 text-gray-200 uppercase">
                    <th className="px-4 py-2">SL</th>
                    <th className="px-4 py-2">Account Number</th>
                    <th className="px-4 py-2">Account Name</th>
                    <th className="px-4 py-2">Bank Name</th>
                    <th className="px-4 py-2">IFSC Code</th>
                    <th className="px-4 py-2">Account Type</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-cyan-950 text-[#BFC9CA]">
                  {bank && bank.length > 0 ? (
                    bank?.map((withdraw, index) => (
                      <tr key={index} className="text-center">
                        <td className={`py-4 lg:px-16 sm:px-4`}>{index + 1}</td>
                        <td className={`py-4 lg:px-16 sm:px-4`}>
                          {withdraw?.accountNumber}
                        </td>
                        <td className={`py-4 lg:px-16 sm:px-4`}>
                          {withdraw?.accountName}
                        </td>
                        <td className={`py-4 lg:px-16 sm:px-4`}>
                          {withdraw?.bankName}
                        </td>
                        <td className={`py-4 lg:px-16 sm:px-4`}>
                          {withdraw?.ifscCode}
                        </td>
                        <td className={`py-4 lg:px-16 sm:px-4`}>
                          {withdraw?.accountType}
                        </td>
                        <td className={`flex ml-5 py-4`}>
                          <MdEditNote
                            size={25}
                            className="mx-4 text-green-400 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setOpenEditBankModal(true);
                              setBankDetail(withdraw);
                            }}
                          />
                          <RiDeleteBin6Line
                            size={25}
                            className="text-red-500 cursor-pointer"
                            onClick={() => {
                              setDeleteBankID(withdraw?._id);
                              setDeleteOpenModal(true);
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-white rounded mt-2 p-4">
            <div className="w-full flex justify-between text-white">
              <p className="text-2xl">Withdrawl Request</p>
              <button className="bg-[#3F93F9] rounded-lg"></button>
            </div>

            <div className="max-w-full overflow-x-auto mt-3">
              <div className="input-wrapper flex mb-6">
                <div className="amount flex flex-col grow mr-3">
                  <input
                    className="w-full bg-transparent border border-gray-700 rounded p-2.5 px-3 focus:outline-none text-white text-2xl mb-2"
                    placeholder="Amount"
                    type="number"
                    name="amount"
                    value={form?.amount || ""}
                    onChange={(e) => changeHandler(e)}
                    id=""
                  />
                  {error?.amount && (
                    <div className="text-rose-600 font-serif">
                      {error?.amount}
                    </div>
                  )}
                </div>
                <div className="bank flex flex-col grow ml-3">
                  <select
                    id="account_type"
                    name="account_type"
                    value={form.account_type}
                    onChange={(e) => changeHandler(e, "account_type")}
                    className="w-full bg-transparent border border-gray-700 rounded p-2.5 px-3 focus:outline-none text-white text-2xl mb-2"
                  >
                    <option className="bg-black" value="">
                      Select Bank
                    </option>
                    {bank?.map((list, index) => {
                      return (
                        <option
                          key={index}
                          className="bg-black"
                          value={list?._id}
                        >
                          {list?.bankName}
                        </option>
                      );
                    })}
                    {/* <option className="bg-black" value="saving">Saving</option>
                    <option className="bg-black" value="current">Current</option> */}
                  </select>
                  {error?.account_type && (
                    <div className="text-rose-600 font-serif">
                      {error?.account_type}
                    </div>
                  )}
                </div>
              </div>
              <div className="input-wrapper flex mb-6">
                <button
                  onClick={(e) => handleSubmit(e)}
                  type="button"
                  className="w-full mr-auto bg-[#3F93F9] rounded px-2.5 font-semibold py-3 text-4xl text-white hover:bg-[#4665ba] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
      {openBankModal && (
        <AddBank openModal={openBankModal} closeModal={setOpenBankModal} />
      )}
      {openEditBankModal && (
        <EditBank
          openModal={openEditBankModal}
          closeModal={setOpenEditBankModal}
          bankDetail={bankDetail}
          init={init}
        />
      )}
      {deleteOpenModal && (
        <Delete
          showModal={deleteOpenModal}
          closeModal={setDeleteOpenModal}
          loading={loading}
          setLoading={setLoading}
          betDeleted={betDeleted}
        />
      )}
    </>
  );
};

export default Withdraw;
