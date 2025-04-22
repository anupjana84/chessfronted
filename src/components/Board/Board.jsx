import "./Board.css";
import { useAppContext } from "../../contexts/Context";

import Ranks from "./bits/Ranks";
import Files from "./bits/Files";
import Pieces from "../Pieces/Pieces";
import PromotionBox from "../Popup/PromotionBox/PromotionBox";
import Popup from "../Popup/Popup";
import GameEnds from "../Popup/GameEnds/GameEnds";

import arbiter from "../../arbiter/arbiter";
import { getKingPosition } from "../../arbiter/getMoves";

import topbordergreen from "../../assets/topGreen.png";
import bottombordergreen from "../../assets/bottomgreen.png";
import topborderyellow from "../../assets/topyellow.png";
import bottomborderyellow from "../../assets/bottomyellow.png";
import { useEffect, useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import Layout from "../../layouts/Layout";

const Board = () => {
  const [containerSize, setContainerSize] = useState(400); // Initial container size
  const [isMobile, setIsMobile] = useState(false);

  const tileSize = (containerSize - 70 - 56) / 10;
  const RanktileSize = containerSize / 10;
  const ranks = Array(10)
    .fill()
    .map((x, i) => 10 - i);
  const files = Array(10)
    .fill()
    .map((x, i) => i + 1);

  const { appState } = useAppContext();
  const position = appState.position[appState.position.length - 1];
  const prevPosition = appState.position[appState.position.length - 2];

  function findChangedPosition(prevArray, currentArray) {
    let changes = [];

    for (let i = 0; i < prevArray.length; i++) {
      for (let j = 0; j < prevArray[i].length; j++) {
        if (prevArray[i][j] !== currentArray[i][j]) {
          if (prevArray[i][j] !== "") {
            changes.push({
              piece: prevArray[i][j],
              from: [i, j],
            });
          }
          if (currentArray[i][j] !== "") {
            changes.push({
              piece: currentArray[i][j],
              to: [i, j],
            });
          }
        }
      }
    }

    return changes;
  }

  let toi1, toj1, fromi1, fromj1;
  let toi2, toj2, fromi2, fromj2;

  if (prevPosition) {
    const positions = findChangedPosition(prevPosition, position);
    if (positions.length > 0) {
      const frequency = {};
      positions.forEach((item) => {
        if (!frequency[item.piece]) {
          frequency[item.piece] = 0;
        }
        frequency[item.piece]++;
      });

      const result = {};
      positions.forEach((item) => {
        if (frequency[item.piece] > 1) {
          if (!result[item.piece]) {
            result[item.piece] = { from: [], to: [] };
          }
          if (item.from) {
            result[item.piece].from.push(item.from);
          }
          if (item.to) {
            result[item.piece].to.push(item.to);
          }
        }
      });

      let array1 = [];
      let array2 = [];
      for (let piece in result) {
        let combined = {
          piece: piece,
          from: result[piece].from,
          to: result[piece].to,
        };
        if (array1.length === 0) {
          array1.push(combined);
        } else {
          array2.push(combined);
        }
      }

      const fromPosition1 = array1[0]?.from[0];
      const toPosition1 = array1[0]?.to[0];
      const fromPosition2 = array2[0]?.from[0];
      const toPosition2 = array2[0]?.to[0];

      if (toPosition1) {
        toi1 = toPosition1[0];
        toj1 = toPosition1[1];
      }
      if (toPosition2) {
        toi2 = toPosition2[0];
        toj2 = toPosition2[1];
      }
      if (fromPosition1) {
        fromi1 = fromPosition1[0];
        fromj1 = fromPosition1[1];
      }
      if (fromPosition2) {
        fromi2 = fromPosition2[0];
        fromj2 = fromPosition2[1];
      }
    }
  }

  const checkTile = (() => {
    const isInCheck = arbiter.isPlayerInCheck({
      positionAfterMove: position,
      player: appState.turn,
    });

    if (isInCheck) return getKingPosition(position, appState.turn);

    return null;
  })();

  const getClassName = (i, j) => {
    let c = "";
    // c += (i + j) % 2 === 0 ? " tile--dark " : " tile--light ";
    // console.log(i,j,"className");
    const move = appState.candidateMoves?.find((m) => m[0] === i && m[1] === j);
    const Navigation = localStorage.getItem("Navigation");
    // console.log(i,j,"jjjjjjjj");

    if (Navigation == "true") {
      if (move) {
        if (position[i][j]) {
          c = "attacking";
        } else {
          c = "highlight";
        }
      }
    }
    if (checkTile && checkTile[0] === i && checkTile[1] === j) {
      c = "checked";
    }
    return c;
  };

  const onResize = (event, { size }) => {
    setContainerSize(size.width); // Resize based on the container's width
  };
  useEffect(() => {
    const updateSize = () => {
      const newSize = Math.min(
        window.innerWidth * 0.87,
        window.innerHeight * 0.87,
        650
      );
      setContainerSize(Math.max(newSize, 400)); // Keep within min-max bounds
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // Set size on mount

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      setDeviceType("mobile");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);
  return (
    <>
      {!isMobile ? (
        <div className="w-full  flex justify-center items-center relative">
          <ResizableBox
            width={containerSize}
            height={containerSize}
            minConstraints={[400, 400]} // Minimum board size
            maxConstraints={[1000, 1000]} // Maximum board size
            // lockAspectRatio={true} // Ensures the board stays square
            // resizeHandles={["se"]} // Resize from bottom-right corner
            className="flex  justify-center items-center relative bg-black/0 "
            // style={{
            //   "--tile-size": `${containerSize / 10}px`, // Auto-adjust tile size
            // }}
          >
            <img
              className={`absolute ${
                isMobile ? "hidden" : "flex"
              } top-0 bottom-0 left-0 right-0 min-w-[400px] min-h-[400px]`}
              src="/board/frame.png"
              alt=""
            />

            <div
              className={` absolute  min-w-[332px] min-h-[332px] ${
                !isMobile
                  ? "top-[8.5%] left-[8.5%] right-[8.5%] bottom-[8.5%]"
                  : "top-[1%] left-[1%] right-[1%] bottom-[1%]"
              } grid grid-cols-10 grid-rows-10`}
            >
              {/* <Ranks ranks={ranks} tileSize={tileSize} /> */}

              {ranks.map((rank, i) =>
                files.map((file, j) => (
                  <div
                    key={file + "" + rank}
                    i={i}
                    j={j}
                    className={` ${
                      ((i == 9 - fromi1 && j == fromj1) ||
                        (i == 9 - fromi2 && j == fromj2)) &&
                      "bg-[#d30c0c] bg-opacity-80 "
                    } ${
                      ((i == 9 - toi1 && j == toj1) ||
                        (i == 9 - toi2 && j == toj2)) &&
                      "bg-[#d30c0c] bg-opacity-80"
                    } ${
                      (9 - i + j) % 2 === 0
                        ? "bg-[url('/board/yellowSqure.png')]"
                        : "bg-[url('/board/greenSqure.png')] "
                    } bg-cover bg-center flex justify-center items-center`}
                  >
                    {getClassName(9 - i, j) === "highlight" && (
                      <div className="w-[40%] h-[40%] rounded-full  bg-white opacity-50"></div>
                    )}
                    {getClassName(9 - i, j) === "attacking" && (
                      <div className="w-[100%] h-[100%]   bg-red-600/55 backdrop-blur-sm"></div>
                    )}
                    {getClassName(9 - i, j) === "checked" && (
                      <div className="w-[100%] h-[100%] bg-red-600 "></div>
                    )}
                  </div>
                ))
              )}

              <Pieces />

              <Popup>
                <PromotionBox />
                <GameEnds />
              </Popup>

              {/* <Files files={files} tileSize={tileSize} /> */}
            </div>
          </ResizableBox>
        </div>
      ) : (
        <div className="w-full max-w-screen-sm mx-auto aspect-square grid grid-cols-10 grid-rows-10 bg-white relative">
          {ranks.map((rank, i) =>
            files.map((file, j) => (
              <div
                key={file + "" + rank}
                i={i}
                j={j}
                className={`
          ${
            (i == 9 - fromi1 && j == fromj1) || (i == 9 - fromi2 && j == fromj2)
              ? "bg-[#d30c0c] bg-opacity-80"
              : ""
          }
          ${
            (i == 9 - toi1 && j == toj1) || (i == 9 - toi2 && j == toj2)
              ? "bg-[#d30c0c] bg-opacity-80"
              : ""
          }
          ${
            (9 - i + j) % 2 === 0
              ? "bg-[url('/board/yellowSqure.png')]"
              : "bg-[url('/board/greenSqure.png')] "
          }
          bg-cover bg-center flex justify-center items-center
        `}
              >
                {getClassName(9 - i, j) === "highlight" && (
                  <div className="w-[40%] h-[40%] rounded-full bg-white opacity-50"></div>
                )}
                {getClassName(9 - i, j) === "attacking" && (
                  <div className="w-full h-full bg-red-600/55 backdrop-blur-sm"></div>
                )}
                {getClassName(9 - i, j) === "checked" && (
                  <div className="w-full h-full bg-red-600"></div>
                )}
              </div>
            ))
          )}
          <Pieces />
          <Popup>
            <PromotionBox />
            <GameEnds />
          </Popup>
        </div>
      )}
    </>
  );
};

export default Board;
