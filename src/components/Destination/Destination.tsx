import DestinationNav from "./DestinationNav";
import React, { useState } from "react";
import Header from "../Header";

export const destinations = {
  moon: {
    name: "Moon",
    images: {
      png: "../assets/destination/image-moon.png",
      webp: "../assets/destination/image-moon.webp",
    },
    description:
      "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
    distance: "384,400 km",
    travel: "3 days",
  },
  mars: {
    name: "Mars",
    images: {
      png: "../assets/destination/image-mars.png",
      webp: "../assets/destination/image-mars.webp",
    },
    description:
      "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
    distance: "225 mil. km",
    travel: "9 months",
  },
  europa: {
    name: "Europa",
    images: {
      png: "../assets/destination/image-europa.png",
      webp: "../assets/destination/image-europa.webp",
    },
    description:
      "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
    distance: "628 mil. km",
    travel: "3 years",
  },
  titan: {
    name: "Titan",
    images: {
      png: "../assets/destination/image-titan.png",
      webp: "../assets/destination/image-titan.webp",
    },
    description:
      "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
    distance: "1.6 bil. km",
    travel: "7 years",
  },
};

export type displayTypes = "moon" | "mars" | "europa" | "titan";

const destinationNavs: displayTypes[] = ["moon", "mars", "europa", "titan"];

const Destination = () => {
  const [display, setDisplay] = useState<displayTypes>("moon");

  return (
    <div className="bg-mobile-destination-bg bg-cover">
      <div className="sm:mb-6">
        <Header />
      </div>

      <p className="uppercase font-barlow tracking-widest mb-8 px-6 text-center sm:text-left sm:text-[16px]">
        <span className="text-gray-400 font-bold mr-3">01</span>Pick your
        destination
      </p>

      <div className="text-center flex flex-col justify-center items-center">
        <img
          className="h-48 w-48 mb-8"
          src={destinations[display].images.webp}
          alt="Mars"
        />

        <div className="flex flex-col justify-center items-center">
          <nav className="text-body font-barlow text-[16px]  flex gap-6">
            {destinationNavs.map((item, index) => (
              <DestinationNav key={index} display={display} title={item} setDisplay={setDisplay} />
            ))}
            {/* <button className="uppercase tracking-widest pb-1 hover:text-white bg-gray-gradient bg-0 hover:bg-2 bg-bottom bg-no-repeat hover:transition-bg-size duration-300 hover:font-bold">
              Mars
            </button>
            <button className="uppercase tracking-widest pb-1 hover:text-white bg-gray-gradient bg-0 hover:bg-2 bg-bottom bg-no-repeat hover:transition-bg-size duration-300 hover:font-bold">
              Europa
            </button>
            <button className="uppercase tracking-widest pb-1 hover:text-white bg-gray-gradient bg-0 hover:bg-2 bg-bottom bg-no-repeat hover:transition-bg-size duration-300 hover:font-bold">
              Titan
            </button> */}
          </nav>
          <h2 className="uppercase font-bellefair text-56">
            {destinations[display].name}
          </h2>
          <p className="text-body px-8">{destinations[display].description}</p>

          <hr className="my-4 border-b-2 border-b-white px-5" />

          <div className="mb-4">
            <h5 className="uppercase font-barlow tracking-widest text-body">
              Avg. Distance
            </h5>
            <p className="font-bellefair text-32 uppercase">
              {destinations[display].distance}
            </p>
          </div>

          <div className="">
            <h5 className="uppercase font-barlow tracking-widest text-body">
              Est. Travel Time
            </h5>
            <p className="font-bellefair text-32 uppercase">
              {destinations[display].travel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
