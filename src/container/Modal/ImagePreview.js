import React, { Fragment, useState } from "react";
import { MdClose } from "react-icons/md";
import "../../ImagePreview.css";
const ImagePreview = ({ openModal, closeModal, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Fragment>
      {openModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-lg">
          <div className="relative p-4 w-full max-w-md">
            {/* Modal content */}
            <div className="relative bg-black rounded-lg shadow dark:bg-gray-700  border-4 border-gray-600">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
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
                <figure
                  className="relative max-w-sm cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img
                    className={`rounded-lg ${isHovered ? "zoom-in" : ""}`}
                    src={image}
                    alt="description"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ImagePreview;
