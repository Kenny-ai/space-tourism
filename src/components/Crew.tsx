import { useState } from "react";
import { useStateContext } from "../Context/StateProvider";
import { data } from "../data";
import Header from "./Header";
import Nav from "./Nav";
import { AnimatePresence, motion } from "framer-motion";

const crewNavs = Object.keys(data.crew);

const Crew = () => {
  const { closeNav, display, changeCrew } = useStateContext();

  let crewAlias = data.crew[display.crew].name.split(" ")[0].toLowerCase();

  const [crew, setCrew] = useState(crewNavs.indexOf(crewAlias));

  const crewNavigation = (direction: "forward" | "backward") => {
    let currentCrew =
      direction === "forward" ? (crew + 4 + 1) % 4 : (crew + 4 - 1) % 4;
    changeCrew(crewNavs[currentCrew]);
    setCrew(currentCrew);
  };

  return (
    <motion.div
      className="bg-mobile-crew-bg sm:bg-tablet-crew-bg lg:bg-desktop-crew-bg bg-cover h-screen sm:h-fit xl:h-screen w-full overflow-hidden"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
      transition={{duration: 1}}
    >
      <div className="sm:mb-6">
        <Header />
      </div>
      <div onClick={closeNav}>
        <p className="uppercase font-barlow-condensed tracking-widest mb-8 sm:mb-16 sm:px-10 xl:px-0 text-center sm:text-left text-16 sm:text-[20px] xl:text-28 xl:w-[80vw] xl:m-auto xl:mb-0">
          <span className="text-gray-400 font-bold mr-3">02</span>Meet your crew
        </p>

        <div className="relative">
          <motion.img
            src="left.svg"
            alt="left-arrow"
            className="w-10 lg:w-16 text-xl cursor-pointer absolute left-4 md:left-8 top-[300px]"
            onClick={() => crewNavigation("backward")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />

          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
              className="flex flex-col justify-center items-center pb-10 sm:pb-0 sm:flex-col-reverse xl:flex-row-reverse xl:justify-between xl:mb-0 w-[80vw] m-auto"
              key={data.crew[display.crew].name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex justify-center items-center mb-8 sm:mb-0 xl:w-[55%]">
                <div className="w-5/6 xl:w-full border-b border-b-gray-600 sm:border-0">
                  <img
                    className="object-contain h-[225px] sm:h-fit w-[450px] sm:w-fit"
                    src={data.crew[display.crew].images.png}
                    alt={data.crew[display.crew].name}
                  />
                </div>
              </div>

              <div className="sm:flex sm:flex-col-reverse xl:w-45% xl:pl xl:h-[400px]">
                <nav className="flex justify-center items-center xl:justify-start gap-4 xl:gap-6 mb-6 sm:mb-10">
                  {crewNavs.map((item, index) => (
                    <Nav key={index} title={item} navType={"crewType"} />
                  ))}
                </nav>
                <div className="flex flex-col justify-center items-center text-center xl:text-left xl:items-start">
                  <h4 className="uppercase font-bellefair text-gray-400 text-16 sm:text-24 xl:text-32">
                    {data.crew[display.crew].role}
                  </h4>

                  <h3 className="uppercase font-bellefair font-bold text-24 sm:text-[38px] xl:text-[40px] tracking-wider mb-4">
                    {data.crew[display.crew].name}
                  </h3>

                  <p className="text-body font-barlow px-8 sm:px-24 xl:p-0 xl:w-2/3 sm:mb-8 xl:text-lg leading-6">
                    {data.crew[display.crew].bio}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <motion.img
            src="right.svg"
            alt="right-arrow"
            className="w-10 lg:w-16 cursor-pointer absolute right-4 md:right-8 top-[300px]"
            onClick={() => crewNavigation("forward")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Crew;
