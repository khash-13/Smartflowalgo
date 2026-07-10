"use client";

import { Send, Users } from 'lucide-react'
import React from 'react'
import HeroGraphics from './HeroGraphics'
import { useRouter } from 'next/navigation'

function Hero() {
    const router = useRouter()
  return (
          <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-24 pb-12">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40 animate-pulse">
                <Users className="h-3.5 w-3.5" />
                <span>Free Telegram access for the first 200 users</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1]">
                Trade Smarter With <br />
                <span className="text-transparent uppercase sm:text-4xl lg:text-7xl bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500">
                  Gold, BTC & Forex
                </span>{" "}
                <br />
                Market Flow
              </h1>

              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                SMARTFLOWALGO helps traders learn market structure, follow
                educational signal ideas, study risk-managed setups, use
                indicators, and practice strategies through a professional demo
                simulator.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="https://t.me/smartflowalgo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all scale-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  id="hero-primary-cta"
                >
                  <Send className="h-4 w-4" />
                  Join Free Telegram
                </a>

                <button
                  onClick={() => router.push("simulator")}
                  className="w-full px-0 py-3.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-850 shadow-xs transition-all cursor-pointer"
                  id="hero-secondary-cta"
                >
                  Try the Simulator
                </button>
              </div>
              <button
                onClick={() => router.push("plans")}
                className="w-full px-0 py-3.5 rounded-xl border border-slate-300 -mt-4 dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm dark:hover:bg-slate-800 transition-all cursor-pointer"
                id="hero-secondary-cta"
              >
                View Plans
              </button>
            </div>

            {/* HERO RIGHT COLUMN: HIGH FIDELITY DASHBOARD MOCKUP */}

            <div className="lg:col-span-6 h-full" id="hero-dashboard-mockup">
            <HeroGraphics />
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero