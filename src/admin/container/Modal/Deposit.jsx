import React, { useRef, useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import validateDeposit from "../../validation/transaction/deposit";
import { deposit } from "../../../redux/action";

const Deposit = ({
  isDepositModal,
  setIsDepositModal,
  adminBalance,
  userBalance,
  userDetail,
  init,
  setLoading,
}) => {
  const [form, setForm] = useState({
    admin_balance: adminBalance,
    user_balance: userBalance,
    amount: 0,
    remark: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [loginTimeOut, setLoginTimeOut] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // Clean up the event listener when the component unmounts
    return () => {
      clearTimeout(loginTimeOut);
    };
  }, []);

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

  const changeCalculation = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      let amount = value === "" ? 0 : parseInt(value);
      let finalBalance = adminBalance - amount;
      let user_balance = userBalance + amount;

      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));

      if (amount <= adminBalance) {
        setForm((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }

      if (parseInt(user_balance) <= parseInt(adminBalance)) {
        setForm((prevState) => ({
          ...prevState,
          ["admin_balance"]: finalBalance,
        }));

        setForm((prevState) => ({
          ...prevState,
          ["user_balance"]: user_balance,
        }));
      }
    }
  };

  const afterLoadingDispatch = () => {
    const formPayload = {
      userId: userDetail?._id,
      amount: parseInt(form?.amount),
      remark: form?.remark,
      transaction_type: "deposit",
      password: form?.password,
    };

    dispatch(
      deposit({
        formPayload,
        callback: (data) => {
          if (data) {
            setLoading(false);
            setIsDepositModal(false);
            init();
            setLoginTimeOut(loginTimeOut);
          }
        },
      })
    );
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateDeposit(form);

    if (isValid) {
      setIsDepositModal(false);
      setLoading(true);
      let timeout = setTimeout(() => {
        afterLoadingDispatch();
      }, 2000);
      setLoginTimeOut(timeout);
    } else {
      setError(errors);
    }
  };

  return (
    <Fragment>
      {isDepositModal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center mt-4"
        >
          <div className="relative p-4 w-full max-w-md">
            {/* Modal content */}
            <div className="relative bg-gray-900  rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-[#E3BC3F] dark:text-white">
                  Deposit to {userDetail?.username}
                </h3>
                <button
                  onClick={() => setIsDepositModal(false)}
                  type="button"
                  className="end-2.5 text-[#E3BC3F] bg-transparent hover:bg-indigo-600 hover:text-[#4fd1c5] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={(e) => handleOnSubmit(e)}>
                  <div>
                    <label
                      htmlFor="admin_balance"
                      className="block mb-2 text-sm font-medium text-[#E3BC3F] dark:text-white"
                    >
                      Enter the amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={form?.amount || ""}
                      onChange={(e) => changeCalculation(e)}
                      id="amount"
                      className="bg-indigo-600 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-[#4fd1c5] dark:text-indigo-600 "
                      placeholder="Enter the amount"
                    />
                    {error?.amount && (
                      <div className="text-rose-600 font-serif">
                        {error?.amount}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="admin_balance"
                      className="block mb-2 text-sm font-medium text-[#E3BC3F] dark:text-white"
                    >
                      Admin Balance
                    </label>
                    <input
                      type="number"
                      name="admin_balance"
                      value={form?.admin_balance || 0}
                      // onChange={(e) => changeHandler(e)}
                      id="admin_balance"
                      className="bg-indigo-600 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-[#4fd1c5] dark:text-indigo-600 "
                      placeholder="balance"
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="user_balance"
                      className="block mb-2 text-sm font-medium text-[#E3BC3F] dark:text-white"
                    >
                      User Balance
                    </label>
                    <input
                      type="number"
                      name="user_balance"
                      value={form?.user_balance || 0}
                      // onChange={(e) => changeHandler(e)}
                      id="user_balance"
                      className="bg-indigo-600 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-[#4fd1c5] dark:text-indigo-600 "
                      placeholder="balance"
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="remarks"
                      className="block mb-2 text-sm font-medium text-[#E3BC3F] dark:text-white"
                    >
                      Remarks
                    </label>
                    <textarea
                      id="remarks"
                      rows="4"
                      name="remark"
                      value={form?.remark || ""}
                      onChange={(e) => changeHandler(e)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-indigo-600 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-[#4fd1c5] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Remarks..."
                    ></textarea>
                    {error?.remark && (
                      <div className="text-rose-600 font-serif">
                        {error?.remark}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between gap-3">
                    <input
                      type="password"
                      name="password"
                      value={form?.password || ""}
                      onChange={(e) => changeHandler(e)}
                      placeholder="••••••••"
                      className="bg-indigo-600 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-[#4fd1c5] dark:text-white"
                    />
                    {error?.password && (
                      <div className="text-rose-600 font-serif">
                        {error?.password}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="w-full text-indigo-600 bg-[#4fd1c5] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Deposit;
