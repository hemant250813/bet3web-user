import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { addBank } from "../../redux/action";
import validateAddBank from "../../validation/bank/addBank";
import { ACCOUNT_TYPE } from "../../utils/constants";

const AddBank = ({ openModal, closeModal }) => {
  console.log("openModal", openModal);
  const [form, setForm] = useState({
    account_number: "",
    account_name: "",
    bank_name: "",
    ifsc_code: "",
    account_type: "",
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
    const { errors, isValid } = validateAddBank(form);

    if (isValid) {
      setIsLoading(true);
      let formPayload = {
        accountNumber: form?.account_number,
        accountName: form?.account_name,
        bankName: form?.bank_name,
        ifscCode: form?.ifsc_code,
        accountType: form?.account_type,
      };
      dispatch(
        addBank({
          data: formPayload,
          callback: (data) => {
            if (data) {
              let clearLoading = setTimeout(() => {
                setIsLoading(false); // Finish loading
                closeModal(false);
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
                  Add Bank
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
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="account_number"
                      name="account_number"
                      value={form?.account_number || ""}
                      onChange={(e) => changeHandler(e)}
                      className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:outline-none focus:border-indigo-500 mb-2"
                      placeholder="Enter Account Number"
                    />
                    {error?.account_number && (
                      <div className="text-rose-600 font-serif">
                        {error?.account_number}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="account_name"
                      className="block text-white font-semibold mb-1"
                    >
                      Account Name
                    </label>
                    <input
                      type="text"
                      id="account_name"
                      name="account_name"
                      value={form?.account_name || ""}
                      onChange={(e) => changeHandler(e)}
                      className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:outline-none focus:border-indigo-500 mb-2"
                      placeholder="Enter Account Name"
                    />
                    {error?.account_name && (
                      <div className="text-rose-600 font-serif">
                        {error?.account_name}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="bank_name"
                      className="block text-white font-semibold mb-1"
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bank_name"
                      name="bank_name"
                      value={form?.bank_name || ""}
                      onChange={(e) => changeHandler(e)}
                      className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:outline-none focus:border-indigo-500 mb-2"
                      placeholder="Enter Bank Name"
                    />
                    {error?.bank_name && (
                      <div className="text-rose-600 font-serif">
                        {error?.bank_name}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="ifsc_code"
                      className="block text-white font-semibold mb-1"
                    >
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      id="ifsc_code"
                      name="ifsc_code"
                      value={form?.ifsc_code || ""}
                      onChange={(e) => changeHandler(e)}
                      className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:outline-none focus:border-indigo-500 mb-2"
                      placeholder="Enter IFSC Code"
                    />
                    {error?.ifsc_code && (
                      <div className="text-rose-600 font-serif">
                        {error?.ifsc_code}
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="account_type"
                      className="block text-white font-semibold mb-1"
                    >
                      Account Type
                    </label>
                    <select
                      id="account_type"
                      name="account_type"
                      value={form.account_type}
                      onChange={(e) => changeHandler(e, "account_type")}
                      className="w-full px-3 py-2 border rounded-lg bg-gray-200 focus:outline-none focus:border-indigo-500 mb-2"
                    >
                      <option value="">Select Account Type</option>
                      <option value="saving">Saving</option>
                      <option value="current">Current</option>
                    </select>
                    {error?.account_type && (
                      <div className="text-rose-600 font-serif">
                        {error?.account_type}
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

export default AddBank;
