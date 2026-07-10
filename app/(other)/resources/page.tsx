"use client";

import { freeResources } from '@/data/resources';
import { CheckCircle, Download } from 'lucide-react';
import React from 'react'

function page() {
  return (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 text-left">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Free trading resources for smarter preparation
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Download practical worksheets and checklists to help plan Gold,
                BTC, and Forex setups with better structure and risk awareness.
              </p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              id="resources-grid"
            >
              {freeResources.map((res) => {
                // Color coding mapping based on resource type / ID
                const colors = (() => {
                  switch (res.id) {
                    case "gold-setup-checklist":
                      return {
                        button:
                          "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-200 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/20",
                        checkIcon: "text-amber-500 dark:text-amber-400",
                      };
                    case "btc-volatility-planner":
                      return {
                        button:
                          "bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-200 dark:bg-orange-500/10 dark:hover:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/20",
                        checkIcon: "text-orange-500 dark:text-orange-400",
                      };
                    case "forex-session-planner":
                      return {
                        button:
                          "bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-200 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/20",
                        checkIcon: "text-emerald-500 dark:text-emerald-400",
                      };
                    case "risk-calculator-template":
                      return {
                        button:
                          "bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-200 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/20",
                        checkIcon: "text-rose-500 dark:text-rose-400",
                      };
                    case "trading-journal-sheet":
                      return {
                        button:
                          "bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-200 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/20",
                        checkIcon: "text-blue-500 dark:text-blue-400",
                      };
                    case "indicator-basics-guide":
                      return {
                        button:
                          "bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-200 dark:bg-purple-500/10 dark:hover:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/20",
                        checkIcon: "text-purple-500 dark:text-purple-400",
                      };
                    default:
                      return {
                        button:
                          "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-800",
                        checkIcon: "text-emerald-500",
                      };
                  }
                })();

                return (
                  <div
                    key={res.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6  -xs flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {res.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        {res.description}
                      </p>

                      <ul className="mt-4 space-y-2 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-gray-200 dark:border-slate-800">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          What is covered:
                        </span>
                        {res.details.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle
                              className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${colors.checkIcon}`}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase text-slate-400">
                        PDF Checklist
                      </span>
                      <button
                        onClick={() =>
                          alert(
                            `Your educational resource "${res.title}" is ready! We will initiate download of the PDF structure template.`,
                          )
                        }
                        className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg font-bold text-xs cursor-pointer border ${colors.button}`}
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download Free Guide
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
  )
}

export default page