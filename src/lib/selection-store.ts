import { data } from "../data";
import type { displayTypes } from "../@types/model";

export const initialSelections: displayTypes = {
  destination: "moon",
  crew: "douglas",
  technology: "launchVehicle",
};
const keys = {
  destination: "destinationDisplay",
  crew: "crewDisplay",
  technology: "technologyDisplay",
};

function read<T extends string>(
  key: string,
  options: Record<T, unknown>,
  fallback: T,
): T {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) || "null");
    return typeof value === "string" &&
      Object.prototype.hasOwnProperty.call(options, value)
      ? (value as T)
      : fallback;
  } catch {
    return fallback;
  }
}

function readSelections(): displayTypes {
  return {
    destination: read(
      keys.destination,
      data.destinations,
      initialSelections.destination,
    ),
    crew: read(keys.crew, data.crew, initialSelections.crew),
    technology: read(
      keys.technology,
      data.technology,
      initialSelections.technology,
    ),
  };
}

// A stable server snapshot prevents hydration mismatches with saved browser values.
export function createSelectionStore() {
  let snapshot: displayTypes | undefined;
  const listeners = new Set<() => void>();
  const getSnapshot = () => snapshot ?? (snapshot = readSelections());
  const notify = () => listeners.forEach((listener) => listener());
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || Object.values(keys).includes(event.key)) {
      snapshot = readSelections();
      notify();
    }
  };
  return {
    getSnapshot,
    getServerSnapshot: () => initialSelections,
    subscribe: (listener: () => void) => {
      if (!listeners.size) window.addEventListener("storage", onStorage);
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (!listeners.size) window.removeEventListener("storage", onStorage);
      };
    },
    update: (patch: Partial<displayTypes>) => {
      snapshot = { ...getSnapshot(), ...patch };
      (Object.keys(patch) as (keyof displayTypes)[]).forEach((key) => {
        try {
          localStorage.setItem(keys[key], JSON.stringify(snapshot![key]));
        } catch {
          /* Preserve in-memory interaction when storage is blocked. */
        }
      });
      notify();
    },
  };
}
