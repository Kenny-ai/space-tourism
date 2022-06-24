import React, { useState } from "react";
import { crewTypes } from "../@types/model";
import { useStateContext } from "../Context/StateProvider";
import Header from "./Header";
import Nav from "./Nav";

export const crew = {
  douglas: {
    name: "Douglas Hurley",
    images: {
      png: "./assets/crew/image-douglas-hurley.png",
      webp: "./assets/crew/image-douglas-hurley.webp",
    },
    role: "Commander",
    bio: "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
  },

  mark: {
    name: "Mark Shuttleworth",
    images: {
      png: "./assets/crew/image-mark-shuttleworth.png",
      webp: "./assets/crew/image-mark-shuttleworth.webp",
    },
    role: "Mission Specialist",
    bio: "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
  },
  victor: {
    name: "Victor Glover",
    images: {
      png: "./assets/crew/image-victor-glover.png",
      webp: "./assets/crew/image-victor-glover.webp",
    },
    role: "Pilot",
    bio: "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer.",
  },
  anouseh: {
    name: "Anousheh Ansari",
    images: {
      png: "./assets/crew/image-anousheh-ansari.png",
      webp: "./assets/crew/image-anousheh-ansari.webp",
    },
    role: "Flight Engineer",
    bio: "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.",
  },
};

const crewNavs: crewTypes[] = ["douglas", "mark", "victor", "anouseh"];

const Crew = () => {
  const { displayObj } = useStateContext();

  return (
    <div className="bg-mobile-crew-bg sm:bg-tablet-crew-bg lg:bg-desktop-crew-bg bg-cover h-screen sm:h-fit">
      <div className="sm:mb-6">
        <Header />
      </div>

      <p className="uppercase font-barlow-condensed tracking-widest mb-8 sm:mb-16 sm:px-10 text-center sm:text-left text-16 sm:text-[20px] xl:text-28 xl:px-40 xl:mb-0">
        <span className="text-gray-400 font-bold mr-3">02</span>Meet your crew
      </p>

      <div className="flex flex-col justify-center items-center pb-10 sm:pb-0 sm:flex-col-reverse xl:flex-row-reverse xl:justify-between">
        <div className="flex justify-center items-center mb-8 sm:mb-0 xl:w-45%">
          <div className="w-5/6 border-b border-b-gray-600 sm:border-0">
            <img
              className="object-contain h-[225px] sm:h-fit w-[450px] sm:w-fit"
              src={crew[displayObj.crew].images.webp}
              alt={crew[displayObj.crew].name}
            />
          </div>
        </div>

        <div className="sm:flex sm:flex-col-reverse xl:w-55% xl:pl-40 xl:h-[400px]">
          <nav className="flex justify-center items-center xl:justify-start gap-4 xl:gap-6 mb-6 sm:mb-10">
            {crewNavs.map((item, index) => (
              <Nav key={index} title={item} navType={"crewType"} />
            ))}
          </nav>
          <div className="flex flex-col justify-center items-center text-center xl:text-left xl:items-start">
            <h4 className="uppercase font-bellefair text-gray-400 text-16 sm:text-24 xl:text-32">
              {crew[displayObj.crew].role}
            </h4>

            <h3 className="uppercase font-bellefair text-24 sm:text-[38px] xl:text-56 tracking-wider mb-4">
              {crew[displayObj.crew].name}
            </h3>

            <p className="text-body font-barlow px-8 sm:px-24 xl:p-0 xl:w-2/3 sm:mb-8 xl:text-lg leading-6">
              {crew[displayObj.crew].bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crew;
