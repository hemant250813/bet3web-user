import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Sidebar,
  BottomNavbar,
  Footer,
} from "../../component/layout/index";
import { getLocalStorageItem, notifyWarning } from "../../utils/helper";
import { GAME } from "../../utils/constants";
import { question, authDetail } from "../../../redux/action";
import { Loader, LoaderMain } from "../../../component/commonComponent";

const Qbetting = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [loading, setLoading] = useState(false);
  const [innerLoading, setInnerLoading] = useState(false);
  const [groups, setGroups] = useState([
    {
      id: 1,
      inputValues: ["", "", "", "", ""],
      placeholders: [
        "enter the question",
        "option 1",
        "option 2",
        "option 3",
        "odds",
      ],
      name: ["question", "option1", "option2", "option3", "odd"],
      types: ["text", "text", "text", "text", "number"],
    },
  ]);

  const admin_detail = useSelector((state) => state?.AuthDetail?.authDetails);

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
    dispatch(authDetail());
    if (getLocalStorageItem("token") && getLocalStorageItem("user")) {
      navigate("/qbetting");
    } else {
      navigate("/");
    }
  }, []);

  const handleAddGroup = () => {
    const newGroup = {
      id: groups.length + 1,
      inputValues: ["", "", "", "", ""],
      placeholders: [
        "enter the question",
        "option 1",
        "option 2",
        "option 3",
        "odds",
      ],
      name: ["question", "option1", "option2", "option3", "odd"],
      types: ["text", "text", "text", "text", "number"],
    };
    setGroups([...groups, newGroup]);
  };

  const handleRemoveGroup = (groupId) => {
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  const handleInputChange = (groupId, fieldIndex, value) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        group.inputValues[fieldIndex] = value;
      }
      return group;
    });
    setGroups(updatedGroups);
  };

  const questionValidation = (array) => {
    for (let obj of array) {
      for (let key in obj) {
        if (obj[key] === "" || obj[key] === undefined) {
          return false; // If any key has an empty value or is missing, return false
        }
      }
    }
    return true; // If all keys have values, return true
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gather data
    const formData = groups.flatMap((group) => {
      const groupData = {};
      if (Array.isArray(group.name)) {
        group.name.forEach((name, index) => {
          if (name === "question" && group.inputValues[index] !== "") {
            groupData[name] = group.inputValues[index];
            groupData["questionSlug"] = group.inputValues[index]
              ?.split(" ")
              ?.join("");
          } else if (name === "odd" && group.inputValues[index] !== "") {
            groupData[name] = parseInt(group.inputValues[index]);
          } else {
            groupData[name] = group.inputValues[index];
          }
        });
        groupData["isDeclared"] = false;
      }
      return groupData;
    });

    let validate = questionValidation(formData);

    if (validate) {
      dispatch(
        question({
          formData,
          callback: (data) => {
            if (data) {
              setGroups([
                {
                  id: 1,
                  inputValues: ["", "", "", "", ""],
                  placeholders: [
                    "enter the question",
                    "option 1",
                    "option 2",
                    "option 3",
                    "odds",
                  ],
                  name: ["question", "option1", "option2", "option3", "odds"],
                  types: ["text", "text", "text", "text", "number"],
                },
              ]);
            }
          },
        })
      );
    } else {
      notifyWarning("All field are required.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
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
              title="Question For Betting"
              setLoading={setLoading}
              admin_detail={admin_detail}
            />
            {innerLoading ? (
              <Loader />
            ) : (
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex-1 overflow-x-hidden overflow-y-auto scrollbar scrollbar-thumb-[#4fd1c5] scrollbar-track-[#93C5FD] bg-[#E3BC3F] p-4 border-4 border-[#4fd1c5]"
                style={{ maxHeight: "calc(100vh - 120px)" }}
              >
                {groups.map((group, index) => (
                  <div key={index} className="mb-4">
                    {group.inputValues.map((inputValue, inputIndex) => (
                      <input
                        key={inputIndex}
                        type={group.types[inputIndex]}
                        placeholder={group.placeholders[inputIndex]}
                        value={inputValue}
                        onChange={(e) =>
                          handleInputChange(
                            group.id,
                            inputIndex,
                            e.target.value
                          )
                        }
                        className="ml-2 border-4 border-[#4fd1c5]"
                      />
                    ))}
                    <button
                      className=" p-2 mt-4 ml-2 rounded-md font-bold"
                      type="button"
                      onClick={() => handleRemoveGroup(group.id)}
                    >
                      <AiFillDelete className=" text-red-500" size={30} />
                    </button>
                    <hr className="bg-gray-500 mt-2 h-1" />
                  </div>
                ))}
                <div className="grid grid-cols-1">
                  <button
                    className="bg-[#008000] text-black p-4 font-bold mt-4 ml-2 rounded-md"
                    type="button"
                    onClick={handleAddGroup}
                  >
                    Add Betting Question
                  </button>
                  <button
                    className="bg-gray-900 hover:bg-[#4fd1c5] hover:text-black py-2  rounded-md h-16 text-[#E3BC3F] text-3xl font-bold border-4 border-[#4fd1c5] mt-3"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
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

export default Qbetting;
