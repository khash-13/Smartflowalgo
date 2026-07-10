import { BookOpen, Layers, Send, ShieldAlert, Sliders, TrendingUp } from 'lucide-react'
import React from 'react'

function Featured() {
  return (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                  Engineered For Process-Oriented Traders
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                  Move away from random, emotional trading and build a
                  structured, rule-based approach focused on risk management and
                  statistical probabilities.
                </p>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                id="home-feature-grid"
              >
                {/* Card 1 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Gold, BTC & Forex Focus
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Follow educational market breakdowns across Gold, Bitcoin,
                    and major Forex pairs.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Send className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Free Telegram Setups
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Join the active Telegram community for free setup ideas,
                    market notes, risk reminders, and trading education.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Risk-First Analysis
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Every setup should begin with invalidation, position sizing,
                    reward-to-risk thinking, and disciplined planning.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Educational Indicators
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Use clean indicator concepts to understand trend, momentum,
                    volatility, volume, and market flow.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Sliders className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Practical Algo Simulator
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Test rule-based ideas using demo data, adjust risk settings,
                    compare strategies, and review trade logs.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Study Material
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Access checklists, worksheets, market structure guides, and
                    strategy planning resources.
                  </p>
                </div>
              </div>
            </section>
  )
}

export default Featured