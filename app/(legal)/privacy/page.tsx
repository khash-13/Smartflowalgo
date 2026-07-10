import React from 'react'

function page() {
  return (
              <section
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-left space-y-6"
            id="privacy-policy-view"
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Last Updated: July 2026
            </p>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 space-y-6 leading-relaxed text-slate-600 dark:text-slate-300 text-xs md:text-sm">
              <p>
                At <strong>SMARTFLOWALGO</strong> by Smartflow Trading, we
                respect your privacy and are committed to protecting the
                confidential information you share with us. This Privacy Policy
                outlines our procedures regarding collection, use, and
                safekeeping of data.
              </p>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">
                  1. Information Collection
                </h3>
                <p>
                  We collect basic registration parameters such as name, email
                  address, password hash coordinates, and platform preferences
                  strictly when you create an account. No broker passwords, live
                  API tokens, banking credit details, or trading accounts are
                  ever collected or processed.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">
                  2. Processing Usage
                </h3>
                <p>
                  Any processed metadata is used to configure your simulator
                  preferences, coordinate email newsletters (if subscribed), and
                  customize indicator parameter buffers. We do not sell, rent,
                  or lease lists to third-party institutions.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">
                  3. Cookies & Client-Side Cache
                </h3>
                <p>
                  We utilize standard browser cookies and local storage tokens
                  (such as localState memory) to cache your selected pricing
                  currencies (USD/GBP/INR) and visual theme toggles (light/dark
                  mode) so that your view remains consistent between reloads.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">
                  4. Data Erasure Request
                </h3>
                <p>
                  You have the full right to request erasure of your user email
                  records or logs at any point. Please contact our support desk
                  at{" "}
                  <a
                    href="mailto:support@smartflowalgo.com"
                    className="text-blue-500 underline"
                  >
                    support@smartflowalgo.com
                  </a>{" "}
                  to initiate removal.
                </p>
              </div>
            </div>
          </section>
  )
}

export default page