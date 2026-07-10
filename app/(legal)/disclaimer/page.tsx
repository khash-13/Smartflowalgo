import { ShieldAlert } from 'lucide-react'
import React from 'react'

function page() {
  return (
              <section
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-left space-y-6"
            id="disclaimer-view"
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">
              Risk Disclaimer
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Mandatory Compliance Statement
            </p>

            <div className="bg-red-500/5 dark:bg-rose-950/10 p-6 md:p-8 space-y-6 leading-relaxed text-slate-700 dark:text-slate-300 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-rose-500 border-b border-rose-200 dark:border-rose-900 pb-3 mb-4">
                <ShieldAlert className="h-6 w-6 shrink-0" />
                <h2 className="font-bold text-sm uppercase tracking-wider">
                  Trading Risk Warning Notice
                </h2>
              </div>

              <p className="font-bold text-slate-900 dark:text-white leading-relaxed">
                Trading Gold, cryptocurrency, Forex, CFDs, and other financial
                markets involves substantial risk. SMARTFLOWALGO content,
                signals, indicators, market analysis, Telegram posts, and
                simulator results are educational only. They do not guarantee
                future outcomes and should not be treated as financial advice.
              </p>

              <div className="space-y-4">
                <p>
                  <strong>1. High Leverage Danger:</strong> Using leverage
                  multiplies both trading potential and capital exposure. A
                  minor volatility swing can liquidate an entire margin budget
                  in seconds. Our simulators use synthetic demo data precisely
                  to let you learn how position-sizing keeps your risk limited
                  to a strict, sustainable 1% average before allocating true
                  funds.
                </p>

                <p>
                  <strong>2. past Performance Bias:</strong> Backtest curves and
                  historical strategy rules (such as crossover logs) represent
                  hypothetical mathematical modeling on static past periods.
                  Future market regimes, central bank pivots, and black-swan
                  liquidity drops can completely alter strategy performance
                  metrics. Past success is never an indicator of future results.
                </p>

                <p>
                  <strong>3. Independent Accountability:</strong> By utilizing
                  the platform, you acknowledge that you are fully accountable
                  for your own trading actions and financial allocations. We do
                  not support live trading execution, portfolio pooling,
                  copy-trading bot links, or custom fund management.
                </p>
              </div>
            </div>
          </section>
  )
}

export default page