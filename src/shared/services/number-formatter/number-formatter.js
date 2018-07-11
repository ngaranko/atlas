/**
 * Converts a number to Dutch decimal notation (e.g. using a comma as decimal separator).
 *
 * E.g.: 3.14159265359 => '3,142'
 *
 * @param {Number} number Input number.
 * @param {Integer} precision Number of required decimal places.
 * @returns {string} The Dutch decimal string.
 */
export default function formatNumber(number, precision = 3) {
  return new Intl.NumberFormat('nl-NL', {
    maximumFractionDigits: precision
  }).format(number)
}
