"use client";

import { motion } from "framer-motion";
import { Users, Send } from "lucide-react";
import { useRouter } from "next/navigation";

const heading1 = "Trade Smarter With";
const heading2 = "Gold, BTC & Forex";
const heading3 = "Market Flow";

const paragraph =
  "SMARTFLOWALGO helps traders learn market structure, follow educational signal ideas, study risk-managed setups, use indicators, and practice strategies through a professional demo simulator.";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const word = {
  hidden: {
    opacity: 0,
    y: 70,
    rotateX: -90,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
} as const;

function AnimatedText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      transition={{ delayChildren: delay }}
      className="overflow-hidden"
    >
      {text.split(" ").map((wordText, index) => (
        <motion.span
          key={`${wordText}-${index}`}
          variants={word}
          className={`inline-block mr-3 ${className}`}
          style={{ transformOrigin: "50% 100%" }}
        >
          {wordText}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function AnimatedGradientText({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="overflow-hidden"
    >
      <span className="inline-block uppercase bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">
        {text}
      </span>
    </motion.div>
  );
}

export default function HeroContent() {
  const router = useRouter();

  return (
    <div className="lg:col-span-6 space-y-6 text-left">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40"
      >
        <Users className="h-3.5 w-3.5" />
        <span>Free Telegram access for the first 200 users</span>
      </motion.div>

      {/* Heading */}
      <h1 className="font-extrabold tracking-tight leading-[1.1]">
        <div className="text-3xl sm:text-4xl lg:text-6xl">
          <AnimatedText
            text={heading1}
            className="text-slate-950 dark:text-white"
          />
        </div>

        <div className="mt-1 text-4xl sm:text-5xl lg:text-7xl uppercase">
          <AnimatedGradientText
            delay={0.6}
            text={heading2}
            // className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500"
          />
        </div>

        <div className="mt-1 text-3xl sm:text-4xl lg:text-6xl">
          <AnimatedText
            delay={0.9}
            text={heading3}
            className="text-slate-950 dark:text-white"
          />
        </div>
      </h1>

      {/* Paragraph */}
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        transition={{ delayChildren: 0.9 }}
        className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
      >
        {paragraph.split(" ").map((item, index) => (
          <motion.span
            key={`${item}-${index}`}
            variants={word}
            className="inline-block mr-1"
          >
            {item}
          </motion.span>
        ))}
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.3,
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
      >
        <motion.a
          href="https://t.me/smartflowalgo"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md"
        >
          <Send className="h-4 w-4" />
          Join Free Telegram
        </motion.a>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/plans")}
          className="w-full py-3.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          View Plans
        </motion.button>
      </motion.div>
    </div>
  );
}