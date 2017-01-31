'use strict';

module.exports = function (availableFiltersElement) {
    return function () {
        return {
            categories: function (index) {
                return categoryPageObject(availableFiltersElement.element(by.repeater('filter in vm.availableFilters').row(index)));
            }
        };
    };
};

function categoryPageObject (categoryElement) {
    return {
        header: categoryElement.element(by.css('.qa-category-header')).getText,
        options: function (index) {
            return optionPageObject(categoryElement.element(by.repeater('option in filter.options').row(index)));
        }
    }
}

function optionPageObject (optionElement) {
    return {
        label: optionElement.element(by.css('.qa-option-label')).getText
    }
}
