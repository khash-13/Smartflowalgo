import React from 'react'

function page() {
  return (
              <section
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-left space-y-6"
            id="terms-conditions-view"
          >
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Effective Date: July 2026
            </p>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 space-y-6 leading-relaxed text-slate-600 dark:text-slate-300 text-xs md:text-sm">
              <p>
                By accessing <strong>SMARTFLOWALGO</strong> (operated by
                Smartflow Trading), you agree to comply with and be bound by the
                following Terms & Conditions. If you disagree with any portion
                of these conditions, please terminate platform utilization
                immediately.
              </p>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">
                  1. Educational Only Content
                </h3>
                <p>
                  All content, charts, alerts, indicators, simulator
                  calculations, backtest metrics, and posts inside our Telegram
                  are presented strictly for informational and process training
                  purposes. They do not constitute financial advice, asset
                  recommendations, portfolio management, or broker instructions.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">
                  2. Subscription Payments & Refund Policy
                </h3>
                <p>
                  Subscriptions are processed on a recurring basis (monthly or
                  yearly). Because we provide immediate access to downloadable
                  worksheets, checklists, and indicator training guides upon
                  signup, any subscription payments are non-refundable. You can
                  cancel future renewals in your settings desk at any point.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">
                  3. Community Rules & User Conduct
                </h3>
                <p>
                  Platform members must maintain professional, respectful
                  conduct inside the Telegram community. Spamming affiliate
                  channels, distributing promotional trade execution services,
                  using profane language, or harassing team members will result
                  in immediate lifetime banning without refunds.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm mb-2">
                  4. Limitation Of Liability
                </h3>
                <p>
                  Under no circumstances shall Smartflow Trading or its
                  operators be liable for any trading losses, drawdown, damage,
                  or capital expenses resulting from your utilization of our
                  indicators, guides, or backtest tools. Trading leveraged
                  assets involves substantial risk.
                </p>
              </div>
            </div>
          </section>
  )
}

export default page