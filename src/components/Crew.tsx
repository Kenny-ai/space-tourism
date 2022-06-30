import { useStateContext } from "../Context/StateProvider";
import { data } from "../data";
import Header from "./Header";
import Nav from "./Nav";

const crewNavs = Object.keys(data.crew);

const Crew = () => {
  const { closeNav, displayObj } = useStateContext();

  return (
    <div className="bg-mobile-crew-bg sm:bg-tablet-crew-bg lg:bg-desktop-crew-bg bg-cover h-screen sm:h-fit">
      <div className="sm:mb-6">
        <Header />
      </div>
      <div onClick={closeNav}>
        <p className="uppercase font-barlow-condensed tracking-widest mb-8 sm:mb-16 sm:px-10 text-center sm:text-left text-16 sm:text-[20px] xl:text-28 xl:px-40 xl:mb-0">
          <span className="text-gray-400 font-bold mr-3">02</span>Meet your crew
        </p>

        <div className="flex flex-col justify-center items-center pb-10 sm:pb-0 sm:flex-col-reverse xl:flex-row-reverse xl:justify-between">
          <div className="flex justify-center items-center mb-8 sm:mb-0 xl:w-45%">
            <div className="w-5/6 border-b border-b-gray-600 sm:border-0">
              <img
                className="object-contain h-[225px] sm:h-fit w-[450px] sm:w-fit"
                src={data.crew[displayObj.crew].images.png}
                alt={data.crew[displayObj.crew].name}
              />
            </div>
          </div>

          <div className="sm:flex sm:flex-col-reverse xl:w-55% xl:pl-40 xl:h-[400px]">
            <nav className="flex justify-center items-center xl:justify-start gap-4 xl:gap-6 mb-6 sm:mb-10">
              {crewNavs.map((item, index) => (
                <Nav key={index} title={item} navType={"crewType"} />
              ))}
            </nav>
            <div className="flex flex-col justify-center items-center text-center xl:text-left xl:items-start">
              <h4 className="uppercase font-bellefair text-gray-400 text-16 sm:text-24 xl:text-32">
                {data.crew[displayObj.crew].role}
              </h4>

              <h3 className="uppercase font-bellefair text-24 sm:text-[38px] xl:text-56 tracking-wider mb-4">
                {data.crew[displayObj.crew].name}
              </h3>

              <p className="text-body font-barlow px-8 sm:px-24 xl:p-0 xl:w-2/3 sm:mb-8 xl:text-lg leading-6">
                {data.crew[displayObj.crew].bio}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="uppercase px-4 flex justify-between">
        {/* <Link
          className="font-barlow-condensed hover:scale-105 hover:font-bold"
          to={"/destination"}
        >
          &lt;&lt;&lt; Destination
        </Link>
        <Link
          className="font-barlow-condensed hover:scale-105 hover:font-bold"
          to={"/technology"}
        >
          Technology &gt;&gt;&gt;
        </Link> */}
      </div>
    </div>
  );
};

export default Crew;
