import type { destinationTypes } from "../../@types/model";

export type World = "earth" | destinationTypes;
export const destinationWorlds: destinationTypes[] = [
  "moon",
  "mars",
  "europa",
  "titan",
];

export const worlds: Record<
  World,
  {
    name: string;
    texture: string;
    position: [number, number, number];
    color: string;
    atmosphere?: string;
  }
> = {
  earth: {
    name: "Earth",
    texture: "/assets/textures/earth.webp",
    position: [0, 0, 0],
    color: "#ffffff",
    atmosphere: "#71b7ff",
  },
  moon: {
    name: "Moon",
    texture: "/assets/textures/moon.webp",
    position: [-9, 0, 0],
    color: "#eeeeed",
  },
  mars: {
    name: "Mars",
    texture: "/assets/textures/mars.webp",
    position: [-3, 0.4, -0.8],
    color: "#ffffff",
    atmosphere: "#d68b60",
  },
  europa: {
    name: "Europa",
    texture: "/assets/textures/europa.webp",
    position: [3, -0.2, 0],
    color: "#e2cfb5",
  },
  titan: {
    name: "Titan",
    texture: "/assets/textures/titan.webp",
    position: [9, 0.2, -0.7],
    color: "#e9b263",
    atmosphere: "#f0b65c",
  },
};

export interface SceneInteraction {
  yaw: number;
  tilt: number;
  dragging: boolean;
}
