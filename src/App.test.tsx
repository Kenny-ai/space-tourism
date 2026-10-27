import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StateProvider, useStateContext } from "./Context/StateProvider";
import Crew from "./components/Crew";
import Destination from "./components/Destination";
import SiteShell from "./components/SiteShell";
import { createSelectionStore, initialSelections } from "./lib/selection-store";

jest.mock("next/navigation", () => ({ usePathname: () => "/crew" }));

let desktopListener: (() => void) | undefined;
let desktop = false;
beforeEach(() => {
  localStorage.clear();
  desktop = false;
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    get matches() {
      return query.includes("min-width") ? desktop : false;
    },
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn((_, listener) => {
      if (query.includes("min-width")) desktopListener = listener;
    }),
    removeEventListener: jest.fn(),
  }));
});
afterEach(() => jest.restoreAllMocks());

function renderCrew() {
  return render(
    <StateProvider>
      <Crew />
    </StateProvider>,
  );
}

test("crew arrows follow dot selections and wrap both ways without losing focus", async () => {
  const user = userEvent.setup();
  renderCrew();
  const ansari = screen.getByRole("button", { name: "Show Anousheh Ansari" });
  await user.click(ansari);
  expect(ansari).toHaveFocus();
  expect(ansari).toHaveAttribute("aria-pressed", "true");
  await user.click(screen.getByRole("button", { name: "Next crew member" }));
  expect(
    screen.getByRole("button", { name: "Show Douglas Hurley" }),
  ).toHaveAttribute("aria-pressed", "true");
  await user.click(
    screen.getByRole("button", { name: "Previous crew member" }),
  );
  expect(ansari).toHaveAttribute("aria-pressed", "true");
});

function SelectionProbe() {
  const { display, changeCrew, changeDestination, changeTechnology } =
    useStateContext();
  return (
    <>
      <output data-testid="selections">{JSON.stringify(display)}</output>
      <button onClick={() => changeDestination("mars")}>Mars</button>
      <button onClick={() => changeCrew("victor")}>Victor</button>
      <button onClick={() => changeTechnology("spaceCapsule")}>Capsule</button>
    </>
  );
}

test("all three saved selections survive independent updates and remounting", async () => {
  const user = userEvent.setup();
  const view = render(
    <StateProvider>
      <SelectionProbe />
    </StateProvider>,
  );
  await user.click(screen.getByRole("button", { name: "Mars" }));
  await user.click(screen.getByRole("button", { name: "Victor" }));
  await user.click(screen.getByRole("button", { name: "Capsule" }));
  expect(localStorage.getItem("destinationDisplay")).toBe('"mars"');
  expect(localStorage.getItem("crewDisplay")).toBe('"victor"');
  expect(localStorage.getItem("technologyDisplay")).toBe('"spaceCapsule"');
  view.unmount();
  render(
    <StateProvider>
      <SelectionProbe />
    </StateProvider>,
  );
  expect(JSON.parse(screen.getByTestId("selections").textContent!)).toEqual({
    destination: "mars",
    crew: "victor",
    technology: "spaceCapsule",
  });
});

test("server snapshot is stable even with saved client preferences", () => {
  localStorage.setItem("crewDisplay", '"victor"');
  const store = createSelectionStore();
  expect(store.getServerSnapshot()).toBe(initialSelections);
  expect(store.getSnapshot().crew).toBe("victor");
  expect(store.getSnapshot()).toBe(store.getSnapshot());
});

test("invalid stored values use safe defaults", () => {
  localStorage.setItem("destinationDisplay", "broken JSON");
  localStorage.setItem("crewDisplay", '"toString"');
  localStorage.setItem("technologyDisplay", '"unknown"');
  const store = createSelectionStore();
  expect(store.getSnapshot()).toEqual(initialSelections);
  render(
    <StateProvider>
      <Destination />
    </StateProvider>,
  );
  expect(screen.getByRole("button", { name: "Moon" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("blocked storage preserves working in-memory controls", async () => {
  jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("Blocked");
  });
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("Blocked");
  });
  renderCrew();
  await userEvent.click(
    screen.getByRole("button", { name: "Next crew member" }),
  );
  expect(
    screen.getByRole("button", { name: "Show Mark Shuttleworth" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("storage events synchronize selections from another tab", () => {
  renderCrew();
  localStorage.setItem("crewDisplay", '"mark"');
  fireEvent(
    window,
    new StorageEvent("storage", { key: "crewDisplay", newValue: '"mark"' }),
  );
  expect(
    screen.getByRole("button", { name: "Show Mark Shuttleworth" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("mobile menu traps focus, closes with Escape, and restores focus and scroll", async () => {
  const user = userEvent.setup();
  render(
    <StateProvider>
      <SiteShell>
        <p>Page content</p>
      </SiteShell>
    </StateProvider>,
  );
  const toggle = screen.getByRole("button", { name: "Open navigation" });
  await user.click(toggle);
  const dialog = screen.getByRole("dialog", { name: "Site navigation" });
  const close = within(dialog).getByRole("button", {
    name: "Close navigation",
  });
  expect(close).toHaveFocus();
  expect(toggle.getAttribute("aria-controls")).toBe(dialog.id);
  expect(document.body.style.overflow).toBe("hidden");
  await user.tab({ shift: true });
  expect(
    within(dialog).getByRole("link", { name: /Technology/ }),
  ).toHaveFocus();
  await user.tab();
  expect(close).toHaveFocus();
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(toggle).toHaveFocus();
  expect(document.body.style.overflow).toBe("");
});

test("desktop resize closes the mobile menu", async () => {
  render(
    <StateProvider>
      <SiteShell>
        <p>Page content</p>
      </SiteShell>
    </StateProvider>,
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Open navigation" }),
  );
  act(() => {
    desktop = true;
    desktopListener?.();
  });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe("");
});
