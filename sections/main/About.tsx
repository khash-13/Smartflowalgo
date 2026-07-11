import React from "react";

function About() {
  const val = [
    {
      val: "Risk before reward",
      desc: "Never place a trade without identifying the exact invalidation level and position sizing.",
    },
    {
      val: "Process before prediction",
      desc: "The market cannot be predicted with 100% accuracy; focus strictly on rule-bound replication.",
    },
    {
      val: "Practice before capital",
      desc: "Thoroughly backtest all setups on synthetic or user data inside our demo sandbox first.",
    },
    {
      val: "Clarity before complexity",
      desc: "Clean chart setups with simple oscillators are infinitely more powerful than cluttered visual noise.",
    },
    {
      val: "Education before hype",
      desc: "No false claims of guaranteed wealth. Trading involves substantial risk of loss.",
    },
    {
      val: "Community before isolation",
      desc: "Connect with like-minded technical researchers inside our Telegram to analyze together.",
    },
  ];
  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 text-left"
      id="about-us-view"
    >
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Helping traders follow market flow with structure and discipline
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Learn about the team, mission, and compliance philosophy behind
          Smartflow Trading.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs leading-relaxed text-slate-600 dark:text-slate-300">
        <p>
          <strong>SMARTFLOWALGO by Smartflow Trading</strong> is an
          education-first trading platform focused on Gold, BTC, and Forex
          market analysis, signal-style learning, indicators, and practical
          simulation. Our goal is to help traders move away from random entries
          and build a clearer process around market structure, risk, and review.
        </p>

        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
            Our Mission
          </h3>
          <p>
            To make trading education more practical, structured, and risk-aware
            through market-flow analysis, community learning, indicators, and
            simulation.
          </p>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {val.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-gray-200 dark:border-slate-800"
              >
                <strong className="text-slate-900 dark:text-white block text-xs font-bold">
                  {item.val}
                </strong>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
