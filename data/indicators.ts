import image from "@/assets/indicators-images/1.jpg"
import image2 from "@/assets/indicators-images/2.jpg"
import imag3 from "@/assets/indicators-images/3.jpg"
import imag4 from "@/assets/indicators-images/4.jpg"
import imag5 from "@/assets/indicators-images/5.jpg"
import imag6 from "@/assets/indicators-images/6.jpg"


export interface IndicatorInfo {
  id: string;
  name: string;
  description: string;
  howItWorks: string;
  settings: string[];
  formulaBasis: string;
  image?: string; // path under /public, e.g. "/indicators/smartflow-trend.jpg"
}

export const indicatorsData: IndicatorInfo[] = [
  {
    id: "smartflow-trend",
    name: "Smartflow Trend Indicator",
    description: "Uses moving average alignment and structure logic to demonstrate possible trend direction and weakness.",
    howItWorks: "Aligns three EMAs (Fast, Medium, Slow) to filter trend states. If Fast > Medium > Slow, it paints a bullish ribbon. If Fast < Medium < Slow, it paints a bearish ribbon. It flags consolidation when EMAs entangle.",
    settings: ["EMA Fast (default: 20)", "EMA Medium (default: 50)", "EMA Slow (default: 200)"],
    formulaBasis: "Exponential Moving Average crossover + standard candle structural high/low alignment.",
    image: image.src
  },
  {
    id: "momentum-pulse",
    name: "Momentum Pulse",
    description: "Uses RSI-style logic to visualize momentum expansion, exhaustion, and neutral zones.",
    howItWorks: "Measures current price speed compared to historical averages. Includes a smoothing factor to filter out minor pullbacks, highlighting strong momentum surges.",
    settings: ["RSI Length (default: 14)", "Overbought Threshold (default: 70)", "Oversold Threshold (default: 30)"],
    formulaBasis: "Relative Strength Index with dual-band smoothing filter to minimize noise.",
    image: image2.src, // suggested source: RSI oscillator panel under a candlestick chart
  },
  {
    id: "volatility-flow",
    name: "Volatility Flow Bands",
    description: "Shows expanding and contracting volatility to help users understand stop placement and target planning.",
    howItWorks: "Tracks standard deviation around a moving average. When bands expand, volatility is surging. When they contract (squeeze), it hints at an impending breakout.",
    settings: ["Basis Length (default: 20)", "Standard Deviation Multiplier (default: 2.0)"],
    formulaBasis: "Average True Range (ATR) & Standard Deviation Band envelopes.",
    image: imag5.src, // suggested source: Bollinger Band squeeze/expansion chart
  },
  {
    id: "volume-map",
    name: "Volume Confirmation Map",
    description: "Demonstrates how volume shifts can support or weaken a market move.",
    howItWorks: "Compares current transaction volume to its 20-period average. Highlights breakouts occurring on below-average volume, warning of potential fakeouts.",
    settings: ["Volume MA Length (default: 20)", "Intensity Threshold (default: 1.5x)"],
    formulaBasis: "Relative Volume Index (RVOL) = Volume / Simple Moving Average (Volume, 20).",
    image: imag4.src, // suggested source: volume histogram beneath a price chart
  },
  {
    id: "mtf-bias",
    name: "Multi-Timeframe Bias Dashboard",
    description: "Displays educational higher-timeframe and lower-timeframe alignment for Gold, BTC, and Forex examples.",
    howItWorks: "Pulls trend direction from the 15m, 1H, 4H, and Daily charts. True alignment occurs when all four boxes match in color, indicating institutional market structure flow.",
    settings: ["Timeframes tracked (default: 15m, 1H, 4H, 1D)", "Core Filter (default: Trend EMA)"],
    formulaBasis: "EMA 50 and Structure High/Low alignment across 4 discrete analytical chart resolutions.",
    image: imag3.src, // suggested source: multi-panel/multi-timeframe dashboard screenshot
  },
  {
    id: "risk-overlay",
    name: "Risk Zone Overlay",
    description: "Marks sample stop-loss, target, and invalidation zones so users can visualize risk before entry.",
    howItWorks: "Automatically draws a shaded box representing the entry, invalidation, and profit-taking levels on your screen. Promotes disciplined risk ratio enforcement.",
    settings: ["Risk-to-Reward Ratio (default: 1:2)", "Stop-Loss Padding (default: 1.0x ATR)"],
    formulaBasis: "Dynamic ATR multipliers locked into hard reward targets based on selected coordinates.",
    image: imag6.src, // suggested source: entry/SL/TP shaded-box chart
  },
];