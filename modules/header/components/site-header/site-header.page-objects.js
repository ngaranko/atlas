'use strict';

const searchPO = dp.require('modules/header/components/search/search.page-objects'),
    menuPO = dp.require('modules/header/components/menu/menu.page-objects'),
    embedPO = dp.require('modules/header/components/embed-header/embed-header.page-objects');

module.exports = function (headerElement) {
    return {
        get search () {
            return searchPO(headerElement.element(by.css('dp-search')));
        },
        get menu () {
            return menuPO(headerElement.element(by.css('dp-menu')));
        },
        get embedHeader () {
            return embedPO(headerElement.element(by.css('dp-embed-header')));
        }
    };
};
