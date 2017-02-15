'use strict';

beforeEach(function () {
    dp.navigate('MAP_PAGE--HOME');
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.refresh();
});
