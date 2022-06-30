import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useStateContext } from "../Context/StateProvider";
import { data } from "../data";
import Header from "./Header";
import Nav from "./Nav";

const technologyNavs = Object.keys(data.technology);

const Technology = () => {
  const { closeNav, displayObj, technologyTrans } = useStateContext();

  return (
    <div className="bg-mobile-tech-bg sm:bg-tablet-tech-bg lg:bg-desktop-tech-bg bg-cover h-screen sm:h-fit">
      <div className="sm:mb-6">
        <Header />
      </div>
      <div className="mb-4" onClick={closeNav}>
        <p className="uppercase font-barlow-condensed tracking-widest mb-8 sm:mb-16 sm:px-10 text-center sm:text-left text-16 sm:text-[20px] xl:text-28 xl:px-40 xl:mb-0">
          <span className="text-gray-400 font-bold mr-3">03</span>Space Launch
          101
        </p>

        <SwitchTransition mode={"out-in"}>
          <CSSTransition
            key={technologyTrans}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            <div className="flex flex-col justify-center items-center sm:pb-20 xl:flex-row-reverse xl:justify-between">
              <div className="transition duration-500 mb-8 xl:w-2/5 w-full">
                <img
                  className="xl:hidden object-contain h-[200px] sm:h-fit w-full"
                  src={data.technology[displayObj.technology].images.landscape}
                  alt={data.technology[displayObj.technology].name}
                />
                <img
                  className="hidden xl:inline object-contain h-[500px] float-right"
                  src={data.technology[displayObj.technology].images.portrait}
                  alt={data.technology[displayObj.technology].name}
                />
              </div>

              <div className="xl:w-3/5 xl:pl-40 xl:flex xl:gap-20">
                <nav className="flex justify-center items-center xl:justify-start xl:flex-col gap-4 xl:gap-6 mb-6 sm:mb-10">
                  {technologyNavs.map((item, index) => (
                    <Nav key={index} title={item} navType={"technologyType"} />
                  ))}
                </nav>
                <div className="flex flex-col justify-center items-center text-center xl:text-left xl:items-start">
                  <h4 className="text-gray-400 uppercase font-barlow-condensed tracking-widest mb-2 xl:mb-2">
                    The Terminology...
                  </h4>

                  <h4 className="uppercase font-bellefair text-[24px] sm:text-[40px] mb-4 xl:mb-0 xl:text-56">
                    {data.technology[displayObj.technology].name}
                  </h4> 

                  <p className="test text-body font-barlow px-8 sm:text-16 sm:w-[69%] xl:p-0 xl:w-2/3 sm:mb-8 xl:text-lg">
                    {data.technology[displayObj.technology].description}
                  </p>
                </div>
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default Technology;
