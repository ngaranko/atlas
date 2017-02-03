'use strict';

module.exports = function (headerElement) {
    return function () {
        return {
            title: headerElement.element(by.css('.qa-title')).getText,
            tabs: function (index) {
                return tabPageObject(headerElement.element(by.repeater('tab in vm.tabs').row(index)));
            }
        };
    };
};

function tabPageObject (tabElement) {
    return {
        label: tabElement.getText,
        isActive: dp.hasClass(tabElement, 'is-active')
    };
}
