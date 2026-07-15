"use client"

import React from "react";
import { Send, Users, ShieldAlert, Sparkles } from "lucide-react";
import { getToken } from "@/lib/plan-token";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TelegramCTAProps {
  id?: string;
  variant?: "hero" | "banner" | "footer";
}

export default function TelegramCTA({ id = "telegram-cta", variant = "banner" }: TelegramCTAProps) {
  const router = useRouter()

  if (variant === "hero") {
    return (
      <div id={id} className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 md:p-8 shadow-xl border border-blue-500/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-20 -mt-20"></div>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-100 border border-blue-400/20 mb-3 animate-pulse">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              <span>Free Telegram Access for First 200 Users</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Join the Smartflow Telegram Community
            </h3>
            <p className="mt-2 text-blue-100 text-sm leading-relaxed">
              Receive free educational setups, real-time market breakdowns for Gold, Bitcoin, and major Forex pairs, indicator signals, and disciplined risk-management updates directly to your feed.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href={"https://t.me/smartflowalgo"}
              target="_blank"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-700 font-bold hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md cursor-pointer text-sm"
              id="tg-hero-join-btn"
            >
              <Send className="h-4 w-4" />
              Join Free Telegram
            </Link>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 flex items-start gap-2 text-xs text-blue-200">
          <ShieldAlert className="h-4 w-4 text-blue-300 shrink-0 mt-0.5" />
          <span>
            <strong>Educational Disclaimer:</strong> Telegram setups represent subjective market analysis and educational ideas only. They do not constitute financial advice, broker execution, or guaranteed trading outcomes.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div id={id} className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-emerald-500/25 bg-slate-50 dark:bg-gradient-to-br dark:from-[#050B1D] dark:to-[#0A1020] p-6 md:p-10 shadow-lg">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl"></div>
      
      <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 mb-4 animate-bounce">
          <Users className="h-3.5 w-3.5" />
          <span>Launch Offer: First 200 members get 100% Free Lifetime Access</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">
          Join the Smartflow Telegram Community
        </h3>
        
        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          Get free setups, Gold/BTC/Forex market analysis, indicator updates, risk management notes, and community learning discussions. The first 200 users can join free during the launch phase.
        </p>
        
        <div className="mt-6 flex flex-col items-center gap-4">
          <Link
                        href={"https://t.me/smartflowalgo"}
              target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-emerald-600 dark:to-emerald-500 text-white font-bold hover:from-blue-700 hover:to-indigo-700 dark:hover:from-emerald-500 dark:hover:to-emerald-400 shadow-md hover:shadow-lg dark:shadow-emerald-500/20 transition-all scale-100 hover:scale-105 active:scale-95 duration-150 cursor-pointer text-sm uppercase tracking-wider animate-pulse-subtle"
            id="tg-join-free-btn"
          >
            <Send className="h-4 w-4" />
            Join Free Telegram Group
          </Link>
          <span className="text-xs text-slate-500 dark:text-slate-500">
            No credit card or registration required. Fully free.
          </span>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 w-full flex items-start gap-2.5 text-left text-xs text-slate-500 dark:text-slate-400">
          <ShieldAlert className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>Risk Disclaimer:</strong> Telegram posts are for educational analysis only. They are not financial advice or guaranteed trade recommendations. Trading Gold, crypto, and Forex involves significant risk.
          </span>
        </div>
      </div>
    </div>
  );
}
