import { Candle, calculateEMA, calculateRSI, calculateATR, detectSwingHighs, detectSwingLows } from "./indicators";

/**
 * Generates deterministic synthetic OHLCV data using a simple pseudo-random number generator
 * based on a seed string so that it is repeatable.
 */
export function generateSyntheticOHLCV(seed: string, bars: number, marketType: string): Candle[] {
  const candles: Candle[] = [];
  
  // Seed hash function
  let seedNum = 0;
  for (let i = 0; i < seed.length; i++) {
    seedNum = (seedNum << 5) - seedNum + seed.charCodeAt(i);
    seedNum |= 0;
  }
  
  function random(): number {
    const x = Math.sin(seedNum++) * 10000;
    return x - Math.floor(x);
  }

  // Base configurations based on market
  let price = 100;
  let volatility = 0.01; // percentage
  let volumeBase = 10000;
  let prefix = "2026-05-01";
  let decimals = 2;

  if (marketType === "Gold Demo") {
    price = 2320.50;
    volatility = 0.003;
    volumeBase = 150000;
    decimals = 2;
  } else if (marketType === "BTC Demo") {
    price = 64500.00;
    volatility = 0.008;
    volumeBase = 8000;
    decimals = 2;
  } else if (marketType === "EUR/USD Demo") {
    price = 1.08520;
    volatility = 0.0012;
    volumeBase = 500000;
    decimals = 5;
  } else if (marketType === "GBP/USD Demo") {
    price = 1.27410;
    volatility = 0.0015;
    volumeBase = 400000;
    decimals = 5;
  } else if (marketType === "USD/JPY Demo") {
    price = 157.35;
    volatility = 0.002;
    volumeBase = 350000;
    decimals = 3;
  }

  // Create starting point
  let currentPrice = price;
  const now = new Date("2026-05-01T08:00:00Z");

  for (let i = 0; i < bars; i++) {
    const change = currentPrice * volatility * (random() - 0.44); // slight upward drift
    const open = Number(currentPrice.toFixed(decimals));
    let close = Number((currentPrice + change).toFixed(decimals));
    
    // Volatility fluctuations for high/low
    const randomHighFact = random() * 1.5 * volatility * currentPrice;
    const randomLowFact = random() * 1.5 * volatility * currentPrice;
    
    let high = Number((Math.max(open, close) + randomHighFact).toFixed(decimals));
    let low = Number((Math.min(open, close) - randomLowFact).toFixed(decimals));
    
    // volume
    const volume = Math.floor(volumeBase * (0.5 + random() * 1.5));
    
    // Advance date
    const dateStr = now.toISOString().replace("T", " ").substring(0, 16);
    // Add time based on index (simulating 15m or 1H bars, say 1 hour)
    now.setHours(now.getHours() + 1);

    candles.push({
      date: dateStr,
      open,
      high,
      low,
      close,
      volume
    });

    currentPrice = close;
  }

  return candles;
}

/**
 * Calculates position sizing according to strict risk management rules
 */
export function calculatePositionSize(
  capital: number,
  riskPercent: number,
  entry: number,
  stop: number
): number {
  const riskAmount = capital * (riskPercent / 100);
  const stopDistance = Math.abs(entry - stop);
  if (stopDistance === 0) return 1;
  return Number((riskAmount / stopDistance).toFixed(4));
}

/**
 * Calculates maximum drawdown of the equity curve
 */
export function calculateDrawdown(equityCurve: number[]): number {
  if (equityCurve.length === 0) return 0;
  let peak = equityCurve[0];
  let maxDrawdown = 0;

  for (const equity of equityCurve) {
    if (equity > peak) {
      peak = equity;
    }
    const drawdown = ((peak - equity) / peak) * 100;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  return Number(maxDrawdown.toFixed(2));
}

export interface Trade {
  id: string;
  date: string;
  market: string;
  direction: "LONG" | "SHORT";
  entry: number;
  exit: number;
  stop: number;
  target: number;
  positionSize: number;
  pnl: number;
  rMultiple: number;
  exitReason: "STOP" | "TARGET" | "REVERSAL" | "END_OF_DATA";
  entryDate?: string;
}

export interface StrategySettings {
  strategyName: string;
  initialCapital: number;
  riskPercent: number;
  feeBps: number;
  slippageBps: number;
  stopLossType: "ATR" | "Fixed" | "Swing";
  takeProfitType: "RiskReward" | "ATR" | "EMA";
  emaFast: number;
  emaSlow: number;
  rsiLength: number;
  rsiOverbought: number;
  rsiOversold: number;
  atrLength: number;
  atrMultiplier: number;
  maxTradesPerDay: number;
  longShortMode: "long-only" | "long-short";
  sessionFilter: "Asian" | "London" | "New York" | "All Sessions";
  // Custom rule settings
  customIf: string;
  customAnd: string;
  customThen: string;
  customExit: string;
}

export function runBacktest(candles: Candle[], settings: StrategySettings, marketName: string): {
  trades: Trade[];
  equityCurve: number[];
  metrics: {
    netPnl: number;
    returnPercent: number;
    winRate: number;
    totalTrades: number;
    profitFactor: number;
    maxDrawdown: number;
    avgR: number;
    feesPaid: number;
    largestWin: number;
    largestLoss: number;
    finalEquity: number;
  }
} {
  const trades: Trade[] = [];
  const initialCapital = settings.initialCapital;
  let currentCapital = initialCapital;
  const equityCurve: number[] = [initialCapital];

  if (candles.length === 0) {
    return {
      trades,
      equityCurve,
      metrics: {
        netPnl: 0,
        returnPercent: 0,
        winRate: 0,
        totalTrades: 0,
        profitFactor: 0,
        maxDrawdown: 0,
        avgR: 0,
        feesPaid: 0,
        largestWin: 0,
        largestLoss: 0,
        finalEquity: initialCapital
      }
    };
  }

  // Pre-calculate indicators
  const closes = candles.map(c => c.close);
  const emaFastList = calculateEMA(closes, settings.emaFast);
  const emaSlowList = calculateEMA(closes, settings.emaSlow);
  const rsiList = calculateRSI(closes, settings.rsiLength);
  const atrList = calculateATR(candles, settings.atrLength);
  const swingHighs = detectSwingHighs(candles, 5);
  const swingLows = detectSwingLows(candles, 5);

  let activeTrade: {
    direction: "LONG" | "SHORT";
    entryIndex: number;
    entryPrice: number;
    stopLoss: number;
    takeProfit: number;
    positionSize: number;
    entryDate: string;
  } | null = null;

  let feesPaidTotal = 0;
  let tradesCountToday = 0;
  let currentDateStr = "";

  for (let i = 10; i < candles.length; i++) {
    const candle = candles[i];
    const prevCandle = candles[i - 1];
    
    // Track trades per day limit
    const datePart = candle.date.split(" ")[0];
    if (datePart !== currentDateStr) {
      currentDateStr = datePart;
      tradesCountToday = 0;
    }

    // Get time hours for Session Filter
    let inSession = true;
    try {
      const timePart = candle.date.split(" ")[1];
      if (timePart && settings.sessionFilter !== "All Sessions") {
        const hour = parseInt(timePart.split(":")[0]);
        if (settings.sessionFilter === "Asian" && (hour < 0 || hour >= 9)) inSession = false;
        if (settings.sessionFilter === "London" && (hour < 8 || hour >= 16)) inSession = false;
        if (settings.sessionFilter === "New York" && (hour < 13 || hour >= 21)) inSession = false;
      }
    } catch (e) {
      inSession = true; // fallback
    }

    // Update equity based on active trade (or flat)
    let tempEquity = currentCapital;
    if (activeTrade) {
      const currentClose = candle.close;
      const unrealizedPnl = activeTrade.direction === "LONG"
        ? (currentClose - activeTrade.entryPrice) * activeTrade.positionSize
        : (activeTrade.entryPrice - currentClose) * activeTrade.positionSize;
      tempEquity = Math.max(0, currentCapital + unrealizedPnl);
    }
    equityCurve.push(tempEquity);

    // 1. MANAGE OPEN TRADE
    if (activeTrade) {
      const t = activeTrade;
      let exitPrice = 0;
      let exitReason: "STOP" | "TARGET" | "REVERSAL" | "END_OF_DATA" | null = null;

      if (t.direction === "LONG") {
        // Check Stop Loss
        if (candle.low <= t.stopLoss) {
          exitPrice = t.stopLoss;
          exitReason = "STOP";
        }
        // Check Take Profit
        else if (candle.high >= t.takeProfit) {
          exitPrice = t.takeProfit;
          exitReason = "TARGET";
        }
        // Reversal (EMA cross opposite direction or RSI extreme)
        else if (
          settings.strategyName === "EMA Crossover" &&
          emaFastList[i] < emaSlowList[i] && prevCandle && emaFastList[i-1] >= emaSlowList[i-1]
        ) {
          exitPrice = candle.close;
          exitReason = "REVERSAL";
        }
      } else { // SHORT
        // Check Stop Loss
        if (candle.high >= t.stopLoss) {
          exitPrice = t.stopLoss;
          exitReason = "STOP";
        }
        // Check Take Profit
        else if (candle.low <= t.takeProfit) {
          exitPrice = t.takeProfit;
          exitReason = "TARGET";
        }
        // Reversal
        else if (
          settings.strategyName === "EMA Crossover" &&
          emaFastList[i] > emaSlowList[i] && prevCandle && emaFastList[i-1] <= emaSlowList[i-1]
        ) {
          exitPrice = candle.close;
          exitReason = "REVERSAL";
        }
      }

      // Close at end of dataset
      if (!exitReason && i === candles.length - 1) {
        exitPrice = candle.close;
        exitReason = "END_OF_DATA";
      }

      if (exitReason) {
        // Apply exit slippage and fees
        const exitSlippage = exitPrice * (settings.slippageBps / 10000) * (t.direction === "LONG" ? -1 : 1);
        const finalExitPrice = exitPrice + exitSlippage;
        
        let tradePnl = t.direction === "LONG"
          ? (finalExitPrice - t.entryPrice) * t.positionSize
          : (t.entryPrice - finalExitPrice) * t.positionSize;

        const exitFee = finalExitPrice * t.positionSize * (settings.feeBps / 10000);
        tradePnl -= exitFee;
        feesPaidTotal += exitFee;

        currentCapital += tradePnl;
        
        const stopDistance = Math.abs(t.entryPrice - t.stopLoss);
        const rMultiple = stopDistance > 0 ? Number((tradePnl / (stopDistance * t.positionSize)).toFixed(2)) : 0;

        trades.push({
          id: `T-${trades.length + 1}`,
          date: candle.date,
          market: marketName,
          direction: t.direction,
          entry: t.entryPrice,
          exit: finalExitPrice,
          stop: t.stopLoss,
          target: t.takeProfit,
          positionSize: t.positionSize,
          pnl: Number(tradePnl.toFixed(2)),
          rMultiple,
          exitReason,
          entryDate: t.entryDate
        });

        activeTrade = null;
        continue; // Don't open a new trade on the same bar
      }
    }

    // 2. CHECK FOR ENTRY SIGNALS
    if (!activeTrade && inSession && tradesCountToday < settings.maxTradesPerDay) {
      let signal: "LONG" | "SHORT" | null = null;
      const rsi = rsiList[i];
      const prevRsi = rsiList[i - 1];

      // EMA Crossover Logic
      if (settings.strategyName === "EMA Crossover") {
        if (emaFastList[i] > emaSlowList[i] && emaFastList[i - 1] <= emaSlowList[i - 1]) {
          signal = "LONG";
        } else if (
          settings.longShortMode === "long-short" &&
          emaFastList[i] < emaSlowList[i] && emaFastList[i - 1] >= emaSlowList[i - 1]
        ) {
          signal = "SHORT";
        }
      }
      
      // RSI Mean Reversion Logic
      else if (settings.strategyName === "RSI Mean Reversion") {
        if (prevRsi < settings.rsiOversold && rsi >= settings.rsiOversold) {
          signal = "LONG";
        } else if (
          settings.longShortMode === "long-short" &&
          prevRsi > settings.rsiOverbought && rsi <= settings.rsiOverbought
        ) {
          signal = "SHORT";
        }
      }

      // Smartflow Trend Logic
      else if (settings.strategyName === "Smartflow Trend") {
        const trendBullish = closes[i] > emaSlowList[i];
        if (trendBullish && prevRsi < 40 && rsi >= 40) {
          signal = "LONG";
        } else if (
          settings.longShortMode === "long-short" &&
          !trendBullish && prevRsi > 60 && rsi <= 60
        ) {
          signal = "SHORT";
        }
      }

      // Volatility Breakout Logic
      else if (settings.strategyName === "Volatility Breakout") {
        const currentAtr = atrList[i];
        const avgAtr = atrList.slice(Math.max(0, i - 14), i + 1).reduce((sum, val) => sum + val, 0) / 15;
        const lowVolatility = currentAtr < avgAtr * 0.95;

        if (lowVolatility && candle.close > prevCandle.high) {
          signal = "LONG";
        } else if (
          settings.longShortMode === "long-short" &&
          lowVolatility && candle.close < prevCandle.low
        ) {
          signal = "SHORT";
        }
      }

      // Structure Retest Logic
      else if (settings.strategyName === "Structure Retest") {
        // Find recent swing low or swing high
        let recentSwingLow = 0;
        let recentSwingHigh = 0;
        for (let s = i - 1; s >= Math.max(0, i - 20); s--) {
          if (swingLows[s]) {
            recentSwingLow = candles[s].low;
            break;
          }
        }
        for (let s = i - 1; s >= Math.max(0, i - 20); s--) {
          if (swingHighs[s]) {
            recentSwingHigh = candles[s].high;
            break;
          }
        }

        if (recentSwingLow > 0 && candle.low <= recentSwingLow * 1.002 && candle.close > recentSwingLow) {
          signal = "LONG";
        } else if (
          settings.longShortMode === "long-short" &&
          recentSwingHigh > 0 && candle.high >= recentSwingHigh * 0.998 && candle.close < recentSwingHigh
        ) {
          signal = "SHORT";
        }
      }

      // Custom Rule Builder Logic
      else if (settings.strategyName === "Custom Rule Builder") {
        // Evaluate user selected conditional rules
        // CustomIf can be "EMA Fast > EMA Slow", "RSI < Oversold", "Price > EMA Slow"
        // CustomAnd can be "RSI < Oversold", "None"
        let cond1 = false;
        let cond2 = true;

        if (settings.customIf === "EMA Fast > EMA Slow") cond1 = emaFastList[i] > emaSlowList[i];
        else if (settings.customIf === "RSI < Oversold") cond1 = rsi < settings.rsiOversold;
        else if (settings.customIf === "Price > EMA Slow") cond1 = closes[i] > emaSlowList[i];

        if (settings.customAnd === "RSI < Oversold") cond2 = rsi < settings.rsiOversold;
        else if (settings.customAnd === "RSI > Overbought") cond2 = rsi > settings.rsiOverbought;
        else if (settings.customAnd === "EMA Fast > EMA Slow") cond2 = emaFastList[i] > emaSlowList[i];

        if (cond1 && cond2) {
          if (settings.customThen === "BUY (Long)") {
            signal = "LONG";
          } else if (settings.customThen === "SELL (Short)" && settings.longShortMode === "long-short") {
            signal = "SHORT";
          }
        }
      }

      if (signal) {
        // 1. Establish Stop Loss Price
        let stopLoss = 0;
        const currentAtr = atrList[i] || (candle.high - candle.low);
        const slPadding = currentAtr * settings.atrMultiplier;

        if (settings.stopLossType === "ATR") {
          stopLoss = signal === "LONG"
            ? candle.close - slPadding
            : candle.close + slPadding;
        } else if (settings.stopLossType === "Fixed") {
          // Fixed 1% of entry price
          const fixedAmt = candle.close * 0.01;
          stopLoss = signal === "LONG"
            ? candle.close - fixedAmt
            : candle.close + fixedAmt;
        } else { // Swing
          let recentSwing = candle.close;
          if (signal === "LONG") {
            for (let s = i - 1; s >= Math.max(0, i - 10); s--) {
              if (swingLows[s]) { recentSwing = candles[s].low; break; }
            }
            stopLoss = recentSwing * 0.998;
          } else {
            for (let s = i - 1; s >= Math.max(0, i - 10); s--) {
              if (swingHighs[s]) { recentSwing = candles[s].high; break; }
            }
            stopLoss = recentSwing * 1.002;
          }
        }

        // 2. Establish Take Profit Price
        let takeProfit = 0;
        const riskDistance = Math.abs(candle.close - stopLoss);

        if (settings.takeProfitType === "RiskReward") {
          // Default 1:2
          takeProfit = signal === "LONG"
            ? candle.close + riskDistance * 2
            : candle.close - riskDistance * 2;
        } else if (settings.takeProfitType === "ATR") {
          takeProfit = signal === "LONG"
            ? candle.close + currentAtr * 3
            : candle.close - currentAtr * 3;
        } else { // EMA
          takeProfit = signal === "LONG"
            ? candle.close + riskDistance * 1.5
            : candle.close - riskDistance * 1.5;
        }

        // Check if Stop Loss makes mathematical sense
        if (Math.abs(candle.close - stopLoss) > 0.00001) {
          // Calculate entry slippage and fee
          const entrySlippage = candle.close * (settings.slippageBps / 10000) * (signal === "LONG" ? 1 : -1);
          const finalEntryPrice = candle.close + entrySlippage;
          
          const posSize = calculatePositionSize(currentCapital, settings.riskPercent, finalEntryPrice, stopLoss);
          const entryFee = finalEntryPrice * posSize * (settings.feeBps / 10000);
          
          currentCapital -= entryFee;
          feesPaidTotal += entryFee;
          tradesCountToday++;

          activeTrade = {
            direction: signal,
            entryIndex: i,
            entryPrice: finalEntryPrice,
            stopLoss,
            takeProfit,
            positionSize: posSize,
            entryDate: candle.date
          };
        }
      }
    }
  }

  // Final Net Metrics calculations
  const netPnl = currentCapital - initialCapital;
  const returnPercent = (netPnl / initialCapital) * 100;
  const totalTrades = trades.length;
  
  const wins = trades.filter(t => t.pnl > 0);
  const losses = trades.filter(t => t.pnl <= 0);
  const winRate = totalTrades > 0 ? (wins.length / totalTrades) * 100 : 0;

  const totalGrossProfit = wins.reduce((sum, t) => sum + t.pnl, 0);
  const totalGrossLoss = Math.abs(losses.reduce((sum, t) => sum + t.pnl, 0));
  const profitFactor = totalGrossLoss > 0 ? Number((totalGrossProfit / totalGrossLoss).toFixed(2)) : totalGrossProfit > 0 ? 99.9 : 0;

  const maxDrawdown = calculateDrawdown(equityCurve);
  const avgR = totalTrades > 0 ? Number((trades.reduce((sum, t) => sum + t.rMultiple, 0) / totalTrades).toFixed(2)) : 0;
  
  const largestWin = wins.length > 0 ? Math.max(...wins.map(t => t.pnl)) : 0;
  const largestLoss = losses.length > 0 ? Math.min(...losses.map(t => t.pnl)) : 0;

  return {
    trades,
    equityCurve,
    metrics: {
      netPnl: Number(netPnl.toFixed(2)),
      returnPercent: Number(returnPercent.toFixed(2)),
      winRate: Number(winRate.toFixed(1)),
      totalTrades,
      profitFactor,
      maxDrawdown,
      avgR,
      feesPaid: Number(feesPaidTotal.toFixed(2)),
      largestWin,
      largestLoss,
      finalEquity: Number(currentCapital.toFixed(2))
    }
  };
}
