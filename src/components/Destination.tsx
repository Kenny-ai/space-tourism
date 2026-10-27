"use client";

import { motion } from "motion/react";
import { useStateContext } from "../Context/StateProvider";
import { data } from "../data";
import type { destinationTypes } from "../@types/model";
import { Reveal, SectionHeading, Swap } from "./Animation";
import PlanetExplorer from "./space/PlanetExplorer";

const destinations = Object.keys(data.destinations) as destinationTypes[];

export default function Destination() {
  const { display, changeDestination } = useStateContext();
  const destination = data.destinations[display.destination];
  return (
    <div className="inner-page page-container">
      <SectionHeading number="01" caption="FOUR WORLDS. INFINITE WONDER.">
        Pick your destination
      </SectionHeading>
      <div className="destination-grid">
        <Reveal className="destination-scene-area">
          <PlanetExplorer
            world={display.destination}
            onSelect={changeDestination}
          />
        </Reveal>
        <Reveal className="destination-info" delay={0.12}>
          <nav className="destination-tabs" aria-label="Choose a destination">
            {destinations.map((key) => (
              <button
                id={`destination-tab-${key}`}
                key={key}
                type="button"
                aria-pressed={display.destination === key}
                onClick={() => changeDestination(key)}
              >
                {data.destinations[key].name}
                {display.destination === key && (
                  <motion.span
                    layoutId="destination-indicator"
                    className="tab-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </nav>
          <div aria-live="polite" aria-atomic="true">
            <Swap id={display.destination}>
              <p className="eyebrow content-kicker">
                A DIFFERENT KIND OF GETAWAY
              </p>
              <h2 className="destination-name">{destination.name}</h2>
              <p className="body-copy">{destination.description}</p>
              <div className="destination-stats">
                <div>
                  <span className="tiny-label">AVG. DISTANCE</span>
                  <p>{destination.distance}</p>
                </div>
                <div>
                  <span className="tiny-label">EST. TRAVEL TIME</span>
                  <p>{destination.travel}</p>
                </div>
              </div>
            </Swap>
          </div>
          <p className="section-footnote">
            <span className="status-dot" /> THE UNIVERSE IS CLOSER THAN YOU
            THINK
          </p>
        </Reveal>
      </div>
    </div>
  );
}
