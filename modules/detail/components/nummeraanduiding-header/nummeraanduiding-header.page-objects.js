'use strict';

const glossaryHeader = dp.require('modules/detail/components/glossary/header/glossary-header.page-objects');

module.exports = function (nummeraanduidingHeaderElement) {
    return {
        get glossaryHeader () {
            return glossaryHeader(nummeraanduidingHeaderElement.element(by.css('dp-glossary-header')));
        }
    };
};
