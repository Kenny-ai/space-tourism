import { NavLink } from "react-router-dom";
import { ReactComponent as IconClose } from "../assets/shared/icon-close.svg";
import { useStateContext } from "../Context/StateProvider";

const MobileNav = () => {
  const { closeNav } = useStateContext();

  const normalLink =
    "uppercase bg-white-gradient bg-0 hover:bg-2 bg-bottom bg-no-repeat hover:transition-bg-size duration-300 pb-1 hover:font-bold";
  const activeLink =
    "uppercase bg-white-gradient bg-bottom bg-no-repeat pb-1 w-fit bg-3 font-bold";

  return (
    <>
      <div className="sm:hidden w-80 h-screen bg-nav-bg px-6 py-12 font-barlow-condensed">
        {
          <div className="flex justify-end">
            <IconClose
              className="mb-12 cursor-pointer duration-500 hover:scale-125"
              onClick={closeNav}
            />
          </div>
        }
        <nav className="flex flex-col gap-8 text-[16px] tracking-widest">
          <p>
            <span className="font-bold mr-3">00</span>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? activeLink
                  : normalLink
              }
              onClick={closeNav}
            >
              Home
            </NavLink>
          </p>

          <p>
            <span className="font-bold mr-3">01</span>
            <NavLink
              to={"/destination"}
              className={({ isActive }) =>
                isActive
                  ? activeLink
                  : normalLink
              }
              onClick={closeNav}
            >
              Destination
            </NavLink>
          </p>

          <p>
            <span className="font-bold mr-3">02</span>
            <NavLink
              to={"/crew"}
              className={({ isActive }) =>
                isActive
                  ? activeLink
                  : normalLink
              }
              onClick={closeNav}
            >
              Crew
            </NavLink>
          </p>

          <p>
            <span className="font-bold mr-3">03</span>
            <NavLink
              to={"/technology"}
              className={({ isActive }) =>
                isActive
                  ? activeLink
                  : normalLink
              }
              onClick={closeNav}
            >
              Technology
            </NavLink>
          </p>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
