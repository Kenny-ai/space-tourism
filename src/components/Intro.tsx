import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useStateContext } from "../Context/StateProvider";
import Header from "./Header";

const Intro = () => {
  const { closeNav } = useStateContext();
  const [trans, setTrans] = useState(true);

  useEffect(() => {
    console.log(trans);
  }, [trans]);
  return (
    <div className="bg-mobile-home-bg sm:bg-tablet-home-bg lg:bg-desktop-home-bg bg-cover h-screen sm:h-fit relative">
      <Header />

      <div
        className="xl:flex xl:justify-around xl:items-center xl:h-screen sm:mt-12 xl:mt-0"
        onClick={closeNav}
      >
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

        <div className="flex flex-col justify-center items-center py-24">
          <Link to={"/destination"}>
            <button className="font-bellefair uppercase text-xl tracking-widest sm:text-32 text-black w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-white">
              Explore
            </button>
          </Link>

          {/* <SwitchTransition mode={"out-in"}>
            <CSSTransition
              key={trans ? "Explore button" : "Goodbye world"}
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              classNames="fade"
            >
              <button
                className="bg-blue-500 uppercase py-2 px-7 hover:bg-blue-600 hover:scale-105 rounded-lg duration-500 font-bold w-fit"
                onClick={() => setTrans(!trans)}
              >
                {trans ? "Explore button" : "Goodbye world"}
              </button>
            </CSSTransition>
          </SwitchTransition> */}

        </div>
      </div>
    </div>
  );
};

export default Intro;
