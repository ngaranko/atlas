'use strict';

module.exports = function (searchElement) {
    return {
        setQuery: function (query) {
            const inputElement = searchElement.element(by.model('query'));

            inputElement.clear();
            inputElement.sendKeys(query);
        },
        submit: searchElement.element(by.css('form')).submit
    };
};
