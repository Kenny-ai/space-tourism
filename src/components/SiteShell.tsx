"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import Header from "./Header";
import MobileNav from "./MobileNav";
import { useStateContext } from "../Context/StateProvider";
import { Star } from "./Icons";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { showNav } = useStateContext();
  const reduced = useReducedMotion();
  const scene = pathname === "/" ? "home" : pathname.slice(1).split("/")[0];
  return (
    <MotionConfig reducedMotion="user">
      <div className={`site-shell scene-${scene}`}>
        <div className="scene-background" aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.div
              key={scene}
              className={`scene-photo photo-${scene}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.8 }}
            />
          </AnimatePresence>
          <div className="scene-shade" />
          <div className="star-field" />
        </div>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <span>
            <i /> BEYOND THE EVERYDAY
          </span>
          <span className="footer-center">EARTH IS ONLY THE BEGINNING</span>
          <span>
            <Link href="/credits" className="credits-link">
              IMAGE CREDITS
            </Link>
            <Star />
          </span>
        </footer>
        {showNav && <MobileNav />}
      </div>
    </MotionConfig>
  );
}
