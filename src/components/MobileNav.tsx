import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as IconClose } from "../assets/shared/icon-close.svg";
import { useStateContext } from "../Context/StateProvider";

const MobileNav = () => {
  const { setShowNav } = useStateContext();
  const closeNav = () => {
    setShowNav(false);
  }
  return (
    <>
      <div className="sm:hidden w-80 h-screen bg-nav-bg p-6 font-barlow">
        { <div className="flex justify-end">
          <IconClose
            className="mb-12 cursor-pointer hover:scale-110"
            onClick={closeNav}
          />
        </div>}
        <nav className="flex flex-col gap-8 text-[16px] tracking-widest">
          <NavLink to={"/"} className="w-fit">
            <span className="font-bold mr-3">00</span>
            <span className="uppercase bg-white-gradient bg-0 hover:bg-2 bg-bottom bg-no-repeat hover:transition-bg-size duration-300 hover:font-bold pb-1"
            onClick={closeNav}
            >
              Home
            </span>
          </NavLink>

          <NavLink to={"/destination"} className="w-fit">
            <span className="font-bold mr-3">01</span>
            <span className="uppercase bg-white-gradient bg-0 hover:bg-2 bg-bottom bg-no-repeat hover:transition-bg-size duration-300 hover:font-bold pb-1"
            onClick={closeNav}
            >
              Destination
            </span>
          </NavLink>

          <NavLink to={"/crew"} className="w-fit">
            <span className="font-bold mr-3">02</span>
            <span className="uppercase bg-white-gradient bg-0 hover:bg-2 bg-bottom bg-no-repeat hover:transition-bg-size duration-300 hover:font-bold pb-1"
            onClick={closeNav}
            >
              Crew
            </span>
          </NavLink>

          <NavLink to={"/technology"} className="w-fit">
            <span className="font-bold mr-3">03</span>
            <span className="uppercase bg-white-gradient bg-0 hover:bg-2 bg-bottom bg-no-repeat hover:transition-bg-size duration-300 hover:font-bold pb-1"
            onClick={closeNav}
            >
              Technology
            </span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
