import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Sidebar,
  BottomNavbar,
  Footer,
} from "../../component/layout/index";
import { getLocalStorageItem } from "../../utils/helper";
import { GAME } from "../../utils/constants";
import { setting } from "../../../redux/action";
import { Loader, LoaderMain } from "../../../component/commonComponent";

const Setting = () => {
  const [form, setForm] = useState({
    min: 1,
    max: 100,
    probability: 1,
    odd: 150,
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [loginTimeOut, setLoginTimeOut] = useState(0);
  const [selectGame, setSelectGame] = useState("all");
  const [loading, setLoading] = useState(false);
  const [innerLoading, setInnerLoading] = useState(false);

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
      clearTimeout(loginTimeOut);
    };
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    if (getLocalStorageItem("token") && getLocalStorageItem("user")) {
      navigate("/setting");
    } else {
      navigate("/");
    }
  }, []);

  const changeHandler = (e) => {
    if (e.target) {
      const value = e.target.value;
      const { name } = e.target;
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const afterLoadingDispatch = () => {
    let payload = {
      game: selectGame,
      min: form?.min,
      max: form?.max,
      probability: form?.probability,
      odd: form?.odd,
    };

    dispatch(
      setting({
        payload,
        callback: async (data) => {
          if (data) {
            setInnerLoading(false);
            clearTimeout(loginTimeOut);
          }
        },
      })
    );
  };

  const onSubmit = () => {
    setInnerLoading(true);
    let timeout = setTimeout(() => {
      afterLoadingDispatch();
    }, 2000);
    setLoginTimeOut(timeout);
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
            <Navbar title="Setting" setLoading={setLoading} />
            {innerLoading ? (
              <Loader />
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
                className="flex-1 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#4fd1c5] scrollbar-track-[#93C5FD] bg-[#E3BC3F] p-4 border-4 border-[#4fd1c5]"
                style={{ maxHeight: "calc(100vh - 120px)" }}
              >
                <div className="grid grid-cols-1 gap-8 mt-8  w-full">
                  <label
                    htmlFor="input1"
                    className="block text-black text-3xl py-2 font-bold"
                  >
                    Games
                  </label>
                  <div className="">
                    <select
                      name="gateway"
                      id="select_gateway"
                      className={`bg-white text-gray-900 cursor-pointer font-bold px-4 rounded border-4 border-[#4fd1c5] ${
                        windowWidth === 320
                          ? "w-40 h-16 text-md"
                          : windowWidth === 375
                          ? "w-52 h-16 text-lg"
                          : windowWidth === 425
                          ? "w-60 h-16 text-lg"
                          : windowWidth === 768
                          ? "w-80 h-16 text-xl"
                          : windowWidth === 1024
                          ? "w-96 h-16 text-xl"
                          : windowWidth === 1440
                          ? "w-7/12 h-16 text-xl"
                          : "w-full text-2xl"
                      }`}
                      value={selectGame}
                      onChange={(e) => setSelectGame(e.target.value)}
                      data-live-search="true"
                    >
                      {GAME &&
                        GAME?.map((option, index) => (
                          <option
                            key={index}
                            data-token={option.label}
                            value={option.value}
                            className={`change`}
                          >
                            {option.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4  w-full">
                  <div className="mb-4">
                    <label
                      htmlFor="min"
                      className="block text-black text-3xl py-2 font-bold"
                    >
                      Min
                    </label>
                    <input
                      name="min"
                      onChange={(e) => changeHandler(e)}
                      value={form?.min}
                      type="number"
                      id="min"
                      className="bg-white rounded-md p-2 w-full text-gray-900  text-2xl font-bold  h-16 border-4 border-[#4fd1c5]"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="max"
                      className="block text-black text-3xl py-2 font-bold"
                    >
                      Max
                    </label>
                    <input
                      name="max"
                      onChange={(e) => changeHandler(e)}
                      value={form?.max}
                      type="number"
                      id="max"
                      className="bg-white rounded-md p-2 w-full text-gray-900  text-2xl font-bold  h-16 border-4 border-[#4fd1c5]"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="probability"
                      className="block text-blackwhite text-3xl py-2 font-bold"
                    >
                      Probability
                    </label>
                    <input
                      name="probability"
                      onChange={(e) => changeHandler(e)}
                      value={form?.probability}
                      type="number"
                      id="probability"
                      className="bg-white rounded-md p-2 w-full text-gray-900  text-2xl font-bold  h-16 border-4 border-[#4fd1c5]"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="odd"
                      className="block text-blackwhite text-3xl py-2 font-bold"
                    >
                      Odd (%)
                    </label>
                    <input
                      name="odd"
                      onChange={(e) => changeHandler(e)}
                      value={form?.odd}
                      type="number"
                      id="odd"
                      className="bg-white rounded-md p-2 w-full text-gray-900  text-2xl font-bold  h-16 border-4 border-[#4fd1c5]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-[#4fd1c5] hover:text-black py-2 px-4 rounded-md h-16 text-[#E3BC3F] text-3xl font-bold border-4 border-[#4fd1c5]"
                >
                  Submit
                </button>
              </form>
            )}
            {/* Bottom navbar */}
            {windowWidth <= 768 ? <BottomNavbar /> : <Footer />}
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
