"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { KeyboardEvent, PointerEvent, ReactNode } from "react";
import { useInView } from "motion/react";
import { data } from "../../data";
import type { destinationTypes } from "../../@types/model";
import {
  destinationWorlds,
  worlds,
  type SceneInteraction,
  type World,
} from "./scene-data";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });
const serverFalse = () => false;
const serverVisible = () => true;
const getReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getVisible = () => !document.hidden;
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function PlanetExplorer({
  world = "earth",
  onSelect,
}: {
  world?: World;
  onSelect?: (world: destinationTypes) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const inView = useInView(host, { margin: "60px", amount: 0.05 });
  const reduced = useSyncExternalStore(
    subscribeMotion,
    getReducedMotion,
    serverFalse,
  );
  const visible = useSyncExternalStore(
    subscribeVisibility,
    getVisible,
    serverVisible,
  );
  const [preference, setPreference] = useState<"auto" | "3d" | "static">(
    "auto",
  );
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [overview, setOverview] = useState(false);
  const [reset, setReset] = useState(0);
  const interaction = useRef<SceneInteraction>({
    yaw: 0,
    tilt: 0,
    dragging: false,
  });
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const invalidate = useRef<() => void>(() => {});
  const enabled =
    !failed && (preference === "3d" || (preference === "auto" && !reduced));
  const active = enabled && inView && visible;
  const showScene = enabled && ready;
  const isHome = world === "earth";
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => {
    setFailed(true);
    setReady(false);
  }, []);

  function toggle3D() {
    if (enabled) {
      setPreference("static");
      setReady(false);
    } else {
      setFailed(false);
      setPreference("3d");
      setReady(false);
    }
  }
  function resetView() {
    interaction.current = { yaw: 0, tilt: 0, dragging: false };
    pointer.current = null;
    setOverview(false);
    setReset((value) => value + 1);
    invalidate.current();
  }
  function selectWorld(next: destinationTypes) {
    onSelect?.(next);
    setOverview(false);
    interaction.current = { yaw: 0, tilt: 0, dragging: false };
    document
      .getElementById(`destination-tab-${next}`)
      ?.focus({ preventScroll: true });
  }
  function rotateWithKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (
      !showScene ||
      overview ||
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    )
      return;
    event.preventDefault();
    if (event.key === "ArrowLeft") interaction.current.yaw -= 0.15;
    if (event.key === "ArrowRight") interaction.current.yaw += 0.15;
    if (event.key === "ArrowUp")
      interaction.current.tilt = Math.max(-0.6, interaction.current.tilt - 0.1);
    if (event.key === "ArrowDown")
      interaction.current.tilt = Math.min(0.6, interaction.current.tilt + 0.1);
    invalidate.current();
  }
  function beginDrag(event: PointerEvent<HTMLDivElement>) {
    if (
      !showScene ||
      overview ||
      event.button !== 0 ||
      (event.target as HTMLElement).closest("button")
    )
      return;
    pointer.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    interaction.current.dragging = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function drag(event: PointerEvent<HTMLDivElement>) {
    if (!pointer.current || event.pointerId !== pointer.current.id) return;
    interaction.current.yaw += (event.clientX - pointer.current.x) * 0.009;
    interaction.current.tilt = Math.max(
      -0.6,
      Math.min(
        0.6,
        interaction.current.tilt + (event.clientY - pointer.current.y) * 0.005,
      ),
    );
    pointer.current.x = event.clientX;
    pointer.current.y = event.clientY;
    invalidate.current();
  }
  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (pointer.current?.id !== event.pointerId) return;
    pointer.current = null;
    interaction.current.dragging = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    invalidate.current();
  }

  return (
    <div
      ref={host}
      className={`planet-explorer ${isHome ? "earth-explorer" : "destination-explorer"} ${showScene ? "scene-ready" : "scene-static"}`}
    >
      <div className="scene-topline">
        <span>
          <i />
          {showScene
            ? overview
              ? "DESTINATION ATLAS"
              : "LIVE ORBITAL VIEW"
            : failed
              ? "STATIC VIEW · 3D UNAVAILABLE"
              : !enabled
                ? "STATIC VIEW"
                : "PREPARING ORBITAL VIEW"}
        </span>
        <span>
          {isHome
            ? "EARTH / SOL SYSTEM"
            : `${worlds[world].name.toUpperCase()} / EXPLORER`}
        </span>
      </div>
      <div
        className="scene-toolbar"
        role="group"
        aria-label="Planet view controls"
      >
        <button type="button" aria-pressed={enabled} onClick={toggle3D}>
          {enabled ? "◈  3D view" : "◇  Enable 3D"}
        </button>
        {enabled && (
          <>
            <button
              type="button"
              aria-label={
                reduced
                  ? "Automatic rotation disabled for reduced motion"
                  : paused
                    ? "Resume automatic rotation"
                    : "Pause automatic rotation"
              }
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
              disabled={reduced}
            >
              {reduced ? "Motion off" : paused ? "▷ Resume" : "Ⅱ Pause"}
            </button>
            <button
              type="button"
              onClick={resetView}
              aria-label="Reset planet view"
            >
              ↺ Reset
            </button>
          </>
        )}
        {enabled && !isHome && (
          <button
            type="button"
            className="atlas-toggle"
            aria-pressed={overview}
            onClick={() => setOverview((value) => !value)}
          >
            {overview ? "Focus planet ↗" : "View all worlds ↗"}
          </button>
        )}
      </div>
      <div
        className="scene-surface"
        role="group"
        tabIndex={showScene && !overview ? 0 : undefined}
        aria-keyshortcuts={
          showScene && !overview
            ? "ArrowLeft ArrowRight ArrowUp ArrowDown"
            : undefined
        }
        onKeyDown={rotateWithKeyboard}
        aria-label={`${worlds[world].name} ${showScene ? "interactive 3D view. Drag or use arrow keys to rotate; select destinations using the controls." : "static view"}`}
        onPointerDown={beginDrag}
        onPointerMove={drag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={() => {
          pointer.current = null;
          interaction.current.dragging = false;
        }}
      >
        <div className="scene-static-image" aria-hidden={showScene}>
          {isHome ? (
            <div
              className="static-earth"
              role="img"
              aria-label="Earth viewed from space"
            />
          ) : (
            <Image
              src={data.destinations[world].images.webp}
              alt={worlds[world].name}
              width={445}
              height={445}
              sizes="(max-width: 767px) 80vw, 445px"
              preload
            />
          )}
        </div>
        {enabled && (inView || ready) && (
          <SceneBoundary onFailure={onFailure}>
            <div className="scene-webgl">
              <SceneCanvas
                world={world}
                overview={overview}
                active={active}
                paused={paused || reduced}
                reduced={reduced}
                reset={reset}
                interaction={interaction}
                onReady={onReady}
                onFailure={onFailure}
                onSelect={selectWorld}
                invalidateRef={invalidate}
              />
            </div>
          </SceneBoundary>
        )}
        <span className="scene-reticle reticle-top" aria-hidden="true" />
        <span className="scene-reticle reticle-bottom" aria-hidden="true" />
      </div>
      {enabled && (
        <p className="scene-hint">
          {overview
            ? "SELECT A WORLD · ILLUSTRATIVE ROUTES, NOT TO SCALE"
            : "DRAG TO ROTATE · ARROW KEYS WHEN FOCUSED"}
        </p>
      )}
      {enabled && !isHome && (
        <div
          className="scene-world-controls"
          role="group"
          aria-label="3D destination markers"
        >
          {destinationWorlds.map((key) => (
            <button
              type="button"
              key={key}
              aria-label={`Travel to ${worlds[key].name}`}
              aria-pressed={world === key}
              onClick={() => selectWorld(key)}
            >
              <i />
              {worlds[key].name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
