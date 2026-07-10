"use client";

import { BarChart3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function HeroGraphics() {
      const router = useRouter();
      const [heroTab, setHomeTab] = useState<"gold" | "btc" | "forex">("gold");
    
  return (
                <div className="relative h-full overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                {/* Ambient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_30%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.96),rgba(248,250,252,0.98))] dark:bg-[linear-gradient(to_bottom,rgba(2,6,23,0.95),rgba(2,6,23,0.98))]" />

                <div className="relative flex h-full flex-col p-4">
                  {/* Header */}
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900">
                        <BarChart3 className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate text-[16px] font-semibold tracking-tight text-slate-900 dark:text-white">
                            SmartFlow Terminal
                          </h3>
                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                            LIVE
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          AI trade execution console
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex rounded-2xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900/80">
                        {[
                          { key: "gold", label: "Gold" },
                          { key: "btc", label: "BTC" },
                          { key: "forex", label: "FX" },
                        ].map((tab) => (
                          <button
                            key={tab.key}
                            onClick={() => setHomeTab(tab.key as any)}
                            className={`rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all ${
                              heroTab === tab.key
                                ? "bg-white text-slate-900 shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                            Signal
                          </span>
                          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                          <span className="text-[12px] font-semibold text-emerald-600 dark:text-emerald-400">
                            Bullish
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main layout */}
                  <div className="grid flex-1 grid-cols-12 gap-3">
                    {/* LEFT SIDE */}
                    <div className="col-span-12 lg:col-span-7 flex flex-col gap-3">
                      {/* Main chart card */}
                      <div className="rounded-[24px] border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white">
                                {heroTab === "gold"
                                  ? "XAU/USD Smart Setup"
                                  : heroTab === "btc"
                                    ? "BTC/USD Momentum Setup"
                                    : "EUR/USD Intraday Setup"}
                              </h4>
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                {heroTab === "gold"
                                  ? "1H"
                                  : heroTab === "btc"
                                    ? "4H"
                                    : "15m"}
                              </span>
                            </div>
                            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                              Structure + liquidity + execution zone
                            </p>
                          </div>

                          <div className="text-right">
                            <div className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                              Last Price
                            </div>
                            <div className="text-[15px] font-bold text-slate-900 dark:text-white">
                              {heroTab === "gold"
                                ? "$2,320.50"
                                : heroTab === "btc"
                                  ? "$64,500"
                                  : "1.08520"}
                            </div>
                          </div>
                        </div>

                        <div className="relative h-[205px] overflow-hidden rounded-[20px] border border-slate-200 bg-[linear-gradient(to_bottom,rgba(248,250,252,1),rgba(255,255,255,1))] dark:border-slate-800 dark:bg-[linear-gradient(to_bottom,rgba(15,23,42,0.72),rgba(2,6,23,0.95))]">
                          {/* grid */}
                          <div className="pointer-events-none absolute inset-0 opacity-60">
                            <div className="absolute inset-x-0 top-[20%] border-t border-dashed border-slate-200 dark:border-slate-800"></div>
                            <div className="absolute inset-x-0 top-[40%] border-t border-dashed border-slate-200 dark:border-slate-800"></div>
                            <div className="absolute inset-x-0 top-[60%] border-t border-dashed border-slate-200 dark:border-slate-800"></div>
                            <div className="absolute inset-x-0 top-[80%] border-t border-dashed border-slate-200 dark:border-slate-800"></div>
                            <div className="absolute inset-y-0 left-[20%] border-l border-dashed border-slate-200 dark:border-slate-800"></div>
                            <div className="absolute inset-y-0 left-[40%] border-l border-dashed border-slate-200 dark:border-slate-800"></div>
                            <div className="absolute inset-y-0 left-[60%] border-l border-dashed border-slate-200 dark:border-slate-800"></div>
                            <div className="absolute inset-y-0 left-[80%] border-l border-dashed border-slate-200 dark:border-slate-800"></div>
                          </div>

                          {/* chart labels */}
                          <div className="absolute left-3 right-3 top-3 z-10 flex items-center justify-between">
                            <div className="rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-[10px] font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300">
                              Liquidity Sweep Detected
                            </div>
                            <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                              R:R 1:2.7
                            </div>
                          </div>

                          {/* Candles */}
                          <div className="relative z-10 flex h-full items-end justify-between gap-3 px-5 pb-6 pt-10">
                            {[
                              {
                                wick: "h-14",
                                body: "h-8",
                                color: "bg-rose-500",
                                wickColor: "bg-rose-400",
                              },
                              {
                                wick: "h-18",
                                body: "h-10",
                                color: "bg-emerald-500",
                                wickColor: "bg-emerald-400",
                              },
                              {
                                wick: "h-12",
                                body: "h-7",
                                color: "bg-rose-500",
                                wickColor: "bg-rose-400",
                              },
                              {
                                wick: "h-24",
                                body: "h-14",
                                color: "bg-emerald-500",
                                wickColor: "bg-emerald-400",
                                buy: true,
                              },
                              {
                                wick: "h-28",
                                body: "h-16",
                                color: "bg-emerald-500",
                                wickColor: "bg-emerald-400",
                              },
                              {
                                wick: "h-16",
                                body: "h-9",
                                color: "bg-emerald-500",
                                wickColor: "bg-emerald-400",
                              },
                              {
                                wick: "h-20",
                                body: "h-11",
                                color: "bg-emerald-500",
                                wickColor: "bg-emerald-400",
                              },
                            ].map((candle, i) => (
                              <div
                                key={i}
                                className="relative flex flex-1 flex-col items-center justify-end"
                              >
                                {candle.buy && (
                                  <div className="absolute -top-5 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-md">
                                    BUY
                                  </div>
                                )}
                                <div
                                  className={`w-[2px] ${candle.wick} ${candle.wickColor} rounded-full`}
                                />
                                <div
                                  className={`-mt-2 w-4 ${candle.body} ${candle.color} rounded-md`}
                                />
                              </div>
                            ))}
                          </div>

                          {/* Execution overlay */}
                          <div className="absolute bottom-3 right-3 z-20 w-[180px] rounded-[20px] border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                                Execution Box
                              </span>
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                82%
                              </span>
                            </div>

                            <div className="space-y-1.5 text-[11px]">
                              <div className="flex justify-between">
                                <span className="text-slate-500 dark:text-slate-400">
                                  Entry
                                </span>
                                <span className="font-semibold text-slate-900 dark:text-white">
                                  {heroTab === "gold"
                                    ? "$2,305"
                                    : heroTab === "btc"
                                      ? "$63,800"
                                      : "1.0820"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500 dark:text-slate-400">
                                  TP
                                </span>
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                  {heroTab === "gold"
                                    ? "$2,345"
                                    : heroTab === "btc"
                                      ? "$66,200"
                                      : "1.0890"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500 dark:text-slate-400">
                                  SL
                                </span>
                                <span className="font-semibold text-rose-600 dark:text-rose-400">
                                  {heroTab === "gold"
                                    ? "$2,290"
                                    : heroTab === "btc"
                                      ? "$62,900"
                                      : "1.0790"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* NEW bottom chart replacing empty space */}
                      <div className="rounded-[24px] border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <h4 className="text-[12px] font-semibold text-slate-900 dark:text-white">
                              Performance + Volume Flow
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              Intraday momentum and session strength
                            </p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            LIVE FEED
                          </span>
                        </div>

                        <div className="grid grid-cols-12 gap-3">
                          {/* line chart */}
                          <div className="col-span-8 rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                Equity Curve
                              </span>
                              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                +$1,450
                              </span>
                            </div>

                            <div className="relative h-[90px] overflow-hidden rounded-2xl">
                              <svg
                                viewBox="0 0 320 90"
                                className="h-full w-full"
                                preserveAspectRatio="none"
                              >
                                <defs>
                                  <linearGradient
                                    id="eqFill"
                                    x1="0"
                                    x2="0"
                                    y1="0"
                                    y2="1"
                                  >
                                    <stop
                                      offset="0%"
                                      stopColor="rgba(16,185,129,0.25)"
                                    />
                                    <stop
                                      offset="100%"
                                      stopColor="rgba(16,185,129,0.02)"
                                    />
                                  </linearGradient>
                                </defs>

                                <path
                                  d="M0 78 C25 74, 45 60, 65 56 C90 52, 110 56, 135 40 C160 24, 185 28, 205 20 C230 12, 255 16, 280 8 C295 5, 307 3, 320 2"
                                  fill="none"
                                  stroke="#10B981"
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M0 78 C25 74, 45 60, 65 56 C90 52, 110 56, 135 40 C160 24, 185 28, 205 20 C230 12, 255 16, 280 8 C295 5, 307 3, 320 2 L320 90 L0 90 Z"
                                  fill="url(#eqFill)"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* volume bars */}
                          <div className="col-span-4 rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
                            <div className="mb-2 text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                              Volume
                            </div>
                            <div className="flex h-[90px] items-end justify-between gap-2">
                              {[32, 48, 38, 62, 54, 74].map((h, i) => (
                                <div
                                  key={i}
                                  className="flex-1 rounded-t-xl bg-emerald-500/85 dark:bg-emerald-500"
                                  style={{ height: `${h}px` }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col gap-3">
                      {/* Strategy matrix */}
                      <div className="rounded-[24px] border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                        <div className="mb-3 flex items-center justify-between">
                          <h4 className="text-[13px] font-semibold text-slate-900 dark:text-white">
                            Strategy Matrix
                          </h4>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            ACTIVE
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          {[
                            {
                              label: "Fast EMA",
                              value: "20",
                              color: "text-emerald-600 dark:text-emerald-400",
                            },
                            {
                              label: "Slow EMA",
                              value: "50",
                              color: "text-indigo-600 dark:text-indigo-400",
                            },
                            {
                              label: "ATR Vol",
                              value: "14",
                              color: "text-violet-600 dark:text-violet-400",
                            },
                            {
                              label: "Session",
                              value: "NY",
                              color: "text-amber-600 dark:text-amber-400",
                            },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className="rounded-[18px] border border-slate-100 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950/60"
                            >
                              <div className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                {item.label}
                              </div>
                              <div
                                className={`mt-1 text-[12px] font-semibold ${item.color}`}
                              >
                                {item.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-800">
                          <div className="mb-1.5 flex items-center justify-between text-[11px]">
                            <span className="text-slate-500 dark:text-slate-400">
                              Risk meter
                            </span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              Low risk
                            </span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                            <div className="h-full w-[80%] rounded-full bg-emerald-500"></div>
                          </div>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-[24px] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                            Net PnL
                          </div>
                          <div className="mt-1 text-[20px] font-bold tracking-tight text-slate-900 dark:text-white">
                            +$18.4k
                          </div>
                          <div className="mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                            +12.6% this month
                          </div>

                          <div className="mt-3 h-14 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60">
                            <svg
                              viewBox="0 0 160 56"
                              className="h-full w-full"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M0 44 C15 42, 25 38, 40 34 C55 30, 65 34, 80 26 C95 18, 110 20, 125 12 C138 8, 150 7, 160 4"
                                fill="none"
                                stroke="#10B981"
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                            Win Rate
                          </div>
                          <div className="mt-1 text-[20px] font-bold tracking-tight text-slate-900 dark:text-white">
                            74.8%
                          </div>
                          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                            Avg RR 1:2.3
                          </div>

                          <div className="mt-3 rounded-[18px] border border-blue-200 bg-blue-50 px-3 py-2.5 dark:border-blue-500/20 dark:bg-blue-500/10">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-400">
                              Live Alert
                            </div>
                            <p className="mt-1 text-[10px] leading-5 text-slate-700 dark:text-slate-300">
                              {heroTab === "gold"
                                ? "Gold reclaiming demand zone."
                                : heroTab === "btc"
                                  ? "BTC liquidity sweep confirmed."
                                  : "EUR/USD holding breakout support."}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom strip cards */}
                      <div className="grid grid-cols-1 gap-3">
                        <div className="rounded-[22px] border border-slate-200 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                          <div className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            Signal Bias
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-[13px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                            Bullish Continuation
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  )
}

export default HeroGraphics