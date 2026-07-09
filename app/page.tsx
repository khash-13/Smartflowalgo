"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  TrendingUp,
  BarChart2,
  BookOpen,
  Sliders,
  ShieldAlert,
  ArrowRight,
  CheckCircle,
  Award,
  Users,
  Layers,
  Heart,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  FileText,
  Badge,
  Sparkles,
  Lock,
  Mail,
  Phone,
  User,
  Clock,
  HelpCircle,
  Download
} from "lucide-react";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import TelegramCTA from "../components/TelegramCTA";
import PricingCards from "../components/PricingCards";
import Simulator from "../components/Simulator/Simulator";

// Data
import { blogPosts, BlogPost } from "../data/blogs";
import { freeResources } from "../data/resources";
import { indicatorsData } from "../data/indicators";
import { studyModules } from "../data/study";
import { plans } from "../data/plans";

export default function Page() {
  // 1. Core Global State
  const [activePage, setActivePage] = useState<string>("home");
  const [currency, setCurrency] = useState<"USD" | "GBP" | "INR">("USD");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedBlogId, setSelectedBlogId] = useState<string>("gold-trading-setup");

  // Hero Section Tabs (Gold, BTC, Forex)
  const [heroTab, setHeroTab] = useState<"gold" | "btc" | "forex">("gold");

  // Blog Category Filter
  const [blogFilter, setBlogFilter] = useState<string>("All");

  // Forms states
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", topic: "Telegram Group", message: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginSubmitted, setLoginSubmitted] = useState(false);
  
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", experience: "Beginner", interest: "Gold", currency: "USD" });
  const [registerSubmitted, setRegisterSubmitted] = useState(false);

  // 2. Sync Active Page State with URL search params/hashes for true Deep-Linking
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get("page");
      if (pageParam) {
        setActivePage(pageParam);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const hash = window.location.hash.replace("#", "");
        if (hash) {
          setActivePage(hash);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    // Run on initial mount
    handleUrlChange();

    // Listen to popstate changes
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const changePage = (pageName: string) => {
    setActivePage(pageName);
    
    // Update browser history with query parameters so reloading keeps the page!
    const newUrl = `${window.location.pathname}?page=${pageName}`;
    window.history.pushState({ page: pageName }, "", newUrl);
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper for plan selection: alerts about 7-day free trial and redirects to account registration
  const handleSelectPlan = (planId: string) => {
    const foundPlan = plans.find(p => p.id === planId);
    if (foundPlan) {
      if (planId === "free-telegram") {
        window.open("https://t.me/smartflowalgo", "_blank");
      } else {
        alert(`Excellent choice! You've selected the "${foundPlan.name}" plan. We will now take you to the account creation page to activate your 7-Day Free Trial.`);
        changePage("register");
      }
    } else {
      changePage("register");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-200 font-sans flex flex-col transition-colors selection:bg-emerald-500/30 selection:text-emerald-500">
      
      {/* GLOBAL BANNER */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-800 text-white py-2 text-center text-xs font-semibold px-4 flex items-center justify-center gap-2 select-none">
        <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse shrink-0" />
        <span>LAUNCH BONUS: Free Premium Telegram Community access for the first 200 members! Only a few seats remaining.</span>
        <a href="https://t.me/smartflowalgo" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-yellow-100 transition-colors shrink-0">
          Claim Now &rarr;
        </a>
      </div>

      {/* HEADER */}
      <Header activePage={activePage} onPageChange={changePage} onThemeChange={setTheme} />

      {/* SUB-HEADER (STATUS / RATES TICKER) */}
      <div className="hidden dark:flex items-center justify-between px-6 py-2 bg-black/40 text-[10px] border-b border-slate-800 uppercase tracking-widest font-mono text-slate-400">
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide py-0.5">
          <span className="flex items-center gap-1.5 font-bold text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            MARKET FLOW: <span className="text-emerald-500">ACTIVE</span>
          </span>
          <span className="text-slate-800">|</span>
          <span>GOLD: <span className="text-emerald-400 font-bold">$2,034.40 (+0.24%)</span></span>
          <span className="text-slate-800">|</span>
          <span>BTC: <span className="text-rose-400 font-bold">$67,412.10 (-0.12%)</span></span>
          <span className="text-slate-800">|</span>
          <span>EUR/USD: <span className="text-emerald-400 font-bold">1.0845 (+0.05%)</span></span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-slate-500 font-mono text-[9px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>LIVE SIGNAL FEED ACTIVE</span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-grow">
        
        {/* VIEW ROUTER */}
        {activePage === "home" && (
          <div className="space-y-20 pb-20">
            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-24 pb-12">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                  
                  {/* HERO LEFT COLUMN */}
                  <div className="lg:col-span-5 space-y-6 text-left">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40 animate-pulse">
                      <Users className="h-3.5 w-3.5" />
                      <span>Free Telegram access for the first 200 users</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1]">
                      Trade Smarter With <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500">
                        Gold, BTC & Forex
                      </span> <br />
                      Market Flow
                    </h1>

                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                      SMARTFLOWALGO helps traders learn market structure, follow educational signal ideas, study risk-managed setups, use indicators, and practice strategies through a professional demo simulator.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                      <a
                        href="https://t.me/smartflowalgo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all scale-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        id="hero-primary-cta"
                      >
                        <Send className="h-4 w-4" />
                        Join Free Telegram
                      </a>

                      <button
                        onClick={() => changePage("simulator")}
                        className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-850 shadow-xs transition-all cursor-pointer"
                        id="hero-secondary-cta"
                      >
                        Try the Simulator
                      </button>

                      <button
                        onClick={() => changePage("plans")}
                        className="px-4 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 font-semibold hover:text-slate-800 dark:hover:text-white text-xs hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
                        id="hero-third-cta"
                      >
                        View Plans
                      </button>
                    </div>
                  </div>

                  {/* HERO RIGHT COLUMN: HIGH FIDELITY DASHBOARD MOCKUP */}
                  <div className="lg:col-span-7" id="hero-dashboard-mockup">
                    <div className="bg-slate-950 rounded-2xl border border-slate-850 p-4 md:p-6 shadow-2xl relative overflow-hidden text-left">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                      
                      {/* Dashboard Header Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-850">
                        <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
                          {["gold", "btc", "forex"].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setHeroTab(tab as any)}
                              className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                heroTab === tab
                                  ? "bg-slate-800 text-white border border-slate-700/50"
                                  : "text-slate-500 hover:text-slate-300"
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>

                        {/* Status alert box */}
                        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md text-[10px] font-bold border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                          <span>SIGNAL COMPASS: BULL ALIGNED</span>
                        </div>
                      </div>

                      {/* Mock Chart & Panel */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        
                        {/* Candlestick & markers */}
                        <div className="md:col-span-2 space-y-3">
                          <div className="h-44 bg-slate-900/40 rounded-xl p-3 border border-slate-850 flex flex-col justify-between relative">
                            {/* Lines/Grid */}
                            <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-10 pointer-events-none">
                              <hr className="border-slate-400 border-dashed" />
                              <hr className="border-slate-400 border-dashed" />
                              <hr className="border-slate-400 border-dashed" />
                            </div>

                            <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono z-10">
                              <span>{heroTab === "gold" ? "XAU/USD 1H" : heroTab === "btc" ? "BTC/USD 4H" : "EUR/USD 15m"}</span>
                              <span className="text-emerald-500 font-bold">{heroTab === "gold" ? "2,320.50 (+1.2%)" : heroTab === "btc" ? "64,500 (+2.4%)" : "1.08520 (+0.4%)"}</span>
                            </div>

                            {/* Replicated visual candlesticks with wicks */}
                            <div className="flex items-end justify-between h-24 px-4 relative">
                              {/* Candle 1 */}
                              <div className="flex flex-col items-center flex-1">
                                <div className="w-[1.5px] h-14 bg-rose-500"></div>
                                <div className="w-3 h-8 bg-rose-500 rounded-xs mt-[-11px]"></div>
                              </div>
                              {/* Candle 2 */}
                              <div className="flex flex-col items-center flex-1">
                                <div className="w-[1.5px] h-12 bg-emerald-500"></div>
                                <div className="w-3 h-6 bg-emerald-500 rounded-xs mt-[-9px]"></div>
                              </div>
                              {/* Candle 3 (Breakout) */}
                              <div className="flex flex-col items-center flex-1 relative">
                                <div className="w-[1.5px] h-16 bg-emerald-500"></div>
                                <div className="w-3 h-10 bg-emerald-500 rounded-xs mt-[-13px]"></div>
                                {/* Buy Flag */}
                                <span className="absolute bottom-full mb-1 text-[8px] font-extrabold bg-emerald-500 text-black px-1 rounded">BUY</span>
                              </div>
                              {/* Candle 4 (Target Run) */}
                              <div className="flex flex-col items-center flex-1">
                                <div className="w-[1.5px] h-10 bg-emerald-500"></div>
                                <div className="w-3 h-5 bg-emerald-500 rounded-xs mt-[-7px]"></div>
                              </div>
                            </div>

                            {/* Risk to Reward overlay box representation */}
                            <div className="absolute bottom-8 right-6 bg-emerald-500/10 border border-dashed border-emerald-500/40 p-2 rounded text-[8px] font-mono leading-tight">
                              <div>Entry: {heroTab === "gold" ? "$2,305" : heroTab === "btc" ? "$63,800" : "$1.0820"}</div>
                              <div className="text-emerald-400 font-bold">Target: {heroTab === "gold" ? "$2,345" : heroTab === "btc" ? "$66,200" : "$1.0890"}</div>
                              <div className="text-rose-400 font-bold">Stop: {heroTab === "gold" ? "$2,290" : heroTab === "btc" ? "$62,900" : "$1.0790"}</div>
                            </div>
                          </div>

                          {/* Telegram Alert Preview */}
                          <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-3 flex items-start gap-3">
                            <Send className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider leading-none">Smartflow Alert Preview</div>
                              <p className="text-[10px] text-slate-300 font-mono mt-1.5 leading-snug">
                                {heroTab === "gold" 
                                  ? "🚨 GOLD BREAKOUT: Re-testing daily demand block at $2,320. Volatility index is high. Keep position size locked at 1.0% max."
                                  : "🚨 BTC LIQUIDITY RUN: Swept longs near $64k. Bull divergence forming on the 4H RSI. Watch for closed candle trigger."
                                }
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Sidebar: Equity curve, settings panel */}
                        <div className="space-y-3">
                          {/* Indicators Panel */}
                          <div className="bg-slate-900/60 border border-slate-850 rounded-xl p-3 text-xs space-y-2.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">System Panel</span>
                            
                            <div className="space-y-1.5 font-mono text-[10px]">
                              <div className="flex justify-between">
                                <span className="text-slate-500">FAST EMA:</span>
                                <span className="text-emerald-400 font-bold">20 Period</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">SLOW EMA:</span>
                                <span className="text-indigo-400 font-bold">50 Period</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">ATR VOL:</span>
                                <span className="text-purple-400 font-bold">14 Bar</span>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-800">
                              <span className="text-[9px] text-slate-500 uppercase block mb-1">Signal Risk Meter</span>
                              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[80%]"></div>
                              </div>
                              <div className="flex justify-between text-[8px] text-slate-500 mt-1">
                                <span>Low Risk</span>
                                <span className="text-emerald-400 font-bold">80% Conf</span>
                              </div>
                            </div>
                          </div>

                          {/* Equity curve */}
                          <div className="bg-slate-900/60 border border-slate-850 rounded-xl p-3 text-xs space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Simulated Equity</span>
                            <div className="h-10 bg-slate-950/40 rounded flex items-end px-2 pb-1 relative overflow-hidden">
                              <svg width="100%" height="100%" className="overflow-visible opacity-80">
                                <path d="M0 30 Q20 20 40 25 T80 10 T120 5" fill="none" stroke="#10B981" strokeWidth="2" />
                              </svg>
                              <span className="absolute top-1 right-2 text-[9px] text-emerald-400 font-bold font-mono">+$1,450.00</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* TRUST STRIP */}
            <section className="bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-900 py-6 overflow-hidden select-none">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center items-center gap-y-4 gap-x-12 text-center text-xs font-bold text-slate-400 uppercase tracking-widest" id="trust-strip">
                  <span>Gold Signals</span>
                  <span className="text-slate-200 dark:text-slate-800">•</span>
                  <span>BTC Signals</span>
                  <span className="text-slate-200 dark:text-slate-800">•</span>
                  <span>Forex Signals</span>
                  <span className="text-slate-200 dark:text-slate-800">•</span>
                  <span>Free Setups</span>
                  <span className="text-slate-200 dark:text-slate-800">•</span>
                  <span>Market Analysis</span>
                  <span className="text-slate-200 dark:text-slate-800">•</span>
                  <span>Risk Management</span>
                  <span className="text-slate-200 dark:text-slate-800">•</span>
                  <span>Telegram Community</span>
                </div>
              </div>
            </section>

            {/* FEATURE CARDS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                  Engineered For Process-Oriented Traders
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                  Move away from random, emotional trading and build a structured, rule-based approach focused on risk management and statistical probabilities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="home-feature-grid">
                
                {/* Card 1 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Gold, BTC & Forex Focus</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Follow educational market breakdowns across Gold, Bitcoin, and major Forex pairs.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Send className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Free Telegram Setups</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Join the active Telegram community for free setup ideas, market notes, risk reminders, and trading education.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Risk-First Analysis</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Every setup should begin with invalidation, position sizing, reward-to-risk thinking, and disciplined planning.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Layers className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Educational Indicators</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Use clean indicator concepts to understand trend, momentum, volatility, volume, and market flow.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Sliders className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Practical Algo Simulator</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Test rule-based ideas using demo data, adjust risk settings, compare strategies, and review trade logs.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-200">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Study Material</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Access checklists, worksheets, market structure guides, and strategy planning resources.
                  </p>
                </div>

              </div>
            </section>

            {/* PRICING PLANS SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 border-t border-slate-200 dark:border-slate-900 pt-16">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                  <Award className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
                  <span>Transparent Subscription Paths & 7-Day Free Trial</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                  Subscription Plans & Structured Material
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                  Gain educational market breakdowns, custom indicator tools, backtest worksheets, and live strategy templates. Try any paid plan risk-free with a <span className="text-blue-600 dark:text-emerald-400 font-bold">7-day free trial</span>!
                </p>
              </div>

              <PricingCards
                selectedCurrency={currency}
                onCurrencyChange={setCurrency}
                onSelectPlan={handleSelectPlan}
              />
            </section>

            {/* TELEGRAM SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <TelegramCTA variant="banner" />
            </section>

          </div>
        )}

        {activePage === "plans" && (
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
                Gain educational market breakdowns, custom indicator tools, backtest worksheets, and live strategy templates.
              </p>
            </div>

            <PricingCards
              selectedCurrency={currency}
              onCurrencyChange={setCurrency}
              onSelectPlan={handleSelectPlan}
            />
          </section>
        )}

        {activePage === "resources" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 text-left">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Free trading resources for smarter preparation
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Download practical worksheets and checklists to help plan Gold, BTC, and Forex setups with better structure and risk awareness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="resources-grid">
              {freeResources.map((res) => {
                // Color coding mapping based on resource type / ID
                const colors = (() => {
                  switch (res.id) {
                    case "gold-setup-checklist":
                      return {
                        button: "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-200 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/20",
                        checkIcon: "text-amber-500 dark:text-amber-400"
                      };
                    case "btc-volatility-planner":
                      return {
                        button: "bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-200 dark:bg-orange-500/10 dark:hover:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/20",
                        checkIcon: "text-orange-500 dark:text-orange-400"
                      };
                    case "forex-session-planner":
                      return {
                        button: "bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-200 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/20",
                        checkIcon: "text-emerald-500 dark:text-emerald-400"
                      };
                    case "risk-calculator-template":
                      return {
                        button: "bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-200 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/20",
                        checkIcon: "text-rose-500 dark:text-rose-400"
                      };
                    case "trading-journal-sheet":
                      return {
                        button: "bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-200 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/20",
                        checkIcon: "text-blue-500 dark:text-blue-400"
                      };
                    case "indicator-basics-guide":
                      return {
                        button: "bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-200 dark:bg-purple-500/10 dark:hover:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/20",
                        checkIcon: "text-purple-500 dark:text-purple-400"
                      };
                    default:
                      return {
                        button: "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-800",
                        checkIcon: "text-emerald-500"
                      };
                  }
                })();

                return (
                  <div key={res.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{res.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{res.description}</p>
                      
                      <ul className="mt-4 space-y-2 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-150 dark:border-slate-850">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">What is covered:</span>
                        {res.details.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${colors.checkIcon}`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase text-slate-400">PDF Checklist</span>
                      <button
                        onClick={() => alert(`Your educational resource "${res.title}" is ready! We will initiate download of the PDF structure template.`)}
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
        )}

        {activePage === "blogs" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 text-left">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Smartflow Trading Education Hub
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Practical, compliance-aware insights surrounding systematic analysis, indicators, and drawdown boundaries.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2" id="blog-category-filters">
              {["All", "Gold", "BTC", "Forex", "Education", "Risk Management", "Algo Trading"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setBlogFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    blogFilter === cat
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="blogs-grid">
              {blogPosts
                .filter(post => blogFilter === "All" || post.category === blogFilter)
                .map((post) => (
                  <article
                    key={post.id}
                    onClick={() => {
                      setSelectedBlogId(post.id);
                      changePage("blog-detail");
                    }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:translate-y-[-3px] transition-all duration-150 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-3">
                        <span>{post.category}</span>
                        <span className="text-slate-400">{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight leading-snug hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3">
                        {post.metaDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center text-xs font-bold text-blue-500 dark:text-blue-400 hover:gap-1.5 transition-all">
                      <span>Read Article</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </article>
                ))}
            </div>
          </section>
        )}

        {activePage === "blog-detail" && (() => {
          const post = blogPosts.find(p => p.id === selectedBlogId) || blogPosts[0];
          return (
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8 text-left" id="blog-detail-view">
              <button
                onClick={() => changePage("blogs")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                id="blog-back-btn"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to all articles
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                  {post.title}
                </h1>

                <p className="text-slate-500 dark:text-slate-400 italic text-xs">
                  <strong>Meta:</strong> {post.metaDescription}
                </p>
              </div>

              {/* Table of contents */}
              <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 md:p-5">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Table of Contents</span>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {post.tableOfContents.map((toc, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">0{idx+1}.</span>
                      <span className="hover:text-blue-500 transition-colors">{toc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Article Body */}
              <div className="prose dark:prose-invert prose-slate max-w-none text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed space-y-6">
                {post.body.split("\n\n").map((para, pIdx) => {
                  if (para.startsWith("###")) {
                    return <h3 key={pIdx} className="text-base font-bold text-slate-900 dark:text-white pt-3">{para.replace("### ", "")}</h3>;
                  }
                  if (para.startsWith("1.") || para.startsWith("-")) {
                    return (
                      <ul key={pIdx} className="list-disc pl-5 space-y-1 font-sans text-xs">
                        {para.split("\n").map((li, lIdx) => (
                          <li key={lIdx}>{li.replace(/^[\s\d.-]+/, "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={pIdx}>{para}</p>;
                })}
              </div>

              {/* Key Takeaways */}
              <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-blue-800 dark:text-blue-400 flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4" />
                  Educational Key Takeaways
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {post.takeaways.map((takeaway, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 bg-blue-500 rounded-full shrink-0 mt-2"></span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Related Posts */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-12 space-y-4">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Related Educational Reads</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.relatedPosts.map((id) => {
                    const rPost = blogPosts.find(p => p.id === id);
                    if (!rPost) return null;
                    return (
                      <div
                        key={rPost.id}
                        onClick={() => setSelectedBlogId(rPost.id)}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 bg-white dark:bg-slate-900/40 hover:bg-slate-50 cursor-pointer transition-all"
                      >
                        <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest block">{rPost.category}</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white line-clamp-1 mt-1">{rPost.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Regulatory Notice */}
              <div className="p-4 bg-slate-150 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-500 flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Compliance reminder:</strong> This article is presented strictly for educational purposes and should not be construed as investment recommendations or financial advice. SMARTFLOWALGO is an educational trading platform.
                </span>
              </div>

              {/* CTA */}
              <TelegramCTA variant="banner" />
            </section>
          );
        })()}

        {activePage === "indicators" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 text-left">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Free indicators for cleaner market-flow analysis
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                SMARTFLOWALGO indicators are designed to support education around Gold, BTC, and Forex market structure, momentum, volatility, and risk zones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="indicators-info-grid">
              {indicatorsData.map((ind) => (
                <div key={ind.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{ind.name}</h3>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-bold font-mono">CODE FREE</span>
                    </div>
                    
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ind.description}</p>
                    
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2 text-[11px]">
                      <div>
                        <span className="font-bold text-slate-400 uppercase block text-[9px] tracking-wider">How It Works:</span>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">{ind.howItWorks}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-150 dark:border-slate-850/60">
                        <span className="font-bold text-slate-400 uppercase block text-[9px] tracking-wider">Inputs Settings:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {ind.settings.map((set, idx) => (
                            <span key={idx} className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded text-[10px] text-slate-500 border border-slate-200 dark:border-slate-800">{set}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Formula Basis:</span>
                    <span className="text-slate-500 dark:text-slate-400 font-semibold truncate max-w-[150px]">{ind.formulaBasis}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === "study" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 text-left">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Study material for Gold, BTC, Forex, and rule-based traders
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Access guides and playbooks to build rigorous discipline and process before risking live capital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="study-material-grid">
              {studyModules.map((mod) => (
                <div key={mod.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{mod.title}</h3>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        mod.difficulty === "Beginner"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : mod.difficulty === "Intermediate"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                          : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                      }`}>
                        {mod.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400">{mod.description}</p>

                    <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-150 dark:border-slate-850 rounded-xl space-y-3 text-[11px]">
                      <div>
                        <span className="font-bold text-slate-400 block uppercase text-[9px] tracking-wider mb-2">Core learning topics:</span>
                        <ul className="space-y-1.5 pl-4 list-decimal text-slate-600 dark:text-slate-300">
                          {mod.topics.map((topic, tIdx) => (
                            <li key={tIdx}>{topic}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-slate-150 dark:border-slate-850/60 text-[10px] italic text-slate-500">
                        <strong>Key Lesson:</strong> {mod.keyConcept}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Module {mod.id.toUpperCase()}</span>
                    <button
                      onClick={() => alert(`Starting Module: "${mod.title}"! Educational sheets loaded.`)}
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
        )}

        {activePage === "simulator" && (
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
                Test systematic crossover, reversion, breakout or swing retest algorithms on sample historical sequences with zero capital risk.
              </p>
            </div>

            <Simulator />
          </section>
        )}

        {activePage === "about" && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 text-left" id="about-us-view">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Helping traders follow market flow with structure and discipline
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Learn about the team, mission, and compliance philosophy behind Smartflow Trading.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                <strong>SMARTFLOWALGO by Smartflow Trading</strong> is an education-first trading platform focused on Gold, BTC, and Forex market analysis, signal-style learning, indicators, and practical simulation. Our goal is to help traders move away from random entries and build a clearer process around market structure, risk, and review.
              </p>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Our Mission</h3>
                <p>
                  To make trading education more practical, structured, and risk-aware through market-flow analysis, community learning, indicators, and simulation.
                </p>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Our Core Values</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { val: "Risk before reward", desc: "Never place a trade without identifying the exact invalidation level and position sizing." },
                    { val: "Process before prediction", desc: "The market cannot be predicted with 100% accuracy; focus strictly on rule-bound replication." },
                    { val: "Practice before capital", desc: "Thoroughly backtest all setups on synthetic or user data inside our demo sandbox first." },
                    { val: "Clarity before complexity", desc: "Clean chart setups with simple oscillators are infinitely more powerful than cluttered visual noise." },
                    { val: "Education before hype", desc: "No false claims of guaranteed wealth. Trading involves substantial risk of loss." },
                    { val: "Community before isolation", desc: "Connect with like-minded technical researchers inside our Telegram to analyze together." }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850">
                      <strong className="text-slate-900 dark:text-white block text-xs font-bold">{item.val}</strong>
                      <span className="text-[11px] text-slate-500 mt-1 block">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === "contact" && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 text-left" id="contact-view">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Contact Support Desk
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Have questions regarding plans, indicators, simulator parameters or Telegram access? We are here to support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Form column */}
              <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                {contactSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto animate-bounce" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Message Logged Successfully</h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                      Thank you for contacting SMARTFLOWALGO support. An educational representative will respond within our support hours.
                    </p>
                    <button
                      onClick={() => setContactSubmitted(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-lg"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSubmitted(true);
                    }}
                    className="space-y-4 text-xs"
                    id="contact-submit-form"
                  >
                    <div>
                      <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Your Email</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Phone/WhatsApp (Optional)</label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="+00 00000 00000"
                          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Topic Of Inquiry</label>
                      <select
                        value={contactForm.topic}
                        onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-slate-200 focus:outline-none font-medium"
                      >
                        <option value="Telegram Group">Join Telegram Group Access</option>
                        <option value="Plans">Pricing & Subscription Plans</option>
                        <option value="Indicators">Educational Trend & Volatility Indicators</option>
                        <option value="Simulator">Strategy Backtest Simulator Node</option>
                        <option value="Gold Signals">Gold Signal Technical Breakdowns</option>
                        <option value="BTC Signals">BTC Signal Volatility Modules</option>
                        <option value="Forex Signals">Forex Session Signal Sets</option>
                        <option value="Support">General Technical Support</option>
                        <option value="Partnership">Educational Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Your Message</label>
                      <textarea
                        required
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Write down details of your query..."
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md cursor-pointer"
                    >
                      Submit Ticket
                    </button>
                  </form>
                )}
              </div>

              {/* Details column */}
              <div className="md:col-span-5 space-y-6 text-xs">
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Direct Social Contact</h3>
                  
                  <ul className="space-y-3.5">
                    <li className="flex items-center gap-3">
                      <Send className="h-5 w-5 text-blue-500 shrink-0" />
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase font-semibold">Telegram Group</span>
                        <a href="https://t.me/smartflowalgo" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 dark:text-white hover:underline">
                          t.me/smartflowalgo
                        </a>
                      </div>
                    </li>

                    <li className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-indigo-500 shrink-0" />
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase font-semibold">Email Desk</span>
                        <a href="mailto:support@smartflowalgo.com" className="font-bold text-slate-800 dark:text-white hover:underline">
                          support@smartflowalgo.com
                        </a>
                      </div>
                    </li>

                    <li className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase font-semibold">Phone/WhatsApp Support</span>
                        <span className="font-bold text-slate-800 dark:text-white">+00 00000 00000</span>
                      </div>
                    </li>

                    <li className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-amber-500 shrink-0" />
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase font-semibold">Support Hours</span>
                        <span className="font-bold text-slate-800 dark:text-white">Monday to Friday, 10:00 - 18:00</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl text-[11px] text-slate-500 flex items-start gap-2 leading-relaxed">
                  <ShieldAlert className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Please Note:</strong> Our desk coordinates educational programs, plans, and indicators. We are strictly prohibited from giving individual stock tips, trading guidance, or handling real capital trading accounts.
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === "login" && (
          <section className="max-w-md mx-auto px-4 py-16 md:py-24 text-left" id="login-view">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-md space-y-6">
              <div className="text-center space-y-1.5">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">Welcome back to SMARTFLOWALGO</h2>
                <p className="text-xs text-slate-500">Sign in to resume trading worksheets and simulator parameters</p>
              </div>

              {loginSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Login Process Initiated</h3>
                  <p className="text-[11px] text-slate-500 leading-normal max-w-xs mx-auto">
                    Account dashboard loaded in demo context. Session initialized.
                  </p>
                  <button
                    onClick={() => changePage("simulator")}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow"
                  >
                    Proceed to Simulator Sandbox
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoginSubmitted(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow transition-all cursor-pointer"
                  >
                    Sign In
                  </button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold">OR</span>
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert("Google Single Sign-On is currently active as a preview placeholder and does not connect to external brokers.")}
                    className="w-full py-3 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Continue with Google</span>
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {activePage === "register" && (
          <section className="max-w-md mx-auto px-4 py-12 md:py-20 text-left" id="register-view">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-md space-y-6">
              <div className="text-center space-y-1.5">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">Create your SMARTFLOWALGO account</h2>
                <p className="text-xs text-slate-500 font-medium">Build a rule-based methodology across Gold, Bitcoin, and Forex</p>
              </div>

              {registerSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Account Created Contextually</h3>
                  <p className="text-[11px] text-slate-500 leading-normal max-w-xs mx-auto">
                    Welcome to Smartflow Trading education circles! Check your email for further indicator guide links.
                  </p>
                  <button
                    onClick={() => changePage("simulator")}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow"
                  >
                    Proceed to Simulator Sandbox
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRegisterSubmitted(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Trading Experience</label>
                      <select
                        value={registerForm.experience}
                        onChange={(e) => setRegisterForm({ ...registerForm, experience: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
                      >
                        <option value="Beginner">Beginner (0-1 yrs)</option>
                        <option value="Intermediate">Intermediate (1-3 yrs)</option>
                        <option value="Advanced">Advanced (3+ yrs)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Primary Interest</label>
                      <select
                        value={registerForm.interest}
                        onChange={(e) => setRegisterForm({ ...registerForm, interest: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
                      >
                        <option value="Gold">Gold Trading</option>
                        <option value="Crypto">Bitcoin Volatility</option>
                        <option value="Forex">Forex Session Flow</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-all cursor-pointer"
                  >
                    Create Account
                  </button>

                  {/* Want free access block */}
                  <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-2.5 text-[11px] leading-relaxed">
                    <Send className="h-4 w-4 text-blue-500 shrink-0 mt-0.5 animate-bounce" />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-white block">Want free access first?</span>
                      <p className="text-slate-500 mt-0.5">
                        Avoid subscription checks altogether:{" "}
                        <a href="https://t.me/smartflowalgo" target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold hover:underline">
                          Join the Telegram community
                        </a>{" "}
                        for free setup updates!
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </section>
        )}

        {activePage === "privacy" && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-left space-y-6" id="privacy-policy-view">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-slate-400 font-mono">Last Updated: July 2026</p>
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs leading-relaxed text-slate-600 dark:text-slate-300 text-xs md:text-sm">
              <p>
                At <strong>SMARTFLOWALGO</strong> by Smartflow Trading, we respect your privacy and are committed to protecting the confidential information you share with us. This Privacy Policy outlines our procedures regarding collection, use, and safekeeping of data.
              </p>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">1. Information Collection</h3>
                <p>
                  We collect basic registration parameters such as name, email address, password hash coordinates, and platform preferences strictly when you create an account. No broker passwords, live API tokens, banking credit details, or trading accounts are ever collected or processed.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">2. Processing Usage</h3>
                <p>
                  Any processed metadata is used to configure your simulator preferences, coordinate email newsletters (if subscribed), and customize indicator parameter buffers. We do not sell, rent, or lease lists to third-party institutions.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">3. Cookies & Client-Side Cache</h3>
                <p>
                  We utilize standard browser cookies and local storage tokens (such as localState memory) to cache your selected pricing currencies (USD/GBP/INR) and visual theme toggles (light/dark mode) so that your view remains consistent between reloads.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">4. Data Erasure Request</h3>
                <p>
                  You have the full right to request erasure of your user email records or logs at any point. Please contact our support desk at <a href="mailto:support@smartflowalgo.com" className="text-blue-500 underline">support@smartflowalgo.com</a> to initiate removal.
                </p>
              </div>
            </div>
          </section>
        )}

        {activePage === "terms" && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-left space-y-6" id="terms-conditions-view">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">Terms & Conditions</h1>
            <p className="text-xs text-slate-400 font-mono">Effective Date: July 2026</p>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs leading-relaxed text-slate-600 dark:text-slate-300 text-xs md:text-sm">
              <p>
                By accessing <strong>SMARTFLOWALGO</strong> (operated by Smartflow Trading), you agree to comply with and be bound by the following Terms & Conditions. If you disagree with any portion of these conditions, please terminate platform utilization immediately.
              </p>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">1. Educational Only Content</h3>
                <p>
                  All content, charts, alerts, indicators, simulator calculations, backtest metrics, and posts inside our Telegram are presented strictly for informational and process training purposes. They do not constitute financial advice, asset recommendations, portfolio management, or broker instructions.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">2. Subscription Payments & Refund Policy</h3>
                <p>
                  Subscriptions are processed on a recurring basis (monthly or yearly). Because we provide immediate access to downloadable worksheets, checklists, and indicator training guides upon signup, any subscription payments are non-refundable. You can cancel future renewals in your settings desk at any point.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">3. Community Rules & User Conduct</h3>
                <p>
                  Platform members must maintain professional, respectful conduct inside the Telegram community. Spamming affiliate channels, distributing promotional trade execution services, using profane language, or harassing team members will result in immediate lifetime banning without refunds.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">4. Limitation Of Liability</h3>
                <p>
                  Under no circumstances shall Smartflow Trading or its operators be liable for any trading losses, drawdown, damage, or capital expenses resulting from your utilization of our indicators, guides, or backtest tools. Trading leveraged assets involves substantial risk.
                </p>
              </div>
            </div>
          </section>
        )}

        {activePage === "disclaimer" && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-left space-y-6" id="disclaimer-view">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">Risk Disclaimer</h1>
            <p className="text-xs text-slate-400 font-mono">Mandatory Compliance Statement</p>

            <div className="bg-red-500/5 dark:bg-rose-950/10 border border-rose-200 dark:border-rose-900 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm leading-relaxed text-slate-700 dark:text-slate-300 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-rose-500 border-b border-rose-200 dark:border-rose-900 pb-3 mb-4">
                <ShieldAlert className="h-6 w-6 shrink-0" />
                <h2 className="font-bold text-sm uppercase tracking-wider">Trading Risk Warning Notice</h2>
              </div>

              <p className="font-bold text-slate-900 dark:text-white leading-relaxed">
                Trading Gold, cryptocurrency, Forex, CFDs, and other financial markets involves substantial risk. SMARTFLOWALGO content, signals, indicators, market analysis, Telegram posts, and simulator results are educational only. They do not guarantee future outcomes and should not be treated as financial advice.
              </p>

              <div className="space-y-4">
                <p>
                  <strong>1. High Leverage Danger:</strong> Using leverage multiplies both trading potential and capital exposure. A minor volatility swing can liquidate an entire margin budget in seconds. Our simulators use synthetic demo data precisely to let you learn how position-sizing keeps your risk limited to a strict, sustainable 1% average before allocating true funds.
                </p>
                
                <p>
                  <strong>2. past Performance Bias:</strong> Backtest curves and historical strategy rules (such as crossover logs) represent hypothetical mathematical modeling on static past periods. Future market regimes, central bank pivots, and black-swan liquidity drops can completely alter strategy performance metrics. Past success is never an indicator of future results.
                </p>

                <p>
                  <strong>3. Independent Accountability:</strong> By utilizing the platform, you acknowledge that you are fully accountable for your own trading actions and financial allocations. We do not support live trading execution, portfolio pooling, copy-trading bot links, or custom fund management.
                </p>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* FOOTER */}
      <Footer onPageChange={changePage} />

    </div>
  );
}
