'use strict';

const stelselpediaHeader = dp.require('modules/detail/components/stelselpedia/header/stelselpedia-header.page-objects');
const nummeraanduidingHeader =
    dp.require('modules/detail/components/nummeraanduiding-header/nummeraanduiding-header.page-objects');

module.exports = function (detailElement) {
    return {
        get isVisible () {
            return dp.isVisible(detailElement);
        },
        get nummeraanduiding () {
            return groupedDataPageObject(detailElement.element(by.css('.qa-nummeraanduiding')));
        },
        get verblijfsobject () {
            return groupedDataPageObject(detailElement.element(by.css('.qa-verblijfsobject')));
        }
    };
};

function groupedDataPageObject (groupedDataElement) {
    return {
        get stelselpediaHeader () {
            return stelselpediaHeader(groupedDataElement.element(by.css('dp-stelselpedia-header')));
        },
        get nummeraanduidingHeader () {
            return nummeraanduidingHeader(groupedDataElement.element(by.css('dp-nummeraanduiding-header')));
        },
        get descriptionList () {
            return descriptionListPageObject(groupedDataElement.element(by.css('dl')));
        }
    };
}

function descriptionListPageObject (definitionListElement) {
    return {
        term: function (index) {
            return definitionListElement.all(by.css('dt')).get(index).getText();
        },
        definition: function (index) {
            return definitionListElement.all(by.css('dd')).get(index).getText();
        }
    };
}
