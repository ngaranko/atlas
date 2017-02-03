'use strict';

const stelselpediaHeader = dp.require('modules/detail/components/stelselpedia/header/stelselpedia-header.page-objects');

module.exports = function (nummeraanduidingHeaderElement) {
    return {
        get stelselpediaHeader () {
            return stelselpediaHeader(nummeraanduidingHeaderElement.element(by.css('dp-stelselpedia-header')));
        }
    };
};
