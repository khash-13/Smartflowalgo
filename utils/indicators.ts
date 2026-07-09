export interface Candle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/**
 * Calculates the Exponential Moving Average (EMA) for a series of values.
 */
export function calculateEMA(data: number[], length: number): number[] {
  if (data.length === 0 || length <= 0) return [];
  const ema: number[] = new Array(data.length).fill(0);
  
  // Start with simple average or first item
  let sum = 0;
  const limit = Math.min(length, data.length);
  for (let i = 0; i < limit; i++) {
    sum += data[i];
  }
  let prevEma = sum / limit;
  ema[limit - 1] = prevEma;

  // Multiplier: 2 / (length + 1)
  const multiplier = 2 / (length + 1);

  for (let i = limit; i < data.length; i++) {
    const currentEma = (data[i] - prevEma) * multiplier + prevEma;
    ema[i] = currentEma;
    prevEma = currentEma;
  }

  // Backfill the beginning
  for (let i = 0; i < limit - 1; i++) {
    ema[i] = data[i];
  }

  return ema;
}

/**
 * Calculates the Relative Strength Index (RSI) for a series of values.
 */
export function calculateRSI(data: number[], length: number): number[] {
  if (data.length <= length || length <= 0) {
    return new Array(data.length).fill(50);
  }
  const rsi: number[] = new Array(data.length).fill(50);
  
  let gains = 0;
  let losses = 0;

  // First RSI value based on simple average of gains and losses
  for (let i = 1; i <= length; i++) {
    const change = data[i] - data[i - 1];
    if (change > 0) {
      gains += change;
    } else {
      losses -= change;
    }
  }

  let avgGain = gains / length;
  let avgLoss = losses / length;
  
  if (avgLoss === 0) {
    rsi[length] = 100;
  } else {
    const rs = avgGain / avgLoss;
    rsi[length] = 100 - 100 / (1 + rs);
  }

  for (let i = length + 1; i < data.length; i++) {
    const change = data[i] - data[i - 1];
    let currentGain = 0;
    let currentLoss = 0;
    if (change > 0) {
      currentGain = change;
    } else {
      currentLoss = -change;
    }

    avgGain = (avgGain * (length - 1) + currentGain) / length;
    avgLoss = (avgLoss * (length - 1) + currentLoss) / length;

    if (avgLoss === 0) {
      rsi[i] = 100;
    } else {
      const rs = avgGain / avgLoss;
      rsi[i] = 100 - 100 / (1 + rs);
    }
  }

  // Backfill first values with neutral 50
  for (let i = 0; i < length; i++) {
    rsi[i] = 50;
  }

  return rsi;
}

/**
 * Calculates the Average True Range (ATR) to measure volatility.
 */
export function calculateATR(candles: Candle[], length: number): number[] {
  if (candles.length === 0 || length <= 0) return [];
  const atr: number[] = new Array(candles.length).fill(0);
  const trueRanges: number[] = new Array(candles.length).fill(0);

  // First candle True Range is High - Low
  trueRanges[0] = candles[0].high - candles[0].low;

  for (let i = 1; i < candles.length; i++) {
    const current = candles[i];
    const previous = candles[i - 1];
    const tr1 = current.high - current.low;
    const tr2 = Math.abs(current.high - previous.close);
    const tr3 = Math.abs(current.low - previous.close);
    trueRanges[i] = Math.max(tr1, tr2, tr3);
  }

  // Calculate Simple Moving Average of True Range for first 'length' bars
  const limit = Math.min(length, candles.length);
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    sum += trueRanges[i];
  }
  let prevAtr = sum / limit;
  atr[limit - 1] = prevAtr;

  for (let i = limit; i < candles.length; i++) {
    const currentAtr = (prevAtr * (length - 1) + trueRanges[i]) / length;
    atr[i] = currentAtr;
    prevAtr = currentAtr;
  }

  // Backfill the initial values with simple true ranges
  for (let i = 0; i < limit - 1; i++) {
    atr[i] = trueRanges[i] || (candles[i].high - candles[i].low);
  }

  return atr;
}

/**
 * Detects swing high structures within a given lookback window.
 * A candle is a swing high if it's the highest point within a local window [i-lookback, i+lookback].
 */
export function detectSwingHighs(candles: Candle[], lookback: number): boolean[] {
  const result: boolean[] = new Array(candles.length).fill(false);
  if (candles.length < lookback * 2 + 1) return result;

  for (let i = lookback; i < candles.length - lookback; i++) {
    let isHigh = true;
    const currentHigh = candles[i].high;
    for (let j = i - lookback; j <= i + lookback; j++) {
      if (j === i) continue;
      if (candles[j].high > currentHigh) {
        isHigh = false;
        break;
      }
    }
    result[i] = isHigh;
  }
  return result;
}

/**
 * Detects swing low structures within a given lookback window.
 */
export function detectSwingLows(candles: Candle[], lookback: number): boolean[] {
  const result: boolean[] = new Array(candles.length).fill(false);
  if (candles.length < lookback * 2 + 1) return result;

  for (let i = lookback; i < candles.length - lookback; i++) {
    let isLow = true;
    const currentLow = candles[i].low;
    for (let j = i - lookback; j <= i + lookback; j++) {
      if (j === i) continue;
      if (candles[j].low < currentLow) {
        isLow = false;
        break;
      }
    }
    result[i] = isLow;
  }
  return result;
}
