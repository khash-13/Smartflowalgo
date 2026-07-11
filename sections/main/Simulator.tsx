"use client"

import Simulator from '@/components/Simulator/Simulator'
import { Sliders } from 'lucide-react'
import React from 'react'

function SimulatorPage() {
  return (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                <Sliders className="h-3.5 w-3.5 text-blue-500" />
                <span>Risk Free Sandbox</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Process & Strategy Simulator
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Test systematic crossover, reversion, breakout or swing retest
                algorithms on sample historical sequences with zero capital
                risk.
              </p>
            </div>

            <Simulator />
          </section>
  )
}

export default SimulatorPage