/**
 * Parse YYYY-MM-DD as local date (avoids UTC midnight shifting the day).
 */
function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Format a date string for display (e.g. "Jan 15, 2025")
 */
export function formatDate(dateStr: string): string {
  const date = parseLocalDate(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Days from today to dateStr (YYYY-MM-DD). 0 = today, positive = future.
 */
export function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = parseLocalDate(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
}

/**
 * "IN 3 DAYS" / "TODAY" / "TOMORROW" for upcoming labels
 */
export function formatDaysUntilLabel(dateStr: string): string {
  const d = daysUntil(dateStr);
  if (d === 0) return 'Today';
  if (d === 1) return 'Tomorrow';
  if (d > 0 && d <= 7) return `In ${d} days`;
  if (d > 7) return `In ${d} days`;
  return '';
}
