// Global daily circuit breaker for the chat endpoint.
// Tracks total requests today and rejects new ones once the cap is hit.
// State is in-process (resets on restart), which is acceptable as a
// defence-in-depth layer on top of the per-IP rate limiter.

const DAILY_CAP = parseInt(process.env["CHAT_DAILY_LIMIT"] ?? "200", 10);

let currentDay = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
let dailyCount = 0;

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Returns true if a request may proceed, false if the daily cap is exceeded. */
export function chatBudgetAllow(): boolean {
  const today = todayUtc();
  if (today !== currentDay) {
    currentDay = today;
    dailyCount = 0;
  }
  if (dailyCount >= DAILY_CAP) {
    return false;
  }
  dailyCount += 1;
  return true;
}

/** Returns the number of requests remaining today (for logging). */
export function chatBudgetRemaining(): number {
  if (todayUtc() !== currentDay) return DAILY_CAP;
  return Math.max(0, DAILY_CAP - dailyCount);
}
