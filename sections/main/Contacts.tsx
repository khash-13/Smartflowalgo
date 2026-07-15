"use client";

import { getToken } from "@/lib/plan-token";
import {
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Send,
  ShieldAlert,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Contacts() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "Telegram Group",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const router = useRouter();
  function goToCheckout() {
    const tok = getToken("FREE");
    router.push(`/checkout?plan=${tok}`);
  }

  return (
    <section
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 text-left"
      id="contact-view"
    >
      <div className="text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Contact Support Desk
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Have questions regarding plans, indicators, simulator parameters or
          Telegram access? We are here to support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form column */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          {contactSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Message Logged Successfully
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Thank you for contacting SMARTFLOWALGO support. An educational
                representative will respond within our support hours.
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
                <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="John Doe"
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        email: e.target.value,
                      })
                    }
                    placeholder="john@example.com"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Phone/WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        phone: e.target.value,
                      })
                    }
                    placeholder="+00 00000 00000"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Topic Of Inquiry
                </label>
                <select
                  value={contactForm.topic}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      topic: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-850 dark:text-slate-200 focus:outline-none font-medium"
                >
                  <option value="Telegram Group">
                    Join Telegram Group Access
                  </option>
                  <option value="Plans">Pricing & Subscription Plans</option>
                  <option value="Indicators">
                    Educational Trend & Volatility Indicators
                  </option>
                  <option value="Simulator">
                    Strategy Backtest Simulator Node
                  </option>
                  <option value="Gold Signals">
                    Gold Signal Technical Breakdowns
                  </option>
                  <option value="BTC Signals">
                    BTC Signal Volatility Modules
                  </option>
                  <option value="Forex Signals">
                    Forex Session Signal Sets
                  </option>
                  <option value="Support">General Technical Support</option>
                  <option value="Partnership">Educational Partnership</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      message: e.target.value,
                    })
                  }
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
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Direct Social Contact
            </h3>

            <ul className="space-y-3.5">
              <li className="flex items-center gap-3">
                <Send className="h-5 w-5 text-blue-500 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                    Telegram Group
                  </span>
                  <button
                    onClick={goToCheckout}
                    className="font-bold text-slate-800 dark:text-white hover:underline"
                  >
                    Telegram
                  </button>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-indigo-500 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                    Email Desk
                  </span>
                  <a
                    href="mailto:support@smartflowalgo.com"
                    className="font-bold text-slate-800 dark:text-white hover:underline"
                  >
                    support@smartflowalgo.com
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-amber-500 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                    Support Hours
                  </span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    Monday to Friday, 10:00 - 18:00
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl text-[11px] text-slate-500 flex items-start gap-2 leading-relaxed">
            <ShieldAlert className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Please Note:</strong> Our desk coordinates educational
              programs, plans, and indicators. We are strictly prohibited from
              giving individual stock tips, trading guidance, or handling real
              capital trading accounts.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
