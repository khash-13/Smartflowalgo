import { Candle } from "./indicators";

/**
 * Parses user-uploaded CSV files into Candle objects.
 * Expects headers like: date, open, high, low, close, volume (case-insensitive)
 */
export function parseCSV(csvText: string): Candle[] {
  const candles: Candle[] = [];
  if (!csvText) return candles;

  const lines = csvText.split(/\r?\n/);
  if (lines.length < 2) return candles;

  // Read header row
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
  
  const dateIdx = headers.findIndex(h => h.includes("date") || h.includes("time"));
  const openIdx = headers.findIndex(h => h === "open");
  const highIdx = headers.findIndex(h => h === "high");
  const lowIdx = headers.findIndex(h => h === "low");
  const closeIdx = headers.findIndex(h => h === "close");
  const volIdx = headers.findIndex(h => h.includes("vol") || h === "qty");

  // Check if we have at least the critical columns: date, open, high, low, close
  if (dateIdx === -1 || openIdx === -1 || highIdx === -1 || lowIdx === -1 || closeIdx === -1) {
    throw new Error("CSV file must contain columns: date, open, high, low, close");
  }

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = line.split(",").map(c => c.trim().replace(/^["']|["']$/g, ""));
    if (cols.length < Math.max(dateIdx, openIdx, highIdx, lowIdx, closeIdx) + 1) {
      continue; // Skip malformed rows
    }

    const date = cols[dateIdx];
    const open = parseFloat(cols[openIdx]);
    const high = parseFloat(cols[highIdx]);
    const low = parseFloat(cols[lowIdx]);
    const close = parseFloat(cols[closeIdx]);
    let volume = volIdx !== -1 ? parseInt(cols[volIdx]) : 1000;

    if (isNaN(open) || isNaN(high) || isNaN(low) || isNaN(close)) {
      continue; // Skip invalid rows
    }

    if (isNaN(volume)) volume = 1000;

    candles.push({
      date,
      open,
      high,
      low,
      close,
      volume
    });
  }

  // Ensure sorting is sequential from oldest to newest if needed
  // (We assume the CSV is already ordered chronologically, but we can reverse it if we detect it goes backwards)
  if (candles.length > 1) {
    const firstTime = new Date(candles[0].date).getTime();
    const lastTime = new Date(candles[candles.length - 1].date).getTime();
    if (!isNaN(firstTime) && !isNaN(lastTime) && firstTime > lastTime) {
      candles.reverse();
    }
  }

  return candles;
}
