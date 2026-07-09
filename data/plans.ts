export interface Plan {
  id: string;
  name: string;
  badge?: string;
  pricing: {
    USD: { price: number; period: string };
    GBP: { price: number; period: string };
    INR: { price: number; period: string };
  };
  features: string[];
  popular?: boolean;
}

export const plans: Plan[] = [
  {
    id: "free-telegram",
    name: "Free Telegram Access",
    badge: "First 200 users",
    pricing: {
      USD: { price: 0, period: "forever" },
      GBP: { price: 0, period: "forever" },
      INR: { price: 0, period: "forever" }
    },
    features: [
      "Free Telegram group access",
      "Gold setup ideas",
      "BTC setup ideas",
      "Forex setup ideas",
      "Market analysis posts",
      "Risk management reminders",
      "Basic indicator updates"
    ]
  },
  {
    id: "starter",
    name: "Starter",
    pricing: {
      USD: { price: 19, period: "month" },
      GBP: { price: 15, period: "month" },
      INR: { price: 1799, period: "month" }
    },
    features: [
      "Beginner trading roadmap",
      "Free resources",
      "Study material library",
      "Basic simulator access",
      "Risk templates",
      "Weekly market-flow notes"
    ]
  },
  {
    id: "pro-signals",
    name: "Pro Signals & Indicators",
    popular: true,
    pricing: {
      USD: { price: 49, period: "month" },
      GBP: { price: 39, period: "month" },
      INR: { price: 4699, period: "month" }
    },
    features: [
      "Everything in Starter",
      "Gold, BTC, and Forex signal breakdowns",
      "Indicator learning modules",
      "Multi-timeframe lessons",
      "Advanced simulator settings",
      "Strategy worksheets",
      "Priority Telegram updates"
    ]
  },
  {
    id: "algo-edge",
    name: "Algo Edge",
    pricing: {
      USD: { price: 99, period: "month" },
      GBP: { price: 79, period: "month" },
      INR: { price: 9499, period: "month" }
    },
    features: [
      "Everything in Pro Signals",
      "Algo simulator access",
      "Strategy builder templates",
      "Trade log analytics",
      "Demo-data backtest reports",
      "Risk and position sizing module",
      "Custom rule builder"
    ]
  },
  {
    id: "elite-smartflow",
    name: "Elite Smartflow",
    pricing: {
      USD: { price: 199, period: "month" },
      GBP: { price: 149, period: "month" },
      INR: { price: 18999, period: "month" }
    },
    features: [
      "Everything in Algo Edge",
      "Premium market-flow sessions",
      "Group mentorship",
      "Advanced Gold/BTC/Forex breakdowns",
      "Personalized learning roadmap",
      "Priority support",
      "Monthly progress review"
    ]
  }
];

export const comparisonTable = [
  { feature: "Telegram access", free: true, starter: true, pro: true, algo: true, elite: true },
  { feature: "Gold setups", free: true, starter: true, pro: true, algo: true, elite: true },
  { feature: "BTC setups", free: true, starter: true, pro: true, algo: true, elite: true },
  { feature: "Forex setups", free: true, starter: true, pro: true, algo: true, elite: true },
  { feature: "Market analysis", free: "Basic", starter: "Standard", pro: "Advanced", algo: "Advanced", elite: "Premium Sessions" },
  { feature: "Risk reminders", free: true, starter: true, pro: true, algo: true, elite: true },
  { feature: "Study material", free: false, starter: "Basic", pro: "Complete Library", algo: "Complete Library", elite: "Custom Roadmap" },
  { feature: "Basic simulator", free: false, starter: true, pro: true, algo: true, elite: true },
  { feature: "Advanced simulator", free: false, starter: false, pro: "Advanced Settings", algo: "Full Analytics", elite: "Full Analytics" },
  { feature: "Indicator modules", free: false, starter: false, pro: true, algo: true, elite: true },
  { feature: "Algo strategy builder", free: false, starter: false, pro: false, algo: true, elite: true },
  { feature: "Trade log analytics", free: false, starter: false, pro: false, algo: true, elite: true },
  { feature: "Mentorship", free: false, starter: false, pro: false, algo: false, elite: "Group sessions" },
  { feature: "Priority support", free: false, starter: false, pro: "Telegram Priority", algo: "Priority", elite: "Personalized Support" }
];
