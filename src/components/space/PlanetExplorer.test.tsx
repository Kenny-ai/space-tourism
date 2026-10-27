import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Destination from "../Destination";
import PlanetExplorer from "./PlanetExplorer";
import { StateProvider } from "../../Context/StateProvider";

jest.mock("motion/react", () => ({
  ...jest.requireActual("motion/react"),
  useInView: () => true,
}));
jest.mock(
  "next/dynamic",
  () => () =>
    function TestScene(props: {
      world: string;
      paused: boolean;
      active: boolean;
      onReady: () => void;
      onFailure: () => void;
      onSelect: (world: "mars") => void;
    }) {
      return (
        <div
          data-testid="renderer"
          data-world={props.world}
          data-paused={String(props.paused)}
          data-active={String(props.active)}
        >
          <button onClick={props.onReady}>Complete scene load</button>
          <button onClick={props.onFailure}>Simulate graphics loss</button>
          <button onClick={() => props.onSelect("mars")}>Approach Mars</button>
        </div>
      );
    },
);

let reduced = false;
beforeEach(() => {
  localStorage.clear();
  reduced = false;
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion") && reduced,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
});
afterEach(() => jest.restoreAllMocks());

test("scene loading preserves the static image, then pause/resume remains controllable", async () => {
  const user = userEvent.setup();
  render(<PlanetExplorer world="moon" />);
  expect(screen.getByRole("img", { name: "Moon" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Complete scene load" }));
  expect(
    screen.getByRole("group", { name: /Moon interactive 3D view/ }),
  ).toBeInTheDocument();
  expect(screen.queryByRole("img", { name: "Moon" })).not.toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Pause automatic rotation" }),
  );
  expect(screen.getByTestId("renderer")).toHaveAttribute("data-paused", "true");
  await user.click(
    screen.getByRole("button", { name: "Resume automatic rotation" }),
  );
  expect(screen.getByTestId("renderer")).toHaveAttribute(
    "data-paused",
    "false",
  );
});

test("3D marker selection updates saved destination and returns focus to its stable tab", async () => {
  const user = userEvent.setup();
  render(
    <StateProvider>
      <Destination />
    </StateProvider>,
  );
  await user.click(screen.getByRole("button", { name: "Complete scene load" }));
  await user.click(screen.getByRole("button", { name: "View all worlds ↗" }));
  expect(
    screen.getByRole("button", { name: "Focus planet ↗" }),
  ).toHaveAttribute("aria-pressed", "true");
  await user.click(screen.getByRole("button", { name: "Approach Mars" }));
  const mars = screen.getByRole("button", { name: "Mars" });
  expect(mars).toHaveFocus();
  expect(mars).toHaveAttribute("aria-pressed", "true");
  expect(localStorage.getItem("destinationDisplay")).toBe('"mars"');
  expect(screen.getByTestId("renderer")).toHaveAttribute("data-world", "mars");
  expect(
    screen.getByRole("button", { name: "View all worlds ↗" }),
  ).toHaveAttribute("aria-pressed", "false");
});

test("graphics failure restores the static destination without losing navigation", async () => {
  const user = userEvent.setup();
  render(
    <StateProvider>
      <Destination />
    </StateProvider>,
  );
  await user.click(screen.getByRole("button", { name: "Complete scene load" }));
  await user.click(
    screen.getByRole("button", { name: "Simulate graphics loss" }),
  );
  expect(screen.getByText(/STATIC VIEW · 3D UNAVAILABLE/)).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Moon" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Europa" }));
  expect(localStorage.getItem("destinationDisplay")).toBe('"europa"');
  expect(screen.getByRole("img", { name: "Europa" })).toBeInTheDocument();
});

test("reduced motion defaults to static and explicit 3D opt-in keeps rotation disabled", async () => {
  reduced = true;
  const user = userEvent.setup();
  render(<PlanetExplorer />);
  expect(screen.queryByTestId("renderer")).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: /Enable 3D/ }));
  expect(screen.getByTestId("renderer")).toHaveAttribute("data-paused", "true");
  expect(
    screen.getByRole("button", {
      name: "Automatic rotation disabled for reduced motion",
    }),
  ).toBeDisabled();
});

test("hiding the browser stops active rendering", () => {
  render(<PlanetExplorer />);
  expect(screen.getByTestId("renderer")).toHaveAttribute("data-active", "true");
  jest.spyOn(document, "hidden", "get").mockReturnValue(true);
  fireEvent(document, new Event("visibilitychange"));
  expect(screen.getByTestId("renderer")).toHaveAttribute(
    "data-active",
    "false",
  );
});

test("reset keeps the renderer mounted instead of disposing its graphics context", async () => {
  const user = userEvent.setup();
  render(<PlanetExplorer world="moon" />);
  await user.click(screen.getByRole("button", { name: "Complete scene load" }));
  const renderer = screen.getByTestId("renderer");
  await user.click(screen.getByRole("button", { name: "Reset planet view" }));
  expect(screen.getByTestId("renderer")).toBe(renderer);
  expect(
    screen.getByRole("group", { name: /Moon interactive 3D view/ }),
  ).toBeInTheDocument();
});
