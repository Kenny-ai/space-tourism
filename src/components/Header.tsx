"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useStateContext } from "../Context/StateProvider";
import { navigation } from "../lib/navigation";

export default function Header() {
  const pathname = usePathname();
  const { showNav, setShowNav } = useStateContext();
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Space Tourism home">
        <Image
          src="/assets/shared/logo.svg"
          width={42}
          height={42}
          alt=""
          loading="eager"
        />
        <span>
          SPACE<span className="brand-subtitle">TOURISM</span>
        </span>
      </Link>
      <div className="header-rule" aria-hidden="true" />
      <nav className="desktop-navigation" aria-label="Primary navigation">
        {navigation.map(({ href, label, number }) => (
          <Link
            href={href}
            key={href}
            aria-current={pathname === href ? "page" : undefined}
            className="nav-link"
          >
            <span>{number}</span>
            {label}
            {pathname === href && (
              <motion.span
                className="nav-indicator"
                layoutId="navigation-indicator"
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
              />
            )}
          </Link>
        ))}
      </nav>
      <span className="header-status">
        <i /> A NEW PERSPECTIVE
      </span>
      <button
        className="menu-toggle icon-button"
        type="button"
        id="menu-toggle"
        aria-label="Open navigation"
        aria-expanded={showNav}
        aria-controls={showNav ? "mobile-navigation" : undefined}
        onClick={() => setShowNav(true)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
