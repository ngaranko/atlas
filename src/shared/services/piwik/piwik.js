/**
 *
 * This file simply gets the piwik instance which is set in
 * /atlas/modules/atlas/services/piwik/piwik.factory.js
 * and returns it
 *
 */

const piwik = window._paq || []; // eslint-disable-line no-underscore-dangle

export default piwik;
