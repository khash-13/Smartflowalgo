"use client";

import { getToken } from "@/lib/plan-token";
import { motion, type Variants } from "framer-motion";
import {
  TrendingUp,
  GraduationCap,
  Video,
  Users,
  FileDown,
  RefreshCw,
  ArrowRight,
  Star,
  Gift,
  ShieldCheck,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";

const PRICE = 30;

const FEATURES = [
  {
    icon: TrendingUp,
    title: "GOLD VIP Indicator",
    desc: "Latest Version",
    value: 49,
    tag: "Latest",
  },
  {
    icon: TrendingUp,
    title: "BTC VIP Indicator",
    desc: "Latest Version",
    value: 39,
  },
  {
    icon: RefreshCw,
    title: "EA Trial",
    desc: "15-Day FREE Trial (August)",
    value: 25,
  },
  {
    icon: Users,
    title: "VIP Telegram Group",
    desc: "Exclusive members-only community",
    value: 20,
  },
  {
    icon: TrendingUp,
    title: "Trade Setups",
    desc: "2–3 High-Probability Setups",
    value: 30,
  },
  {
    icon: RefreshCw,
    title: "Daily Gold Updates",
    desc: "Software updates every trading day",
    value: 15,
  },
  {
    icon: GraduationCap,
    title: "Live Q&A & Support",
    desc: "Trading help and mentoring",
    value: 20,
  },
];

const TOTAL_VALUE = FEATURES.reduce((sum, f) => sum + f.value, 0);
const SAVE_PERCENT = Math.round(((TOTAL_VALUE - PRICE) / TOTAL_VALUE) * 100);

const AVATARS = [
  { initials: "A", from: "from-blue-500", to: "to-blue-700" },
  { initials: "R", from: "from-indigo-500", to: "to-indigo-700" },
  { initials: "K", from: "from-sky-500", to: "to-sky-700" },
  { initials: "M", from: "from-blue-400", to: "to-blue-600" },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function PricingBanner() {
  const router = useRouter();

  function goToCheckout() {
    const tok = getToken("PAID", PRICE, "monthly");
    router.push(`/checkout?plan=${tok}`);
  }

  return (
    <div className="relative rounded-[1.75rem] sm:mx-12 mx-0 bg-gradient-to-r from-blue-600/40 via-blue-400/15 to-blue-600/40 p-px dark:from-blue-500/40 dark:via-blue-400/10 dark:to-blue-500/40">
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white dark:border-white/5 dark:bg-zinc-950"
      >
        {/* dot-grid texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.25] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)] [background-image:radial-gradient(circle,theme(colors.blue.500)_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* ambient glow blobs */}
        <div className="pointer-events-none absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[100px] dark:bg-blue-500/25" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-400/15 blur-3xl dark:bg-blue-400/10" />

        {/* faint sparkline signature, sits behind the price */}
        <svg
          className="pointer-events-none absolute left-6 top-8 h-24 w-64 text-blue-600/10 dark:text-blue-400/10 sm:left-10"
          viewBox="0 0 260 90"
          fill="none"
        >
          <path
            d="M0 70 L30 55 L55 62 L80 30 L105 42 L130 15 L155 34 L180 20 L205 38 L230 8 L260 24"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="relative flex flex-col lg:flex-row">
          {/* Left: headline + price */}
          <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:w-[44%] lg:p-12">
            <motion.div
              variants={itemVariants}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-blue-600 opacity-75 dark:bg-blue-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
              </span>
              All-Access · One Plan
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl font-black leading-[0.95] tracking-tighter text-slate-900 sm:text-5xl dark:text-white"
            >
              One price.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
                Everything unlocked.
              </span>
            </motion.h2>

            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <div className="flex items-end gap-2">
                <span className="text-6xl font-black tracking-tighter text-blue-600 sm:text-7xl dark:text-blue-400">
                  ${PRICE}
                </span>
                <span className="pb-2 text-lg font-medium text-slate-500 dark:text-slate-400">
                  /month
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="line-through decoration-slate-400/70">
                  ${TOTAL_VALUE}+/mo
                </span>{" "}
                if bought as separate tools
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400"
            >
              No tiers. No upsells. Every course, every signal, every tool — one
              flat price.
            </motion.p>

            {/* Launch offer banner */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-4 dark:border-amber-400/20 dark:bg-amber-400/[0.08]"
            >
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                  Special Launch Offer · Jul 20 – Jul 30
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Join now and get GOLD VIP & BTC VIP Indicators{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  free for 2 weeks.
                </span>
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                Not satisfied? Your first month is fully refunded in August. No
                risk — test everything before you decide.
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <button
                onClick={goToCheckout}
                type="button"
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 hover:shadow-blue-600/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 sm:w-fit"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2">
                  Get Full Access
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                No card required · Cancel anytime
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                {AVATARS.map((a) => (
                  <div
                    key={a.initials}
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${a.from} ${a.to} text-xs font-bold text-white ring-2 ring-white dark:ring-zinc-950`}
                  >
                    {a.initials}
                  </div>
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 ring-2 ring-white dark:bg-white/10 dark:text-slate-300 dark:ring-zinc-950">
                  12K+
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-blue-500 text-blue-500 dark:fill-blue-400 dark:text-blue-400"
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  4.9 from 2,340 traders
                </span>
              </div>
            </motion.div>
          </div>

          {/* divider */}
          <div className="hidden w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent dark:via-white/10 lg:block" />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10 lg:hidden" />

          {/* Right: value stack */}
          <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 lg:w-[56%] lg:p-12">
            <div className="flex items-center justify-between">
              <motion.span
                variants={itemVariants}
                className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500"
              >
                Everything included
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="rounded-full bg-blue-600/10 px-2.5 py-1 text-[11px] font-bold text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"
              >
                Save {SAVE_PERCENT}%
              </motion.span>
            </div>

            <motion.ul variants={containerVariants} className="flex flex-col gap-1.5">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.li
                    key={feature.title}
                    variants={itemVariants}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="flex items-center justify-between gap-4 rounded-xl border border-transparent px-3 py-2.5 transition-colors hover:border-blue-600/20 hover:bg-blue-600/[0.04] dark:hover:border-blue-400/20 dark:hover:bg-blue-400/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                          {feature.title}
                          {feature.tag && (
                            <span className="rounded-full bg-blue-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white dark:bg-blue-500">
                              {feature.tag}
                            </span>
                          )}
                        </span>
                        <span className="text-xs leading-snug text-slate-500 dark:text-slate-400">
                          {feature.desc}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-semibold text-slate-400 line-through dark:text-slate-600">
                      ${feature.value}/mo
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div
              variants={itemVariants}
              className="mt-1 flex items-center justify-between rounded-2xl border border-blue-600/20 bg-blue-600/5 p-4 dark:border-blue-400/20 dark:bg-blue-400/10"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Total value
                </p>
                <p className="text-lg font-bold text-slate-400 line-through dark:text-slate-600">
                  ${TOTAL_VALUE}/mo
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-600" />
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                  Your price
                </p>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  ${PRICE}/mo
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}