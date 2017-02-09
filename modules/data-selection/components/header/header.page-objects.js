'use strict';

module.exports = function (headerElement) {
    return {
        get title () {
            return headerElement.element(by.css('.qa-title')).getText();
        },
        tabs: function (index) {
            return tabPageObject(headerElement.element(by.repeater('tab in vm.tabs').row(index)));
        }
    };
};

function tabPageObject (tabElement) {
    return {
        get label () {
            return tabElement.getText();
        },
        get isActive () {
            return dp.hasClass(tabElement, 'is-active');
        }
    };
}
