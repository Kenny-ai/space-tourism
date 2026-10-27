"use client";

import Link from "next/link";
import { Reveal } from "./Animation";
import { Arrow, Star } from "./Icons";
import PlanetExplorer from "./space/PlanetExplorer";

export default function Intro() {
  return (
    <div className="home-page page-container">
      <div className="home-content">
        <Reveal>
          <p className="eyebrow hero-eyebrow">
            <span className="small-rule" /> THE EXTRAORDINARY AWAITS
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="hero-title">
            <span className="hero-pretitle">So, you want to travel to</span>
            SPACE
            <span className="hero-title-star">
              <Star />
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="hero-description">
            A little further from the ordinary.
            <br className="desktop-break" /> An entirely new way to see
            everything.
          </p>
          <p className="hero-body">
            Leave the familiar behind. From the quiet of the Moon to the rings
            of Saturn, your next great adventure is out there.
          </p>
        </Reveal>
        <Reveal delay={0.32}>
          <Link href="/destination" className="text-link">
            DISCOVER YOUR DESTINATION <Arrow direction="diagonal" />
          </Link>
        </Reveal>
      </div>
      <Reveal className="home-earth-area" delay={0.3}>
        <PlanetExplorer />
        <Link href="/destination" className="earth-explore-link">
          Explore the destinations <Arrow direction="diagonal" />
        </Link>
      </Reveal>
      <Reveal className="home-bottom" delay={0.45}>
        <div>
          <span className="tiny-label">THE VIEW FROM HERE</span>
          <p>Earth. Our first destination.</p>
        </div>
        <span className="home-coordinate">
          25° 59′ 10.8″ N <span>↗</span>
        </span>
      </Reveal>
    </div>
  );
}
