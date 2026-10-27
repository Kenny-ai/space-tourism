"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
import type { ContextInterface } from "../@types/model";
import { createSelectionStore } from "../lib/selection-store";

const StateContext = createContext<ContextInterface | null>(null);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [showNav, setShowNav] = useState(false);
  const closeNav = useCallback(() => setShowNav(false), []);
  const [store] = useState(createSelectionStore);
  const display = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  return (
    <StateContext.Provider
      value={{
        showNav,
        setShowNav,
        closeNav,
        display,
        changeDestination: (destination) => store.update({ destination }),
        changeCrew: (crew) => store.update({ crew }),
        changeTechnology: (technology) => store.update({ technology }),
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  const context = useContext(StateContext);
  if (!context) throw new Error("useStateContext requires a StateProvider");
  return context;
}
