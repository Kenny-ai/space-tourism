export interface ContextInterface {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  closeNav: () => void;
  displayObj: displayObjTypes;
  setDisplayObj: React.Dispatch<React.SetStateAction<displayObjTypes>>;
  changeDestination: (clicked: any) => void;
  changeCrew: (clicked: any) => void;
  changeTechnology: (clicked: any) => void;
  destinationTrans: destinationTypes;
  setDestinationTrans: React.Dispatch<React.SetStateAction<destinationTypes>>;
}

export type destinationTypes = "moon" | "mars" | "europa" | "titan";
export type crewTypes = "douglas" | "mark" | "victor" | "anouseh";
export type technologyTypes = "launchVehicle" | "spaceport" | "spaceCapsule";

export interface displayObjTypes {
  destination: destinationTypes;
  crew: crewTypes;
  technology: technologyTypes;
}
