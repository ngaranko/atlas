'use strict';

beforeEach(function () {
    browser.driver.manage().window().setSize(1024, 768);

    dp.navigate('MAP_PAGE--HOME');
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.refresh();
});
