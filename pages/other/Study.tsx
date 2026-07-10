"use client"

import { studyModules } from "@/data/study";
import { ArrowRight } from "lucide-react";
import React from "react";

function Study() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 text-left">
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Study material for Gold, BTC, Forex, and rule-based traders
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Access guides and playbooks to build rigorous discipline and process
          before risking live capital.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        id="study-material-grid"
      >
        {studyModules.map((mod) => (
          <div
            key={mod.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {mod.title}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    mod.difficulty === "Beginner"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      : mod.difficulty === "Intermediate"
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                        : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                  }`}
                >
                  {mod.difficulty}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {mod.description}
              </p>

              <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-gray-200 dark:border-slate-800 rounded-xl space-y-3 text-[11px]">
                <div>
                  <span className="font-bold text-slate-400 block uppercase text-[9px] tracking-wider mb-2">
                    Core learning topics:
                  </span>
                  <ul className="space-y-1.5 pl-4 list-decimal text-slate-600 dark:text-slate-300">
                    {mod.topics.map((topic, tIdx) => (
                      <li key={tIdx}>{topic}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-slate-800/60 text-[10px] italic text-slate-500">
                  <strong>Key Lesson:</strong> {mod.keyConcept}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <span className="text-[10px] text-slate-400 uppercase font-mono">
                Module {mod.id.toUpperCase()}
              </span>
              <button
                onClick={() =>
                  alert(
                    `Starting Module: "${mod.title}"! Educational sheets loaded.`,
                  )
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                <span>Study Module Sheets</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Study;
