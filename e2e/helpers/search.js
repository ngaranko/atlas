'use strict';

/**
 *
 * @description this function enters a search query and then submits the form
 */
module.exports = function (query) {
    browser.driver.findElement(by.css('input.c-search-form__input')).sendKeys(query);
    browser.driver.findElement(by.css('button.c-search-form__submit')).click();
};
