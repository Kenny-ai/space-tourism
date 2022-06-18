import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Hamburger } from "../assets/icon-hamburger.svg";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Logo />
        <div className="">
          <div className="md:hidden">
            <Hamburger />
          </div>

          <div className="navbar hidden md:flex bg-nav-bg text-white font-barlow text-[16px] p-10 gap-8 tracking-widest">
            <p className="uppercase cursor-pointer">Home</p>
            <p className="uppercase cursor-pointer">Destination</p>
            <p className="uppercase cursor-pointer">Crew</p>
            <p className="uppercase cursor-pointer">Technology</p>
          </div>
        </div>
      </div>
      {/* <img src={Logo} alt="" /> */}
    </>
  );
};

export default Header;
