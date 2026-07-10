import { indicatorsData } from "@/data/indicators";
import React from "react";

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
        {indicatorsData.map((ind) => (
          <div
            key={ind.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {ind.name}
                </h3>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-bold font-mono">
                  CODE FREE
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ind.description}
              </p>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-gray-200 dark:border-slate-800 space-y-2 text-[11px]">
                <div>
                  <span className="font-bold text-slate-400 uppercase block text-[9px] tracking-wider">
                    How It Works:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {ind.howItWorks}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-300 dark:border-slate-800/60">
                  <span className="font-bold text-slate-400 uppercase block text-[9px] tracking-wider">
                    Inputs Settings:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {ind.settings.map((set, idx) => (
                      <span
                        key={idx}
                        className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded text-[10px] text-slate-500 border border-slate-200 dark:border-slate-800"
                      >
                        {set}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Formula Basis:</span>
              <span className="text-slate-500 dark:text-slate-400 font-semibold truncate max-w-[150px]">
                {ind.formulaBasis}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Indicators;
