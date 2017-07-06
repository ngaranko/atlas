'use strict';

module.exports = function (embedHeaderElement) {
    return {
        get inputLink () {
            return embedHeaderElement.element(by.css('qa-embed-header-form-input-link'));
        },
        get inputHtml () {
            return embedHeaderElement.element(by.css('qa-embed-header-form-input-html'));
        }
    };
};
