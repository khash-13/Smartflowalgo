"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Cookie,
  ShieldCheck,
  Settings2,
  BarChart3,
  Megaphone,
  ChevronDown,
  Lock,
  X,
} from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "smartflow-cookie-consent";

type ConsentKey = "necessary" | "functional" | "analytics" | "marketing";
type ConsentState = Record<ConsentKey, boolean>;

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const CATEGORIES: {
  key: ConsentKey;
  icon: typeof ShieldCheck;
  title: string;
  desc: string;
  locked: boolean;
  cookies: { name: string; purpose: string; duration: string }[];
}[] = [
  {
    key: "necessary",
    icon: ShieldCheck,
    title: "Strictly Necessary",
    desc: "Required for core site functionality like security, login sessions, and load balancing. Cannot be switched off.",
    locked: true,
    cookies: [
      { name: "session_id", purpose: "Keeps you signed in", duration: "Session" },
      { name: "csrf_token", purpose: "Security / form protection", duration: "Session" },
    ],
  },
  {
    key: "functional",
    icon: Settings2,
    title: "Functional",
    desc: "Remembers your preferences — like theme, region, or layout — to personalize your experience.",
    locked: false,
    cookies: [
      { name: "theme_pref", purpose: "Remembers dark/light mode", duration: "1 year" },
      { name: "locale", purpose: "Remembers language/region", duration: "1 year" },
    ],
  },
  {
    key: "analytics",
    icon: BarChart3,
    title: "Analytics",
    desc: "Helps us understand how visitors use the site so we can improve performance and content.",
    locked: false,
    cookies: [
      { name: "_ga", purpose: "Google Analytics — distinguishes users", duration: "2 years" },
      { name: "_gid", purpose: "Google Analytics — session tracking", duration: "24 hours" },
    ],
  },
  {
    key: "marketing",
    icon: Megaphone,
    title: "Marketing",
    desc: "Used to deliver relevant ads and measure the effectiveness of our campaigns across platforms.",
    locked: false,
    cookies: [
      { name: "_fbp", purpose: "Meta Pixel — ad targeting", duration: "90 days" },
      { name: "ad_id", purpose: "Cross-site ad personalization", duration: "180 days" },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

function ToggleSwitch({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
        disabled
          ? "cursor-not-allowed bg-sky-600/50 dark:bg-sky-400/40"
          : checked
          ? "bg-sky-600 dark:bg-sky-400"
          : "bg-slate-200 dark:bg-slate-700"
      }`}
    >
      <motion.span
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm"
      >
        {disabled && <Lock className="h-2.5 w-2.5 text-sky-600" />}
      </motion.span>
    </button>
  );
}

function CategoryRow({
  category,
  checked,
  onToggle,
}: {
  category: (typeof CATEGORIES)[number];
  checked: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      variants={itemVariants}
      className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            category.locked
              ? "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
              : "bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-1.5 text-left"
            >
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                {category.title}
              </span>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </motion.span>
            </button>
            <ToggleSwitch checked={checked} onChange={onToggle} disabled={category.locked} />
          </div>

          <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            {category.desc}
          </p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 dark:border-slate-800"
              >
                {category.cookies.map((c) => (
                  <div key={c.name} className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-mono font-semibold text-slate-600 dark:text-slate-300">
                      {c.name}
                    </span>
                    <span className="flex-1 truncate text-slate-400">{c.purpose}</span>
                    <span className="shrink-0 text-slate-400">{c.duration}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {category.locked && (
        <div className="flex items-center gap-1.5 border-t border-slate-100 bg-slate-50/60 px-4 py-1.5 text-[10px] font-medium text-slate-400 dark:border-slate-800 dark:bg-slate-900/40">
          <Lock className="h-2.5 w-2.5" /> Always active
        </div>
      )}
    </motion.div>
  );
}

function ConsentBar({
  onAcceptAll,
  onRejectAll,
  onCustomize,
}: {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize: () => void;
}) {
  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 120, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-9xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
    >
      <div className="rounded-2xl bg-gradient-to-r from-sky-500/40 via-cyan-400/15 to-sky-600/40 p-px shadow-xl dark:from-sky-400/40 dark:via-cyan-400/10 dark:to-sky-500/40">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/95 p-5 backdrop-blur dark:border-white/5 dark:bg-slate-950/95 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  We value your privacy
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <ShieldCheck className="h-2.5 w-2.5" /> GDPR Compliant
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:max-w-md">
                We use cookies to run the site and, with your consent, to analyze
                traffic and personalize marketing. Read our{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-sky-600 underline underline-offset-2 dark:text-sky-400"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onCustomize}
              className="rounded-lg border border-sky-600/25 bg-sky-600/5 px-4 py-2 text-xs font-semibold text-sky-700 hover:bg-sky-600/10 dark:border-sky-400/25 dark:bg-sky-400/5 dark:text-sky-400"
            >
              Customize
            </motion.button>
                        <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRejectAll}
              className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              Reject All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onAcceptAll}
              className="group relative overflow-hidden rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-sky-600/25 hover:bg-sky-700"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Accept All</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CustomizeModal({
  consent,
  onToggle,
  onAcceptAll,
  onRejectAll,
  onSave,
  onClose,
}: {
  consent: ConsentState;
  onToggle: (key: ConsentKey) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm dark:bg-black/60"
      />
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
        >
          {/* header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400">
                <Cookie className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Privacy Preferences
                </h2>
                <p className="text-[11px] text-slate-400">
                  Manage how we use cookies on this site
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* body */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex-1 space-y-2.5 overflow-y-auto px-5 py-4"
          >
            <motion.p
              variants={itemVariants}
              className="text-xs leading-relaxed text-slate-500 dark:text-slate-400"
            >
              We use cookies to run the site, understand usage, and — only with
              your permission — personalize marketing. You can change these
              settings anytime.
            </motion.p>

            {CATEGORIES.map((cat) => (
              <CategoryRow
                key={cat.key}
                category={cat}
                checked={consent[cat.key]}
                onToggle={() => onToggle(cat.key)}
              />
            ))}
          </motion.div>

          {/* footer */}
          <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:justify-end">
            <button
              onClick={onRejectAll}
              className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              Reject All
            </button>
            <button
              onClick={onSave}
              className="rounded-lg border border-sky-600/30 bg-sky-600/5 px-4 py-2 text-xs font-semibold text-sky-700 hover:bg-sky-600/10 dark:border-sky-400/30 dark:bg-sky-400/5 dark:text-sky-400"
            >
              Save Preferences
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAcceptAll}
              className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-sky-600/25 hover:bg-sky-700"
            >
              Accept All
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);

  // hydrate from storage; only show the bar if no decision has been made yet
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConsent({
          necessary: true,
          functional: !!parsed.functional,
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
        });
      } catch {
        setVisible(true);
      }
    } else {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }

  }, []);

  // allow a footer "Cookie Settings" link to reopen this anytime:
  // window.dispatchEvent(new Event("open-cookie-preferences"))
  useEffect(() => {
    const handler = () => setCustomizeOpen(true);
    window.addEventListener("open-cookie-preferences", handler);
    return () => window.removeEventListener("open-cookie-preferences", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = customizeOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [customizeOpen]);

  const persist = (next: ConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...next, timestamp: Date.now() }));
    setConsent(next);
    setVisible(false);
    setCustomizeOpen(false);
    // TODO: wire this up to your actual script loaders, e.g.
    // if (next.analytics) loadGoogleAnalytics();
    // if (next.marketing) loadMetaPixel();
  };

  const acceptAll = () =>
    persist({ necessary: true, functional: true, analytics: true, marketing: true });
  const rejectAll = () =>
    persist({ necessary: true, functional: false, analytics: false, marketing: false });
  const savePreferences = () => persist(consent);

  const toggleCategory = (key: ConsentKey) => {
    if (key === "necessary") return;
    setConsent((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <AnimatePresence>
        {visible && !customizeOpen && (
          <ConsentBar
            onAcceptAll={acceptAll}
            onRejectAll={rejectAll}
            onCustomize={() => setCustomizeOpen(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {customizeOpen && (
          <CustomizeModal
            consent={consent}
            onToggle={toggleCategory}
            onAcceptAll={acceptAll}
            onRejectAll={rejectAll}
            onSave={savePreferences}
            onClose={() => setCustomizeOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}