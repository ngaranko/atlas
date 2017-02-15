'use strict';

module.exports = {
    clearSession: function () {
        browser.executeScript('window.sessionStorage.clear();');
    },
    clearLocal: function () {
        browser.executeScript('window.localStorage.clear();');
    },
    clearAll: function () {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    }
};
