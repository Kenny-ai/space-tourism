export interface ContextInterface {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  closeNav: () => void;
  displayObj: displayObjTypes;
  setDisplayObj: React.Dispatch<React.SetStateAction<displayObjTypes>>;
  changeDestination: (clicked: any) => void;
  changeCrew: (clicked: any) => void;
  changeTechnology: (clicked: any) => void;
}

export type destinationTypes = "moon" | "mars" | "europa" | "titan";
export type crewTypes = "douglas" | "mark" | "victor" | "anouseh";
export type technologyTypes = "launchVehicle"| "spacePort" | "spaceCapsule";

export interface displayObjTypes {
  destination: destinationTypes;
  crew: crewTypes;
  technology: technologyTypes;
}