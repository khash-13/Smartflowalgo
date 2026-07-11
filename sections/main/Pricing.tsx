"use client"

import PricingCards from '@/components/PricingCards';
import { plans } from '@/data/plans';
import { Award } from 'lucide-react'
import React, { useState } from 'react'
function Pricing() {
      const [currency, setCurrency] = useState<"USD" | "GBP" | "INR">("USD");


      const handleSelectPlan = (planId: string) => {
        const foundPlan = plans.find((p) => p.id === planId);
        if (foundPlan) {
          if (planId === "free-telegram") {
            window.open("https://t.me/smartflowalgo", "_blank");
          } 
        //   else {
        //     alert(
        //       `Excellent choice! You've selected the "${foundPlan.name}" plan. We will now take you to the account creation Pricing to activate your 7-Day Free Trial.`,
        //     );
        //     changePage("register");
        //   }
        } 
        // else {
        //   changePage("register");
        // }
      };
  return (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                <Award className="h-3.5 w-3.5 text-blue-500" />
                <span>Transparent Subscription Paths</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Subscription Plans & Structured Material
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Gain educational market breakdowns, custom indicator tools,
                backtest worksheets, and live strategy templates.
              </p>
            </div>

            <PricingCards
              selectedCurrency={currency}
              onCurrencyChange={setCurrency}
              onSelectPlan={handleSelectPlan}
            />
          </section>
  )
}

export default Pricing