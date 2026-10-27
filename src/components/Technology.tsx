"use client";

import Image from "next/image";
import { useStateContext } from "../Context/StateProvider";
import { data } from "../data";
import type { technologyTypes } from "../@types/model";
import { Reveal, SectionHeading, Swap } from "./Animation";
import { Arrow } from "./Icons";

const technologies = Object.keys(data.technology) as technologyTypes[];
export default function Technology() {
  const { display, changeTechnology } = useStateContext();
  const technology = data.technology[display.technology];
  const index = technologies.indexOf(display.technology);
  return (
    <div className="inner-page page-container">
      <SectionHeading number="03" caption="BUILT FOR SOMETHING BIGGER.">
        Space launch 101
      </SectionHeading>
      <div className="technology-grid">
        <Reveal className="technology-info" delay={0.1}>
          <nav className="technology-tabs" aria-label="Choose technology">
            {technologies.map((key, i) => (
              <button
                type="button"
                key={key}
                aria-label={`Show ${data.technology[key].name}`}
                aria-pressed={display.technology === key}
                onClick={() => changeTechnology(key)}
              >
                <span>0{i + 1}</span>
                <span>{data.technology[key].name}</span>
                <Arrow direction="diagonal" />
              </button>
            ))}
          </nav>
          <div aria-live="polite" aria-atomic="true">
            <Swap id={display.technology}>
              <p className="eyebrow content-kicker">
                THE ENGINEERING OF EXPLORATION
              </p>
              <h2 className="technology-name">{technology.name}</h2>
              <p className="body-copy">{technology.description}</p>
            </Swap>
          </div>
        </Reveal>
        <Reveal className="technology-visual" delay={0.18}>
          <Swap id={display.technology} image>
            <div className="technology-photo">
              <Image
                src={technology.images.portrait}
                alt={technology.name}
                fill
                sizes="(max-width: 767px) 90vw, 45vw"
                preload
              />
              <div className="photo-corners" />
            </div>
          </Swap>
          <div className="technology-image-caption">
            <span>THE FLIGHT JOURNAL — 0{index + 1}</span>
            <span>
              ENGINEERED TO GO FURTHER <span>↗</span>
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
