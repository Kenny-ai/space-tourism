import { technologyTypes } from "../@types/model";
import { useStateContext } from "../Context/StateProvider";
import Header from "./Header";
import Nav from "./Nav";

export const technology = {
  launchVehicle: {
    name: "Launch vehicle",
    images: {
      portrait: "./assets/technology/image-launch-vehicle-portrait.jpg",
      landscape: "./assets/technology/image-launch-vehicle-landscape.jpg",
    },
    description:
      "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
  },
  spacePort: {
    name: "Spaceport",
    images: {
      portrait: "./assets/technology/image-spaceport-portrait.jpg",
      landscape: "./assets/technology/image-spaceport-landscape.jpg",
    },
    description:
      "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.",
  },
  spaceCapsule: {
    name: "Space capsule",
    images: {
      portrait: "./assets/technology/image-space-capsule-portrait.jpg",
      landscape: "./assets/technology/image-space-capsule-landscape.jpg",
    },
    description:
      "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.",
  },
};

const technologyNavs: technologyTypes[] = [
  "launchVehicle",
  "spacePort",
  "spaceCapsule",
];

const Technology = () => {
  const { closeNav, displayObj } = useStateContext();

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

        <div className="flex flex-col justify-center items-center sm:pb-20 xl:flex-row-reverse xl:justify-between">
          <div className="transition duration-500 mb-8 xl:w-2/5 w-full">
            <img
              className="xl:hidden object-contain h-[200px] sm:h-fit w-full"
              src={technology[displayObj.technology].images.landscape}
              alt={technology[displayObj.technology].name}
            />
            <img
              className="hidden xl:inline object-contain h-[500px] float-right"
              src={technology[displayObj.technology].images.portrait}
              alt={technology[displayObj.technology].name}
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
                {technology[displayObj.technology].name}
              </h4>

              <p className="test text-body font-barlow px-8 sm:text-16 sm:w-[69%] xl:p-0 xl:w-2/3 sm:mb-8 xl:text-lg">
                {technology[displayObj.technology].description}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="uppercase px-4">
        <Link className="font-barlow-condensed hover:scale-105 hover:font-bold" to={"/crew"}>
          &lt;&lt;&lt; Crew
        </Link>
      </div> */}
    </div>
  );
};

export default Technology;
