import React, { createContext, useContext, useState } from "react";
import {
  ContextInterface,
  crewTypes,
  destinationTypes,
  displayTypes,
  technologyTypes,
} from "../@types/model";

interface Props {
  children: React.ReactNode;
}

const initialState: displayTypes = {
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

  const [display, setdisplay] = useState<displayTypes>(initialState);

  const changeDestination = (clicked: destinationTypes) => {
    setdisplay({ ...initialState, destination: clicked });
  };

  const changeCrew = (clicked: crewTypes) => {
    setdisplay({ ...initialState, crew: clicked });
  };

  const changeTechnology = (clicked: technologyTypes) => {
    setdisplay({ ...initialState, technology: clicked });
  };

  const values = {
    showNav,
    setShowNav,
    closeNav,
    display,
    setdisplay,
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
