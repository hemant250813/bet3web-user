import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCloudUpload } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import moment from "moment";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Sidebar,
  BottomNavbar,
  Footer,
} from "../../component/layout/index";
import { Delete, ImagePreview } from "../../../container/Modal";
import { getLocalStorageItem, notifyWarning } from "../../utils/helper";
import validateBankSlider from "../../validation/bank/addBankSlider";
import { GAME } from "../../utils/constants";
import {
  getBankSlider,
  authDetail,
  addBankSlider,
  deleteBankSlider,
} from "../../../redux/action";
import { Loader, LoaderMain } from "../../../component/commonComponent";

const Bank = () => {
  const profile = useRef();
  const fileDisplayRef = useRef();
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    imageFile: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [loading, setLoading] = useState(false);
  const [innerLoading, setInnerLoading] = useState(false);
  const [questionDropdown, setQuestionDropdown] = useState([]);
  const [option, setOption] = useState([]);
  const [error, setError] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [deleteBankID, setDeleteBankID] = useState("");
  const [imagePreviewOpenModal, setImagePreviewOpenModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const admin_detail = useSelector((state) => state?.AuthDetail?.authDetails);

  const get_bank_slider = useSelector(
    (state) => state?.GetBankSlider?.bankSlider
  );
  console.log("get_bank_slider", get_bank_slider);
  const navigate = useNavigate();
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
    dispatch(getBankSlider());
    dispatch(authDetail());
    if (getLocalStorageItem("token") && getLocalStorageItem("user")) {
      navigate("/bank");
    } else {
      navigate("/");
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setIsDragging(false);
    setIsImageSelected(true);
    setForm({ imageUrl: URL.createObjectURL(file), imageFile: file });
  };

  const profileChangeHandler = async (e) => {
    setIsImageSelected(true);
    const file = e.target.files[0];
    if (file) {
      setForm((prevForm) => ({
        ...prevForm,
        imageFile: file,
      }));
      setError((prevState) => ({
        ...prevState,
        imageUrl: "",
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setForm((prevForm) => ({
          ...prevForm,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        imageUrl: null,
        imageFile: null,
      }));
    }
    // You may want to add a delay to mimic the transition duration
    setTimeout(() => {
      setIsImageSelected(false);
    }, 300); // Adjust the duration as needed
  };

  const handleValueClear = () => {
    setForm((prevValue) => ({
      ...prevValue,
      title: "",
      imageUrl: "",
      imageFile: null,
    }));
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

  const resetDragState = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateBankSlider(form);
    if (isValid) {
      setLoading(true);
      let formPayload = {
        title: form?.title,
        image: form?.imageUrl,
      };
      dispatch(
        addBankSlider({
          data: formPayload,
          callback: (data) => {
            if (data) {
              setTimeout(() => {
                setLoading(false);
                dispatch(getBankSlider());
                handleValueClear();
              }, 1000);
            }
          },
        })
      );

      console.log("formPayload", formPayload);
    } else {
      setError(errors);
    }
  };

  // Function to perform the actual search
  const performSearch = (term) => {
    // Call your API or perform any other action here
    dispatch(getBankSlider({ search: term }));
  };

  // Function to debounce the search
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Debounced version of the performSearch function
  const debouncedSearch = debounce(performSearch, 1000); // Adjust delay as needed

  // Handler for input change
  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const betDeleted = () => {
    let form = {
      bank_id: deleteBankID,
    };
    setLoading(true);
    dispatch(
      deleteBankSlider({
        form,
        callback: (data) => {
          if (data) {
            setLoading(false);
            setDeleteOpenModal(false);
            dispatch(getBankSlider());
          }
        },
      })
    );
  };

  return (
    <>
      {" "}
      {loading ? (
        <LoaderMain />
      ) : (
        <div className="flex h-screen">
          {windowWidth > 768 && <Sidebar />}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar
              title="Results"
              setLoading={setLoading}
              admin_detail={admin_detail}
            />
            <main
              className="flex-1 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#4fd1c5] scrollbar-track-[#93C5FD] bg-[#E3BC3F] p-4 border-4 border-[#4fd1c5]"
              style={{ maxHeight: "calc(100vh - 120px)" }}
            >
              {/* Game Filter buttons */}
              <div className="relative justify-between grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 border-8 border-[#7E8D8D] p-6 w-full">
                <div
                  className={`${isImageSelected ? "selected" : ""}`}
                  // onDragEnter={handleDragEnter}
                  // onDragLeave={handleDragLeave}
                  // onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={profile}
                    onChange={profileChangeHandler}
                  />
                  <div
                    ref={fileDisplayRef}
                    className={`file-display ${isDragging ? "dragging" : ""}`}
                  >
                    <button
                      draggable
                      onMouseDown={(e) => {
                        profile.current.click();
                        resetDragState();
                      }}
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", ""); // Required for Firefox
                        e.target.classList.add("dragging"); // Add dragging class directly
                      }}
                      onDragEnd={() => {
                        document
                          .querySelector(".file-input-button")
                          .classList.remove("dragging"); // Remove dragging class
                        resetDragState();
                      }}
                      className="file-input-button w-full bg-transparent border border-none rounded p-2.5 px-3 focus:outline-none text-skin-white"
                      style={{
                        width: "200px",
                        height: "150px",
                        backgroundImage: form?.imageUrl
                          ? `url(${form?.imageUrl})`
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MdOutlineCloudUpload
                        size={100}
                        color="#3F93F9"
                        className="drop-shadow-2xl hover:translate-y-3.5"
                      />
                    </button>
                  </div>
                  {error?.imageUrl && (
                    <div className="text-rose-600 font-serif">
                      {error?.imageUrl}
                    </div>
                  )}
                </div>
                <div className="amount flex flex-col grow mr-3">
                  <input
                    className="w-full bg-transparent border-4 border-[#7E8D8D] rounded p-2.5 px-3 focus:outline-none text-gray-900 mb-2"
                    placeholder="Title"
                    type="text"
                    name="title"
                    value={form?.title || ""}
                    onChange={(e) => changeHandler(e)}
                    id=""
                  />
                  {error?.title && (
                    <div className="text-rose-600 font-serif">
                      {error?.title}
                    </div>
                  )}
                </div>
                <div className="input-wrapper flex mb-6">
                  <button
                    onClick={(e) => handleSubmit(e)}
                    type="button"
                    className="w-full mr-auto bg-gray-900 rounded px-2.5 font-semibold py-3 text-4xl text-white hover:bg-[#7E8D8D] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="w-full">
                <div className="max-w-lg mx-auto p-2 float-left w-full">
                  <div className="flex">
                    <div className="relative w-full">
                      <input
                        type="search"
                        id="search-dropdown"
                        className=" block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg  border border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="absolute top-0 end-0 p-3 text-sm font-medium h-full text-[#E3BC3F] bg-gray-900 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg
                          className="w-4 h-4"
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
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                        <span className="sr-only">Search</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto w-full">
                  <table className="min-w-full divide-y divide-gray-200">
                    <>
                      <thead className="bg-gray-900 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                            Image
                          </th>
                          <th className="px-6 py-3 text-left text-xl font-medium text-[#E3BC3F] uppercase tracking-wider">
                            Action
                          </th>
                          {/* Add more table headers as needed */}
                        </tr>
                      </thead>
                      <tbody
                        className={`${
                          loading ? "" : "bg-white divide-y divide-gray-200"
                        } `}
                      >
                        {innerLoading ? (
                          <tr className="w-full">
                            <td
                              colSpan={8}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              {" "}
                              <Loader />
                            </td>
                          </tr>
                        ) : get_bank_slider?.length > 0 ? (
                          get_bank_slider?.map((bank, index) => (
                            <tr
                              key={index}
                              className={`${
                                (index + 1) % 2 === 0
                                  ? "bg-[#4fd1c5]"
                                  : "bg-[#7E8D8D]"
                              } text-white `}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-xl  p-2">
                                  {" "}
                                  {moment(bank?.createdAt).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                  )}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-xl">
                                {bank?.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-xl">
                                <img
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setImageUrl(bank?.image);
                                    setImagePreviewOpenModal(true);
                                  }}
                                  src={bank?.image}
                                  alt="logo"
                                  className="w-48 h-24 rounded-lg cursor-pointer" 
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-xl">
                                <RiDeleteBin6Fill
                                  size={30}
                                  className="text-red-500 cursor-pointer ml-5"
                                  onClick={() => {
                                    setDeleteBankID(bank?._id);
                                    setDeleteOpenModal(true);
                                  }}
                                />
                              </td>
                              {/* Add more table data cells as needed */}
                            </tr>
                          ))
                        ) : (
                          <tr className="bg-[#4fd1c5] text-center text-xl">
                            <td
                              colSpan={8}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              no data found
                            </td>
                          </tr>
                        )}

                        {}
                      </tbody>
                    </>
                  </table>
                </div>
              </div>
            </main>
            {/* Bottom navbar */}
            {windowWidth <= 768 ? <BottomNavbar /> : <Footer />}
          </div>
        </div>
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

export default Bank;
