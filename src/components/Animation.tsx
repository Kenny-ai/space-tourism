"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Swap({
  children,
  id,
  className,
  image = false,
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
  image?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={id}
          initial={{
            opacity: 0,
            y: reduced ? 0 : 18,
            scale: image && !reduced ? 0.95 : 1,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: reduced ? 0 : -12,
            scale: image && !reduced ? 1.03 : 1,
          }}
          transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function SectionHeading({
  number,
  children,
  caption,
}: {
  number: string;
  children: React.ReactNode;
  caption: string;
}) {
  return (
    <Reveal className="section-heading">
      <h1>
        <span aria-hidden="true">{number}</span>
        {children}
      </h1>
      <span className="section-caption">{caption}</span>
    </Reveal>
  );
}
