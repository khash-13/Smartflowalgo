import React, { useState } from "react";
import { Menu, X, Send, LogIn, ChevronRight, Sparkles } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  id?: string;
  activePage: string;
  onPageChange: (page: string) => void;
  onThemeChange?: (theme: "light" | "dark") => void;
}

export default function Header({
  id = "app-header",
  activePage,
  onPageChange,
  onThemeChange
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", page: "home" },
    { label: "Plans", page: "plans" },
    { label: "Free Resources", page: "resources" },
    { label: "Blogs", page: "blogs" },
    { label: "Indicators", page: "indicators" },
    { label: "Study Material", page: "study" },
    { label: "Simulator", page: "simulator" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" }
  ];

  const handleNavClick = (page: string) => {
    onPageChange(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id={id}
      className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-[#050B1D] backdrop-blur-md transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="focus:outline-none transition-transform hover:scale-[1.01] active:scale-95 cursor-pointer text-left"
          id="hdr-logo-btn"
        >
          <Logo className="h-10 w-auto" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-1" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.page}
              id={`nav-link-${item.page}`}
              onClick={() => handleNavClick(item.page)}
              className={`px-3 py-2 text-xs font-bold rounded-md uppercase tracking-wider transition-all cursor-pointer ${
                activePage === item.page
                  ? "text-blue-600 dark:text-emerald-400 bg-blue-50/50 dark:bg-emerald-500/10 border border-transparent dark:border-emerald-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/60"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden xl:flex items-center space-x-3" id="hdr-actions">
          {/* Theme Toggle */}
          <ThemeToggle onThemeChange={onThemeChange} />

          {/* Login Button */}
          <button
            onClick={() => handleNavClick("login")}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer uppercase tracking-wider"
            id="hdr-login-btn"
          >
            <LogIn className="h-4 w-4" />
            Login
          </button>

          {/* Telegram CTA */}
          <a
            href="https://t.me/smartflowalgo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer uppercase tracking-wider"
            id="hdr-join-tg-btn"
          >
            <Send className="h-3.5 w-3.5" />
            Join Free Telegram
          </a>

          {/* Get Started Button */}
          <button
            onClick={() => handleNavClick("register")}
            className="flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer uppercase tracking-wider"
            id="hdr-get-started-btn"
          >
            Get Started
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile controls (Menu Toggle, Theme Toggle) */}
        <div className="flex xl:hidden items-center space-x-2">
          <ThemeToggle onThemeChange={onThemeChange} />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-[#050B1D] border-t border-slate-200 dark:border-slate-800 py-4 px-4 space-y-3" id="mobile-drawer">
          <div className="flex items-center justify-between gap-2 px-2 py-1 bg-blue-500/10 dark:bg-emerald-500/10 rounded-lg border border-blue-500/20 dark:border-emerald-500/20 text-blue-600 dark:text-emerald-400">
            <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3 animate-pulse" />
              First 200 members get Free access
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.page}
                id={`m-nav-link-${item.page}`}
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-2.5 text-xs text-left font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                  activePage === item.page
                    ? "text-blue-600 dark:text-emerald-400 bg-blue-50/50 dark:bg-emerald-500/10 border border-transparent dark:border-emerald-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 flex flex-col">
            <div className="flex items-center justify-between px-2">
              <button
                onClick={() => handleNavClick("login")}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer uppercase tracking-wider"
                id="m-hdr-login-btn"
              >
                <LogIn className="h-4 w-4" />
                Login
              </button>
              
              <button
                onClick={() => handleNavClick("register")}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer uppercase tracking-wider"
                id="m-hdr-get-started-btn"
              >
                Get Started
              </button>
            </div>

            <a
              href="https://t.me/smartflowalgo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-blue-600 dark:bg-emerald-600 text-white text-xs font-bold shadow-sm uppercase tracking-wider"
              id="m-hdr-join-tg-btn"
            >
              <Send className="h-4 w-4" />
              Join Free Telegram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
