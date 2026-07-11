"use client";

import { Send, Users } from 'lucide-react'
import React from 'react'
import HeroGraphics from './HeroGraphics'
import { useRouter } from 'next/navigation'
import HeroInfo from './HeroInfo';

function Hero() {
    const router = useRouter()
  return (
          <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-24 pb-12">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* HERO LEFT COLUMN */}
            <HeroInfo />

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