import Header from "./Header";
import { destinationTypes } from "../@types/model";
import { useStateContext } from "../Context/StateProvider";
import Nav from "./Nav";

export const destinations = {
  moon: {
    name: "Moon",
    images: {
      png: "../assets/destination/image-moon.png",
      webp: "../assets/destination/image-moon.webp",
    },
    description:
      "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
    distance: "384,400 km",
    travel: "3 days",
  },
  mars: {
    name: "Mars",
    images: {
      png: "../assets/destination/image-mars.png",
      webp: "../assets/destination/image-mars.webp",
    },
    description:
      "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
    distance: "225 mil. km",
    travel: "9 months",
  },
  europa: {
    name: "Europa",
    images: {
      png: "../assets/destination/image-europa.png",
      webp: "../assets/destination/image-europa.webp",
    },
    description:
      "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
    distance: "628 mil. km",
    travel: "3 years",
  },
  titan: {
    name: "Titan",
    images: {
      png: "../assets/destination/image-titan.png",
      webp: "../assets/destination/image-titan.webp",
    },
    description:
      "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
    distance: "1.6 bil. km",
    travel: "7 years",
  },
};

const destinationNavs: destinationTypes[] = ["moon", "mars", "europa", "titan"];

const Destination = () => {
  const { closeNav, displayObj } = useStateContext();

  return (
    <div className="bg-mobile-destination-bg sm:bg-tablet-destination-bg lg:bg-desktop-destination-bg bg-cover">
      <div className="sm:mb-6">
        <Header />
      </div>
      <div onClick={closeNav}>
        <p className="uppercase font-barlow-condensed tracking-widest mb-8 sm:px-10 text-center sm:text-left text-16 sm:text-[20px] xl:text-28 xl:px-40 xl:mb-24">
          <span className="text-gray-400 font-bold mr-3">01</span>Pick your
          destination
        </p>

        <div className="flex flex-col justify-center items-center pb-10 xl:flex-row xl:justify-between">
          <div className="xl:w-55% xl:flex xl:justify-center xl:items-center">
            <img
              className="h-48 w-48 sm:h-80 sm:w-80 mb-8 sm:mb-12 xl:mb-0 xl:h-fit xl:w-fit"
              src={destinations[displayObj.destination].images.webp}
              alt="Mars"
            />
          </div>

          <div className="xl:w-45%">
            <div className="flex flex-col justify-center items-center text-center xl:text-left xl:items-start xl:w-2/3">
              <nav className="text-body font-barlow-condensed text-16 flex gap-6 mb-4 sm:gap-10 sm:mb-6">
                {destinationNavs.map((item, index) => (
                  <Nav key={index} title={item} navType={"destinationType"} />
                ))}
              </nav>
              <h2 className="uppercase font-bellefair text-56 sm:text-80 xl:text-100">
                {destinations[displayObj.destination].name}
              </h2>
              <p className="text-body font-barlow px-8 sm:px-24 xl:p-0 sm:mb-8">
                {destinations[displayObj.destination].description}
              </p>

              <hr className="my-6 w-4/5 xl:w-full border-t-gray-700" />

              <div className="sm:w-full sm:flex sm:justify-evenly xl:w-3/4 xl:justify-between">
                <div className="mb-4">
                  <h5 className="uppercase font-barlow-condensed tracking-widest text-body text-14">
                    Avg. Distance
                  </h5>
                  <p className="font-bellefair text-32 uppercase">
                    {destinations[displayObj.destination].distance}
                  </p>
                </div>

                <div className="">
                  <h5 className="uppercase font-barlow-condensed tracking-widest text-body text-14">
                    Est. Travel Time
                  </h5>
                  <p className="font-bellefair text-32 uppercase">
                    {destinations[displayObj.destination].travel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
