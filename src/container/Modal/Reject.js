import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { acceptRejectRequest } from "../../redux/action";
import validateReject from "../../validation/transaction/reject";
import { ACCOUNT_TYPE } from "../../utils/constants";

const Reject = ({
  openModal,
  closeModal,
  bankTransactionID,
  init,
  setInnerLoadingDeposit,
  setInnerLoadingWithdrawal,
  statusType,
}) => {
  console.log("bankTransactionID", bankTransactionID);
  const [form, setForm] = useState({
    remark: "",
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [clearIntervalLoading, setClearIntervalLoading] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // Clean up the event listener when the component unmounts
    return () => {
      clearTimeout(clearIntervalLoading);
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
  console.log("form", form);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateReject(form);
    if (isValid) {
      setIsLoading(true);
      if (statusType === "deposit") {
        setInnerLoadingDeposit(true);
      } else {
        setInnerLoadingWithdrawal(true);
      }
      let formPayload = {
        id: bankTransactionID,
        remark: `Reason: ${form?.remark}`,
        requestType: "rejected",
      };
      dispatch(
        acceptRejectRequest({
          data: formPayload,
          callback: (data) => {
            if (data) {
              let clearLoading = setTimeout(() => {
                setIsLoading(false); // Finish loading
                closeModal(false);
                init();
                if (statusType === "deposit") {
                  setInnerLoadingDeposit(false);
                } else {
                  setInnerLoadingWithdrawal(false);
                }
              }, 2000); // Adjust the timeout as needed
              setClearIntervalLoading(clearLoading);
            }
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  return (
    <Fragment>
      {openModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-lg">
          <div className="relative p-4 w-full max-w-md">
            {/* Modal content */}
            <div className="relative bg-black rounded-lg shadow dark:bg-gray-700  border-4 border-gray-600">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="ml-3 text-xl font-semibold text-[#3F93F9] dark:text-white transition-transform duration-700 transform -translate-x-4">
                  Enter reason for rejection
                </h3>
                <button
                  onClick={() => closeModal(false)}
                  type="button"
                  className="end-2.5 text-[#3F93F9] font-bold bg-transparent hover:bg-[#3F93F9] hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <MdClose className="w-6 h-6" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 flex justify-center items-center">
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="account_number"
                      className="block text-white font-semibold mb-1"
                    >
                      Reason
                    </label>
                    <textarea
                      type="textarea"
                      id="remark"
                      name="remark"
                      value={form?.remark || ""}
                      onChange={(e) => changeHandler(e)}
                      className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:outline-none focus:border-indigo-500 mb-2"
                      placeholder="Enter the reason"
                    ></textarea>
                    {error?.remark && (
                      <div className="text-rose-600 font-serif">
                        {error?.remark}
                      </div>
                    )}
                  </div>
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#3F93F9]"></div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-[#3F93F9] text-white font-bold text-2xl rounded-lg hover:bg-[#4182d2] focus:outline-none focus:bg-indigo-700 transition-width duration-500"
                    >
                      Submit
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Reject;
