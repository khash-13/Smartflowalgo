export interface Resource {
  id: string;
  title: string;
  description: string;
  details: string[];
  downloadLink?: string;
}

export const freeResources: Resource[] = [
  {
    id: "gold-setup-checklist",
    title: "Gold Setup Checklist",
    description: "A pre-trade checklist for trend, key levels, liquidity zones, volatility, entry trigger, stop-loss, and target planning.",
    details: [
      "Verify Higher Timeframe (4H/1H) trend bias",
      "Mark major daily liquidity pools and session highs/lows",
      "Check upcoming economic calendar events (NFP, CPI, FOMC)",
      "Confirm entry trigger on Lower Timeframe (15m/5m)",
      "Determine logical stop-loss placement beyond the swing structure"
    ]
  },
  {
    id: "btc-volatility-planner",
    title: "BTC Volatility Planner",
    description: "A worksheet for preparing Bitcoin trades around volatility, news sensitivity, invalidation, and risk exposure.",
    details: [
      "Calculate 24-hour Average True Range (ATR)",
      "Assess weekend funding rates and leverage risk indicators",
      "Identify liquidation heatmaps and volume concentration",
      "Map out progressive taking-profit levels",
      "Draft a strict capital-protection emergency plan"
    ]
  },
  {
    id: "forex-session-planner",
    title: "Forex Session Planner",
    description: "Organize your trading around Asian, London, and New York sessions with notes for liquidity and volatility.",
    details: [
      "Define session boundaries and active trading windows",
      "Track Tokyo range breakout bias during early London trading",
      "Identify session-overlap high-volume expansion hours",
      "Match currency pairs to corresponding session peaks",
      "Monitor daily bank settlement timing liquidity drops"
    ]
  },
  {
    id: "risk-calculator-template",
    title: "Risk Calculator Template",
    description: "Plan position size using account size, risk percentage, entry price, stop-loss, and target.",
    details: [
      "Formulate maximum dollar-risk caps (0.5% - 1%)",
      "Input precise entry and stop-loss coordinates",
      "Auto-calculate required contract/lot sizing",
      "Measure exact reward-to-risk multiplier values",
      "Log maximum potential slippage and execution fee adjustments"
    ]
  },
  {
    id: "trading-journal-sheet",
    title: "Trading Journal Sheet",
    description: "Track trade idea, setup type, screenshots, emotions, mistakes, result, and lessons.",
    details: [
      "Record baseline setup rules and initial trading thesis",
      "Capture pre-entry and post-exit chart screenshots",
      "Grade emotional discipline and adherence to trade rules",
      "Catalog mistakes (FOMO, early exit, over-leverage)",
      "Summarize strategic adjustments for future performance"
    ]
  },
  {
    id: "indicator-basics-guide",
    title: "Indicator Basics Guide",
    description: "Learn how trend, momentum, volatility, and volume indicators can support analysis without replacing judgment.",
    details: [
      "Analyze trend dynamics using exponential moving averages",
      "Evaluate velocity boundaries and divergences via RSI indicators",
      "Set statistical stop parameters with ATR buffers",
      "Interpret transaction volumes to validate structural breakouts",
      "Synthesize multi-indicator readings into a singular rule sheet"
    ]
  }
];
