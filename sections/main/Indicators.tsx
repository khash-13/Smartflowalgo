"use client";

import { indicatorsData } from "@/data/indicators";
import React from "react";
import IndicatorCard from "../other/IndicatorsCard";

function Indicators() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 text-left">
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Free indicators for cleaner market-flow analysis
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          SMARTFLOWALGO indicators are designed to support education around
          Gold, BTC, and Forex market structure, momentum, volatility, and risk
          zones.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        id="indicators-info-grid"
      >
        {indicatorsData.map((ind, i) => (
          <IndicatorCard
          ind={ind}
          key={i}
          index={i}
          />
        ))}
      </div>
    </section>
  );
}

export default Indicators;
