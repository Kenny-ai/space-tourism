import React, { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface ContextInterface {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const StateContext = createContext<ContextInterface | null>(null);

export const StateProvider = ({ children }: Props) => {
  const [showNav, setShowNav] = useState(false);

  const values = { showNav, setShowNav };
  return (
    <StateContext.Provider value={values}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () =>
  useContext(StateContext) as ContextInterface;
