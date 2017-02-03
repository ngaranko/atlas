'use strict';

const searchResultsList =
    dp.require('modules/search-results/components/search-results/list/search-results-list.page-objects');

module.exports = function (searchResultsElement) {
    return {
        get isVisible () {
            return dp.isVisible(searchResultsElement);
        },
        categories: function (index) {
            return categoryPageObject(
                searchResultsElement.element(by.repeater('category in vm.searchResults').row(index))
            );
        }
    };
};

function categoryPageObject (categoryElement) {
    return {
        get header () {
            return categoryElement.element(by.css('.qa-search-header')).getText();
        },
        get list () {
            return searchResultsList(categoryElement.element(by.css('dp-search-results-list')));
        }
    };
}
