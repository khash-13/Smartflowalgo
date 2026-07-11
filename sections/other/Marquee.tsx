"use client";

import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState } from "react";

type Logo = {
  src: string;
};

interface LogoMarqueeProps {
  logos: Logo[];
  speed?: number; // px/sec
  gap?: number; // px
  logoHeight?: number; // px
}

export default function LogoMarquee({
  logos,
  speed = 36,
  gap = 160,
  logoHeight = 30,
}: LogoMarqueeProps) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused || !trackRef.current) return;

    const distance = (speed * delta) / 1000;
    const halfWidth = trackRef.current.scrollWidth / 2;

    let next = x.get() - distance;

    if (Math.abs(next) >= halfWidth) {
      next += halfWidth;
    }

    x.set(next);
  });

  // Duplicate logos for seamless looping
  const items = [...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Left Fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex w-max items-center"
      >
        {items.map((logo, index) => (
          <div
            key={`${index}`}
            className="flex shrink-0 items-center justify-center"
            style={{
              marginRight: gap,
              height: logoHeight + 20,
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Image
              src={logo.src}
              alt={"Companies logo"}
              width={logoHeight * 5}
              height={logoHeight}
              draggable={false}
              style={{
                height: logoHeight,
                width: "auto",
              }}
              className="
               dark:invert
               dark:hover:invert-0
                select-none
                object-contain

                grayscale
                opacity-60

                transition-all
                duration-300

                hover:grayscale-0
                hover:opacity-100
              "
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}