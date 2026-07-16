"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import image from "@/assets/image-1.jpeg"
import image2 from "@/assets/image-2.jpeg"
// import video from "@/assets/"

type MediaItem = {
  id: string;
  name: string;
  type: "image" | "video";
  path: string;
  poster?: string;
};

const MEDIA_ITEMS: MediaItem[] = [
  {
    id: "dashboard-overview",
    name: "Live Dashboard",
    type: "image",
    path: image.src,
  },
  {
    id: "signal-alerts",
    name: "Signal Alerts",
    type: "image",
    path: image2.src,
  },
  {
    id: "trade-walkthrough",
    name: "Trade Walkthrough",
    type: "video",
    path: "/video-1.mp4",
    poster: image2.src,
  }
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();

  const total = MEDIA_ITEMS.length;
  const activeItem = MEDIA_ITEMS[activeIndex];

  const goTo = (i: number) => setActiveIndex(((i % total) + total) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, total]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col overflow-hidden bg-[#050b14] text-white"
    >
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-6 py-8 md:py-12">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 flex flex-shrink-0 items-end justify-between gap-4"
        >
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
              // product_demo
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              See it in motion
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-slate-400 sm:block">
            A closer look at the dashboard, signals, and workflow — captured
            straight from the platform.
          </p>
        </motion.div>

        {/* main stage */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_0_60px_-15px_rgba(56,189,248,0.25)]"
        >
          {/* terminal chrome bar */}
          {/* <div className="flex flex-shrink-0 items-center justify-between border-b border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur-sm">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
              {activeItem.type === "video" && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
                </span>
              )}
            </div>
          </div> */}

          {/* media */}
          <div className="relative min-h-0 w-full flex-1 bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }
                }
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {activeItem.type === "image" ? (
                  <Image
                    src={activeItem.path}
                    alt={activeItem.name}
                    fill
                    priority={activeIndex === 0}
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 1152px"
                  />
                ) : (
                  <video
                    src={activeItem.path}
                    poster={activeItem.poster}
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ticker rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-5 flex flex-shrink-0 gap-3 overflow-x-auto pb-1"
        >
          {MEDIA_ITEMS.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(i)}
                aria-label={`Show ${item.name}`}
                aria-current={isActive}
                className="group relative flex-shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050b14]"
              >
                <div
                  className={`relative h-16 w-28 overflow-hidden rounded-lg border transition-colors sm:h-20 sm:w-32 ${
                    isActive
                      ? "border-sky-400/70"
                      : "border-white/10 group-hover:border-white/25"
                  }`}
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.path}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  ) : item.poster ? (
                    <Image
                      src={item.poster}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  ) : (
                    <video
                      src={item.path}
                      className="h-full w-full object-cover"
                      muted
                      preload="metadata"
                    />
                  )}

                  {item.type === "video" && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 fill-white/90"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  )}

                  <div
                    className={`absolute inset-0 transition-opacity ${
                      isActive
                        ? "opacity-0"
                        : "bg-black/40 opacity-100 group-hover:opacity-0"
                    }`}
                  />
                </div>

                <p
                  className={`mt-1.5 truncate font-mono text-[10px] uppercase tracking-wider ${
                    isActive ? "text-sky-400" : "text-slate-500"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} — {item.name}
                </p>

                {isActive && (
                  <motion.div
                    layoutId="activeRailIndicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-sky-400"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}