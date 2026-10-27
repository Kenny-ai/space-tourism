import type { data } from "../data";

export type destinationTypes = keyof typeof data.destinations;
export type crewTypes = keyof typeof data.crew;
export type technologyTypes = keyof typeof data.technology;

export interface displayTypes {
  destination: destinationTypes;
  crew: crewTypes;
  technology: technologyTypes;
}

export interface ContextInterface {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  closeNav: () => void;
  display: displayTypes;
  changeDestination: (clicked: destinationTypes) => void;
  changeCrew: (clicked: crewTypes) => void;
  changeTechnology: (clicked: technologyTypes) => void;
}
