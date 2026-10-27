"use client";

import Image from "next/image";
import { useStateContext } from "../Context/StateProvider";
import { data } from "../data";
import type { crewTypes } from "../@types/model";
import { Reveal, SectionHeading, Swap } from "./Animation";
import { Arrow, Star } from "./Icons";

const members = Object.keys(data.crew) as crewTypes[];
export default function Crew() {
  const { display, changeCrew } = useStateContext();
  const crew = data.crew[display.crew];
  const index = members.indexOf(display.crew);
  const move = (offset: number) =>
    changeCrew(members[(index + offset + members.length) % members.length]);
  return (
    <div className="inner-page page-container">
      <SectionHeading
        number="02"
        caption="EXCEPTIONAL PEOPLE. SHARED CURIOSITY."
      >
        Meet your crew
      </SectionHeading>
      <div className="crew-grid">
        <Reveal className="crew-info" delay={0.1}>
          <p className="eyebrow crew-kicker">
            <Star /> THE PEOPLE BEHIND THE POSSIBLE
          </p>
          <div aria-live="polite" aria-atomic="true">
            <Swap id={display.crew}>
              <p className="crew-role">{crew.role}</p>
              <h2 className="crew-name">{crew.name}</h2>
              <p className="body-copy">{crew.bio}</p>
            </Swap>
          </div>
          <div className="crew-controls">
            <nav aria-label="Choose a crew member" className="crew-dots">
              {members.map((key) => (
                <button
                  type="button"
                  key={key}
                  aria-label={`Show ${data.crew[key].name}`}
                  aria-pressed={display.crew === key}
                  onClick={() => changeCrew(key)}
                >
                  <span />
                </button>
              ))}
            </nav>
            <div className="crew-arrows">
              <button
                className="icon-button"
                aria-label="Previous crew member"
                onClick={() => move(-1)}
              >
                <Arrow direction="left" />
              </button>
              <button
                className="icon-button"
                aria-label="Next crew member"
                onClick={() => move(1)}
              >
                <Arrow />
              </button>
            </div>
          </div>
          <div className="crew-pagination">
            <span>0{index + 1}</span>
            <div>
              <i
                style={{ width: `${((index + 1) / members.length) * 100}%` }}
              />
            </div>
            <span>0{members.length}</span>
          </div>
        </Reveal>
        <Reveal className="crew-portrait" delay={0.18}>
          <div className="portrait-halo" aria-hidden="true" />
          <span className="portrait-label">
            THE NEXT CHAPTER
            <br />
            IS A HUMAN ONE.
          </span>
          <Swap id={display.crew} image>
            <Image
              src={crew.images.webp}
              alt={crew.name}
              width={575}
              height={700}
              sizes="(max-width: 767px) 80vw, 48vw"
              preload
            />
          </Swap>
          <div className="portrait-baseline" />
        </Reveal>
      </div>
    </div>
  );
}
