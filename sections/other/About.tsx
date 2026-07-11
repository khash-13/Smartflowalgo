"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Target,
  Crosshair,
  Layers,
  BarChart3,
  GitBranch,
  SlidersHorizontal,
  LayoutDashboard,
  Users,
  ArrowRight,
  CheckCircle2,
  Bell,
} from "lucide-react";

const FEATURES = [
  { icon: Target, title: "Buy & Sell Signals", desc: "Clear, actionable calls — no second-guessing." },
  { icon: Crosshair, title: "Entry, SL & TP Levels", desc: "Dynamic levels that adapt to price, not fixed pips." },
  { icon: Layers, title: "Multi-Timeframe Confirmation", desc: "Aligns 15m through Daily before it signals." },
  { icon: BarChart3, title: "Support & Resistance", desc: "Automatic zones drawn from real market structure." },
  { icon: GitBranch, title: "Market Structure (BOS/CHOCH)", desc: "Tracks breaks and shifts in trend character." },
  { icon: SlidersHorizontal, title: "Multi-Filter Trend Confirmation", desc: "Several technical filters must agree first." },
  { icon: LayoutDashboard, title: "Built-in Dashboard", desc: "Live market context, always on screen." },
  { icon: Users, title: "Built for Every Level", desc: "Structured enough for beginners, deep enough for pros." },
];

const STATS = [
  { label: "Timeframes aligned", value: "4" },
  { label: "Technical confirmations", value: "6+" },
  { label: "Structure signals", value: "BOS / CHOCH" },
];

const MTF_STRIP = ["15m", "1H", "4H", "1D"];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const candleVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  show: { opacity: 1, scaleY: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

/** Wraps the terminal panel with a subtle mouse-driven 3D tilt. */
function TiltPanel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

export default function GoldIndicatorAbout() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden">
      {/* ambient dot-grid, sits directly on page bg — no card, no border */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.3] dark:opacity-[0.2] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] [background-image:radial-gradient(circle,theme(colors.sky.500)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* ambient glow blobs */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-sky-500/20 blur-[130px] dark:bg-sky-400/20" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-[110px] dark:bg-cyan-400/10" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative mx-auto flex w-full flex-col items-center gap-14 px-6 py-20 lg:flex-row lg:gap-10 lg:px-24 lg:py-0"
      >
        {/* ============= LEFT: copy + features ============= */}
        <div className="flex flex-col justify-center gap-7 lg:w-[46%]">
          <motion.div
            variants={itemVariants}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-600/20 bg-sky-600/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-sky-600 opacity-75 dark:bg-sky-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-600 dark:bg-sky-400" />
            </span>
            SmartFlow Algo · Gold (XAUUSD)
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl dark:text-white"
          >
            A professional TradingView indicator, built for{" "}
            <span className="bg-gradient-to-r from-sky-600 to-cyan-400 bg-clip-text text-transparent dark:from-sky-400 dark:to-cyan-300">
              Gold traders.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400"
          >
            SmartFlowAlgo Gold uses multiple technical confirmations to
            surface high-probability BUY and SELL opportunities on XAUUSD —
            filtering out low-quality setups rather than firing on every
            candle.
          </motion.p>

          {/* stat chips */}
          <motion.div variants={containerVariants} className="flex flex-wrap gap-2">
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={itemVariants}
                className="rounded-xl border border-sky-600/15 bg-sky-600/[0.04] px-3 py-2 dark:border-sky-400/15 dark:bg-sky-400/[0.05]"
              >
                <div className="text-sm font-bold text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.ul variants={containerVariants} className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <motion.li
                  key={f.title}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="flex items-start gap-2.5 rounded-xl border border-transparent px-2.5 py-2 transition-colors hover:border-sky-600/15 hover:bg-sky-600/[0.04] dark:hover:border-sky-400/15 dark:hover:bg-sky-400/[0.05]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-600/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold leading-tight text-slate-900 dark:text-white">
                      {f.title}
                    </span>
                    <span className="mt-0.5 text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                      {f.desc}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div variants={itemVariants} className="flex flex-col gap-2 pt-1">
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              A structured approach, not a signal to follow blindly — always
              backtest and manage risk.
            </span>
          </motion.div>
        </div>

        {/* ============= RIGHT: layered animated illustration ============= */}
        <div className="relative flex flex-1 items-center justify-center lg:w-[54%]">
          {/* slow-rotating ambient ring behind everything */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute h-[420px] w-[420px] rounded-full border border-dashed border-sky-500/20 dark:border-sky-400/15 sm:h-[480px] sm:w-[480px]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute h-[340px] w-[340px] rounded-full border border-dashed border-cyan-400/15 dark:border-cyan-300/10 sm:h-[390px] sm:w-[390px]"
          />

          {/* ghost card peeking out behind, for depth */}
          <motion.div
            initial={{ opacity: 0, rotate: -10, x: -20 }}
            whileInView={{ opacity: 1, rotate: -8, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            animate={{ y: [0, -6] }}
            className="absolute -left-6 bottom-2 h-[180px] w-[220px] rounded-2xl border border-slate-200/70 bg-white/70 shadow-lg backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60"
            style={{ animationDuration: "6s" }}
          >
            <div className="flex items-center justify-between px-3 pt-3">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">BTC/USD</span>
              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[8px] font-semibold text-slate-400 dark:bg-slate-800 dark:text-slate-500">4H</span>
            </div>
            <svg viewBox="0 0 220 110" className="h-[130px] w-full opacity-60" preserveAspectRatio="none">
              <path
                d="M10 90 C40 85, 60 60, 85 65 C110 70, 120 40, 145 35 C165 31, 180 45, 205 20"
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* main terminal panel */}
          <motion.div
            variants={itemVariants}
            className="relative w-full max-w-[500px]"
          >
            <TiltPanel>
              <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_25px_90px_rgba(0,0,0,0.5)]">
                {/* panel header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-slate-900 dark:text-white">XAU/USD</span>
                    <span className="rounded-full bg-sky-600/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-sky-700 dark:bg-sky-400/10 dark:text-sky-400">
                      Gold
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                    />
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                      LIVE
                    </span>
                  </div>
                </div>

                {/* chart area */}
                <div className="relative h-[270px] overflow-hidden bg-[linear-gradient(to_bottom,rgba(248,250,252,1),rgba(255,255,255,1))] dark:bg-[linear-gradient(to_bottom,rgba(15,23,42,0.7),rgba(2,6,23,0.95))]">
                  {/* toast, appears mid-sequence then fades */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: [0, 1, 1, 0], x: [-16, 0, 0, -10] }}
                    viewport={{ once: true }}
                    transition={{ duration: 3, times: [0, 0.15, 0.82, 1], delay: 2.4 }}
                    className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-sky-200 bg-white/95 px-2.5 py-1 text-[9px] font-semibold text-sky-700 shadow-md backdrop-blur dark:border-sky-500/20 dark:bg-slate-900/95 dark:text-sky-400"
                  >
                    <Bell className="h-3 w-3" />
                    New BOS confirmed · 1H
                  </motion.div>

                  {/* faint candles for texture */}
                  <motion.div
                    variants={containerVariants}
                    className="absolute inset-0 flex items-end justify-between gap-1.5 px-4 pb-6 pt-8 opacity-40"
                  >
                    {["h-10","h-16","h-8","h-20","h-12","h-24","h-14","h-18","h-9","h-22","h-15","h-11"].map((h, i) => (
                      <motion.div
                        key={i}
                        variants={candleVariants}
                        style={{ transformOrigin: "bottom" }}
                        className={`w-1.5 flex-1 rounded-sm ${i % 3 === 0 ? "bg-rose-400" : "bg-emerald-400"} ${h}`}
                      />
                    ))}
                  </motion.div>

                  <svg viewBox="0 0 400 270" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="structFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <motion.line
                      x1="0" y1="100" x2="400" y2="100"
                      stroke="#F43F5E" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 5"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                    <text x="6" y="94" fontSize="9" fill="#F43F5E" opacity="0.7" fontWeight="700">Resistance</text>

                    <motion.line
                      x1="0" y1="170" x2="400" y2="170"
                      stroke="#10B981" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 5"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                    <text x="6" y="183" fontSize="9" fill="#10B981" opacity="0.7" fontWeight="700">Support</text>

                    <motion.path
                      d="M20,205 L110,105 L180,155 L255,60 L320,140 L378,45"
                      fill="none" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: "easeInOut", delay: 0.6 }}
                    />
                    <motion.path
                      d="M20,205 L110,105 L180,155 L255,60 L320,140 L378,45 L378,270 L20,270 Z"
                      fill="url(#structFill)"
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                      transition={{ duration: 1, delay: 1.4 }}
                    />

                    {[[20,205],[110,105],[180,155],[255,60],[320,140],[378,45]].map(([x, y], i) => (
                      <motion.circle
                        key={i} cx={x} cy={y} r="3.5" fill="#0EA5E9"
                        initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.6 + i * 0.18 }}
                      />
                    ))}
                  </svg>

                  <motion.div
                    initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: 1.4, duration: 0.4 }}
                    className="absolute left-[18%] top-[24%] rounded-md border border-sky-300 bg-sky-50/95 px-1.5 py-0.5 text-[8px] font-bold text-sky-700 shadow-sm dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-400"
                  >
                    BOS
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: 1.7, duration: 0.4 }}
                    className="absolute left-[62%] top-[48%] rounded-md border border-violet-300 bg-violet-50/95 px-1.5 py-0.5 text-[8px] font-bold text-violet-700 shadow-sm dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-400"
                  >
                    CHOCH
                  </motion.div>

{/* BUY marker */}
<motion.div
  initial={{ opacity: 0, scale: 0.6 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  animate={{ y: [0, -3, 0] }}
  transition={{
    default: { delay: 1.9, duration: 0.35, type: "spring", stiffness: 300 },
    y: { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 2.2 },
  }}
  className="absolute left-[38%] top-[58%] rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-md"
>
  BUY
</motion.div>

{/* SELL marker */}
<motion.div
  initial={{ opacity: 0, scale: 0.6 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  animate={{ y: [0, -3, 0] }}
  transition={{
    default: { delay: 2.1, duration: 0.35, type: "spring", stiffness: 300 },
    y: { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 2.4 },
  }}
  className="absolute left-[88%] top-[12%] -translate-x-full rounded-full bg-rose-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-md"
>
  SELL
</motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: 2.3, duration: 0.4, ease: "easeOut" }}
                    className="absolute bottom-3 right-3 w-[132px] rounded-xl border border-slate-200 bg-white/95 p-2.5 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
                  >
                    <div className="mb-1.5 text-[8px] font-bold uppercase tracking-wide text-slate-400">Dashboard</div>
                    <div className="space-y-1 text-[9px]">
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Bias</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Bullish</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Entry</span>
                        <span className="font-semibold text-slate-900 dark:text-white">$2,305</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">R:R</span>
                        <span className="font-semibold text-sky-600 dark:text-sky-400">1:2.4</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* MTF confirmation strip */}
                <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-4 py-3 dark:border-slate-800">
                  <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">MTF Confirmation</span>
                  <div className="flex items-center gap-1.5">
                    {MTF_STRIP.map((tf, i) => (
                      <motion.div
                        key={tf}
                        initial={{ opacity: 0.4 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        transition={{ delay: 2.5 + i * 0.15, duration: 0.3 }}
                        className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                      >
                        <motion.span
                          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                          transition={{ delay: 2.55 + i * 0.15, duration: 0.25, type: "spring" }}
                        >
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
                        </motion.span>
                        <span className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-400">{tf}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </TiltPanel>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}