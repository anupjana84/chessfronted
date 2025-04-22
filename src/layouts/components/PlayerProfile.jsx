import React from "react";
import { Crown, ShieldCheck } from "lucide-react";
import clsx from "clsx";

const PlayerProfile = ({ name, avatar, active = false, positon = "b" }) => {
  return (
    <div
      className={clsx(
        "w-full max-w-sm bg-black/[0.6] backdrop-blur text-white p-4 shadow-md relative overflow-hidden border-x-2   border-white",
        positon === "b" ? "rounded-2xl border-2 " : "rounded-2xl border-2"
      )}
    >
      <div
        className={clsx(
          "flex items-center space-x-4 relative z-10",
          positon === "b" ? "flex-row-reverse gap-2" : ""
        )}
      >
        {/* Avatar (floating if active) */}
        <div
          className={clsx(
            "relative  rounded-full transition-all",
            active ? " animate-float" : ""
          )}
        >
          <img
            src={avatar}
            alt={name}
            className={clsx(
              "w-14 h-14 rounded-full border-2  shadow-md",
              active ? "border-green-400" : "border-white"
            )}
          />
          {active && (
            <div className="absolute top-1 left-1 w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-green-500 opacity-70 animate-pingDot z-0">
                <span className="relative z-10 w-full h-full rounded-full bg-green-500 shadow-md"></span>
              </span>
            </div>
          )}
        </div>

        {/* Name & Rank */}
        <div>
          <h2 className="text-lg font-semibold flex items-center">
            {name}
            {/* <ShieldCheck className="w-4 h-4 ml-2 text-green-400" /> */}
          </h2>
          {/* <span className="text-sm text-gray-300 italic">{rank}</span> */}

          {/* {active && (
            <div className="mt-1 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-semibold w-fit">
              Your Turn
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
