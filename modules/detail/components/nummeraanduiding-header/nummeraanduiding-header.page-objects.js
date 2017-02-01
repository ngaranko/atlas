'use strict';

const stelselpediaHeader = require('../stelselpedia/header/stelselpedia-header.page-objects');

module.exports = function (nummeraanduidingHeaderElement) {
    return function () {
        return {
            stelselpediaHeader: stelselpediaHeader(
                nummeraanduidingHeaderElement.element(by.css('dp-stelselpedia-header'))
            )
        };
    };
};
