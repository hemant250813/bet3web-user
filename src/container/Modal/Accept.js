import React, { useState } from "react";

const Accept = ({
  showModal,
  closeModal,
  loading,
  setLoading,
  requestedAccepted,
}) => {
  const [modalBlurClass, setModalBlurClass] = useState("");

  // Function to handle modal open/close and blur effect
  const handleModal = (isOpen) => {
    if (isOpen) {
      setModalBlurClass("backdrop-blur-md");
    } else {
      setModalBlurClass("");
    }
    closeModal(isOpen);
  };

  return (
    <div>
      <div className={`fixed inset-0 z-50 overflow-hidden ${modalBlurClass}`}>
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black opacity-80"></div>

        {/* Modal content */}
        <div
          id="popup-modal"
          tabIndex="-1"
          className={`overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-lg dark:bg-gray-700 ${
            showModal ? "" : "hidden"
          }`}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                onClick={() => handleModal(false)}
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
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
              {/* Modal body */}
              <div className={`${true ? "" : ""} p-4 md:p-5 text-center`}>
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#3F93F9]"></div>
                  </div>
                ) : (
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
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
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}

                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to accept the request ?{" "}
                </h3>
                {/* Accept button */}
                <button
                  onClick={() => requestedAccepted()}
                  type="button"
                  className={` w-32 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
                >
                  Yes, I'm sure
                </button>
                {/* Cancel button */}
                <button
                  onClick={() => {
                    handleModal(false);
                    setLoading(false);
                  }}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accept;
