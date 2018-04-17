/**
 *
 * @param {array} data - Array of tracker event. For more info on the allowed events, see
 * https://developer.matomo.org/guides/tracking-javascript-guide#manually-trigger-events
 */

const piwikTracker = (data) => {
  // eslint-disable-next-line no-underscore-dangle
  window._paq.push(data);
};

export default piwikTracker;
