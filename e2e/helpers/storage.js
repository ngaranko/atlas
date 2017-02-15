'use strict';

module.exports = {
    clearSession: function () {
        browser.executeScript('window.sessionStorage.clear();');
    },
    clearLocal: function () {
        browser.executeScript('window.localStorage.clear();');
    },
    clearAll: function () {
        dp.navigate('MAP_PAGE--HOME');
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        return browser.refresh();
    }
};
