import React, { Fragment } from "react";
import win from "../../assets/images/result/win-message.png";

const Win = ({ winOpenModal, setWinOpenModal, flipResult }) => {
  return (
    <Fragment>
      {winOpenModal && (
        <div
          
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center"
        >
          <div onMouseEnter={() => setWinOpenModal(false)} className="relative p-4 w-full max-w-md">
            {/* Modal content */}
            <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              {/* <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-[#4fd1c5] dark:text-white">
                  Win {flipResult}
                </h3>
                <button
                  onClick={() => setWinOpenModal(false)}
                  type="button"
                  className="end-2.5 text-[#4fd1c5] bg-transparent hover:bg-indigo-600 hover:text-[#4fd1c5] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              </div> */}
              {/* Modal body */}
              <div className="p-4 md:p-5 flex justify-center items-center">
                <img className="max-w-full h-auto" src={win} alt="lose" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Win;
