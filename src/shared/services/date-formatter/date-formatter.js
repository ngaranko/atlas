/**
 * Converts a date object to a Dutch date string.
 *
 * E.g.: `2020-12-01` => '1 januari 2020'
 *
 * @param {Date} date The Date instance.
 * @returns {string} The Dutch date string.
 */
export default function formatDate(date) {
  return date && date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function dateToString(date) {
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  return date && `${date.getDate()}-${month}-${date.getFullYear()}`;
}
