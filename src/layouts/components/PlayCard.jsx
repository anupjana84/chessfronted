import React from "react";
import "../../assets/CSS/goldenEffect.css";
import { Link } from "react-router-dom";
export default function PlayCard({
  img = "/playIcon/playOnline.png",
  title = "Play Now",
  cl,
  tm = 6,
  link = "/",
}) {
  return (
    <Link
      to={link}
      className="flex w-[180px] h-[180px] flex-col items-center justify-center bg-[url('/playBckground.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="flex relative flex-col items-center justify-center pb-[40px]">
        <img src={img} className={`${cl}`} alt="" />
        <div
          className={`flex golden-text text-sm font-semibold absolute top-16 left-[-20px] right-[-20px] text-center flex-col items-center mt-${tm}`}
        >
          {title}
        </div>
      </div>
    </Link>
  );
}
