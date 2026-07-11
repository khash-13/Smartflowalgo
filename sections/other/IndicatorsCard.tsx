"use client";

import { motion, type Variants } from "framer-motion";
import {
  Activity,
  Gauge,
  Waves,
  TrendingUp,
  BarChart3,
  Zap,
  Layers,
  Radio,
  type LucideIcon,
} from "lucide-react";

interface Indicator {
  id: string | number;
  name: string;
  description: string;
  howItWorks: string;
  settings: string[];
  formulaBasis: string;
  image?: string; // optional real screenshot; falls back to generated schematic
}

// accent per card — cycles deterministically so a grid of many cards stays scannable,
// not randomized (would shift on every re-render / SSR mismatch)
const ACCENTS = [
  { id: "blue", from: "#3B82F6", to: "#1D4ED8", text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-600/10 dark:bg-blue-400/10", ring: "group-hover:border-blue-600/25 dark:group-hover:border-blue-400/25" },
  { id: "emerald", from: "#10B981", to: "#047857", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600/10 dark:bg-emerald-400/10", ring: "group-hover:border-emerald-600/25 dark:group-hover:border-emerald-400/25" },
  { id: "amber", from: "#FF9800", to: "#C2680A", text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-600/10 dark:bg-amber-400/10", ring: "group-hover:border-amber-600/25 dark:group-hover:border-amber-400/25" },
  { id: "violet", from: "#8B5CF6", to: "#6D28D9", text: "text-violet-600 dark:text-violet-400", bg: "bg-violet-600/10 dark:bg-violet-400/10", ring: "group-hover:border-violet-600/25 dark:group-hover:border-violet-400/25" },
  { id: "rose", from: "#F43F5E", to: "#BE123C", text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-600/10 dark:bg-rose-400/10", ring: "group-hover:border-rose-600/25 dark:group-hover:border-rose-400/25" },
  { id: "cyan", from: "#06B6D4", to: "#0E7490", text: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-600/10 dark:bg-cyan-400/10", ring: "group-hover:border-cyan-600/25 dark:group-hover:border-cyan-400/25" },
] as const;

// deterministic hash so the same indicator always gets the same accent/icon/wave shape
function hashStr(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function resolveIcon(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes("rsi") || n.includes("stoch")) return Gauge;
  if (n.includes("macd") || n.includes("momentum")) return Activity;
  if (n.includes("bollinger") || n.includes("band") || n.includes("channel")) return Waves;
  if (n.includes("ema") || n.includes("sma") || n.includes("average") || n.includes(" ma")) return TrendingUp;
  if (n.includes("volume") || n.includes("obv")) return BarChart3;
  if (n.includes("atr") || n.includes("volatility")) return Zap;
  if (n.includes("fib")) return Layers;
  return Radio;
}

// generates a plausible-looking price/oscillator path, seeded per card so it's stable
function generatePath(seed: number, oscillator: boolean) {
  const rand = (i: number) => {
    const x = Math.sin(seed + i * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  const points: number[] = [];
  let y = oscillator ? 50 : 60;
  for (let i = 0; i < 9; i++) {
    y += (rand(i) - 0.5) * (oscillator ? 34 : 26);
    y = Math.max(12, Math.min(88, y));
    points.push(y);
  }
  const step = 240 / (points.length - 1);
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${100 - p}`).join(" ");
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function IndicatorCard({ ind, index }: { ind: Indicator; index: number }) {
  const accent = ACCENTS[hashStr(ind.name) % ACCENTS.length];
  const Icon = resolveIcon(ind.name);
  const isOscillator = /rsi|stoch|macd|momentum/i.test(ind.name);
  const path = generatePath(hashStr(ind.name), isOscillator);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-900 ${accent.ring}`}
    >
      {/* ===== Visual header ===== */}
      <div
        className="relative h-48 p-2 w-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accent.from}14, ${accent.to}08)`,
        }}
      >
        {ind.image ? (
          <img src={ind.image} alt={"name of card"} className="h-full w-full rounded-lg object-cover" />
        ) : (
          <>
            {/* faint grid */}
            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.15)_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* schematic line, unique per card */}
            <svg viewBox="0 0 240 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`fill-${ind.id}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={accent.from} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={accent.from} stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d={path}
                fill="none"
                stroke={accent.from}
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: "easeInOut", delay: index * 0.04 }}
              />
              <motion.path
                d={`${path} L 240 100 L 0 100 Z`}
                fill={`url(#fill-${ind.id})`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.04 + 0.3 }}
              />
              {isOscillator && (
                <>
                  <line x1="0" y1="25" x2="240" y2="25" stroke={accent.from} strokeOpacity="0.25" strokeDasharray="3 4" />
                  <line x1="0" y1="75" x2="240" y2="75" stroke={accent.from} strokeOpacity="0.25" strokeDasharray="3 4" />
                </>
              )}
            </svg>
          </>
        )}

        {/* icon badge, floats over the visual */}
        <div
          className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/60 bg-white/90 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/90 ${accent.text}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <span className="absolute right-3 top-3 rounded-full border border-white/60 bg-white/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 backdrop-blur dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-400">
          {isOscillator ? "Oscillator" : "Overlay"}
        </span>
      </div>

      {/* ===== Body ===== */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-3.5">
          <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-white">
            {ind.name}
          </h3>

          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {ind.description}
          </p>

          <div className="space-y-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-[11px] dark:border-slate-800 dark:bg-slate-950/60">
            <div>
              <span className={`block text-[9px] font-bold uppercase tracking-wider ${accent.text}`}>
                How it works
              </span>
              <p className="mt-1 text-slate-600 dark:text-slate-400">{ind.howItWorks}</p>
            </div>

            <div className="border-t border-slate-200/80 pt-2.5 dark:border-slate-800/60">
              <span className={`block text-[9px] font-bold uppercase tracking-wider ${accent.text}`}>
                Input settings
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {ind.settings.map((set, idx) => (
                  <span
                    key={idx}
                    className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                  >
                    {set}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-[11px] dark:border-slate-800">
          <span className="font-mono text-slate-400">Formula basis</span>
          <span
            className={`max-w-[150px] truncate rounded-md px-2 py-0.5 font-mono font-semibold ${accent.bg} ${accent.text}`}
            title={ind.formulaBasis}
          >
            {ind.formulaBasis}
          </span>
        </div>
      </div>
    </motion.div>
  );
}