import React, { createContext, useContext, useState } from "react";
import {
  ContextInterface,
  crewTypes,
  destinationTypes,
  displayObjTypes,
  technologyTypes,
} from "../@types/model";

interface Props {
  children: React.ReactNode;
}

const initialState: displayObjTypes = {
  destination: "moon",
  crew: "douglas",
  technology: "launchVehicle",
};

const StateContext = createContext<ContextInterface | null>(null);

export const StateProvider = ({ children }: Props) => {
  const [showNav, setShowNav] = useState(false);

  const closeNav = () => {
    setShowNav(false);
  };

  const [displayObj, setDisplayObj] = useState<displayObjTypes>(initialState);

  const changeDestination = (clicked: destinationTypes) => {
    setDisplayObj({ ...initialState, destination: clicked });
  };

  const changeCrew = (clicked: crewTypes) => {
    setDisplayObj({ ...initialState, crew: clicked });
  };

  const changeTechnology = (clicked: technologyTypes) => {
    setDisplayObj({ ...initialState, technology: clicked });
  };

  const values = {
    showNav,
    setShowNav,
    closeNav,
    displayObj,
    setDisplayObj,
    changeDestination,
    changeCrew,
    changeTechnology,
  };
  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
};

export const useStateContext = () =>
  useContext(StateContext) as ContextInterface;
