/**
 * Format a date string or Date object to 'YYYY-MM-DD' format.
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Check if two dates are on the same day.
 * @param {string|Date} date1
 * @param {string|Date} date2
 * @returns {boolean}
 */
export function isSameDay(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Check if a date is in the past relative to today.
 * @param {string|Date} date
 * @returns {boolean}
 */
export function isPastDate(date) {
  const d = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to start of day
  return d < today;
}
