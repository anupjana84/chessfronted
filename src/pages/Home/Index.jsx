import React, { useEffect, useRef } from "react";
import Header from "../../layouts/Header";
import { useNavigate } from "react-router-dom";

import "../../assets/CSS/goldenEffect.css";
import GoldButton from "../../layouts/components/GoldenButton";
import PlayCard from "../../layouts/components/PlayCard";
import Layout from "../../layouts/Layout";
import heroLogo from "../../assets/heroLogo.png";
import playOnline from "../../assets/playIcon/playOnline.png";
import playOffline from "../../assets/playIcon/playOffline.png";
import playWithFriends from "../../assets/playIcon/PlayWithFriends.png";
import learnChess from "../../assets/playIcon/learnChess.png";

const ChessLanding = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Adjust speed (1 is normal, 0.5 is half speed)
    }
  }, []);

  return (
    <Layout>
      <div className="relative min-h-screen bg-gradient-to-b   text-white">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-screen object-cover z-[-1]"
          autoPlay
          muted
        >
          <source src="/0001-0110.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Main Content */}
        <main className="w-full h-screen flex flex-col items-center justify-center relative">
          <div className="absolute top-[80px] left-[100px]">
            <img src={heroLogo} alt="Hero Logo" />
            <div className="golden-text flex flex-col items-center font-semibold bg-black text-lg ">
              <span>Step Beyond Tradition,</span>
              <span className="ml-3">Embrace the Next Level of Chess.</span>
            </div>

            <div className="flex flex-col items-center mt-6 ">
              <GoldButton text="Play Now" />
            </div>
          </div>
          <div className="absolute flex justify-center items-center bottom-0 md:bottom-[70px] right-0 left-0  p-4 text-white text-sm">
            <div className="grid grid-cols-2 md:grid-cols-4   ">
              {" "}
              <PlayCard
                img={playOnline}
                title="Play Online"
                cl="w-[90px] mt-3"
                tm={5}
                onClick={() => navigate("/play/online")}
              />
              <PlayCard
                img={playOffline}
                title="Play offline"
                cl="mb-4 w-[95px]"
                tm={6}
                link="/chess10by10"
              />
              <PlayCard
                img={playWithFriends}
                title="Play With Friends"
                cl="w-[90px]"
                tm={3}
                onClick={() => navigate("/play/friend")}
              />
              <PlayCard
                img={learnChess}
                title="learn from trainer"
                cl="w-[60px] mb-2"
                tm={0}
                link="/trainer"
                onClick={() => navigate("/learn")}
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ChessLanding;
