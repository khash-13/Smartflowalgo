import React from "react";

interface CurrencyToggleProps {
  id?: string;
  selectedCurrency: "USD" | "GBP" | "INR";
  onCurrencyChange: (currency: "USD" | "GBP" | "INR") => void;
}

export default function CurrencyToggle({
  id = "currency-toggle",
  selectedCurrency,
  onCurrencyChange
}: CurrencyToggleProps) {
  const currencies: ("USD" | "GBP" | "INR")[] = ["USD", "GBP", "INR"];
  const currencySymbols = {
    USD: "$ USD",
    GBP: "£ GBP",
    INR: "₹ INR"
  };

  return (
    <div id={id} className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
      {currencies.map((currency) => (
        <button
          key={currency}
          id={`toggle-currency-${currency.toLowerCase()}`}
          onClick={() => onCurrencyChange(currency)}
          type="button"
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
            selectedCurrency === currency
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          {currencySymbols[currency]}
        </button>
      ))}
    </div>
  );
}
