'use strict';

const stelselpediaHeader = dp.require('modules/detail/components/stelselpedia/header/stelselpedia-header.page-objects');

module.exports = function (nummeraanduidingHeaderElement) {
    return function () {
        return {
            stelselpediaHeader: stelselpediaHeader(
                nummeraanduidingHeaderElement.element(by.css('dp-stelselpedia-header'))
            )
        };
    };
};
