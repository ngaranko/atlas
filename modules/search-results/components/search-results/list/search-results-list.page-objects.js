'use strict';

const link = require('../../../../shared/components/link/link.page-objects');

module.exports = function (searchResultsListElement) {
    return function (index) {
        return listItemPageObject(
            searchResultsListElement.element(by.repeater('link in vm.category.results').row(index))
        );
    };
};

function listItemPageObject (listItemElement) {
    return {
        link: link(listItemElement.element(by.css('dp-link'))),
        subtype: listItemElement.element(by.css('.qa-subtype')).getText
    };
}
