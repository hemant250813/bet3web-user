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
import { getLocalStorageItem, notifyWarning, notifySuccess } from "../../utils/helper";
import { GAME } from "../../utils/constants";
import { question, authDetail } from "../../../redux/action";
import { Loader, LoaderMain } from "../../../component/commonComponent";

const Qbetting = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [loading, setLoading] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [innerLoading, setInnerLoading] = useState(false);
  const [questionTimeOut, setQuestionTimeOut] = useState(0);
  const [groups, setGroups] = useState([
    {
      id: 1,
      inputValues: ["", "", "", "", "", "", ""],
      placeholders: [
        "enter the question",
        "option 1",
        "option 2",
        "option 3",
        "odds1",
        "odds2",
        "odds3",
      ],
      name: [
        "question",
        "option1",
        "option2",
        "option3",
        "odds1",
        "odds2",
        "odds3",
      ],
      types: ["text", "text", "text", "text", "number", "number", "number"],
      image1: null,
      image2: null,
      image3: null, // Initialize image property for each group
    },
  ]);

  const admin_detail = useSelector((state) => state?.AuthDetail?.authDetails);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
      clearTimeout(questionTimeOut);
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
      inputValues: ["", "", "", "", "", "", ""],
      placeholders: [
        "enter the question",
        "option 1",
        "option 2",
        "option 3",
        "odds1",
        "odds2",
        "odds3",
      ],
      name: [
        "question",
        "option1",
        "option2",
        "option3",
        "odds1",
        "odds2",
        "odds3",
      ],
      types: ["text", "text", "text", "text", "number", "number", "number"],
      image1: null,
      image2: null,
      image3: null,
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

  const handleImageChange = (groupId, imageIndex, image) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        if (imageIndex === 1) {
          group.image1 = image;
        } else if (imageIndex === 2) {
          group.image2 = image;
        } else if (imageIndex === 3) {
          group.image3 = image;
        }
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
    setLoadingQuestion(true);
    // Construct data array
    const requestData = groups.map((group) => {
      const groupData = {};

      group.name.forEach((name, index) => {
        if (name === "question" && group.inputValues[index] !== "") {
          groupData[name] = group.inputValues[index];
          groupData["questionSlug"] = group.inputValues[index]
            ?.split(" ")
            ?.join("");
        } else if (name.startsWith("odds") && group.inputValues[index] !== "") {
          groupData[name] = parseInt(group.inputValues[index]);
        } else {
          groupData[name] = group.inputValues[index];
        }
      });

      groupData["isDeclared"] = false;

      // Add image data if available
      if (group.image1 && group.image2 && group.image3) {
        const reader1 = new FileReader();
        const reader2 = new FileReader();
        const reader3 = new FileReader();

        reader1.readAsDataURL(group.image1);
        reader2.readAsDataURL(group.image2);
        reader3.readAsDataURL(group.image3);

        reader1.onloadend = () => {
          reader2.onloadend = () => {
            reader3.onloadend = () => {
              groupData["image1"] = reader1.result;
              groupData["image2"] = reader2.result;
              groupData["image3"] = reader3.result;
              dispatch(
                question({
                  groupData,
                  callback: (data) => {
                    if (data) {
                      if(data?.meta?.code === 200){
                        notifySuccess(data.meta.message);
                      }
                      console.log("question response",data);
                      setGroups([
                        {
                          id: 1,
                          inputValues: ["", "", "", "", "", "", ""],
                          placeholders: [
                            "enter the question",
                            "option 1",
                            "option 2",
                            "option 3",
                            "odds1",
                            "odds2",
                            "odds3",
                          ],
                          name: [
                            "question",
                            "option1",
                            "option2",
                            "option3",
                            "odds1",
                            "odds2",
                            "odds3",
                          ],
                          types: [
                            "text",
                            "text",
                            "text",
                            "text",
                            "number",
                            "number",
                            "number",
                          ],
                          image1: null,
                          image2: null,
                          image3: null,
                        },
                      ]);
                    }
                  },
                })
              );
            };
          };
        };
      }

      return groupData;
    });

    let validate = questionValidation(requestData);

    if (validate) {
      dispatch(
        question({
          requestData,
          callback: (data) => {
            if (data) {
              // Handle success
              let timeout = setTimeout(() => {
                setLoadingQuestion(false);
              }, 3000);
              setQuestionTimeOut(timeout);
            }
          },
        })
      );
    } else {
      notifyWarning("All fields are required.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <>
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
                        className="ml-2 border-4 border-[#4fd1c5] mb-4"
                      />
                    ))}
                    <input
                      className="ml-4"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(group.id, 1, e.target.files[0])
                      }
                    />
                    <input
                      className="ml-4"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(group.id, 2, e.target.files[0])
                      }
                    />
                    <input
                      className="ml-4"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(group.id, 3, e.target.files[0])
                      }
                    />
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
                    {loadingQuestion ? (
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#3F93F9]"></div>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            )}
            {windowWidth <= 768 ? <BottomNavbar /> : <Footer />}
          </div>
        </div>
      )}
    </>
  );
};

export default Qbetting;
