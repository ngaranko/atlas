'use strict';

const isVisible = require('../../../../e2e/helpers/is-visible');

const stelselpediaHeader = dp.require('modules/detail/components/stelselpedia/header/stelselpedia-header.page-objects');
const nummeraanduidingHeader = dp.require('modules/detail/components/nummeraanduiding-header/nummeraanduiding-header.page-objects');

module.exports = function (detailElement) {
    return function () {
        return {
            isVisible: isVisible(detailElement),
            nummeraanduiding: groupedDataPageObject(detailElement.element(by.css('.qa-nummeraanduiding'))),
            verblijfsobject: groupedDataPageObject(detailElement.element(by.css('.qa-verblijfsobject')))
        };
    };
};

function groupedDataPageObject (groupedDataElement) {
    return function () {
        return {
            stelselpediaHeader: stelselpediaHeader(groupedDataElement.element(by.css('dp-stelselpedia-header'))),
            nummeraanduidingHeader: nummeraanduidingHeader(
                groupedDataElement.element(by.css('dp-nummeraanduiding-header'))
            ),
            descriptionList: descriptionListPageObject(groupedDataElement.element(by.css('dl')))
        };
    };
}

function descriptionListPageObject (definitionListElement) {
    return function () {
        return {
            term: function (index) {
                return definitionListElement.all(by.css('dt')).get(index).getText();
            },
            definition: function (index) {
                return definitionListElement.all(by.css('dd')).get(index).getText();
            }
        };
    };
}
