import React from "react";
import { BiArrowBack } from "react-icons/bi";
export default function BackButton({ setIsOpen }) {
  console.log(setIsOpen);
  return (
    <div className="flex items-center justify-center fixed top-4 left-6 z-50">
      <button
        onClick={setIsOpen}
        type="button"
        className="w-[60px] h-[60px] bg-[rgb(3,61,1)] text-yellow-400 rounded-full  border-[4px] border-black shadow-[3px_4px_0px_rgba(0,0,0,0.7)] text-2xl flex items-center justify-center transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.7)] hover:scale-105 "
      >
        <BiArrowBack size={30} fill="#faca15" />
      </button>
    </div>
  );
}
