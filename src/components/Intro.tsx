import React from "react";
import Header from "./Header";

const Intro = () => {
  return (
    <div className="bg-mobile-home-bg sm:bg-tablet-home-bg lg:bg-desktop-home-bg bg-cover h-screen sm:h-fit relative">
      <Header />

      <div className="xl:flex xl:justify-around xl:items-center xl:h-screen">
        <div className="flex flex-col justify-center items-center mt-4">
          <div className="text-center xl:text-left w-5/6 sm:w-min flex flex-col justify-center items-center">
            <p className="uppercase font-barlow-condensed tracking-0.2 text-[16px] sm:text-28 text-body">
              So you want to travel to
            </p>
            <h1 className="uppercase font-bellefair text-80 sm:text-150">
              Space
            </h1>
            <p className="text-body font-barlow xl:text-lg leading-loose">
              Let’s face it; if you want to go to space, you might as well
              genuinely go to outer space and not hover kind of on the edge of
              it. Well sit back, and relax because we’ll give you a truly out of
              this world experience!
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center py-24">
          <button className="font-bellefair uppercase text-xl tracking-widest sm:text-32 text-black aspect-square w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-white">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
