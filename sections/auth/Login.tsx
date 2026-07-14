"use client"

import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Login() {
      const [loginForm, setLoginForm] = useState({ email: "", password: "" });
      const [loginSubmitted, setLoginSubmitted] = useState(false);
    
      const router = useRouter()
  return (
              <section
            className="max-w-md mx-auto px-4 py-16 md:py-24 text-left"
            id="login-view"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-md space-y-6">
              <div className="text-center space-y-1.5">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                  Welcome back to SMARTFLOWALGO
                </h2>
                <p className="text-xs text-slate-500">
                  Sign in to resume trading worksheets and simulator parameters
                </p>
              </div>

              {loginSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Login Process Initiated
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-normal max-w-xs mx-auto">
                    Account dashboard loaded in demo context. Session
                    initialized.
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
                    setLoginSubmitted(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
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
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
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

                </form>
              )}
            </div>
          </section>
  )
}

export default Login