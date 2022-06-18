import React from "react";
import Header from "./Header";
import MobileHomeBg from "../assets/background-home-mobile.jpg";
import TabletHomeBg from "../assets/background-home-tablet.jpg";
import DesktopHomeBg from "../assets/background-home-desktop.jpg";

const Intro = () => {
  return (
    <div className="" style={{ backgroundImage: `url(${MobileHomeBg})` }}>
      <Header />

      <div className="text-center flex flex-col justify-center items-center">
        <div className="text-center w-5/6 flex flex-col justify-center items-center">
          <p className="uppercase font-barlow tracking-widest">
            So you want to travel to
          </p>
          <p className="uppercase font-bellefair text-[100px]">Space</p>
          <p className="font-barlow">
            Let’s face it; if you want to go to
            space, you might as well genuinely go to outer space and not hover
            kind of on the edge of it. Well sit back, and relax because we’ll
            give you a truly out of this world experience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
