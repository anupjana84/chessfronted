import React from "react";
import "../../assets/CSS/goldenEffect.css";
import { Link } from "react-router-dom";

const Button = ({ title = "LOGIN" }) => {
  return (
    <Link to={"/login"} className="relative inline-block">
      {/* Outer Narrow Border */}

      {/* Button */}
      <button className="relative w-32 h-10 rounded-md bg-gradient-to-r from-[#8b8000] via-[#ffd277] to-[#8b8000] bg-[length:250%] bg-left text-[#ffd277] font-cinzel text-lg font-bold transition-all duration-1000 ease-in-out overflow-hidden hover:bg-right active:scale-95">
        {/* Green Gradient Overlay */}
        <div className="absolute inset-[2px] flex items-center justify-center rounded-[6px] bg-green-900 transition-all duration-1000 ease-in-out">
          <span className=" golden-text">{title}</span>
        </div>
      </button>
    </Link>
  );
};

export default Button;
