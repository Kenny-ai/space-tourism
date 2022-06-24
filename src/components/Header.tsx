import React from "react";
import { ReactComponent as Logo } from "../assets/shared/logo.svg";
import { ReactComponent as Hamburger } from "../assets/shared/icon-hamburger.svg";
import { Link, NavLink } from "react-router-dom";
import { useStateContext } from "../Context/StateProvider";

const Header = () => {
  const { showNav, setShowNav } = useStateContext();

  const openNav = () => {
    setShowNav(true);
  };

  const normalLink = "uppercase flex items-center gap-1 hover:font-bold hover:border-b-3 hover:border-b-gray-500 ";
  const activeLink = "uppercase flex items-center gap-1 border-b-3";

  return (
    <>
      <div className="flex items-center justify-between py-8 px-6 sm:py-0 sm:pr-0 lg:py-8 lg:pl-12">
        <Link to={"/"} className="cursor-pointer hover:scale-110">
          <Logo />
        </Link>

        <div className="hidden 2xl:inline h-[1px] w-[45%] -mr-28 bg-gray-700 z-10 relative"></div>

        <div>
          {!showNav && (
            <div className="sm:hidden cursor-pointer hover:scale-110">
              <Hamburger onClick={openNav} />
            </div>
          )}

          <nav className="navbar hidden sm:flex bg-nav-bg text-body font-barlow-condensed text-[16px] px-10 h-20 gap-8 tracking-widest lg:px-30 xl:px-40 lg:gap-12">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? activeLink : normalLink
              }
            >
              <span className="hidden lg:inline font-bold text-white">00</span>
              Home
            </NavLink>
            <NavLink
              to={"/destination"}
              className={({ isActive }) =>
                isActive ? activeLink : normalLink
              }
            >
              <span className="hidden lg:inline font-bold text-white">01</span>{" "}
              Destination
            </NavLink>
            <NavLink
              to={"/crew"}
              className={({ isActive }) =>
                isActive ? activeLink : normalLink
              }
            >
              <span className="hidden lg:inline font-bold text-white">02</span>{" "}
              Crew
            </NavLink>
            <NavLink
              to={"/technology"}
              className={({ isActive }) =>
                isActive ? activeLink : normalLink
              }
            >
              <span className="hidden lg:inline font-bold text-white">03</span>{" "}
              Technology
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
