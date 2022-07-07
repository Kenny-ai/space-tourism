export interface ContextInterface {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  closeNav: () => void;
  display: displayTypes;
  setdisplay: React.Dispatch<React.SetStateAction<displayTypes>>;
  changeDestination: (clicked: any) => void;
  changeCrew: (clicked: any) => void;
  changeTechnology: (clicked: any) => void;
}

export type destinationTypes = "moon" | "mars" | "europa" | "titan";
export type crewTypes = "douglas" | "mark" | "victor" | "anouseh";
export type technologyTypes = "launchVehicle" | "spaceport" | "spaceCapsule";

export interface displayTypes {
  destination: destinationTypes;
  crew: crewTypes;
  technology: technologyTypes;
}
