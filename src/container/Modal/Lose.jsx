import React, { Fragment, useEffect } from "react";
import lose from "../../assets/images/result/lose-message.png";

const Lose = ({ loseOpenModal, setLoseOpenModal, flipResult, keno }) => {
  useEffect(() => {
    let intervalId;
    const handleAnimation = () => {
      setLoseOpenModal(false);
    };
    if (!keno) {
      intervalId = setTimeout(handleAnimation, 2000); // Change the duration as needed (2000ms = 2 seconds)
    }

    return () => clearTimeout(intervalId);
  }, []);
  return (
    <Fragment>
      {loseOpenModal && (
        <div
        
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center"
        >
          <div
            // onMouseEnter={() => setLoseOpenModal(false)}
            onMouseEnter={() => {
              if (keno) {
                setLoseOpenModal(false);
              }
            }}
            className="relative p-4 w-full max-w-md"
          >
            {/* Modal content */}
            <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              {keno && (
                <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-[#4fd1c5] dark:text-white transition-transform duration-700 transform -translate-x-4">
                    Selected Number {flipResult?.join(",")}
                  </h3>
                  {/* <button
                  onClick={() => setLoseOpenModal(false)}
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
                </button> */}
                </div>
              )}

              {/* Modal body */}
              <div className="p-4 md:p-5 flex justify-center items-center">
                <img className="max-w-full h-auto" src={lose} alt="lose" />
                {flipResult}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Lose;
