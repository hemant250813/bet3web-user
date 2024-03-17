import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineCloudUpload } from "react-icons/md";
import validateDeposit from "../../validation/bank/deposit";
import { bankTransaction, getBankSlider } from "../../redux/action";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { Header, HumburgerHeader } from "../../component/layout";
import { Carousal } from "../../component/commonComponent";
import HeaderBackground from "../../assets/images/headerBackground.jpg";
import GameTitle from "../Games/GameTitle";
import { TRANSACTION_TYPE } from "../../utils/constants";
import { getLocalStorageItem } from "../../utils/helper";

const Deposit = ({ navbar }) => {
  const profile = useRef();
  const fileDisplayRef = useRef();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [hideHeader, setHideHeader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [userDepositData, setUserDepositData] = useState([]);
  const [bankDetails, setbankDetails] = useState([]);

  const isAuth = getLocalStorageItem("token");
  const userData = JSON.parse(getLocalStorageItem("user"));
  const get_bank_slider = useSelector(
    (state) => state?.GetBankSlider?.bankSlider
  );

  const [form, setForm] = useState({
    userId: userData?._id,
    amount: "",
    transaction_number: "",
    remark: "",
    imageUrl: "",
    imageFile: null,
  });
console.log("getBankSlider",get_bank_slider);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getBankSlider());
  }, []);

  useEffect(() => {
    if (windowWidth <= 768) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }

    if (isAuth && userData) {
      navigate("/deposit");
    } else {
      navigate("/");
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

  const handleValueClear = () => {
    setForm((prevValue) => ({
      ...prevValue,
      amount: "",
      transaction_number: "",
      remark: "",
      imageUrl: "",
      imageFile: null,
    }));
  };

  const AddNewDepositDetails = (e) => {
    e.preventDefault();
    console.log("AddNewDepositDetails", form);
    const { errors, isValid } = validateDeposit(form);

    if (isValid) {
      setLoading(true);
      let formPayload = {
        transaction_type: TRANSACTION_TYPE?.DEPOSIT,
        remark: form?.remark,
        transactionId: form?.transaction_number,
        image: form?.imageUrl,
        amount: form?.amount,
      };
      dispatch(
        bankTransaction({
          data: formPayload,
          callback: (data) => {
            if (data) {
              handleValueClear();
              setTimeout(() => {
                setLoading(false);
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

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setIsDragging(false);
    setIsImageSelected(true);
    setForm({ imageUrl: URL.createObjectURL(file), imageFile: file });
  };

  const resetDragState = () => {
    setIsDragging(false);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault(); // Prevent the default Tab behavior
      const inputs = document.querySelectorAll("input, textarea"); // Get all input and textarea elements
      const currentInput = event.target; // Get the currently focused element

      // Find the index of the current input in the inputs array
      const currentIndex = Array.from(inputs).findIndex(
        (input) => input === currentInput
      );

      // Focus on the next input or the first input if the current input is the last one
      const nextIndex = (currentIndex + 1) % inputs.length;
      inputs[nextIndex].focus();
    }
  };

  return (
    <>
      <section
        className="relative flex-grow p-4 md:p-8 lg:p-12  h-screen"
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
        <GameTitle title="Deposit Methods" route="reset_password" />
      </section>
      <section className="justify-center items-center bg-black relative flex-grow p-6 md:p-8 lg:p-12 overflow-hidden w-full">
        <form className="w-full ">
          <div className="w-full">
            <Carousal get_bank_slider={get_bank_slider}/>
          </div>

          <div className="deposit-wrapper bg-skin-nav rounded mt-2 p-4">
            <div className="text-center text-skin-white font-bold py-3 divide-y">
              Step 2: Send Us Receipts
            </div>

            <div className="px-6">
              <div className="input-wrapper flex mb-6">
                <div
                  className={`${
                    isImageSelected ? "selected" : ""
                  }`}
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
              </div>
              <div className="input-wrapper flex mb-6">
                <div className="amount flex flex-col grow mr-3">
                  <input
                    className="w-full bg-transparent border border-gray-700 rounded p-2.5 px-3 focus:outline-none text-white mb-2"
                    placeholder="Amount"
                    type="number"
                    name="amount"
                    value={form?.amount || ""}
                    onKeyDown={handleKeyDown}
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
                  <input
                    className="w-full bg-transparent border border-gray-700 rounded p-2.5 px-3 focus:outline-none text-white mb-2"
                    placeholder="Transaction Number"
                    type="number"
                    name="transaction_number"
                    value={form?.transaction_number || ""}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => changeHandler(e)}
                    id=""
                  />
                  {error?.transaction_number && (
                    <div className="text-rose-600 font-serif">
                      {error?.transaction_number}
                    </div>
                  )}
                </div>
              </div>
              <div className="input-wrapper mb-6">
                <textarea
                  className="w-full bg-transparent border border-gray-700  rounded p-2.5 px-3 focus:outline-none text-white"
                  placeholder="Remarks"
                  name="remark"
                  value={form?.remark || ""}
                  onChange={(e) => changeHandler(e)}
                  id=""
                />
                {error?.remark && (
                  <div className="text-rose-600 font-serif">
                    {error?.remark}
                  </div>
                )}
              </div>
              <div className="input-wrapper flex mb-6">
                <button
                  onClick={(e) => AddNewDepositDetails(e)}
                  type="button"
                  className="w-full mr-auto bg-[#3F93F9] rounded px-2.5 font-semibold py-3 text-4xl text-white hover:bg-[#4665ba] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Deposit;
