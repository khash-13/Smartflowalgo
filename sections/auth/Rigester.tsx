"use client";

import { getToken } from "@/lib/plan-token";
import { CheckCircle, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Rigester() {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    experience: "Beginner",
    interest: "Gold",
    currency: "USD",
  });
  const [registerSubmitted, setRegisterSubmitted] = useState(false);

  const router = useRouter();

  return (
    <section
      className="max-w-md mx-auto px-4 py-12 md:py-20 text-left"
      id="register-view"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-md space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">
            Create your SMARTFLOWALGO account
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Build a rule-based methodology across Gold, Bitcoin, and Forex
          </p>
        </div>

        {registerSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Account Created Contextually
            </h3>
            <p className="text-[11px] text-slate-500 leading-normal max-w-xs mx-auto">
              Welcome to Smartflow Trading education circles! Check your email
              for further indicator guide links.
            </p>
            <button
              onClick={() => router.push("simulator")}
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
              <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={registerForm.name}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    name: e.target.value,
                  })
                }
                placeholder="John Doe"
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    email: e.target.value,
                  })
                }
                placeholder="john@example.com"
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    password: e.target.value,
                  })
                }
                placeholder="••••••••"
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Trading Experience
                </label>
                <select
                  value={registerForm.experience}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      experience: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
                >
                  <option value="Beginner">Beginner (0-1 yrs)</option>
                  <option value="Intermediate">Intermediate (1-3 yrs)</option>
                  <option value="Advanced">Advanced (3+ yrs)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Primary Interest
                </label>
                <select
                  value={registerForm.interest}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      interest: e.target.value,
                    })
                  }
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
                <span className="font-bold text-slate-800 dark:text-white block">
                  Want free access first?
                </span>
                <p className="text-slate-500 mt-0.5">
                  Avoid subscription checks altogether:{" "}
                  <Link
                    href={"https://t.me/smartflowalgo"}
                    target="_blank"
                    className="text-blue-500 font-bold hover:underline"
                  >
                    Join the Telegram community
                  </Link>{" "}
                  for free setup updates!
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default Rigester;
