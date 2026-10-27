"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useStateContext } from "../Context/StateProvider";
import { navigation } from "../lib/navigation";
import { Arrow, Star } from "./Icons";

export default function MobileNav() {
  const { closeNav } = useStateContext();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleResize = () => {
      if (desktop.matches) closeNav();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeNav();
      }
      if (event.key === "Tab") {
        const controls =
          dialog.current?.querySelectorAll<HTMLElement>("button, a[href]");
        if (!controls?.length) return;
        const first = controls[0],
          last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    desktop.addEventListener("change", handleResize);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      desktop.removeEventListener("change", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      const toggle = document.getElementById("menu-toggle");
      if (toggle?.getClientRects().length) toggle.focus();
      else if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [closeNav]);
  return (
    <div className="mobile-overlay">
      <motion.div
        className="menu-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={closeNav}
        aria-hidden="true"
      />
      <motion.div
        ref={dialog}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="mobile-menu"
        initial={reduced ? false : { x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mobile-menu-top">
          <Star />
          <button
            ref={closeButton}
            className="close-menu icon-button"
            aria-label="Close navigation"
            onClick={closeNav}
          >
            ×
          </button>
        </div>
        <p className="eyebrow">YOUR JOURNEY STARTS HERE</p>
        <nav aria-label="Mobile navigation">
          {navigation.map(({ href, label, number }) => (
            <Link
              href={href}
              key={href}
              onClick={closeNav}
              aria-current={pathname === href ? "page" : undefined}
            >
              <span>{number}</span>
              {label}
              <Arrow direction="diagonal" />
            </Link>
          ))}
        </nav>
        <p className="menu-note">
          A little further.
          <br />A whole new perspective.
        </p>
      </motion.div>
    </div>
  );
}
