import React, { useEffect } from "react";
import { displayTypes } from "./Destination";

interface Props {
  title: displayTypes;
  display: displayTypes;
  setDisplay: React.Dispatch<React.SetStateAction<displayTypes>>;
}

const DestinationNav = ({ title, display, setDisplay }: Props) => {
  // let bypass: string = display;

  const changeDisplay = () => {
    setDisplay(title);
  };

  useEffect(() => {
    const bleh = localStorage.getItem("destinationDisplay");
    bleh && setDisplay(JSON.parse(bleh));
  }, []);

  useEffect(() => {
    localStorage.setItem("destinationDisplay", display);
  });

  return (
    <button
      className={`uppercase tracking-widest pb-1 bg-bottom bg-no-repeat duration-300 ${
        display === title
          ? `bg-white-gradient bg-3 font-bold text-white`
          : `bg-gray-gradient bg-0 hover:bg-2 hover:transition-bg-size hover:font-bold hover:text-white`
      }`}
      onClick={changeDisplay}
    >
      {title}
    </button>
  );
};

export default DestinationNav;
