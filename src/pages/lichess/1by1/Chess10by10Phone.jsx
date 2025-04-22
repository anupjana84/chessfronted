// import "./chess8by8.css";
import Board from "../../../components/Board/Board";
import { reducer } from "../../AnalysisBoard/reducer/reducer";
import { useEffect, useReducer, useRef, useState } from "react";
import { initGameState } from "../../../constants";
import AppContext from "../../../contexts/Context";
import Control from "../../../components/Control/Control";
import MovesList from "../../../components/Control/bits/MovesList";

import { GiBulletBill } from "react-icons/gi";
import { BsDot } from "react-icons/bs";
import { GoDot, GoDotFill } from "react-icons/go";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { MdLocationOff, MdLocationOn, MdSkipPrevious } from "react-icons/md";
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import { PiSpeakerHighFill, PiSpeakerSlashFill } from "react-icons/pi";
import { TbReload } from "react-icons/tb";
import { IoMenu, IoPlayForward } from "react-icons/io5";

import {
  CurrentIndex,
  clearCandidates,
  forwardMove,
  takeBack,
} from "../../AnalysisBoard/reducer/actions/move";
import { updateCastling } from "../../AnalysisBoard/reducer/actions/game";
import Layout from "../../../layouts/Layout";
import BackButton from "../../../layouts/components/BackButton";
import LeavePopup from "../../../layouts/components/LavePopup";
import { useNavigate } from "react-router-dom";
import PlayerProfile from "../../../layouts/components/PlayerProfile";
import Board2 from "../../../components/Board/Board2";
import BoardPhone from "../../../components/Board/BoardPhone";

function Chess10by10Phone() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const [appState, dispatch] = useReducer(reducer, initGameState);
  const [isSound, setIsSound] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigation, setIsNavigation] = useState(true);
  const [pressed, setPressed] = useState(null);
  const navigate = useNavigate();
  const handlePress = (btn, callback) => {
    setPressed(btn);
    callback?.();
    setTimeout(() => setPressed(null), 150); // reset after animation
  };
  const handleSoundChange = () => {
    setIsSound(!isSound);
  };
  const handleNavigationChange = () => {
    setIsNavigation(!isNavigation);
  };
  const providerState = {
    appState,
    dispatch,
  };
  const movelist = appState.movesList;
  // console.log(appState.undoneMoves, "hhhhhhhh");
  // console.log(appState.position,"ioooooooooooo");
  function checkLastElementForString(array) {
    // Check if the array is empty
    if (array.length === 0) {
      return false;
    }

    // Get the last element of the array
    let lastElement = array[array.length - 1];

    // console.log(lastElement,"rrrrrrrrrrrr");

    // Check if 'o-o' is in the last element
    if (lastElement.includes("O")) {
      return true;
    } else {
      return false;
    }
  }

  let result;
  if (movelist && movelist.length) {
    result = checkLastElementForString(movelist);
    // console.log(result, "Checking if the last element contains 'o-o'");
  }

  function getTotalLength(arr) {
    let totalLength = 0;

    arr.forEach((item) => {
      if (Array.isArray(item)) {
        totalLength += getTotalLength(item); // Recursively calculate length for subarrays
      } else if (typeof item === "string") {
        totalLength += item.length - 1; // Add length of individual strings
      }
    });

    return totalLength;
  }
  let currentIndex = appState?.currentIndex;
  const totalLength = getTotalLength(movelist);
  // const handleTakeBack = () => {
  //   if (currentIndex > 0) {
  //     currentIndex-=1
  //     const newIndex=currentIndex
  //     dispatch(CurrentIndex(currentIndex));
  //     // console.log(currentIndex,"yyyyy");
  //     // dispatch(takeBack())
  //     dispatch({ type: 'SET_POSITION', payload: appState.position[newIndex] });
  //     dispatch(clearCandidates());
  //     // socket.emit('getBoardDate', { roomId: RoomId, indexNumber: newIndex, playerId: userId })

  //   }
  // };
  // const handleTakeForward = () => {
  //   // console.log(moveList.length,"moveList.length");
  //   if (currentIndex < totalLength) {
  //     currentIndex+=1;
  //     const newIndex=currentIndex
  //     dispatch(CurrentIndex(currentIndex));
  //     // dispatch(forwardMove())
  //     dispatch({ type: 'SET_POSITION', payload: appState.position[newIndex] });
  //     dispatch(clearCandidates());

  //   }
  // };
  // const handleCurrentIndex = () => {
  //   // console.log(moveList.length,"moveList.length");
  //   dispatch(CurrentIndex(totalLength));
  //   dispatch({ type: 'SET_POSITION', payload: appState.position[movelist.length] });
  //   dispatch(clearCandidates());
  //   // socket.emit('getBoardDate', { roomId: RoomId, indexNumber: moveList.length, playerId: userId });

  // };
  // const handleStartIndex = () => {
  //   dispatch(CurrentIndex(0));
  //   dispatch({ type: 'SET_POSITION', payload: appState.position[0] });
  //   dispatch(clearCandidates());
  //   // socket.emit('getBoardDate', { roomId: RoomId, indexNumber: 0, playerId: userId });

  //   // setCurrentIndex(-1);
  //   // socket.emit('getBoardDate', { roomId: RoomId, indexNumber: currentIndex+1 ,playerId:userId });
  // };

  const handleTakeBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      dispatch(CurrentIndex(currentIndex - 1));
      // dispatch(takeBack())
      dispatch({ type: "SET_POSITION", payload: appState.position[newIndex] });
      dispatch(clearCandidates());
      // socket.emit('getBoardDate', { roomId: RoomId, indexNumber: newIndex, playerId: userId })
    }
  };
  const handleTakeForward = () => {
    // console.log(moveList.length,"moveList.length");
    if (currentIndex < movelist.length) {
      const newIndex = currentIndex + 1;
      dispatch(CurrentIndex(currentIndex + 1));
      // dispatch(forwardMove())
      dispatch({ type: "SET_POSITION", payload: appState.position[newIndex] });
      dispatch(clearCandidates());
    }
  };
  const handleCurrentIndex = () => {
    // console.log(moveList.length,"moveList.length");
    dispatch(CurrentIndex(movelist.length));
    dispatch({
      type: "SET_POSITION",
      payload: appState.position[movelist.length],
    });
    dispatch(clearCandidates());
    // socket.emit('getBoardDate', { roomId: RoomId, indexNumber: moveList.length, playerId: userId });
  };
  const handleStartIndex = () => {
    dispatch(CurrentIndex(0));
    dispatch({ type: "SET_POSITION", payload: appState.position[0] });
    dispatch(clearCandidates());
    // socket.emit('getBoardDate', { roomId: RoomId, indexNumber: 0, playerId: userId });

    // setCurrentIndex(-1);
    // socket.emit('getBoardDate', { roomId: RoomId, indexNumber: currentIndex+1 ,playerId:userId });
  };

  const scrollableDivRef = useRef(null);
  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }

    // Use a timeout to ensure the DOM updates are complete
  }, [movelist.length]);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Required for most browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const baseButton = `bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center 
     transition-all duration-150 cursor-pointer`;

  const pressedButton = `translate-y-1 shadow-inner`;

  localStorage.setItem("Sound", isSound);
  localStorage.setItem("Navigation", isNavigation);
  return (
    <div className="w-full   bg-[#0b5f23] bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* <BackButton setIsOpen={() => setIsOpen(true)} />
      {isOpen && (
        <LeavePopup
          onCancel={() => setIsOpen(false)}
          onLeave={() => {
            navigate("/");
            setIsOpen(false);
          }}
        />
      )} */}

      <div className="w-full h-[1300px]  bg-black/[0.5] backdrop-blur-sm pt-48 lg:pt-0">
        <AppContext.Provider value={providerState}>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-2  h-screen  overscroll-contain  ">
            {/* LEFT SIDEBAR */}
            {/* <div className="col-span-1 max-md:my-2 max-md:hidden">
              <div className="bg-gray-900 ms-8 max-md:mx-1 rounded-md p-3">
                <div className="flex  gap-3">
                  <div className="flex items-center text-white">
                    <GiBulletBill className="text-3xl" />
                  </div>
                  <div className="text-gray-50">
                    <p className="flex gap-1 leading-none">
                      1+1
                      <div className="flex items-center">
                        <BsDot />
                      </div>
                      Casual
                      <div className="flex items-center">
                        <BsDot />
                      </div>
                      Bullet
                    </p>
                    <p className="text-xs">1 hour ago</p>
                  </div>
                </div>
                <p className="flex justify-between text-gray-50 leading-none mt-2">
                  <p>Sound </p>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultValue=""
                      checked={isSound}
                      onChange={handleSoundChange}
                      className="sr-only peer"
                    />
                    <div
                      className={`relative w-7 h-4 bg-red-600 peer-focus:outline-none   dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black  after:border after:rounded-full after:h-3 after:w-3 after:transition-all  peer-checked:bg-lime-500	`}
                    ></div>
                  </label>
                </p>
                <p className="flex justify-between text-gray-50 leading-none mt-2">
                  <p>Navigation </p>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultValue=""
                      checked={isNavigation}
                      onChange={handleNavigationChange}
                      className="sr-only peer"
                    />
                    <div
                      className={`relative w-7 h-4 bg-red-600 peer-focus:outline-none   dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black  after:border after:rounded-full after:h-3 after:w-3 after:transition-all  peer-checked:bg-lime-500	`}
                    ></div>
                  </label>
                </p>
                <p className="bg-gray-600 py-[.5px] my-2"></p>
              </div>

              <div className="bg-gray-900 ms-8 max-md:mx-1 rounded-md p-3 h-[400px] mt-4">
                <div className="flex justify-between text-gray-50">
                  <p className="text-sm">Chat room</p>
                  <div className="flex items-center">
                    <p className="p-1.5  bg-green-800 rounded-sm border border-gray-600"></p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* middle bar chess board */}
            <div className=" flex justify-center flex-col items-center h-full ">
              <div className="w-full min-w-[490px]   px-[50px] max-w-[740px] flex justify-center sm:justify-end pb-4">
                <PlayerProfile
                  name="Black"
                  avatar="https://i.imgur.com/uIgDDDd.jpg"
                  active={appState.turn === "b" ? true : false}
                />
              </div>
              <BoardPhone />
              <div className="w-full min-w-[490px] px-[50px] max-w-[740px] flex justify-center sm:justify-start pt-4">
                <PlayerProfile
                  name="White"
                  avatar="https://i.imgur.com/uIgDDDd.jpg"
                  active={appState.turn === "w" ? true : false}
                  positon="t"
                />
              </div>
            </div>

            {/* right bar control */}
            <div className="h-full w-full max-h-[650px]  min-h-[400px]  max-w-[390px] bg-black/[0.2] backdrop-blur border-2 border-white rounded-xl mx-3">
              <div className=" w-full h-full">
                <div className="flex justify-evenly items-center p-2 border-b-2 border-white">
                  {/* <p className="flex justify-between text-gray-50 leading-none mt-2">
                    <p>Sound </p>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultValue=""
                        checked={isSound}
                        onChange={handleSoundChange}
                        className="sr-only peer"
                      />
                      <div
                        className={`relative w-7 h-4 bg-red-600 peer-focus:outline-none   dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black  after:border after:rounded-full after:h-3 after:w-3 after:transition-all  peer-checked:bg-lime-500	`}
                      ></div>
                    </label>
                  </p> */}
                  <button
                    onClick={() => window.location.reload()}
                    className={`w-[60px] h-[60px] bg-yellow-500 text-white rounded-full  border-[4px] border-black shadow-[3px_4px_0px_rgba(0,0,0,0.7)] text-2xl flex items-center justify-center transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.7)] hover:scale-105`}
                  >
                    <TbReload />
                  </button>
                  <button
                    onClick={handleSoundChange}
                    className={`w-[60px] h-[60px] bg-yellow-500 text-white rounded-full  border-[4px] border-black shadow-[3px_4px_0px_rgba(0,0,0,0.7)] text-2xl flex items-center justify-center transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.7)] hover:scale-105`}
                  >
                    {isSound ? <PiSpeakerHighFill /> : <PiSpeakerSlashFill />}
                  </button>
                  {/* <p className="flex justify-between text-gray-50 leading-none mt-2">
                    <p>Navigation </p>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultValue=""
                        checked={isNavigation}
                        onChange={handleNavigationChange}
                        className="sr-only peer"
                      />
                      <div
                        className={`relative w-7 h-4 bg-red-600 peer-focus:outline-none   dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black  after:border after:rounded-full after:h-3 after:w-3 after:transition-all  peer-checked:bg-lime-500	`}
                      ></div>
                    </label>
                  </p> */}
                  <button
                    onClick={handleNavigationChange}
                    className={`w-[60px] h-[60px] bg-yellow-500 text-white rounded-full  border-[4px] border-black shadow-[3px_4px_0px_rgba(0,0,0,0.7)] text-2xl flex items-center justify-center transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.7)] hover:scale-105`}
                  >
                    {isNavigation ? <MdLocationOn /> : <MdLocationOff />}
                  </button>
                </div>
                <div className="  w-full mt-2 md:mt-0   rounded-r-md">
                  <div className="flex gap-6 justify-center items-center py-4">
                    <div
                      onClick={() => handlePress("start", handleStartIndex)}
                      className={`${baseButton} ${
                        pressed === "start" ? pressedButton : ""
                      }`}
                    >
                      <GrChapterPrevious size={20} />
                    </div>

                    <div
                      onClick={() =>
                        currentIndex > 0 && handlePress("back", handleTakeBack)
                      }
                      className={`${baseButton} ${
                        pressed === "back" ? pressedButton : ""
                      } ${
                        currentIndex <= 0 ? "opacity-30 cursor-not-allowed" : ""
                      }`}
                    >
                      <RxTrackPrevious size={20} />
                    </div>

                    <div
                      onClick={() =>
                        currentIndex < totalLength &&
                        handlePress("forward", handleTakeForward)
                      }
                      className={`${baseButton} ${
                        pressed === "forward" ? pressedButton : ""
                      } ${
                        currentIndex >= totalLength
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <RxTrackNext size={20} />
                    </div>

                    <div
                      onClick={() => handlePress("end", handleCurrentIndex)}
                      className={`${baseButton} ${
                        pressed === "end" ? pressedButton : ""
                      }`}
                    >
                      <IoPlayForward size={20} />
                    </div>
                  </div>

                  <div
                    className="h-[200px] overflow-y-auto min-h-[220px] pb-4"
                    ref={scrollableDivRef}
                  >
                    <MovesList />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default Chess10by10Phone;
