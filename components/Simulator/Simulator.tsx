import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Settings,
  Play,
  Upload,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  FileText,
  Download,
  Info,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Sliders,
  HelpCircle
} from "lucide-react";
import { Candle, calculateEMA, calculateRSI, calculateATR, detectSwingHighs, detectSwingLows } from "../../utils/indicators";
import { runBacktest, generateSyntheticOHLCV, Trade, StrategySettings } from "../../utils/backtest";
import { parseCSV } from "../../utils/csv";

export default function Simulator() {
  // 1. Core State
  const [market, setMarket] = useState<string>("Gold Demo");
  const [timeframe, setTimeframe] = useState<string>("1h");
  const [seed, setSeed] = useState<string>("smartflow-seed-99");
  
  // Custom CSV Upload state
  const [csvFileName, setCsvFileName] = useState<string>("");
  const [csvCandles, setCsvCandles] = useState<Candle[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Strategy Settings State
  const [settings, setSettings] = useState<StrategySettings>({
    strategyName: "EMA Crossover",
    initialCapital: 10000,
    riskPercent: 1.0,
    feeBps: 4.5,
    slippageBps: 2.0,
    stopLossType: "ATR",
    takeProfitType: "RiskReward",
    emaFast: 20,
    emaSlow: 50,
    rsiLength: 14,
    rsiOverbought: 70,
    rsiOversold: 30,
    atrLength: 14,
    atrMultiplier: 2.0,
    maxTradesPerDay: 4,
    longShortMode: "long-short",
    sessionFilter: "All Sessions",
    customIf: "EMA Fast > EMA Slow",
    customAnd: "None",
    customThen: "BUY (Long)",
    customExit: "TP/SL or Reversal"
  });

  // Simulator Run Output State
  const [candles, setCandles] = useState<Candle[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [equityCurve, setEquityCurve] = useState<number[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"equity" | "log" | "rules" | "risk" | "setup">("equity");

  // Chart view limits (Zooming/Scrolling)
  const [chartStartIndex, setChartStartIndex] = useState<number>(0);
  const [chartWindowSize, setChartWindowSize] = useState<number>(60);
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);
  const [hoveredTrade, setHoveredTrade] = useState<Trade | null>(null);

  // Playback & Standby Ticker states
  const [fullCandles, setFullCandles] = useState<Candle[]>([]);
  const [fullTrades, setFullTrades] = useState<Trade[]>([]);
  const [fullEquityCurve, setFullEquityCurve] = useState<number[]>([]);
  const [fullMetrics, setFullMetrics] = useState<any>(null);
  
  const [playbackIndex, setPlaybackIndex] = useState<number>(0);
  const [isPlaybackActive, setIsPlaybackActive] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(60); // ms per bar
  const [isStandbyActive, setIsStandbyActive] = useState<boolean>(true);
  const [standbyTick, setStandbyTick] = useState<number>(0);

  // Playback timeline controller effects
  useEffect(() => {
    if (!isPlaybackActive) return;

    const interval = setInterval(() => {
      setPlaybackIndex((prev) => {
        const next = prev + 1;
        if (next >= fullCandles.length) {
          setIsPlaybackActive(false);
          setIsStandbyActive(false); // Standby turns off when a backtest run completes
          return fullCandles.length;
        }
        return next;
      });
    }, playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaybackActive, playbackSpeed, fullCandles.length]);

  // Synchronize playback slice or standby data
  useEffect(() => {
    if (fullCandles.length === 0) return;

    requestAnimationFrame(() => {
      if (isPlaybackActive) {
        const slicedCandles = fullCandles.slice(0, playbackIndex);
        setCandles(slicedCandles);

        // Slice trades: show trades that occur before the current timeline index
        const slicedTrades = fullTrades.filter((t) => {
          const candleIdx = fullCandles.findIndex((c) => c.date === t.date);
          return candleIdx !== -1 && candleIdx < playbackIndex;
        });
        setTrades(slicedTrades);

        const slicedEquity = fullEquityCurve.slice(0, playbackIndex);
        setEquityCurve(slicedEquity);
        setMetrics(fullMetrics);

        // Scroll view to follow the playback head
        const windowSize = Math.min(60, slicedCandles.length);
        setChartWindowSize(windowSize);
        setChartStartIndex(Math.max(0, slicedCandles.length - windowSize));
      } else if (!isStandbyActive) {
        // Replay finished, render final state
        setCandles(fullCandles);
        setTrades(fullTrades);
        setEquityCurve(fullEquityCurve);
        setMetrics(fullMetrics);

        const windowSize = Math.min(60, fullCandles.length);
        setChartWindowSize(windowSize);
        setChartStartIndex(Math.max(0, fullCandles.length - windowSize));
      }
    });
  }, [playbackIndex, isPlaybackActive, isStandbyActive, fullCandles, fullTrades, fullEquityCurve, fullMetrics]);

  // Standby real-time live ticking loop
  useEffect(() => {
    if (!isStandbyActive || isPlaybackActive) return;

    const interval = setInterval(() => {
      setStandbyTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isStandbyActive, isPlaybackActive]);

  useEffect(() => {
    if (!isStandbyActive || isPlaybackActive || fullCandles.length === 0) return;

    requestAnimationFrame(() => {
      // Simulate real-time breathing ticks on the last candle of the current series
      setCandles((prevCandles) => {
        if (prevCandles.length === 0) return prevCandles;
        const updated = [...prevCandles];
        const lastIdx = updated.length - 1;
        const last = { ...updated[lastIdx] };

        // Micro-ticks +/- 0.1% for realistic standby movement
        const changePercent = (Math.random() - 0.5) * 0.002;
        const newClose = last.close * (1 + changePercent);
        last.close = Number(newClose.toFixed(5));
        if (last.close > last.high) last.high = last.close;
        if (last.close < last.low) last.low = last.close;

        updated[lastIdx] = last;
        return updated;
      });

      // Also vibrate the final equity curve data slightly in sync
      setEquityCurve((prevEquity) => {
        if (prevEquity.length === 0) return prevEquity;
        const updated = [...prevEquity];
        const lastIdx = updated.length - 1;
        const lastVal = updated[lastIdx];
        const changePercent = (Math.random() - 0.5) * 0.0006;
        updated[lastIdx] = Number((lastVal * (1 + changePercent)).toFixed(2));
        return updated;
      });
    });
  }, [standbyTick, isStandbyActive, isPlaybackActive, fullCandles]);

  // 3. Simulation Handler
  const runSimulation = (customSeed = seed, triggerPlayback = false) => {
    setSimRunning(true);
    setTimeout(() => {
      let activeCandles: Candle[] = [];
      
      if (market === "Custom CSV" && csvCandles.length > 0) {
        activeCandles = [...csvCandles];
      } else {
        // Generate pseudo-random deterministic candles
        const size = market.includes("BTC") ? 200 : 150;
        activeCandles = generateSyntheticOHLCV(customSeed + market + timeframe, size, market);
      }

      const results = runBacktest(activeCandles, settings, market);
      
      setFullCandles(activeCandles);
      setFullTrades(results.trades);
      setFullEquityCurve(results.equityCurve);
      setFullMetrics(results.metrics);

      if (triggerPlayback) {
        // Start timeline replay playback!
        setIsPlaybackActive(true);
        setIsStandbyActive(false);
        setPlaybackIndex(Math.min(30, activeCandles.length)); // Start with first 30 bars loaded
      } else {
        // Initial setup/standby: show entire charts, breathe on stand-by
        setCandles(activeCandles);
        setTrades(results.trades);
        setEquityCurve(results.equityCurve);
        setMetrics(results.metrics);
        setIsPlaybackActive(false);
        setIsStandbyActive(true);

        const windowSize = Math.min(60, activeCandles.length);
        setChartWindowSize(windowSize);
        setChartStartIndex(Math.max(0, activeCandles.length - windowSize));
      }

      setSimRunning(false);
    }, 300);
  };

  const handleExecuteBacktest = () => {
    const randomSuffix = Math.floor(Math.random() * 1000).toString();
    const newSeed = "smartflow-seed-" + randomSuffix;
    setSeed(newSeed);
    runSimulation(newSeed, true); // Play back the simulation with animated timeline!
  };

  // 2. Generate Initial Data on load and reactive updates on any changes
  useEffect(() => {
    const timer = setTimeout(() => {
      runSimulation();
    }, 50);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market, timeframe, seed, settings, csvCandles]);

  // 4. File Upload Handlers
  const handleCSVUpload = (text: string, filename: string) => {
    try {
      const parsed = parseCSV(text);
      if (parsed.length === 0) {
        alert("The uploaded CSV has no valid bars or incorrect headers.");
        return;
      }
      setCsvCandles(parsed);
      setCsvFileName(filename);
      setMarket("Custom CSV");
      alert(`Loaded ${parsed.length} candles from ${filename} successfully!`);
    } catch (err: any) {
      alert(`CSV Parsing failed: ${err.message || err}`);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleCSVUpload(event.target.result as string, file.name);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleCSVUpload(event.target.result as string, file.name);
        }
      };
      reader.readAsText(file);
    }
  };

  const clearCSV = () => {
    setCsvCandles([]);
    setCsvFileName("");
    if (market === "Custom CSV") {
      setMarket("Gold Demo");
    }
  };

  // 5. Download Log
  const downloadCSVReport = () => {
    if (trades.length === 0) return;
    
    const headers = "TradeID,DateTime,Market,Direction,Entry,Exit,Stop,Target,PositionSize,PnL,R_Multiple,ExitReason\n";
    const rows = trades.map(t => 
      `${t.id},"${t.date}","${t.market}",${t.direction},${t.entry},${t.exit},${t.stop},${t.target},${t.positionSize},${t.pnl},${t.rMultiple},${t.exitReason}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `smartflow_${market.toLowerCase().replace(/[^a-z0-9]/g, "_")}_report.csv`);
    a.click();
  };

  // 6. Interactive Chart Calculation
  const visibleCandles = candles.slice(chartStartIndex, chartStartIndex + chartWindowSize);
  const visibleTrades = trades.filter(t => {
    const matchedCandles = candles.filter(c => c.date === t.date);
    if (matchedCandles.length === 0) return false;
    const idx = candles.indexOf(matchedCandles[0]);
    return idx >= chartStartIndex && idx < chartStartIndex + chartWindowSize;
  });

  // Calculate high-fidelity chart dimensions
  const chartHeight = 320;
  const priceMargin = 0.05; // 5% padding top and bottom

  const pricesInWindow = visibleCandles.flatMap(c => [c.high, c.low]);
  const minPrice = pricesInWindow.length > 0 ? Math.min(...pricesInWindow) : 0;
  const maxPrice = pricesInWindow.length > 0 ? Math.max(...pricesInWindow) : 100;
  const priceRange = maxPrice - minPrice || 1;
  const paddedMinPrice = minPrice - priceRange * priceMargin;
  const paddedMaxPrice = maxPrice + priceRange * priceMargin;
  const paddedRange = paddedMaxPrice - paddedMinPrice;

  // Chart y-scaling function
  const getY = (val: number) => {
    return chartHeight - ((val - paddedMinPrice) / paddedRange) * chartHeight;
  };

  // Render Strategy Plain-English text
  const getStrategyPlainEnglish = () => {
    if (settings.strategyName === "EMA Crossover") {
      return `EMA Crossover Strategy: Enter LONG when the Fast Exponential Moving Average (${settings.emaFast} period) crosses ABOVE the Slow Exponential Moving Average (${settings.emaSlow} period). Enter SHORT (if enabled) when Fast EMA crosses BELOW Slow EMA. Exit occurs on opposite crossover, stop-loss hit (${settings.stopLossType}), or take-profit target (${settings.takeProfitType}) hit.`;
    }
    if (settings.strategyName === "RSI Mean Reversion") {
      return `RSI Mean Reversion Strategy: Enter LONG when the Relative Strength Index (${settings.rsiLength} period) falls below oversold (${settings.rsiOversold}) and then crosses back ABOVE it. Enter SHORT when RSI climbs above overbought (${settings.rsiOverbought}) and crosses back BELOW. Exit occurs on stop-loss hit, take-profit target hit, or RSI returning to neutral 50.`;
    }
    if (settings.strategyName === "Smartflow Trend") {
      return `Smartflow Trend Strategy: Aligns multiple EMAs to find directional bias. Enter LONG only if the asset is trending upward (Close is above Slow EMA ${settings.emaSlow}), and RSI (${settings.rsiLength} period) pulls back below 40 and then crosses back above. Exit is driven by structural trend reversal or strict risk parameters.`;
    }
    if (settings.strategyName === "Volatility Breakout") {
      return `Volatility Breakout Strategy: Evaluates ATR (${settings.atrLength} period) compression. Enter LONG when current ATR is below the historical moving average (squeezed) and price closes ABOVE the previous candle's high on expanding range. Exit targets are locked in using a fixed Risk-to-Reward ratio.`;
    }
    if (settings.strategyName === "Structure Retest") {
      return `Structure Retest Strategy: Automatically detects swing highs and swing lows. Enter LONG when price pulls back to retest a previous swing low (within a 0.2% price buffer) and demonstrates rejection. Exit invalidation is placed immediately below the tested swing point.`;
    }
    return `Custom Rule Builder: IF ${settings.customIf} AND ${settings.customAnd === "None" ? "no secondary filter" : settings.customAnd} THEN execute ${settings.customThen}. Positions are managed with a strict ${settings.stopLossType} stop-loss, and ${settings.takeProfitType} take-profit target, and exit via ${settings.customExit}.`;
  };

  // Pre-calculate indicators for rendering
  const closes = candles.map(c => c.close);
  const emaFastList = calculateEMA(closes, settings.emaFast);
  const emaSlowList = calculateEMA(closes, settings.emaSlow);
  const swingHighs = detectSwingHighs(candles, 5);
  const swingLows = detectSwingLows(candles, 5);

  // Decimal settings for formatting
  const decimals = market.includes("EUR") || market.includes("GBP") ? 5 : market.includes("JPY") ? 3 : 2;

  // Let's determine the focus trade (hovered or last visible trade)
  const focusTrade = hoveredTrade || (visibleTrades.length > 0 ? visibleTrades[visibleTrades.length - 1] : null);

  // Calculate target levels if we have a focusTrade
  const levels = (() => {
    if (!focusTrade) return null;
    const R = Math.abs(focusTrade.entry - focusTrade.stop);
    const isLong = focusTrade.direction === "LONG";
    return {
      stop: focusTrade.stop,
      entry: focusTrade.entry,
      tp1: isLong ? focusTrade.entry + R * 1.0 : focusTrade.entry - R * 1.0,
      tp2: isLong ? focusTrade.entry + R * 2.0 : focusTrade.entry - R * 2.0,
      tp3: isLong ? focusTrade.entry + R * 3.0 : focusTrade.entry - R * 3.0,
      finalTp: isLong ? focusTrade.entry + R * 4.0 : focusTrade.entry - R * 4.0,
    };
  })();

  // Determine if trend is bullish
  const isTrendBullish = closes.length > 0 && emaSlowList.length > 0 
    ? closes[closes.length - 1] > emaSlowList[emaSlowList.length - 1] 
    : true;

  return (
    <div id="algo-simulator-component" className="space-y-8">
      {/* Grid: Left Panel Controls, Right Dashboard Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: 4 columns in desktop - Configuration & Settings */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
              <Settings className="h-5 w-5 text-blue-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Simulator Controls</h3>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
              
              {/* Asset preset */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Select Demo Market
                </label>
                <select
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  id="sim-input-market"
                >
                  <option value="Gold Demo">Gold (XAU/USD) Demo Preset</option>
                  <option value="BTC Demo">Bitcoin (BTC/USD) Demo Preset</option>
                  <option value="EUR/USD Demo">EUR/USD Forex Demo Preset</option>
                  <option value="GBP/USD Demo">GBP/USD Forex Demo Preset</option>
                  <option value="USD/JPY Demo">USD/JPY Forex Demo Preset</option>
                  {csvCandles.length > 0 && <option value="Custom CSV">Custom CSV: {csvFileName}</option>}
                </select>
              </div>

              {/* Timeframe */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Trading Timeframe
                </label>
                <div className="grid grid-cols-5 gap-1" id="sim-timeframe-grid">
                  {["5m", "15m", "1h", "4h", "1D"].map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      disabled={market === "Custom CSV"}
                      onClick={() => setTimeframe(tf)}
                      className={`py-1.5 text-xs font-semibold rounded-md border text-center transition-all cursor-pointer ${
                        timeframe === tf
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                      } ${market === "Custom CSV" ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Strategy Select */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Algo Trading Strategy
                </label>
                <select
                  value={settings.strategyName}
                  onChange={(e) => setSettings({ ...settings, strategyName: e.target.value })}
                  className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  id="sim-input-strategy"
                >
                  <option value="EMA Crossover">EMA Crossover (Trend Follow)</option>
                  <option value="RSI Mean Reversion">RSI Mean Reversion (Oscillator)</option>
                  <option value="Smartflow Trend">Smartflow Trend Ribbon</option>
                  <option value="Volatility Breakout">Volatility Breakout (ATR Squeeze)</option>
                  <option value="Structure Retest">Structure Retest (Swing Zone)</option>
                  <option value="Custom Rule Builder">Custom Rule Builder ⚙️</option>
                </select>
              </div>

              {/* Dynamic Strategy Setting Sub-Panel */}
              {settings.strategyName === "Custom Rule Builder" && (
                <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <Sliders className="h-4 w-4 text-indigo-500" />
                    <span>Rule Builder Nodes</span>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-semibold uppercase mb-1">IF Condition</span>
                      <select
                        value={settings.customIf}
                        onChange={(e) => setSettings({ ...settings, customIf: e.target.value })}
                        className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                      >
                        <option value="EMA Fast > EMA Slow">EMA Fast &gt; EMA Slow</option>
                        <option value="RSI < Oversold">RSI &lt; Oversold ({settings.rsiOversold})</option>
                        <option value="Price > EMA Slow">Price &gt; EMA Slow ({settings.emaSlow})</option>
                      </select>
                    </div>

                    <div>
                      <span className="block text-[10px] text-slate-500 font-semibold uppercase mb-1">AND secondary filter</span>
                      <select
                        value={settings.customAnd}
                        onChange={(e) => setSettings({ ...settings, customAnd: e.target.value })}
                        className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                      >
                        <option value="None">None (Single Filter)</option>
                        <option value="RSI < Oversold">RSI &lt; Oversold ({settings.rsiOversold})</option>
                        <option value="RSI > Overbought">RSI &gt; Overbought ({settings.rsiOverbought})</option>
                        <option value="EMA Fast > EMA Slow">EMA Fast &gt; EMA Slow</option>
                      </select>
                    </div>

                    <div>
                      <span className="block text-[10px] text-slate-500 font-semibold uppercase mb-1">THEN Execute</span>
                      <select
                        value={settings.customThen}
                        onChange={(e) => setSettings({ ...settings, customThen: e.target.value })}
                        className="w-full px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                      >
                        <option value="BUY (Long)">BUY (Long)</option>
                        <option value="SELL (Short)">SELL (Short)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Position sizing details */}
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                    Initial Capital
                  </label>
                  <input
                    type="number"
                    value={settings.initialCapital}
                    onChange={(e) => setSettings({ ...settings, initialCapital: Math.max(100, parseInt(e.target.value) || 0) })}
                    className="w-full text-xs px-2.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                    id="sim-input-capital"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                    Risk Per Trade %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.riskPercent}
                    onChange={(e) => setSettings({ ...settings, riskPercent: Math.max(0.1, parseFloat(e.target.value) || 0) })}
                    className="w-full text-xs px-2.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none"
                    id="sim-input-risk"
                  />
                </div>
              </div>

              {/* Collapsible advanced sliders */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4 space-y-3.5">
                <span className="block text-[11px] font-bold text-slate-900 dark:text-slate-300 uppercase tracking-wider">
                  Technical Parameters
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">EMA Fast Length</label>
                    <input
                      type="number"
                      value={settings.emaFast}
                      onChange={(e) => setSettings({ ...settings, emaFast: Math.max(2, parseInt(e.target.value) || 0) })}
                      className="w-full text-xs p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">EMA Slow Length</label>
                    <input
                      type="number"
                      value={settings.emaSlow}
                      onChange={(e) => setSettings({ ...settings, emaSlow: Math.max(5, parseInt(e.target.value) || 0) })}
                      className="w-full text-xs p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">RSI length</label>
                    <input
                      type="number"
                      value={settings.rsiLength}
                      onChange={(e) => setSettings({ ...settings, rsiLength: Math.max(2, parseInt(e.target.value) || 0) })}
                      className="w-full text-xs p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">ATR Multiplier</label>
                    <input
                      type="number"
                      step="0.1"
                      value={settings.atrMultiplier}
                      onChange={(e) => setSettings({ ...settings, atrMultiplier: Math.max(0.5, parseFloat(e.target.value) || 0) })}
                      className="w-full text-xs p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded text-slate-800 dark:text-slate-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Risk Mode</label>
                    <select
                      value={settings.longShortMode}
                      onChange={(e: any) => setSettings({ ...settings, longShortMode: e.target.value })}
                      className="w-full text-xs p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded text-slate-800 dark:text-slate-200 focus:outline-none font-medium"
                    >
                      <option value="long-only">Long Only</option>
                      <option value="long-short">Long & Short</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Stop-Loss Type</label>
                    <select
                      value={settings.stopLossType}
                      onChange={(e: any) => setSettings({ ...settings, stopLossType: e.target.value })}
                      className="w-full text-xs p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded text-slate-800 dark:text-slate-200 focus:outline-none font-medium"
                    >
                      <option value="ATR">ATR Volatility</option>
                      <option value="Fixed">Fixed 1% Stop</option>
                      <option value="Swing">Swing High/Low</option>
                    </select>
                  </div>
                </div>

                {/* Session Filter dropdown */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">Session Filter</label>
                  <select
                    value={settings.sessionFilter}
                    onChange={(e: any) => setSettings({ ...settings, sessionFilter: e.target.value })}
                    className="w-full text-xs p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded text-slate-800 dark:text-slate-200 focus:outline-none font-medium"
                  >
                    <option value="All Sessions">All Global Sessions</option>
                    <option value="Asian">Asian Session (00:00 - 09:00 UTC)</option>
                    <option value="London">London Session (08:00 - 16:00 UTC)</option>
                    <option value="New York">New York Session (13:00 - 21:00 UTC)</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleExecuteBacktest}
                type="button"
                disabled={simRunning}
                className="w-full mt-6 py-3.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none uppercase tracking-wider"
                id="sim-run-btn"
              >
                {simRunning ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Crunching Data...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Execute Backtest Run
                  </>
                )}
              </button>
            </div>
          </div>

          {/* DRAG AND DROP CSV ZONE */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
              dragActive
                ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            }`}
            id="csv-upload-dropzone"
          >
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-slate-400 mb-2" />
              <h4 className="text-xs font-bold text-slate-800 dark:text-white">Run Strategy on Custom CSV</h4>
              <p className="text-[10px] text-slate-500 max-w-[200px] mt-1 mx-auto leading-normal">
                Drag & drop or click to upload a CSV file with: <strong>date, open, high, low, close, volume</strong>.
              </p>

              {csvFileName ? (
                <div className="mt-4 flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-blue-700 dark:text-blue-400">
                  <span className="truncate max-w-[120px]">{csvFileName}</span>
                  <button onClick={clearCSV} type="button" className="text-red-500 hover:text-red-700 font-bold" title="Remove CSV file">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <label className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-bold rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700">
                  Select CSV File
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: 8 columns in desktop - Output stats, chart & tables */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Summary Metric Cards */}
          {metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" id="sim-metrics-grid">
              
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Net Return</span>
                <span className={`block text-xl font-extrabold mt-1 ${metrics.netPnl >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {metrics.netPnl >= 0 ? "+" : ""}{metrics.netPnl.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </span>
                <span className={`text-[10px] font-bold ${metrics.netPnl >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {metrics.netPnl >= 0 ? "▲" : "▼"} {metrics.returnPercent}%
                </span>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Win Rate</span>
                <span className="block text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {metrics.winRate}%
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {metrics.totalTrades} Total Trades
                </span>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Max Drawdown</span>
                <span className="block text-xl font-extrabold text-rose-500 mt-1">
                  -{metrics.maxDrawdown}%
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Peak Capital Safe
                </span>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Profit Factor</span>
                <span className={`block text-xl font-extrabold mt-1 ${metrics.profitFactor >= 1.5 ? "text-emerald-500" : metrics.profitFactor >= 1.0 ? "text-amber-500" : "text-rose-500"}`}>
                  {metrics.profitFactor}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Average R: {metrics.avgR}
                </span>
              </div>

            </div>
          )}

          {/* Trade Statistics Summary Panel */}
          {metrics && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-6 shadow-sm space-y-4 animate-fade-in" id="trade-statistics-panel">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">Trade Statistics Summary</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Detailed performance analytics from backtest executions</p>
                  </div>
                </div>
                <div className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Session: {settings.sessionFilter}
                </div>
              </div>

              {/* Grid Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Win/Loss Breakdown */}
                <div className="space-y-3">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Win / Loss Breakdown</span>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] text-slate-500 font-medium">Total Trades</span>
                      <span className="text-2xl font-black text-slate-800 dark:text-white">{metrics.totalTrades}</span>
                    </div>

                    {/* Progress Bar Split */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold">
                        <span className="text-emerald-500">Wins: {trades.filter(t => t.pnl > 0).length} ({metrics.winRate}%)</span>
                        <span className="text-rose-500">Losses: {trades.filter(t => t.pnl <= 0).length} ({100 - metrics.winRate}%)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                        <div 
                          style={{ width: `${metrics.winRate}%` }} 
                          className="h-full bg-emerald-500 transition-all duration-500"
                        />
                        <div 
                          style={{ width: `${100 - metrics.winRate}%` }} 
                          className="h-full bg-rose-500 transition-all duration-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="text-[10px] bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-lg p-2 text-center">
                        <span className="block text-slate-500 text-[9px] font-bold uppercase">Avg Win</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                          ${(trades.filter(t => t.pnl > 0).length > 0 
                            ? trades.filter(t => t.pnl > 0).reduce((sum, t) => sum + t.pnl, 0) / trades.filter(t => t.pnl > 0).length 
                            : 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[10px] bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-lg p-2 text-center">
                        <span className="block text-slate-500 text-[9px] font-bold uppercase">Avg Loss</span>
                        <span className="font-mono text-rose-600 dark:text-rose-400 font-bold text-xs">
                          ${Math.abs(trades.filter(t => t.pnl <= 0).length > 0 
                            ? trades.filter(t => t.pnl <= 0).reduce((sum, t) => sum + t.pnl, 0) / trades.filter(t => t.pnl <= 0).length 
                            : 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Performance */}
                <div className="space-y-3">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Financial Performance</span>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850 space-y-2.5">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-[10px] text-slate-500 font-semibold">Total Profit/Loss</span>
                      <span className={`font-mono text-base font-bold ${metrics.netPnl >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                        {metrics.netPnl >= 0 ? "+" : ""}{metrics.netPnl.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                      <span>Gross Profit</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        ${trades.filter(t => t.pnl > 0).reduce((sum, t) => sum + t.pnl, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                      <span>Gross Loss</span>
                      <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">
                        -${Math.abs(trades.filter(t => t.pnl < 0).reduce((sum, t) => sum + t.pnl, 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium pt-1.5 border-t border-slate-100 dark:border-slate-800">
                      <span>Profit Factor</span>
                      <span className={`font-mono font-bold ${metrics.profitFactor >= 1.5 ? "text-emerald-500" : metrics.profitFactor >= 1.0 ? "text-amber-500" : "text-rose-500"}`}>
                        {metrics.profitFactor}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                      <span>Avg Trade PnL</span>
                      <span className={`font-mono font-semibold ${metrics.netPnl / (metrics.totalTrades || 1) >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                        {metrics.netPnl / (metrics.totalTrades || 1) >= 0 ? "+" : ""}${(metrics.netPnl / (metrics.totalTrades || 1)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Risk and Efficiency Stats */}
                <div className="space-y-3">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Risk & Efficiency Stats</span>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850 space-y-2.5">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                      <span>Max Drawdown</span>
                      <span className="font-mono text-rose-500 font-bold">-{metrics.maxDrawdown}%</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                      <span>Largest Win</span>
                      <span className="font-mono text-emerald-500 font-semibold">+${metrics.largestWin.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                      <span>Largest Loss</span>
                      <span className="font-mono text-rose-500 font-semibold">-${Math.abs(metrics.largestLoss).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium border-t border-slate-100 dark:border-slate-800 pt-2">
                      <span>Broker Fees Paid</span>
                      <span className="font-mono text-slate-600 dark:text-slate-400 font-semibold">${metrics.feesPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
                      <span>Avg R-Multiple</span>
                      <span className="font-mono text-blue-500 font-bold">{metrics.avgR}R</span>
                    </div>
                  </div>
                </div>

                {/* Capital Growth Curve Sparkline */}
                <div className="space-y-3">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Capital Growth Curve</span>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850 space-y-2.5 h-[178px] flex flex-col justify-between">
                    {equityCurve.length > 0 ? (
                      <div className="space-y-2 flex-1 flex flex-col justify-between">
                        <div className="relative flex-1 min-h-[90px] w-full">
                          <svg viewBox="0 0 300 110" width="100%" height="100%" className="overflow-visible absolute inset-0">
                            <defs>
                              <linearGradient id="miniEquityGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>

                            {/* Reference horizontal gridlines */}
                            {[0.2, 0.5, 0.8].map((ratio, gridIdx) => (
                              <line
                                key={gridIdx}
                                x1="0"
                                y1={ratio * 110}
                                x2="300"
                                y2={ratio * 110}
                                stroke="currentColor"
                                className="text-slate-200 dark:text-slate-900"
                                strokeWidth="0.5"
                                strokeDasharray="3,3"
                              />
                            ))}

                            {/* Gradient Area Below Curve */}
                            <motion.path
                              key={`mini-grad-${equityCurve.length}-${seed}`}
                              d={(() => {
                                const maxEquity = Math.max(...equityCurve);
                                const minEquity = Math.min(...equityCurve);
                                const range = maxEquity - minEquity || 1;
                                const points = equityCurve.map((eq, idx) => {
                                  const x = (idx / (equityCurve.length - 1)) * 300;
                                  const y = 100 - ((eq - minEquity) / range) * 90;
                                  return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                                }).join(" ");
                                return `${points} L 300 110 L 0 110 Z`;
                              })()}
                              fill="url(#miniEquityGradient)"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 1.0, delay: 0.5 }}
                            />

                            {/* Drawing Line Path */}
                            <motion.path
                              key={`mini-line-${equityCurve.length}-${seed}`}
                              d={equityCurve.map((eq, idx) => {
                                const maxEquity = Math.max(...equityCurve);
                                const minEquity = Math.min(...equityCurve);
                                const range = maxEquity - minEquity || 1;
                                const x = (idx / (equityCurve.length - 1)) * 300;
                                const y = 100 - ((eq - minEquity) / range) * 90;
                                return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                              }).join(" ")}
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1.6, ease: "easeInOut" }}
                            />
                          </svg>
                        </div>
                        <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono border-t border-slate-100 dark:border-slate-900 pt-1.5 mt-auto">
                          <span>Start: ${settings.initialCapital.toLocaleString()}</span>
                          <span className="text-emerald-500 font-bold">End: ${equityCurve[equityCurve.length - 1].toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[120px] flex items-center justify-center text-slate-500 text-[10px]">
                        No active backtest simulation data.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Interactive Custom SVG Chart */}
          <div className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden shadow-lg">
            
            {/* Chart Info Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-850 text-slate-400 text-xs font-semibold bg-slate-900/60">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">{market}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px]">{timeframe} Timeframe</span>
              </div>
              <div className="text-[10px] flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Green = Bull Close
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 ml-2"></span> Red = Bear Close
              </div>
            </div>

            {/* Price Candlestick SVG Container */}
            <div className="relative select-none bg-slate-900/10 dark:bg-[#020617] dark:bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] overflow-hidden min-h-[400px]">
              
              {/* SYSTEM TIMELINE STATUS PILL (Floating Top-Left) */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                <div className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 rounded-full px-3 py-1 shadow-xl backdrop-blur-sm">
                  {isPlaybackActive ? (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                      <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wide">
                        Replay Playback Active (Bar {playbackIndex + 1} / {fullCandles.length})
                      </span>
                    </>
                  ) : isStandbyActive ? (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wide">
                        System Standby: Live Market Breathing Active
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-slate-600"></span>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide">
                        Simulator Ready
                      </span>
                    </>
                  )}
                </div>
                
                {/* Additional subtext warning about trajectory */}
                {isPlaybackActive && (
                  <div className="bg-slate-950/70 border border-slate-900/50 rounded-lg px-2.5 py-1 text-[9px] font-mono text-slate-400">
                    <span className="text-emerald-400 font-bold">✓ Day Trade Trajectory bias:</span> Positive Growth
                  </div>
                )}
              </div>

              {/* SMARTFLOWALGO VIP V7 Dashboard (Floating Top-Right) */}
              <div className="absolute top-4 right-4 z-10 w-[200px] bg-slate-950/95 border border-amber-500/30 rounded-xl p-3 text-white font-mono text-[9px] shadow-2xl backdrop-blur-sm space-y-1">
                <div className="text-amber-400 font-extrabold border-b border-amber-500/20 pb-1 mb-1.5 flex items-center justify-between text-[10px]">
                  <span>SMARTFLOWALGO</span>
                  <span className="text-[8px] bg-amber-500/10 px-1 rounded text-amber-300">VIP V7</span>
                </div>
                <div className="space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span>STATUS:</span>
                    <span className={`font-bold px-1 rounded ${
                      focusTrade 
                        ? (focusTrade.direction === "LONG" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400")
                        : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {focusTrade ? `${focusTrade.direction} ACTIVE` : "WAITING"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>SYMBOL:</span>
                    <span className="font-bold text-white">{market.replace(" Demo", "")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TIMEFRAME:</span>
                    <span className="font-bold text-white">{timeframe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TREND:</span>
                    <span className={`font-bold ${isTrendBullish ? "text-emerald-400" : "text-rose-400"}`}>
                      {isTrendBullish ? "BULLISH" : "BEARISH"}
                    </span>
                  </div>
                  <div className="border-t border-slate-900 my-1 pt-1 space-y-1">
                    <div className="flex justify-between">
                      <span>ENTRY:</span>
                      <span className="text-blue-400 font-bold bg-blue-500/10 px-1 rounded">
                        {focusTrade ? focusTrade.entry.toFixed(decimals) : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>STOP (SL):</span>
                      <span className="text-rose-400 font-bold bg-rose-500/10 px-1 rounded">
                        {focusTrade ? focusTrade.stop.toFixed(decimals) : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>TP1:</span>
                      <span className="text-emerald-400">
                        {focusTrade && levels ? levels.tp1.toFixed(decimals) : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>TP2:</span>
                      <span className="text-emerald-400">
                        {focusTrade && levels ? levels.tp2.toFixed(decimals) : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>TP3:</span>
                      <span className="text-emerald-400">
                        {focusTrade && levels ? levels.tp3.toFixed(decimals) : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>FINAL TP:</span>
                      <span className="text-emerald-400 font-bold">
                        {focusTrade && levels ? levels.finalTp.toFixed(decimals) : "-"}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-slate-900 pt-1 text-[8px] text-amber-500/80 text-center">
                    TELEGRAM: @smartflowalgo
                  </div>
                </div>
              </div>

              {/* SMARTFLOWALGO LAST 10 PERFORMANCE (Floating Bottom-Left) */}
              {trades.length > 0 && (
                <div className="absolute bottom-4 left-4 z-10 w-[220px] bg-slate-950/95 border border-amber-500/30 rounded-xl p-3 text-white font-mono text-[10px] shadow-2xl backdrop-blur-sm">
                  <div className="text-amber-400 font-bold border-b border-amber-500/20 pb-1 mb-1.5 flex items-center justify-between">
                    <span>LAST 10 PERFORMANCE</span>
                    <span className="text-[8px] bg-emerald-500/10 px-1 rounded text-emerald-400">LIVE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-2 border-b border-slate-800 pb-1.5 text-slate-300">
                    <div className="flex justify-between"><span>Trades:</span><span className="font-bold text-white">{trades.slice(-10).length}</span></div>
                    <div className="flex justify-between"><span>Wins:</span><span className="font-bold text-emerald-400">{trades.slice(-10).filter(t => t.pnl > 0).length}</span></div>
                    <div className="flex justify-between"><span>Losses:</span><span className="font-bold text-rose-400">{trades.slice(-10).filter(t => t.pnl <= 0).length}</span></div>
                    <div className="flex justify-between"><span>Win Rate:</span><span className="font-bold text-amber-400">{trades.slice(-10).length > 0 ? Math.round((trades.slice(-10).filter(t => t.pnl > 0).length / trades.slice(-10).length) * 100) : 100}%</span></div>
                  </div>
                  <div className="max-h-[80px] overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-slate-800 text-[9px]">
                    {trades.slice(-10).reverse().map((t, idx) => (
                      <div key={t.id} className="flex items-center justify-between border-b border-slate-900 pb-0.5">
                        <span className="text-slate-500">#{t.id}</span>
                        <span className={`font-bold ${t.direction === "LONG" ? "text-emerald-500" : "text-rose-500"}`}>{t.direction}</span>
                        <span className={t.pnl >= 0 ? "text-emerald-400 font-bold" : "text-rose-400"}>
                          {t.pnl >= 0 ? "WIN ✅" : "LOSS ❌"}
                        </span>
                        <span className={t.pnl >= 0 ? "text-emerald-400" : "text-rose-400"}>${Math.abs(t.pnl).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {candles.length > 0 ? (
                <svg
                  viewBox="0 0 1000 320"
                  width="100%"
                  height={chartHeight + 80}
                  className="overflow-visible"
                  id="candle-chart-svg"
                >
                  {/* Grid Lines */}
                  {[0.2, 0.4, 0.6, 0.8].map((ratio, idx) => {
                    const priceVal = paddedMinPrice + paddedRange * ratio;
                    const y = getY(priceVal);
                    return (
                      <g key={idx} className="opacity-10">
                        <line x1="0" y1={y} x2="1000" y2={y} stroke="#38BDF8" strokeWidth="1" strokeDasharray="3,3" />
                        <text x="10" y={y - 4} fill="#E2E8F0" fontSize="9" className="font-mono">
                          {priceVal.toFixed(market.includes("USD") ? 5 : 2)}
                        </text>
                      </g>
                    );
                  })}

                  {(() => {
                    const barWidth = 1000 / visibleCandles.length;

                    // Compute start and end indices of focusTrade in visible candles for Risk-Reward Overlay
                    const entryCandleIndex = focusTrade ? visibleCandles.findIndex(c => c.date === focusTrade.entryDate || c.date === focusTrade.date) : -1;
                    const exitCandleIndex = focusTrade ? visibleCandles.findIndex(c => c.date === focusTrade.date) : -1;
                    const startIdx = entryCandleIndex !== -1 ? entryCandleIndex : 0;
                    const endIdx = exitCandleIndex !== -1 ? exitCandleIndex : visibleCandles.length - 1;

                    const xEntry = startIdx * barWidth + barWidth / 2;
                    const xExit = endIdx * barWidth + barWidth / 2;
                    const isLong = focusTrade?.direction === "LONG";

                    return (
                      <g>
                        {/* 1. SMARTFLOWALGO EMA CLOUD / TREND RIBBON */}
                        {visibleCandles.map((c, idx) => {
                          if (idx === 0) return null;
                          const globalIdx = chartStartIndex + idx;
                          const prevGlobalIdx = globalIdx - 1;
                          
                          const f1 = emaFastList[prevGlobalIdx];
                          const s1 = emaSlowList[prevGlobalIdx];
                          const f2 = emaFastList[globalIdx];
                          const s2 = emaSlowList[globalIdx];
                          
                          if (f1 === undefined || s1 === undefined || f2 === undefined || s2 === undefined) return null;
                          if (isNaN(f1) || isNaN(s1) || isNaN(f2) || isNaN(s2)) return null;

                          const x1 = (idx - 1) * barWidth + barWidth / 2;
                          const x2 = idx * barWidth + barWidth / 2;
                          const yF1 = getY(f1);
                          const yS1 = getY(s1);
                          const yF2 = getY(f2);
                          const yS2 = getY(s2);
                          
                          const isBull = f2 > s2;
                          const fillCol = isBull ? "rgba(16, 185, 129, 0.16)" : "rgba(239, 68, 68, 0.16)";
                          const strokeCol = isBull ? "rgba(16, 185, 129, 0.35)" : "rgba(239, 68, 68, 0.35)";
                          
                          return (
                            <g key={`cloud-segment-${idx}`} className="pointer-events-none">
                              <polygon
                                points={`${x1},${yF1} ${x2},${yF2} ${x2},${yS2} ${x1},${yS1}`}
                                fill={fillCol}
                              />
                              <line x1={x1} y1={yF1} x2={x2} y2={yF2} stroke={strokeCol} strokeWidth="1.2" />
                              <line x1={x1} y1={yS1} x2={x2} y2={yS2} stroke={strokeCol} strokeWidth="1.2" />
                            </g>
                          );
                        })}

                        {/* 2. RISK-TO-REWARD TARGET SHADED BOXES OVERLAY */}
                        {focusTrade && levels && (
                          <g className="pointer-events-none">
                            {/* Target (Profit) Rect */}
                            <motion.rect
                              x={xEntry}
                              y={Math.min(getY(focusTrade.entry), getY(levels.finalTp))}
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: Math.max(10, xExit - xEntry), opacity: 1 }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              height={Math.abs(getY(focusTrade.entry) - getY(levels.finalTp))}
                              fill={isLong ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)"}
                              stroke={isLong ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}
                              strokeWidth="1"
                            />
                            {/* Stop (Loss) Rect */}
                            <motion.rect
                              x={xEntry}
                              y={Math.min(getY(focusTrade.entry), getY(levels.stop))}
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: Math.max(10, xExit - xEntry), opacity: 1 }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              height={Math.abs(getY(focusTrade.entry) - getY(levels.stop))}
                              fill={isLong ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)"}
                              stroke={isLong ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"}
                              strokeWidth="1"
                            />

                            {/* 3. DYNAMIC DASHED TARGET LEVEL LINES & PRICE LABELS */}
                            {/* STOP Loss Line */}
                            <motion.line 
                              x1={xEntry} 
                              y1={getY(levels.stop)} 
                              x2="1000" 
                              y2={getY(levels.stop)} 
                              stroke="#EF4444" 
                              strokeWidth="1.2" 
                              strokeDasharray="4,4" 
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 0.6 }}
                            />
                            <motion.rect 
                              x="875" 
                              y={getY(levels.stop) - 8} 
                              width="120" 
                              height="16" 
                              rx="4" 
                              fill="#EF4444" 
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                            />
                            <text x="935" y={getY(levels.stop) + 4} fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                              STOP {levels.stop.toFixed(decimals)}
                            </text>

                            {/* ENTRY Line */}
                            <motion.line 
                              x1={xEntry} 
                              y1={getY(focusTrade.entry)} 
                              x2="1000" 
                              y2={getY(focusTrade.entry)} 
                              stroke="#3B82F6" 
                              strokeWidth="1.2" 
                              strokeDasharray="4,4" 
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 0.6 }}
                            />
                            <motion.rect 
                              x="875" 
                              y={getY(focusTrade.entry) - 8} 
                              width="120" 
                              height="16" 
                              rx="4" 
                              fill="#3B82F6" 
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                            />
                            <text x="935" y={getY(focusTrade.entry) + 4} fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                              ENTRY {focusTrade.entry.toFixed(decimals)}
                            </text>

                            {/* TP1 Line */}
                            <motion.line 
                              x1={xEntry} 
                              y1={getY(levels.tp1)} 
                              x2="1000" 
                              y2={getY(levels.tp1)} 
                              stroke="#10B981" 
                              strokeWidth="1" 
                              strokeDasharray="3,3" 
                              strokeOpacity="0.7" 
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.7 }}
                              transition={{ duration: 0.6 }}
                            />
                            <motion.rect 
                              x="875" 
                              y={getY(levels.tp1) - 8} 
                              width="120" 
                              height="16" 
                              rx="4" 
                              fill="#10B981" 
                              fillOpacity="0.8" 
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 0.8 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                            />
                            <text x="935" y={getY(levels.tp1) + 4} fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                              TP1 {levels.tp1.toFixed(decimals)}
                            </text>

                            {/* TP2 Line */}
                            <motion.line 
                              x1={xEntry} 
                              y1={getY(levels.tp2)} 
                              x2="1000" 
                              y2={getY(levels.tp2)} 
                              stroke="#10B981" 
                              strokeWidth="1" 
                              strokeDasharray="3,3" 
                              strokeOpacity="0.7" 
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.7 }}
                              transition={{ duration: 0.6 }}
                            />
                            <motion.rect 
                              x="875" 
                              y={getY(levels.tp2) - 8} 
                              width="120" 
                              height="16" 
                              rx="4" 
                              fill="#10B981" 
                              fillOpacity="0.8" 
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 0.8 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                            />
                            <text x="935" y={getY(levels.tp2) + 4} fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                              TP2 {levels.tp2.toFixed(decimals)}
                            </text>

                            {/* TP3 Line */}
                            <motion.line 
                              x1={xEntry} 
                              y1={getY(levels.tp3)} 
                              x2="1000" 
                              y2={getY(levels.tp3)} 
                              stroke="#10B981" 
                              strokeWidth="1" 
                              strokeDasharray="3,3" 
                              strokeOpacity="0.7" 
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.7 }}
                              transition={{ duration: 0.6 }}
                            />
                            <motion.rect 
                              x="875" 
                              y={getY(levels.tp3) - 8} 
                              width="120" 
                              height="16" 
                              rx="4" 
                              fill="#10B981" 
                              fillOpacity="0.8" 
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 0.8 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                            />
                            <text x="935" y={getY(levels.tp3) + 4} fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                              TP3 {levels.tp3.toFixed(decimals)}
                            </text>

                            {/* FINAL TP Line */}
                            <motion.line 
                              x1={xEntry} 
                              y1={getY(levels.finalTp)} 
                              x2="1000" 
                              y2={getY(levels.finalTp)} 
                              stroke="#10B981" 
                              strokeWidth="1.2" 
                              strokeDasharray="4,4" 
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 0.6 }}
                            />
                            <motion.rect 
                              x="875" 
                              y={getY(levels.finalTp) - 8} 
                              width="120" 
                              height="16" 
                              rx="4" 
                              fill="#10B981" 
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                            />
                            <text x="935" y={getY(levels.finalTp) + 4} fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                              FINAL TP {levels.finalTp.toFixed(decimals)}
                            </text>
                          </g>
                        )}

                        {/* 4. MARKET STRUCTURE LABELS (BOS/ChoCh) */}
                        {visibleCandles.map((c, idx) => {
                          const globalIdx = chartStartIndex + idx;
                          const cx = idx * barWidth + barWidth / 2;
                          
                          if (swingHighs[globalIdx]) {
                            const yVal = getY(c.high);
                            return (
                              <motion.g 
                                key={`sh-${idx}`} 
                                className="pointer-events-none"
                                initial={{ opacity: 0, y: yVal - 10 }}
                                animate={{ opacity: 0.8, y: yVal }}
                                transition={{ duration: 0.3, delay: idx * 0.003 + 0.1 }}
                              >
                                <line x1={cx} y1={0} x2={Math.min(1000, cx + barWidth * 4)} y2={0} stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="2,2" />
                                <rect x={cx} y={-14} width="32" height="10" rx="2" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="0.5" />
                                <text x={cx + 16} y={-6} fill="#F59E0B" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                                  ChoCh
                                </text>
                              </motion.g>
                            );
                          }
                          
                          if (swingLows[globalIdx]) {
                            const yVal = getY(c.low);
                            return (
                              <motion.g 
                                key={`sl-${idx}`} 
                                className="pointer-events-none"
                                initial={{ opacity: 0, y: yVal + 10 }}
                                animate={{ opacity: 0.8, y: yVal }}
                                transition={{ duration: 0.3, delay: idx * 0.003 + 0.1 }}
                              >
                                <line x1={cx} y1={0} x2={Math.min(1000, cx + barWidth * 4)} y2={0} stroke="#8B5CF6" strokeWidth="1.2" strokeDasharray="2,2" />
                                <rect x={cx} y={4} width="24" height="10" rx="2" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="0.5" />
                                <text x={cx + 12} y={11} fill="#8B5CF6" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                                  BOS
                                </text>
                              </motion.g>
                            );
                          }
                          return null;
                        })}

                        {/* 5. THE CANDLESTICK BODIES, WICKS, AND INTERACTIVE HOVER OVERLAY */}
                        {visibleCandles.map((c, idx) => {
                          const cx = idx * barWidth + barWidth / 2;
                          const rx = idx * barWidth + barWidth * 0.15;
                          const rw = barWidth * 0.7;

                          const isBull = c.close >= c.open;
                          const candleColor = isBull ? "#10B981" : "#EF4444";

                          const yHigh = getY(c.high);
                          const yLow = getY(c.low);
                          const yOpen = getY(c.open);
                          const yClose = getY(c.close);
                          const yTop = Math.min(yOpen, yClose);
                          const yBottom = Math.max(yOpen, yClose);
                          const bodyHeight = Math.max(2, yBottom - yTop);

                          const candleTrade = trades.find(t => t.date === c.date);

                          return (
                            <motion.g
                              key={`candle-${idx}`}
                              className="group/candle cursor-pointer"
                              onMouseEnter={() => {
                                setHoveredCandle(c);
                                if (candleTrade) setHoveredTrade(candleTrade);
                              }}
                              onMouseLeave={() => {
                                setHoveredCandle(null);
                                setHoveredTrade(null);
                              }}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: idx * 0.003, ease: "easeOut" }}
                            >
                              {/* Full column vertical hover catcher */}
                              <rect
                                x={idx * barWidth}
                                y="0"
                                width={barWidth}
                                height="400"
                                fill="white"
                                fillOpacity="0"
                                className="hover:fill-slate-800/10"
                              />

                              {/* Wick */}
                              <line
                                x1={cx}
                                y1={yHigh}
                                x2={cx}
                                y2={yLow}
                                stroke={candleColor}
                                strokeWidth="1.2"
                              />

                              {/* Body */}
                              <rect
                                x={rx}
                                y={yTop}
                                width={rw}
                                height={bodyHeight}
                                fill={candleColor}
                                rx="1"
                              />

                              {/* BUY / SELL badge signals */}
                              {candleTrade && (
                                <motion.g 
                                  className="pointer-events-none"
                                  initial={{ opacity: 0, scale: 0.5, y: candleTrade.direction === "LONG" ? yLow + 20 : yHigh - 20 }}
                                  animate={{ opacity: 1, scale: 1, y: candleTrade.direction === "LONG" ? yLow + 8 : yHigh - 18 }}
                                  transition={{ type: "spring", stiffness: 150, damping: 12, delay: idx * 0.002 + 0.1 }}
                                >
                                  <rect
                                    x={cx - 15}
                                    y={0}
                                    width="30"
                                    height="10"
                                    rx="3"
                                    fill={candleTrade.direction === "LONG" ? "#10B981" : "#EF4444"}
                                  />
                                  <text
                                    x={cx}
                                    y={8}
                                    textAnchor="middle"
                                    fill="#FFFFFF"
                                    fontSize="7"
                                    fontWeight="black"
                                    fontFamily="monospace"
                                  >
                                    {candleTrade.direction === "LONG" ? "BUY" : "SELL"}
                                  </text>
                                </motion.g>
                              )}
                            </motion.g>
                          );
                        })}
                      </g>
                    );
                  })()}
                </svg>
              ) : (
                <div className="h-[320px] flex items-center justify-center text-slate-500 font-medium">
                  No data rendered. Trigger a backtest simulation to display candles.
                </div>
              )}

              {/* Hover Tooltip display absolute */}
              {hoveredCandle && (
                <div className="absolute top-2 left-2 bg-slate-900/95 border border-slate-800 p-2.5 rounded-lg text-[10px] font-mono text-slate-300 space-y-1 shadow-lg z-20">
                  <div className="text-white font-bold border-b border-slate-800 pb-1 mb-1">{hoveredCandle.date}</div>
                  <div>Open: <span className="text-white">{hoveredCandle.open}</span></div>
                  <div>High: <span className="text-white">{hoveredCandle.high}</span></div>
                  <div>Low:  <span className="text-white">{hoveredCandle.low}</span></div>
                  <div>Close: <span className="text-white">{hoveredCandle.close}</span></div>
                  <div>Vol:   <span className="text-slate-400">{hoveredCandle.volume.toLocaleString()}</span></div>
                  {hoveredTrade && (
                    <div className="pt-1.5 border-t border-slate-800 mt-1">
                      <div className="text-emerald-400 font-bold text-[9px]">TRADE DETAILS</div>
                      <div>Type: <span className={hoveredTrade.direction === "LONG" ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>{hoveredTrade.direction}</span></div>
                      <div>PnL: <span className={hoveredTrade.pnl >= 0 ? "text-emerald-400 font-bold" : "text-rose-400"}>${hoveredTrade.pnl}</span></div>
                      <div>Exit: <span className="text-blue-400">{hoveredTrade.exitReason}</span></div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Slider / Scrolling Timeline Controls */}
            {candles.length > 0 && (
              <div className="p-4 bg-slate-900 border-t border-slate-850 flex items-center gap-4 text-xs text-slate-400">
                <span className="shrink-0">Timeline Slider</span>
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, candles.length - chartWindowSize)}
                  value={chartStartIndex}
                  onChange={(e) => setChartStartIndex(parseInt(e.target.value))}
                  className="flex-1 accent-blue-500 h-1 rounded bg-slate-800 cursor-pointer"
                />
                <span className="shrink-0 font-mono text-[10px]">
                  Bar {chartStartIndex} to {Math.min(candles.length, chartStartIndex + chartWindowSize)} of {candles.length}
                </span>
              </div>
            )}
          </div>

          {/* TAB SECTIONS: Equity Curve, Trade Log, Strategy Rules, Risk Notes */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            
            {/* Tabs Selector Navigation */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-1 overflow-x-auto gap-1">
              {[
                { id: "equity", label: "Equity Curve Chart", icon: TrendingUp },
                { id: "log", label: "Interactive Trade Log", icon: FileText },
                { id: "rules", label: "Strategy Formula Rules", icon: Layers },
                { id: "risk", label: "Compliance Risk Sheet", icon: AlertTriangle }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content area */}
            <div className="p-5 md:p-6 min-h-[220px]">
              
              {/* 1. Equity Curve Chart */}
              {activeTab === "equity" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800 dark:text-white">Capital Growth Curve</span>
                    <span className="text-slate-400">Total updates: {equityCurve.length} ticks</span>
                  </div>

                  {equityCurve.length > 0 ? (
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-850">
                      <svg viewBox="0 0 500 150" width="100%" height="150" className="overflow-visible">
                        {/* Grid lines */}
                        {[0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
                          const maxEquity = Math.max(...equityCurve);
                          const minEquity = Math.min(...equityCurve);
                          const range = maxEquity - minEquity || 100;
                          const gridVal = minEquity + range * (ratio - 0.1);
                          const y = 150 - (ratio * 120 + 10);
                          return (
                            <line
                              key={idx}
                              x1="0"
                              y1={y}
                              x2="500"
                              y2={y}
                              stroke="#ffffff"
                              strokeOpacity="0.08"
                              strokeDasharray="2,2"
                            />
                          );
                        })}

                        {/* Animated path drawing of Equity Curve */}
                        <motion.path
                          key={`large-line-${equityCurve.length}-${seed}`}
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2.5"
                          d={equityCurve.map((eq, idx) => {
                            const maxEquity = Math.max(...equityCurve);
                            const minEquity = Math.min(...equityCurve);
                            const range = maxEquity - minEquity || 1;
                            const x = (idx / (equityCurve.length - 1)) * 500;
                            const y = 135 - ((eq - minEquity) / range) * 115;
                            return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                          }).join(" ")}
                          style={{ vectorEffect: "non-scaling-stroke" }}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.8, ease: "easeInOut" }}
                        />
                      </svg>
                      
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2">
                        <span>Start: ${settings.initialCapital.toLocaleString()}</span>
                        <span>Current Peak: ${Math.max(...equityCurve).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        <span>Current Equity: ${equityCurve[equityCurve.length - 1].toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-28 flex items-center justify-center text-slate-500 text-xs">
                      No curve generated yet.
                    </div>
                  )}
                </div>
              )}

              {/* 2. Interactive Trade Log */}
              {activeTab === "log" && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <span className="text-xs font-bold text-slate-800 dark:text-white">Trade Executions Log ({trades.length} trades)</span>
                    {trades.length > 0 && (
                      <button
                        onClick={downloadCSVReport}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                        id="sim-dl-csv-btn"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download CSV Report
                      </button>
                    )}
                  </div>

                  {trades.length > 0 ? (
                    <div className="overflow-x-auto border border-slate-100 dark:border-slate-850 rounded-xl">
                      <table className="w-full text-left text-[11px] leading-normal font-mono">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-850 text-slate-500 font-bold uppercase tracking-wider">
                            <th className="p-3">ID</th>
                            <th className="p-3">Date/Time</th>
                            <th className="p-3">Market</th>
                            <th className="p-3">Dir</th>
                            <th className="p-3 text-right">Entry</th>
                            <th className="p-3 text-right">Exit</th>
                            <th className="p-3 text-right">Stop</th>
                            <th className="p-3 text-right">Target</th>
                            <th className="p-3 text-right">PnL</th>
                            <th className="p-3 text-center">R</th>
                            <th className="p-3">Exit Reason</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                          {trades.map((trade) => (
                            <tr key={trade.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                              <td className="p-3 font-semibold text-slate-900 dark:text-white">{trade.id}</td>
                              <td className="p-3 whitespace-nowrap text-slate-500">{trade.date}</td>
                              <td className="p-3 font-semibold text-slate-900 dark:text-white">{trade.market}</td>
                              <td className="p-3">
                                <span className={`font-bold px-1.5 py-0.5 rounded text-[9px] ${
                                  trade.direction === "LONG"
                                    ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400"
                                    : "bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-400"
                                }`}>
                                  {trade.direction}
                                </span>
                              </td>
                              <td className="p-3 text-right font-medium">{trade.entry}</td>
                              <td className="p-3 text-right font-medium">{trade.exit}</td>
                              <td className="p-3 text-right text-slate-500">{trade.stop}</td>
                              <td className="p-3 text-right text-slate-500">{trade.target}</td>
                              <td className={`p-3 text-right font-bold ${trade.pnl >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                                {trade.pnl >= 0 ? "+" : ""}${trade.pnl}
                              </td>
                              <td className="p-3 text-center font-bold">{trade.rMultiple > 0 ? `+${trade.rMultiple}` : trade.rMultiple}R</td>
                              <td className="p-3">
                                <span className={`text-[10px] font-semibold uppercase ${
                                  trade.exitReason === "TARGET"
                                    ? "text-emerald-500"
                                    : trade.exitReason === "STOP"
                                    ? "text-rose-500"
                                    : "text-blue-400"
                                }`}>
                                  {trade.exitReason}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      No trades registered for this backtest. Try adjusting strategy parameters or select another market asset.
                    </div>
                  )}
                </div>
              )}

              {/* 3. Strategy Rules */}
              {activeTab === "rules" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                    <Layers className="h-4 w-4 text-blue-500" />
                    <span>Systematic Trading Formula</span>
                  </div>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850">
                    {getStrategyPlainEnglish()}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                    <div className="space-y-2">
                      <span className="font-bold text-slate-800 dark:text-white block">Active Configuration Nodes</span>
                      <ul className="space-y-1.5 text-slate-500 font-mono text-[11px]">
                        <li>• Fast Moving Average: <span className="text-slate-800 dark:text-white font-bold">{settings.emaFast} period</span></li>
                        <li>• Slow Moving Average: <span className="text-slate-800 dark:text-white font-bold">{settings.emaSlow} period</span></li>
                        <li>• Relative Strength Index: <span className="text-slate-800 dark:text-white font-bold">{settings.rsiLength} period</span></li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="font-bold text-slate-800 dark:text-white block">Execution Engine Rules</span>
                      <ul className="space-y-1.5 text-slate-500 font-mono text-[11px]">
                        <li>• Account Risk Cap: <span className="text-slate-800 dark:text-white font-bold">{settings.riskPercent}% per trade</span></li>
                        <li>• Broker Commissions: <span className="text-slate-800 dark:text-white font-bold">{settings.feeBps} bps per fill</span></li>
                        <li>• Market Slippage Penalty: <span className="text-slate-800 dark:text-white font-bold">{settings.slippageBps} bps per trade</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Risk Notes */}
              {activeTab === "risk" && (
                <div className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>Risk Management & Execution Compliance</span>
                  </div>

                  <p>
                    Every automated backtest operates under simplified execution assumptions. In live markets, slippage, liquidity gaps, interest rate swap fees, and variable broker spreads can significantly affect final outcome rates.
                  </p>

                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-700 dark:text-amber-400">
                    <h5 className="font-bold mb-1">Standard Regulatory Disclaimer Checklist:</h5>
                    <ul className="space-y-1 list-disc pl-4 text-[11px] leading-relaxed">
                      <li>These backtest statistics represent hypothetical past performance calculated on historical or synthetic price sequences. Past success does not predict future returns.</li>
                      <li>No live trading capital, broker API gateways, or wallet connections are supported. All calculations are executed strictly client-side.</li>
                      <li>These records should never be interpreted as financial advisories, investment counseling, or trade alerts. Seek licensed financial advice prior to allocating funds.</li>
                    </ul>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Simulator Disclaimer at the bottom */}
          <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-4 border border-slate-200 dark:border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-500">
            <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Simulator Notice:</strong> The SMARTFLOWALGO simulator is for education and process training only. It uses demo or user-supplied historical data and simplified execution assumptions. It does not predict future market movement and is not financial advice.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
