export interface StudyModule {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  keyConcept: string;
}

export const studyModules: StudyModule[] = [
  {
    id: "gold-structure",
    title: "Gold Market Structure Guide",
    description: "Understand trend phases, liquidity sweeps, session timing, and key-level reactions in Gold examples.",
    difficulty: "Intermediate",
    topics: [
      "Macro trend identification on Daily vs. 4-hour charts",
      "Identifying supply and demand zones on Gold",
      "Spotting retail stop-loss clusters (liquidity pools)",
      "Timing entries around the London and New York session open",
      "How to manage wide spreads during the daily roll-over hour"
    ],
    keyConcept: "Gold is highly sensitive to session liquidity; the London open often sweeps Asian session highs/lows before establishing the real intraday trend."
  },
  {
    id: "btc-prep",
    title: "BTC Trading Preparation Guide",
    description: "Learn how volatility, momentum, and risk exposure can affect Bitcoin trade planning.",
    difficulty: "Advanced",
    topics: [
      "The role of leverage and order book depth in BTC",
      "How funding rates indicate overcrowded retail sentiment",
      "Spotting weekend price gaps on futures charts",
      "Setting volatility-adjusted stop losses based on standard deviation",
      "Risk exposure management when trading highly correlated altcoins"
    ],
    keyConcept: "Bitcoin operates 24/7 with zero market closes, requiring wider structural buffers and highly conservative position sizes compared to traditional Forex."
  },
  {
    id: "forex-playbook",
    title: "Forex Session Playbook",
    description: "Study session behavior, pair selection, liquidity windows, and news-risk planning.",
    difficulty: "Beginner",
    topics: [
      "Characteristics of the Tokyo, London, and New York sessions",
      "Selecting the most liquid currency pairs for each session",
      "Trading the 'London Overlap' peak volume period",
      "How to avoid high-risk trading surrounding major interest rate announcements",
      "Pre-session routine checklist for Forex day traders"
    ],
    keyConcept: "Focus trading purely during high-liquidity overlaps (e.g., London and New York morning) to secure narrow spreads and reliable directional momentum."
  },
  {
    id: "candle-playbook",
    title: "Candlestick Pattern Playbook",
    description: "Learn candle anatomy, continuation signals, reversal signals, and confirmation principles.",
    difficulty: "Beginner",
    topics: [
      "Anatomy of a candle: body, wick, open, high, low, close",
      "Reversal candlestick formations (Pin Bars, Engulfing, Morning Star)",
      "Continuation structures (Inside Bars, Rising Three Methods)",
      "Why candlestick patterns fail without high-volume zone confluence",
      "How to wait for a closed candle before confirming your trading trigger"
    ],
    keyConcept: "A candlestick pattern is not a trade signal by itself; it is simply a trigger that must occur within an established historical support or resistance zone."
  },
  {
    id: "sr-workbook",
    title: "Support & Resistance Workbook",
    description: "Practice marking levels, zones, retests, liquidity areas, and invalidation points.",
    difficulty: "Beginner",
    topics: [
      "Marking swing highs and swing lows across multiple timeframes",
      "How single lines turn into supply and demand 'zones'",
      "Trading breakout retests: waiting for support to flip into resistance",
      "Identifying false breakouts (bull traps and bear traps)",
      "Using volume indicators to confirm structural levels"
    ],
    keyConcept: "Market support and resistance levels are dynamic psychological zones where buyers and sellers battle, not thin lines on a chart."
  },
  {
    id: "risk-manual",
    title: "Risk Management Manual",
    description: "Study account risk, trade risk, position sizing, reward-to-risk, max drawdown, and consistency rules.",
    difficulty: "Beginner",
    topics: [
      "The core math behind the 1% risk rule",
      "How to calculate position sizes automatically for any currency pair",
      "Implementing daily and weekly drawdown caps (e.g., max 3% daily loss)",
      "The power of a 1:2 and 1:3 reward-to-risk ratio on capital growth",
      "Establishing strict guidelines for scaling out of profitable positions"
    ],
    keyConcept: "The best traders are not the ones with the highest win rates, but the ones with the most disciplined risk boundaries and exit plans."
  },
  {
    id: "psychology-notes",
    title: "Trading Psychology Notes",
    description: "Build discipline around patience, loss acceptance, journaling, and avoiding revenge trading.",
    difficulty: "Intermediate",
    topics: [
      "Slaying the FOMO (Fear of Missing Out) demon",
      "Accepting losses as standard, objective business expenses",
      "How to step away from the screen after hitting your daily loss limit",
      "Overcoming the urge to 'revenge trade' after a frustrating draw",
      "Building a long-term probabilistic mindset in trading"
    ],
    keyConcept: "Consistency in trading is built inside your head; your ability to follow your rules during a losing streak is the ultimate decider of success."
  },
  {
    id: "algo-starter",
    title: "Algo Logic Starter Kit",
    description: "Convert trading ideas into rules using entries, filters, exits, stops, and review metrics.",
    difficulty: "Advanced",
    topics: [
      "Translating subjective observations into rigid, mathematical rules",
      "Structure of conditional trading rules (If [Condition A] and [Filter B] then [Action])",
      "Configuring trailing stops, breakeven triggers, and timed exits",
      "How to avoid over-optimizing (curve-fitting) historical data",
      "Evaluating backtest reports: understanding win rate vs. profit factor"
    ],
    keyConcept: "By standardizing your entries and exits into a logical algorithm, you completely eliminate emotional second-guessing and hesitation."
  }
];
