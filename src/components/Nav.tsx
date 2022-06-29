import { useLayoutEffect } from "react";
import { useStateContext } from "../Context/StateProvider";
import { data } from "../data";

interface Props {
  title: string;
  navType: "destinationType" | "crewType" | "technologyType";
}

const Nav = ({ title, navType }: Props) => {
  const {
    changeDestination,
    changeCrew,
    changeTechnology,
    displayObj,
    destinationTrans,
    setDestinationTrans,
  } = useStateContext();

  const changeDestinationDisplay = () => {
    changeDestination(title);
    localStorage.setItem("destinationDisplay", JSON.stringify(title));
  };

  const changeCrewDisplay = () => {
    changeCrew(title);
    localStorage.setItem("crewDisplay", JSON.stringify(title));
  };

  const changeTechDisplay = () => {
    changeTechnology(title);
    localStorage.setItem("technologyDisplay", JSON.stringify(title));
  };

  const changeDestinationTrans = () => {
    setDestinationTrans(displayObj.destination);
  };

  useLayoutEffect(() => {
    if (navType === "destinationType") {
      const displayItem = localStorage.getItem("destinationDisplay");
      displayItem && changeDestination(JSON.parse(displayItem));
    } else if (navType === "crewType") {
      const displayItem = localStorage.getItem("crewDisplay");
      displayItem && changeCrew(JSON.parse(displayItem));
    } else if (navType === "technologyType") {
      const displayItem = localStorage.getItem("technologyDisplay");
      displayItem && changeTechnology(JSON.parse(displayItem));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return navType === "destinationType" ? (
    <button
      className={`uppercase tracking-widest pb-1 bg-bottom bg-no-repeat duration-300 ${
        displayObj.destination === title
          ? `bg-white-gradient bg-3 font-bold text-white`
          : `bg-gray-gradient bg-0 hover:bg-2 hover:transition-bg-size hover:font-bold hover:text-white`
      }`}
      onClick={() => {
        changeDestinationDisplay();
        changeDestinationTrans();
      }}
    >
      {title}
    </button>
  ) : navType === "crewType" ? (
    <button
      className={`rounded-full  ${
        displayObj.crew === title
          ? `h-[12px] w-[12px] xl:h-4 xl:w-4 bg-white`
          : `h-[10px] w-[10px] xl:h-[14px] xl:w-[14px] bg-gray-500 hover:bg-gray-400`
      }`}
      onClick={changeCrewDisplay}
    ></button>
  ) : navType === "technologyType" ? (
    <button
      className={`h-10 w-10 sm:h-14 sm:w-14 xl:h-20 xl:w-20 xl:text-24 rounded-full border border-gray-500 transition duration-500 ${
        displayObj.technology === title
          ? `bg-white text-black`
          : `hover:border-white `
      }`}
      onClick={changeTechDisplay}
    >
      {Object.keys(data.technology).indexOf(title) + 1}
    </button>
  ) : null;
};

export default Nav;
