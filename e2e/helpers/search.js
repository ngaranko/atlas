'use strict';

/**
 *
 * @description this function enters a search query and then submits the form
 */
module.exports = function (query) {
    browser.driver.findElement(by.css('.qa-search-form-input')).sendKeys(query);
    browser.driver.findElement(by.css('.qa-search-form-submit')).click();
};
