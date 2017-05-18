'use strict';

module.exports = function () {
    // browser.get('http://localhost:8000');

    element(by.css('.qa-menu__user-menu .c-menu__item--toggle')).isDisplayed().then((present) => {
        if (present) {
            browser.driver.findElement(by.css('.qa-menu__toggle .qa-menu__link')).click();
            browser.driver.findElement(by.css('.qa-menu__dropdown dp-logout-button button')).click();
        }
    });
};
